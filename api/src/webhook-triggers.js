import db from './database.js';
import logger from './logger.js';
import { deliverWebhook, calculateNextRetry } from './webhook-service.js';
import { emailService } from './services/emailService.js';

/**
 * Trigger webhook for an event
 */
export const triggerWebhook = async (merchantId, eventType, payload) => {
    try {
        // Find active webhooks for this merchant and event
        const webhooks = db.prepare(`
      SELECT * FROM webhook_endpoints 
      WHERE merchant_id = ? 
      AND is_active = 1 
      AND (events LIKE '%' || ? || '%' OR events = '*')
    `).all(merchantId, eventType);

        if (webhooks.length === 0) {
            logger.debug('No webhooks found for event', { merchantId, eventType });
            return { triggered: 0 };
        }

        const enrichedPayload = {
            event: eventType,
            timestamp: Date.now(),
            data: payload
        };

        let triggered = 0;

        for (const webhook of webhooks) {
            // Deliver webhook
            const result = await deliverWebhook(
                webhook.url,
                eventType,
                enrichedPayload,
                webhook.secret
            );

            // Log delivery
            const status = result.success ? 'delivered' : 'pending';
            const nextRetryAt = result.success ? null : calculateNextRetry(1);

            db.prepare(`
        INSERT INTO webhook_deliveries (
          webhook_endpoint_id, event_type, payload, status,
          response_status_code, response_body, error_message,
          attempt_count, next_retry_at, delivered_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
                webhook.id,
                eventType,
                JSON.stringify(enrichedPayload),
                status,
                result.statusCode,
                result.responseBody || null,
                result.error || null,
                1,
                nextRetryAt,
                result.success ? Math.floor(Date.now() / 1000) : null
            );

            triggered++;
        }

        logger.info('Webhooks triggered', { merchantId, eventType, triggered });
        return { triggered };
    } catch (error) {
        logger.error('Error triggering webhooks', {
            merchantId,
            eventType,
            error: error.message
        });
        throw error;
    }
};

/**
 * Retry failed webhooks
 */
export const retryFailedWebhooks = async () => {
    try {
        const now = Math.floor(Date.now() / 1000);

        // Get failed deliveries ready for retry
        const deliveries = db.prepare(`
      SELECT wd.*, we.url, we.secret 
      FROM webhook_deliveries wd
      JOIN webhook_endpoints we ON wd.webhook_endpoint_id = we.id
      WHERE wd.status = 'pending'
      AND wd.next_retry_at <= ?
      AND wd.attempt_count < 5
      AND we.is_active = 1
      LIMIT 50
    `).all(now);

        if (deliveries.length === 0) {
            return { retried: 0, succeeded: 0, failed: 0 };
        }

        let retried = 0;
        let succeeded = 0;
        let failed = 0;

        for (const delivery of deliveries) {
            const payload = JSON.parse(delivery.payload);
            const result = await deliverWebhook(
                delivery.url,
                delivery.event_type,
                payload,
                delivery.secret
            );

            retried++;
            const newAttemptCount = delivery.attempt_count + 1;

            if (result.success) {
                // Mark as delivered
                db.prepare(`
          UPDATE webhook_deliveries
          SET status = 'delivered',
              response_status_code = ?,
              response_body = ?,
              attempt_count = ?,
              delivered_at = strftime('%s', 'now')
          WHERE id = ?
        `).run(result.statusCode, result.responseBody, newAttemptCount, delivery.id);

                succeeded++;
            } else {
                // Update retry info
                const nextRetry = newAttemptCount >= 5 ? null : calculateNextRetry(newAttemptCount);
                const finalStatus = newAttemptCount >= 5 ? 'failed' : 'pending';

                db.prepare(`
          UPDATE webhook_deliveries
          SET response_status_code = ?,
              response_body = ?,
              error_message = ?,
              attempt_count = ?,
              next_retry_at = ?,
              status = ?
          WHERE id = ?
        `).run(
                    result.statusCode,
                    result.responseBody,
                    result.error,
                    newAttemptCount,
                    nextRetry,
                    finalStatus,
                    delivery.id
                );

                if (newAttemptCount >= 5) {
                    failed++;
                }
            }
        }

        logger.info('Webhook retry completed', { retried, succeeded, failed });
        return { retried, succeeded, failed };
    } catch (error) {
        logger.error('Error retrying webhooks', { error: error.message });
        throw error;
    }
};

/**
 * Get subscriber email
 */
const getSubscriberEmail = (subscriptionId) => {
    try {
        const sub = db.prepare('SELECT subscriber_email FROM subscriptions WHERE id = ?').get(subscriptionId);
        return sub ? sub.subscriber_email : null;
    } catch (e) {
        return null;
    }
};

/**
 * Trigger payment success webhook and email
 */
export const triggerPaymentSuccess = async (merchantId, subscriptionData, paymentData) => {
    // 1. Send Email
    const email = getSubscriberEmail(subscriptionData.id);
    if (email) {
        // Fetch merchant name for better email
        const merchant = db.prepare('SELECT username FROM merchants WHERE id = ?').get(merchantId);

        await emailService.sendPaymentSuccess(email, {
            amount: paymentData.amount || '0.00',
            currency: paymentData.currency || 'USDC',
            merchantName: merchant ? merchant.username : 'Merchant',
            planName: subscriptionData.planName || 'Subscription',
            transactionSignature: paymentData.signature || 'N/A'
        });
    }

    // 2. Trigger Webhook
    return await triggerWebhook(merchantId, 'payment.success', {
        subscription: subscriptionData,
        payment: paymentData
    });
};

/**
 * Trigger payment failure webhook and email
 */
export const triggerPaymentFailure = async (merchantId, subscriptionData, error) => {
    // 1. Send Email
    const email = getSubscriberEmail(subscriptionData.id);
    if (email) {
        const merchant = db.prepare('SELECT username FROM merchants WHERE id = ?').get(merchantId);

        await emailService.sendPaymentFailed(email, {
            amount: subscriptionData.amount || 'Unknown',
            currency: 'USDC',
            merchantName: merchant ? merchant.username : 'Merchant',
            planName: subscriptionData.planName || 'Subscription',
            reason: error.message
        });
    }

    // 2. Trigger Webhook
    return await triggerWebhook(merchantId, 'payment.failure', {
        subscription: subscriptionData,
        error: {
            message: error.message,
            code: error.code || 'unknown'
        }
    });
};

/**
 * Trigger subscription renewal webhook and email
 */
export const triggerSubscriptionRenewal = async (merchantId, subscriptionData) => {
    // 1. Send Email
    const email = getSubscriberEmail(subscriptionData.id);
    if (email) {
        const merchant = db.prepare('SELECT username FROM merchants WHERE id = ?').get(merchantId);

        await emailService.sendRenewalNotification(email, {
            merchantName: merchant ? merchant.username : 'Merchant',
            planName: subscriptionData.planName || 'Subscription',
            renewalDate: new Date(subscriptionData.nextBillingTimestamp * 1000).toLocaleDateString(),
            amount: subscriptionData.amount || 'Unknown',
            currency: 'USDC'
        });
    }

    // 2. Trigger Webhook
    return await triggerWebhook(merchantId, 'subscription.renewal', {
        subscription: subscriptionData
    });
};
