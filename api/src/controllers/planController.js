import db from '../database.js';
import logger from '../logger.js';
import { verifyPlanOnChain } from '../solana-client.js';

export const createPlan = async (req, res) => {
    const { planPda, name, description, amount, currency, interval, verifyOnChain } = req.body;
    const merchantId = req.user.id;

    if (!planPda || !name || !amount || !interval) {
        return res.status(400).json({ error: 'Plan PDA, name, amount, and interval are required' });
    }

    try {
        // Optional on-chain verification
        if (verifyOnChain) {
            const verification = await verifyPlanOnChain(planPda);
            if (!verification.verified) {
                return res.status(400).json({
                    error: 'On-chain verification failed',
                    reason: verification.reason
                });
            }
            logger.info('Plan verified on-chain before creation', { planPda, verification });
        }

        const result = db.prepare(`
      INSERT INTO plans (merchant_id, plan_pda, name, description, amount, currency, interval)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(merchantId, planPda, name, description || null, amount, currency || 'USDC', interval);

        logger.info('Plan created', { planId: result.lastInsertRowid, merchantId, planPda });

        res.status(201).json({
            message: 'Plan created successfully',
            planId: result.lastInsertRowid,
            planPda
        });
    } catch (error) {
        logger.error('Create plan error', { error: error.message, merchantId });

        if (error.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ error: 'Plan PDA already exists' });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updatePlan = (req, res) => {
    const { planId, name, description, amount, isActive } = req.body;
    const merchantId = req.user.id;

    if (!planId) {
        return res.status(400).json({ error: 'Plan ID is required' });
    }

    try {
        // Verify plan belongs to merchant
        const plan = db.prepare('SELECT * FROM plans WHERE id = ? AND merchant_id = ?').get(planId, merchantId);

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found or unauthorized' });
        }

        // Build update query dynamically
        const updates = [];
        const values = [];

        if (name !== undefined) {
            updates.push('name = ?');
            values.push(name);
        }
        if (description !== undefined) {
            updates.push('description = ?');
            values.push(description);
        }
        if (amount !== undefined) {
            updates.push('amount = ?');
            values.push(amount);
        }
        if (isActive !== undefined) {
            updates.push('is_active = ?');
            values.push(isActive ? 1 : 0);
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        updates.push('updated_at = strftime("%s", "now")');
        values.push(planId, merchantId);

        const query = `UPDATE plans SET ${updates.join(', ')} WHERE id = ? AND merchant_id = ?`;
        db.prepare(query).run(...values);

        logger.info('Plan updated', { planId, merchantId });

        res.json({ message: 'Plan updated successfully' });
    } catch (error) {
        logger.error('Update plan error', { error: error.message, merchantId, planId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getPlans = (req, res) => {
    const merchantId = req.user.id;

    try {
        const plans = db.prepare(`
      SELECT id, plan_pda, name, description, amount, currency, interval, is_active, created_at, updated_at
      FROM plans
      WHERE merchant_id = ?
      ORDER BY created_at DESC
    `).all(merchantId);

        res.json({ plans });
    } catch (error) {
        logger.error('Get plans error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};
