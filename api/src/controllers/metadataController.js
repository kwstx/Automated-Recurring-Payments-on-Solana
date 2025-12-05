import db from '../database.js';
import logger from '../logger.js';
import {
    syncPlanMetadata,
    syncSubscriptionMetadata,
    syncAllPlansMetadata,
    syncAllSubscriptionsMetadata
} from '../metadata-sync.js';

/**
 * Sync plan metadata
 */
export const syncPlan = async (req, res) => {
    const { planId } = req.params;
    const merchantId = req.user.id;

    try {
        // Verify plan belongs to merchant
        const plan = db.prepare('SELECT * FROM plans WHERE id = ? AND merchant_id = ?').get(planId, merchantId);

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found or unauthorized' });
        }

        const result = await syncPlanMetadata(plan.id, plan.plan_pda);

        if (!result.success) {
            return res.status(400).json({
                error: 'Failed to sync plan metadata',
                reason: result.reason
            });
        }

        res.json({
            message: 'Plan metadata synced successfully',
            data: result.data
        });
    } catch (error) {
        logger.error('Sync plan error', { error: error.message, planId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Sync subscription metadata
 */
export const syncSubscription = async (req, res) => {
    const { subscriptionId } = req.params;

    try {
        const subscription = db.prepare('SELECT * FROM subscriptions WHERE id = ?').get(subscriptionId);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        const result = await syncSubscriptionMetadata(subscription.id, subscription.subscription_pda);

        if (!result.success) {
            return res.status(400).json({
                error: 'Failed to sync subscription metadata',
                reason: result.reason
            });
        }

        res.json({
            message: 'Subscription metadata synced successfully',
            data: result.data
        });
    } catch (error) {
        logger.error('Sync subscription error', { error: error.message, subscriptionId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get plan with metadata
 */
export const getPlanWithMetadata = async (req, res) => {
    const { planId } = req.params;
    const merchantId = req.user.id;

    try {
        const plan = db.prepare(`
      SELECT 
        p.*,
        pm.on_chain_merchant,
        pm.on_chain_name,
        pm.on_chain_amount,
        pm.on_chain_interval,
        pm.on_chain_is_active,
        pm.last_synced_at,
        pm.sync_status
      FROM plans p
      LEFT JOIN plan_metadata pm ON p.id = pm.plan_id
      WHERE p.id = ? AND p.merchant_id = ?
    `).get(planId, merchantId);

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found or unauthorized' });
        }

        res.json({ plan });
    } catch (error) {
        logger.error('Get plan with metadata error', { error: error.message, planId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get subscription with metadata
 */
export const getSubscriptionWithMetadata = async (req, res) => {
    const { subscriptionId } = req.params;

    try {
        const subscription = db.prepare(`
      SELECT 
        s.*,
        sm.on_chain_subscriber,
        sm.on_chain_plan,
        sm.on_chain_next_billing,
        sm.on_chain_is_active,
        sm.on_chain_payment_count,
        sm.last_synced_at,
        sm.sync_status
      FROM subscriptions s
      LEFT JOIN subscription_metadata sm ON s.id = sm.subscription_id
      WHERE s.id = ?
    `).get(subscriptionId);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        res.json({ subscription });
    } catch (error) {
        logger.error('Get subscription with metadata error', { error: error.message, subscriptionId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Sync all merchant plans
 */
export const syncAllMerchantPlans = async (req, res) => {
    const merchantId = req.user.id;

    try {
        const plans = db.prepare('SELECT id, plan_pda FROM plans WHERE merchant_id = ? AND is_active = 1')
            .all(merchantId);

        const results = {
            total: plans.length,
            success: 0,
            failed: 0
        };

        for (const plan of plans) {
            const result = await syncPlanMetadata(plan.id, plan.plan_pda);
            if (result.success) {
                results.success++;
            } else {
                results.failed++;
            }
        }

        res.json({
            message: 'Bulk plan sync completed',
            results
        });
    } catch (error) {
        logger.error('Sync all merchant plans error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};
