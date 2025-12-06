import db from '../database.js';
import logger from '../logger.js';

// Get all subscriptions for a wallet address
export const getSubscriptionsByWallet = (req, res) => {
    const { walletAddress } = req.params;

    try {
        const subscriptions = db.prepare(`
            SELECT 
                s.id,
                s.subscription_pda,
                s.status,
                s.next_billing_timestamp,
                s.payment_count,
                s.created_at,
                p.name as plan_name,
                p.amount,
                p.interval,
                p.currency,
                m.username as merchant_name
            FROM subscriptions s
            JOIN plans p ON s.plan_id = p.id
            JOIN merchants m ON p.merchant_id = m.id
            WHERE s.subscriber_pubkey = ?
            ORDER BY s.created_at DESC
        `).all(walletAddress);

        res.json({
            subscriptions: subscriptions.map(sub => ({
                id: sub.id,
                subscriptionPda: sub.subscription_pda,
                merchant: sub.merchant_name,
                plan: sub.plan_name,
                price: (sub.amount / 1000000).toFixed(2),
                interval: sub.interval,
                currency: sub.currency,
                status: sub.status,
                nextBilling: sub.next_billing_timestamp,
                paymentCount: sub.payment_count,
                createdAt: sub.created_at
            }))
        });
    } catch (error) {
        logger.error('Get subscriptions by wallet error', { error: error.message, walletAddress });
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Pause a subscription
export const pauseSubscription = (req, res) => {
    const { id } = req.params;
    const { walletAddress } = req.body;

    try {
        // Verify ownership
        const subscription = db.prepare(`
            SELECT * FROM subscriptions 
            WHERE id = ? AND subscriber_pubkey = ?
        `).get(id, walletAddress);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found or unauthorized' });
        }

        if (subscription.status !== 'active') {
            return res.status(400).json({ error: 'Can only pause active subscriptions' });
        }

        // Update status to paused
        db.prepare(`
            UPDATE subscriptions 
            SET status = 'paused', updated_at = strftime('%s', 'now')
            WHERE id = ?
        `).run(id);

        logger.info('Subscription paused', { subscriptionId: id, walletAddress });
        res.json({ message: 'Subscription paused successfully', status: 'paused' });
    } catch (error) {
        logger.error('Pause subscription error', { error: error.message, subscriptionId: id });
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Resume a subscription
export const resumeSubscription = (req, res) => {
    const { id } = req.params;
    const { walletAddress } = req.body;

    try {
        // Verify ownership
        const subscription = db.prepare(`
            SELECT * FROM subscriptions 
            WHERE id = ? AND subscriber_pubkey = ?
        `).get(id, walletAddress);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found or unauthorized' });
        }

        if (subscription.status !== 'paused') {
            return res.status(400).json({ error: 'Can only resume paused subscriptions' });
        }

        // Update status to active
        db.prepare(`
            UPDATE subscriptions 
            SET status = 'active', updated_at = strftime('%s', 'now')
            WHERE id = ?
        `).run(id);

        logger.info('Subscription resumed', { subscriptionId: id, walletAddress });
        res.json({ message: 'Subscription resumed successfully', status: 'active' });
    } catch (error) {
        logger.error('Resume subscription error', { error: error.message, subscriptionId: id });
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Cancel a subscription
export const cancelSubscription = (req, res) => {
    const { id } = req.params;
    const { walletAddress } = req.body;

    try {
        // Verify ownership
        const subscription = db.prepare(`
            SELECT * FROM subscriptions 
            WHERE id = ? AND subscriber_pubkey = ?
        `).get(id, walletAddress);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found or unauthorized' });
        }

        if (subscription.status === 'cancelled') {
            return res.status(400).json({ error: 'Subscription already cancelled' });
        }

        // Update status to cancelled
        db.prepare(`
            UPDATE subscriptions 
            SET status = 'cancelled', is_active = 0, updated_at = strftime('%s', 'now')
            WHERE id = ?
        `).run(id);

        logger.info('Subscription cancelled', { subscriptionId: id, walletAddress });
        res.json({ message: 'Subscription cancelled successfully', status: 'cancelled' });
    } catch (error) {
        logger.error('Cancel subscription error', { error: error.message, subscriptionId: id });
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get payment history for a subscription
export const getPaymentHistory = (req, res) => {
    const { id } = req.params;
    const { walletAddress } = req.query;

    try {
        // Verify ownership
        const subscription = db.prepare(`
            SELECT * FROM subscriptions 
            WHERE id = ? AND subscriber_pubkey = ?
        `).get(id, walletAddress);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found or unauthorized' });
        }

        const payments = db.prepare(`
            SELECT 
                id,
                transaction_signature,
                status,
                error_message,
                processed_at
            FROM payment_logs
            WHERE subscription_id = ?
            ORDER BY processed_at DESC
        `).all(id);

        res.json({
            payments: payments.map(payment => ({
                id: payment.id,
                transactionSignature: payment.transaction_signature,
                status: payment.status,
                errorMessage: payment.error_message,
                processedAt: payment.processed_at
            }))
        });
    } catch (error) {
        logger.error('Get payment history error', { error: error.message, subscriptionId: id });
        res.status(500).json({ error: 'Internal server error' });
    }
};
