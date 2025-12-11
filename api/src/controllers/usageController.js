import db from '../database.js';
import logger from '../logger.js';

/**
 * Report usage for a subscription
 * POST /api/usage/report
 */
export const reportUsage = (req, res) => {
    // Expect authenticated user (merchant) to report usage for a specific subscriber
    // OR allow "server-side" usage reporting via Secret Key

    // Auth middleware should attach `req.merchantId` if using API Key
    const merchantId = req.user.id || req.merchantId;

    if (!merchantId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { subscriptionId, event, quantity, idempotencyKey } = req.body;

    if (!subscriptionId || !event || !quantity) {
        return res.status(400).json({ error: 'subscriptionId, event, and quantity are required' });
    }

    try {
        // 1. Verify subscription belongs to merchant
        const subscription = db.prepare(`
            SELECT s.id, s.plan_id 
            FROM subscriptions s
            JOIN plans p ON s.plan_id = p.id
            WHERE s.id = ? AND p.merchant_id = ?
        `).get(subscriptionId, merchantId);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found or does not belong to your account' });
        }

        // 2. Find the meter definition for this event and plan
        const meter = db.prepare(`
            SELECT id, price_per_unit 
            FROM plan_meters 
            WHERE plan_id = ? AND event_name = ?
        `).get(subscription.plan_id, event);

        if (!meter) {
            return res.status(400).json({ error: `No meter defined for event '${event}' on this plan` });
        }

        // 3. Record usage
        const result = db.prepare(`
            INSERT INTO usage_records (subscription_id, meter_id, quantity, idempotency_key)
            VALUES (?, ?, ?, ?)
        `).run(subscription.id, meter.id, quantity, idempotencyKey || null);

        logger.info('Usage recorded', { subscriptionId, event, quantity, price: meter.price_per_unit * quantity });

        res.status(201).json({
            message: 'Usage recorded',
            id: result.lastInsertRowid,
            costImpact: meter.price_per_unit * quantity
        });

    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(409).json({ error: 'Idempotency key already used' });
        }
        logger.error('Report usage error', { error: error.message });
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get usage summary for a subscription
 * GET /api/usage/:subscriptionId
 */
export const getUsage = (req, res) => {
    const merchantId = req.user.id || req.merchantId;
    const { subscriptionId } = req.params;

    try {
        // Verify ownership
        const subscription = db.prepare(`
            SELECT s.id 
            FROM subscriptions s
            JOIN plans p ON s.plan_id = p.id
            WHERE s.id = ? AND p.merchant_id = ?
        `).get(subscriptionId, merchantId);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        // Aggregate usage by meter
        const usage = db.prepare(`
            SELECT 
                pm.event_name,
                pm.price_per_unit,
                SUM(ur.quantity) as total_quantity,
                SUM(ur.quantity * pm.price_per_unit) as total_cost
            FROM usage_records ur
            JOIN plan_meters pm ON ur.meter_id = pm.id
            WHERE ur.subscription_id = ?
            GROUP BY pm.id
        `).all(subscriptionId);

        res.json({ usage });

    } catch (error) {
        logger.error('Get usage error', { error: error.message });
        res.status(500).json({ error: 'Internal server error' });
    }
};
