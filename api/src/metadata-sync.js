import db from './database.js';
import logger from './logger.js';
import { verifyPlanOnChain, verifySubscriptionOnChain } from './solana-client.js';

/**
 * Sync plan metadata from on-chain
 */
export const syncPlanMetadata = async (planId, planPda) => {
    try {
        const verification = await verifyPlanOnChain(planPda);

        if (!verification.verified) {
            logger.warn('Failed to sync plan metadata', { planId, planPda, reason: verification.reason });

            // Update sync status to failed
            db.prepare(`
        INSERT INTO plan_metadata (plan_id, plan_pda, sync_status, last_synced_at)
        VALUES (?, ?, 'failed', strftime('%s', 'now'))
        ON CONFLICT(plan_id) DO UPDATE SET
          sync_status = 'failed',
          last_synced_at = strftime('%s', 'now')
      `).run(planId, planPda);

            return { success: false, reason: verification.reason };
        }

        const { data } = verification;

        // Store metadata in database
        db.prepare(`
      INSERT INTO plan_metadata (
        plan_id, plan_pda, on_chain_merchant, on_chain_name,
        on_chain_amount, on_chain_interval, on_chain_is_active,
        sync_status, last_synced_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, 'success', strftime('%s', 'now'))
      ON CONFLICT(plan_id) DO UPDATE SET
        on_chain_merchant = excluded.on_chain_merchant,
        on_chain_name = excluded.on_chain_name,
        on_chain_amount = excluded.on_chain_amount,
        on_chain_interval = excluded.on_chain_interval,
        on_chain_is_active = excluded.on_chain_is_active,
        sync_status = 'success',
        last_synced_at = strftime('%s', 'now')
    `).run(
            planId,
            planPda,
            data.merchant,
            data.name,
            parseInt(data.amount),
            parseInt(data.interval),
            data.isActive ? 1 : 0
        );

        logger.info('Plan metadata synced successfully', { planId, planPda });
        return { success: true, data };
    } catch (error) {
        logger.error('Error syncing plan metadata', { planId, planPda, error: error.message });
        return { success: false, reason: error.message };
    }
};

/**
 * Sync subscription metadata from on-chain
 */
export const syncSubscriptionMetadata = async (subscriptionId, subscriptionPda) => {
    try {
        const verification = await verifySubscriptionOnChain(subscriptionPda);

        if (!verification.verified) {
            logger.warn('Failed to sync subscription metadata', {
                subscriptionId,
                subscriptionPda,
                reason: verification.reason
            });

            // Update sync status to failed
            db.prepare(`
        INSERT INTO subscription_metadata (subscription_id, subscription_pda, sync_status, last_synced_at)
        VALUES (?, ?, 'failed', strftime('%s', 'now'))
        ON CONFLICT(subscription_id) DO UPDATE SET
          sync_status = 'failed',
          last_synced_at = strftime('%s', 'now')
      `).run(subscriptionId, subscriptionPda);

            return { success: false, reason: verification.reason };
        }

        const { data } = verification;

        // Store metadata in database
        db.prepare(`
      INSERT INTO subscription_metadata (
        subscription_id, subscription_pda, on_chain_subscriber, on_chain_plan,
        on_chain_next_billing, on_chain_is_active, on_chain_payment_count,
        sync_status, last_synced_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, 'success', strftime('%s', 'now'))
      ON CONFLICT(subscription_id) DO UPDATE SET
        on_chain_subscriber = excluded.on_chain_subscriber,
        on_chain_plan = excluded.on_chain_plan,
        on_chain_next_billing = excluded.on_chain_next_billing,
        on_chain_is_active = excluded.on_chain_is_active,
        on_chain_payment_count = excluded.on_chain_payment_count,
        sync_status = 'success',
        last_synced_at = strftime('%s', 'now')
    `).run(
            subscriptionId,
            subscriptionPda,
            data.subscriber,
            data.plan,
            parseInt(data.nextBillingTimestamp),
            data.isActive ? 1 : 0,
            parseInt(data.paymentCount)
        );

        logger.info('Subscription metadata synced successfully', { subscriptionId, subscriptionPda });
        return { success: true, data };
    } catch (error) {
        logger.error('Error syncing subscription metadata', {
            subscriptionId,
            subscriptionPda,
            error: error.message
        });
        return { success: false, reason: error.message };
    }
};

/**
 * Sync all plans metadata
 */
export const syncAllPlansMetadata = async () => {
    try {
        const plans = db.prepare('SELECT id, plan_pda FROM plans WHERE is_active = 1').all();

        logger.info('Starting bulk plan metadata sync', { count: plans.length });

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

        logger.info('Bulk plan metadata sync completed', results);
        return results;
    } catch (error) {
        logger.error('Error in bulk plan metadata sync', { error: error.message });
        throw error;
    }
};

/**
 * Sync all subscriptions metadata
 */
export const syncAllSubscriptionsMetadata = async () => {
    try {
        const subscriptions = db.prepare(
            'SELECT id, subscription_pda FROM subscriptions WHERE is_active = 1'
        ).all();

        logger.info('Starting bulk subscription metadata sync', { count: subscriptions.length });

        const results = {
            total: subscriptions.length,
            success: 0,
            failed: 0
        };

        for (const subscription of subscriptions) {
            const result = await syncSubscriptionMetadata(subscription.id, subscription.subscription_pda);
            if (result.success) {
                results.success++;
            } else {
                results.failed++;
            }
        }

        logger.info('Bulk subscription metadata sync completed', results);
        return results;
    } catch (error) {
        logger.error('Error in bulk subscription metadata sync', { error: error.message });
        throw error;
    }
};
