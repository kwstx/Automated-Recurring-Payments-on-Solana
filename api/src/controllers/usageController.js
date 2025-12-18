import db from '../database.js';
import logger from '../logger.js';

export const createMeter = (req, res) => {
    const { planId, eventName, pricePerUnit, includedUnits } = req.body;

    if (!planId || !eventName || pricePerUnit === undefined) {
        return res.status(400).json({ error: 'Plan ID, Event Name, and Price are required' });
    }

    try {
        const result = db.prepare(`
            INSERT INTO plan_meters (plan_id, event_name, price_per_unit, included_units)
            VALUES (?, ?, ?, ?)
        `).run(planId, eventName, pricePerUnit, includedUnits || 0);

        res.status(201).json({
            message: 'Meter created successfully',
            meterId: result.lastInsertRowid
        });
    } catch (error) {
        logger.error('Create meter error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const recordUsage = (req, res) => {
    const { subscriptionId, eventName, quantity, idempotencyKey } = req.body;

    if (!subscriptionId || !eventName || !quantity) {
        return res.status(400).json({ error: 'Subscription ID, Event Name, and Quantity are required' });
    }

    try {
        // Find meter for this event and subscription's plan
        const meter = db.prepare(`
            SELECT pm.id
            FROM plan_meters pm
            JOIN subscriptions s ON s.plan_id = pm.plan_id
            WHERE s.id = ? AND pm.event_name = ?
        `).get(subscriptionId, eventName);

        if (!meter) {
            return res.status(404).json({ error: `Meter not found for event '${eventName}' on this plan` });
        }

        const result = db.prepare(`
            INSERT INTO usage_records (subscription_id, meter_id, quantity, idempotency_key)
            VALUES (?, ?, ?, ?)
        `).run(subscriptionId, meter.id, quantity, idempotencyKey || null);

        res.status(201).json({
            message: 'Usage recorded',
            recordId: result.lastInsertRowid
        });
    } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ error: 'Idempotency key already used' });
        }
        logger.error('Record usage error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getSubscriptionUsage = (req, res) => {
    const { id } = req.params;

    try {
        const usage = db.prepare(`
            SELECT 
                pm.event_name,
                pm.price_per_unit,
                pm.included_units,
                SUM(ur.quantity) as total_quantity
            FROM plan_meters pm
            JOIN usage_records ur ON ur.meter_id = pm.id
            WHERE ur.subscription_id = ?
            GROUP BY pm.id
        `).all(id);

        // Calculate costs
        const report = usage.map(u => {
            const billable = Math.max(0, u.total_quantity - (u.included_units || 0));
            const cost = billable * u.price_per_unit;
            return {
                eventName: u.event_name,
                totalUsage: u.total_quantity,
                included: u.included_units,
                billableUsage: billable,
                cost: cost,
                currency: 'Atomic Units' // Simplified
            };
        });

        res.json({ usage: report });
    } catch (error) {
        logger.error('Get usage error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
