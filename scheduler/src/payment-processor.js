import logger from './logger.js';
import SubscriptionDatabase from './database.js';
import SolanaClient from './solana-client.js';

class PaymentProcessor {
    constructor() {
        this.db = new SubscriptionDatabase();
        this.solanaClient = new SolanaClient();
        this.processing = false;
    }

    async processAllDuePayments() {
        if (this.processing) {
            logger.warn('Payment processing already in progress, skipping this cycle');
            return;
        }

        this.processing = true;
        const startTime = Date.now();

        try {
            const dueSubscriptions = this.db.getDueSubscriptions();

            if (dueSubscriptions.length === 0) {
                logger.info('No due payments to process');
                return;
            }

            logger.info(`Found ${dueSubscriptions.length} due subscriptions to process`);

            let successCount = 0;
            let failureCount = 0;

            for (const subscription of dueSubscriptions) {
                try {
                    await this.processSubscriptionPayment(subscription);
                    successCount++;
                } catch (error) {
                    logger.error(`Failed to process subscription ${subscription.id}: ${error.message}`, {
                        subscriptionId: subscription.id,
                        error: error.stack,
                    });
                    failureCount++;
                }

                // Small delay between payments to avoid rate limiting
                await this.sleep(1000);
            }

            const duration = Date.now() - startTime;
            logger.info(`Payment processing completed in ${duration}ms`, {
                total: dueSubscriptions.length,
                success: successCount,
                failure: failureCount,
                duration,
            });
        } catch (error) {
            logger.error(`Payment processing cycle failed: ${error.message}`, { error: error.stack });
        } finally {
            this.processing = false;
        }
    }

    async processSubscriptionPayment(subscription) {
        logger.info(`Processing payment for subscription ${subscription.id}`, {
            subscriptionPda: subscription.subscription_pda,
            nextBilling: subscription.next_billing_timestamp,
        });

        const result = await this.solanaClient.processPayment(subscription);

        if (result.success) {
            // Calculate next billing timestamp (current + frequency from plan)
            // For now, we'll add 30 days (2592000 seconds) as a default
            const nextBillingTimestamp = subscription.next_billing_timestamp + 2592000;

            this.db.updateSubscriptionAfterPayment(
                subscription.id,
                nextBillingTimestamp,
                result.signature
            );

            this.db.logPayment(subscription.id, 'success', result.signature);

            logger.info(`Payment successful for subscription ${subscription.id}`, {
                signature: result.signature,
                nextBilling: nextBillingTimestamp,
            });
        } else {
            const maxRetries = 3;
            const retryDelaySeconds = 8 * 60 * 60; // 8 hours

            if (subscription.retry_count < maxRetries) {
                const nextRetryTimestamp = Math.floor(Date.now() / 1000) + retryDelaySeconds;

                this.db.updateSubscriptionRetry(subscription.id, nextRetryTimestamp);

                this.db.logPayment(
                    subscription.id,
                    'failed_retry_scheduled',
                    null,
                    `${result.error} (Retry ${subscription.retry_count + 1}/${maxRetries} scheduled)`
                );

                logger.warn(`Payment failed for subscription ${subscription.id}. Retrying in 8 hours.`, {
                    error: result.error,
                    retryCount: subscription.retry_count + 1,
                    nextRetry: nextRetryTimestamp
                });
            } else {
                // Max retries reached
                this.db.markSubscriptionFailed(subscription.id);

                this.db.logPayment(
                    subscription.id,
                    'failed_max_retries',
                    null,
                    `${result.error} (Max retries reached, subscription marked as failed)`
                );

                logger.error(`Payment failed for subscription ${subscription.id}. Max retries reached. Marked as failed.`, {
                    error: result.error,
                    retryCount: subscription.retry_count
                });
            }
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    close() {
        this.db.close();
    }
}

export default PaymentProcessor;
