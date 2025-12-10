import db from '../database.js';
import logger from '../logger.js';
import { verifySubscriptionOnChain, verifyTransaction } from '../solana-client.js';

export const activateSubscription = async (req, res) => {
    const {
        subscriptionPda,
        planId,
        subscriberPubkey,
        subscriberTokenAccount,
        merchantTokenAccount,
        nextBillingTimestamp,
        transactionSignature,
        verifyOnChain
    } = req.body;

    if (!subscriptionPda || !planId || !subscriberPubkey || !subscriberTokenAccount || !merchantTokenAccount || !nextBillingTimestamp) {
        return res.status(400).json({
            error: 'Subscription PDA, plan ID, subscriber pubkey, token accounts, and next billing timestamp are required'
        });
    }

    try {
        // Verify plan exists
        const plan = db.prepare('SELECT * FROM plans WHERE id = ?').get(planId);

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        // Optional transaction verification
        if (transactionSignature) {
            const txVerification = await verifyTransaction(transactionSignature);
            if (!txVerification.verified) {
                return res.status(400).json({
                    error: 'Transaction verification failed',
                    reason: txVerification.reason
                });
            }
            logger.info('Transaction verified', { transactionSignature, txVerification });
        }

        // Optional on-chain verification
        if (verifyOnChain) {
            const verification = await verifySubscriptionOnChain(subscriptionPda);
            if (!verification.verified) {
                return res.status(400).json({
                    error: 'On-chain verification failed',
                    reason: verification.reason
                });
            }
            logger.info('Subscription verified on-chain before activation', { subscriptionPda, verification });
        }

        // Insert subscription
        const result = db.prepare(`
      INSERT INTO subscriptions (
        subscription_pda, plan_id, subscriber_pubkey, subscriber_token_account,
        merchant_token_account, next_billing_timestamp, is_active, status
      )
      VALUES (?, ?, ?, ?, ?, ?, 1, 'active')
    `).run(
            subscriptionPda,
            planId,
            subscriberPubkey,
            subscriberTokenAccount,
            merchantTokenAccount,
            nextBillingTimestamp
        );

        logger.info('Subscription activated', {
            subscriptionId: result.lastInsertRowid,
            subscriptionPda,
            planId
        });

        res.status(201).json({
            message: 'Subscription activated successfully',
            subscriptionId: result.lastInsertRowid,
            subscriptionPda
        });
    } catch (error) {
        logger.error('Activate subscription error', { error: error.message });

        if (error.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ error: 'Subscription PDA already exists' });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
};

export const cancelSubscription = (req, res) => {
    const { subscriptionPda } = req.body;

    if (!subscriptionPda) {
        return res.status(400).json({ error: 'Subscription PDA is required' });
    }

    try {
        const result = db.prepare(`
      UPDATE subscriptions
      SET is_active = 0, status = 'cancelled', updated_at = strftime('%s', 'now')
      WHERE subscription_pda = ?
    `).run(subscriptionPda);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        logger.info('Subscription cancelled', { subscriptionPda });

        res.json({ message: 'Subscription cancelled successfully' });
    } catch (error) {
        logger.error('Cancel subscription error', { error: error.message, subscriptionPda });
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getSubscriptionStatus = (req, res) => {
    const { subscriptionPda } = req.query;

    if (!subscriptionPda) {
        return res.status(400).json({ error: 'Subscription PDA is required' });
    }

    try {
        const subscription = db.prepare(`
      SELECT 
        s.*,
        p.name as plan_name,
        p.amount as plan_amount,
        p.currency as plan_currency,
        p.interval as plan_interval
      FROM subscriptions s
      JOIN plans p ON s.plan_id = p.id
      WHERE s.subscription_pda = ?
    `).get(subscriptionPda);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        // Get recent payment logs
        const paymentLogs = db.prepare(`
      SELECT transaction_signature, status, error_message, processed_at
      FROM payment_logs
      WHERE subscription_id = ?
      ORDER BY processed_at DESC
      LIMIT 10
    `).all(subscription.id);

        res.json({
            subscription: {
                subscriptionPda: subscription.subscription_pda,
                subscriberPubkey: subscription.subscriber_pubkey,
                status: subscription.status,
                isActive: subscription.is_active === 1,
                nextBillingTimestamp: subscription.next_billing_timestamp,
                paymentCount: subscription.payment_count,
                lastPaymentAt: subscription.last_payment_at,
                plan: {
                    name: subscription.plan_name,
                    amount: subscription.plan_amount,
                    currency: subscription.plan_currency,
                    interval: subscription.plan_interval
                }
            },
            recentPayments: paymentLogs
        });
    } catch (error) {
        logger.error('Get subscription status error', { error: error.message, subscriptionPda });
        res.status(500).json({ error: 'Internal server error' });
    }
};
// NEW: Get all subscriptions for a merchant
export const getMerchantSubscriptions = (req, res) => {
    const merchantId = req.user.id;

    try {
        const subscriptions = db.prepare(`
            SELECT 
                s.id,
                s.subscription_pda,
                s.subscriber_pubkey,
                s.status,
                s.next_billing_timestamp,
                s.payment_count,
                s.created_at,
                s.last_payment_at,
                p.name as plan_name,
                p.amount as plan_amount
            FROM subscriptions s
            JOIN plans p ON s.plan_id = p.id
            WHERE p.merchant_id = ?
            ORDER BY s.created_at DESC
        `).all(merchantId);

        res.json({
            subscriptions: subscriptions.map(sub => ({
                id: sub.id,
                subscriptionPda: sub.subscription_pda,
                wallet: sub.subscriber_pubkey, // Mapped for frontend compatibility
                plan: sub.plan_name,
                amount: sub.plan_amount,
                status: sub.status,
                nextBilling: sub.next_billing_timestamp,
                paymentCount: sub.payment_count,
                createdAt: sub.created_at,
                lastPaymentAt: sub.last_payment_at
            }))
        });
    } catch (error) {
        logger.error('Get merchant subscriptions error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};
