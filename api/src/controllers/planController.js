import { auditService } from '../services/auditService.js';

export const createPlan = async (req, res) => {
    const { planPda, name, description, amount, currency, currencyMint, decimals, interval, verifyOnChain } = req.body;
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
      INSERT INTO plans (merchant_id, plan_pda, name, description, amount, currency, currency_mint, decimals, interval)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(merchantId, planPda, name, description || null, amount, currency || 'USDC', currencyMint || null, decimals || 6, interval);

        logger.info('Plan created', { planId: result.lastInsertRowid, merchantId, planPda });

        auditService.log(merchantId, 'create_plan', 'plan', result.lastInsertRowid, { name, amount, interval });

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
        auditService.log(merchantId, 'update_plan', 'plan', planId, { name, amount, isActive });

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

// NEW: Get plans with pagination and search
export const listPlans = (req, res) => {
    const merchantId = req.user.id;
    const { page = 1, limit = 10, search = '', status } = req.query;

    const offset = (page - 1) * limit;

    try {
        let query = `
            SELECT 
                p.id, 
                p.plan_pda, 
                p.name, 
                p.description, 
                p.amount, 
                p.currency, 
                p.interval, 
                p.is_active,
                p.created_at,
                COUNT(DISTINCT s.id) as subscriber_count
            FROM plans p
            LEFT JOIN subscriptions s ON p.id = s.plan_id AND s.is_active = 1
            WHERE p.merchant_id = ?
        `;

        const params = [merchantId];

        if (search) {
            query += ` AND (p.name LIKE ? OR p.description LIKE ?)`;
            params.push(`%${search}%`, `%${search}%`);
        }

        if (status !== undefined) {
            query += ` AND p.is_active = ?`;
            params.push(status === 'active' ? 1 : 0);
        }

        query += ` GROUP BY p.id ORDER BY p.created_at DESC LIMIT ? OFFSET ?`;
        params.push(parseInt(limit), parseInt(offset));

        const plans = db.prepare(query).all(...params);

        // Get total count
        let countQuery = `SELECT COUNT(*) as total FROM plans WHERE merchant_id = ?`;
        const countParams = [merchantId];

        if (search) {
            countQuery += ` AND (name LIKE ? OR description LIKE ?)`;
            countParams.push(`%${search}%`, `%${search}%`);
        }

        if (status !== undefined) {
            countQuery += ` AND is_active = ?`;
            countParams.push(status === 'active' ? 1 : 0);
        }

        const { total } = db.prepare(countQuery).get(...countParams);

        res.json({
            plans: plans.map(p => ({
                ...p,
                amount: p.amount / 1000000 // Convert to USDC
            })),
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        logger.error('List plans error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

// NEW: Get plan subscribers
export const getPlanSubscribers = (req, res) => {
    const merchantId = req.user.id;
    const { id } = req.params;

    try {
        // Verify plan belongs to merchant
        const plan = db.prepare('SELECT * FROM plans WHERE id = ? AND merchant_id = ?').get(id, merchantId);

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found or unauthorized' });
        }

        const subscribers = db.prepare(`
            SELECT 
                s.id,
                s.subscription_pda,
                s.subscriber_pubkey,
                s.status,
                s.next_billing_timestamp,
                s.payment_count,
                s.created_at,
                s.last_payment_at
            FROM subscriptions s
            WHERE s.plan_id = ?
            ORDER BY s.created_at DESC
        `).all(id);

        res.json({
            planName: plan.name,
            subscribers: subscribers.map(sub => ({
                id: sub.id,
                subscriptionPda: sub.subscription_pda,
                walletAddress: sub.subscriber_pubkey,
                status: sub.status,
                nextBilling: sub.next_billing_timestamp,
                paymentCount: sub.payment_count,
                createdAt: sub.created_at,
                lastPaymentAt: sub.last_payment_at
            }))
        });
    } catch (error) {
        logger.error('Get plan subscribers error', { error: error.message, merchantId, planId: id });
        res.status(500).json({ error: 'Internal server error' });
    }
};

// NEW: Delete (soft delete) a plan
export const deletePlan = (req, res) => {
    const merchantId = req.user.id;
    const { id } = req.params;

    try {
        // Verify plan belongs to merchant
        const plan = db.prepare('SELECT * FROM plans WHERE id = ? AND merchant_id = ?').get(id, merchantId);

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found or unauthorized' });
        }

        // Check if plan has active subscriptions
        const activeSubscriptions = db.prepare(`
            SELECT COUNT(*) as count FROM subscriptions 
            WHERE plan_id = ? AND is_active = 1
        `).get(id);

        if (activeSubscriptions.count > 0) {
            return res.status(400).json({
                error: 'Cannot delete plan with active subscriptions',
                activeSubscriptions: activeSubscriptions.count
            });
        }

        // Soft delete by setting is_active to 0
        db.prepare(`
            UPDATE plans 
            SET is_active = 0, updated_at = strftime('%s', 'now')
            WHERE id = ?
        `).run(id);

        logger.info('Plan deleted (soft)', { planId: id, merchantId });
        res.json({ message: 'Plan deleted successfully' });
    } catch (error) {
        logger.error('Delete plan error', { error: error.message, merchantId, planId: id });
        res.status(500).json({ error: 'Internal server error' });
    }
};

// NEW: Get public plan details (no auth required)
export const getPublicPlan = (req, res) => {
    const { planPda } = req.params;

    try {
        const plan = db.prepare(`
            SELECT 
                p.id, 
                p.plan_pda, 
                p.name, 
                p.description, 
                p.amount, 
                p.currency, 
                p.currency_mint,
                p.decimals,
                p.interval, 
                p.is_active,
                ms.company_name,
                ms.logo_url,
                ms.brand_color,
                m.wallet_address as merchant_wallet
            FROM plans p
            JOIN merchants m ON p.merchant_id = m.id
            LEFT JOIN merchant_settings ms ON m.id = ms.merchant_id
            WHERE p.plan_pda = ? AND p.is_active = 1
        `).get(planPda);

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found or inactive' });
        }

        res.json({
            ...plan,
            amount: plan.amount / Math.pow(10, plan.decimals || 6) // formatted
        });
    } catch (error) {
        logger.error('Get public plan error', { error: error.message, planPda });
        res.status(500).json({ error: 'Internal server error' });
    }
};
