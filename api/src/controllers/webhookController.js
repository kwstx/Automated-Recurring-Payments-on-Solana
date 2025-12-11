import crypto from 'crypto';
import db from '../database.js';
import logger from '../logger.js';

/**
 * Register a new webhook endpoint
 */
export const registerWebhook = (req, res) => {
    const { url, events } = req.body;
    const merchantId = req.user.id;

    if (!url || !events || !Array.isArray(events)) {
        return res.status(400).json({
            error: 'URL and events array are required'
        });
    }

    // Validate events
    const validEvents = ['payment.success', 'payment.failure', 'subscription.renewal', '*'];
    const invalidEvents = events.filter(e => !validEvents.includes(e));

    if (invalidEvents.length > 0) {
        return res.status(400).json({
            error: 'Invalid events',
            invalidEvents,
            validEvents
        });
    }

    try {
        // Generate secret for HMAC
        const secret = crypto.randomBytes(32).toString('hex');

        const result = db.prepare(`
      INSERT INTO webhook_endpoints (merchant_id, url, events, secret)
      VALUES (?, ?, ?, ?)
    `).run(merchantId, url, events.join(','), secret);

        logger.info('Webhook registered', {
            webhookId: result.lastInsertRowid,
            merchantId,
            url,
            events
        });

        res.status(201).json({
            message: 'Webhook registered successfully',
            webhookId: result.lastInsertRowid,
            secret,
            events
        });
    } catch (error) {
        logger.error('Register webhook error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * List merchant webhooks
 */
export const listWebhooks = (req, res) => {
    const merchantId = req.user.id;

    try {
        const webhooks = db.prepare(`
      SELECT id, url, events, is_active, created_at, updated_at
      FROM webhook_endpoints
      WHERE merchant_id = ?
      ORDER BY created_at DESC
    `).all(merchantId);

        res.json({ webhooks });
    } catch (error) {
        logger.error('List webhooks error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Delete webhook
 */
export const deleteWebhook = (req, res) => {
    const { webhookId } = req.params;
    const merchantId = req.user.id;

    try {
        const result = db.prepare(`
      DELETE FROM webhook_endpoints
      WHERE id = ? AND merchant_id = ?
    `).run(webhookId, merchantId);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Webhook not found or unauthorized' });
        }

        logger.info('Webhook deleted', { webhookId, merchantId });
        res.json({ message: 'Webhook deleted successfully' });
    } catch (error) {
        logger.error('Delete webhook error', { error: error.message, webhookId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Update webhook (activate/deactivate)
 */
export const updateWebhook = (req, res) => {
    const { webhookId } = req.params;
    const { isActive, events } = req.body;
    const merchantId = req.user.id;

    try {
        // Verify webhook belongs to merchant
        const webhook = db.prepare(`
      SELECT * FROM webhook_endpoints WHERE id = ? AND merchant_id = ?
    `).get(webhookId, merchantId);

        if (!webhook) {
            return res.status(404).json({ error: 'Webhook not found or unauthorized' });
        }

        const updates = [];
        const values = [];

        if (isActive !== undefined) {
            updates.push('is_active = ?');
            values.push(isActive ? 1 : 0);
        }

        if (events && Array.isArray(events)) {
            updates.push('events = ?');
            values.push(events.join(','));
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        updates.push('updated_at = strftime("%s", "now")');
        values.push(webhookId, merchantId);

        const query = `UPDATE webhook_endpoints SET ${updates.join(', ')} WHERE id = ? AND merchant_id = ?`;
        db.prepare(query).run(...values);

        logger.info('Webhook updated', { webhookId, merchantId });
        res.json({ message: 'Webhook updated successfully' });
    } catch (error) {
        logger.error('Update webhook error', { error: error.message, webhookId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get webhook deliveries
 */
export const getWebhookDeliveries = (req, res) => {
    const { webhookId } = req.params;
    const merchantId = req.user.id;

    try {
        // Verify webhook belongs to merchant
        const webhook = db.prepare(`
      SELECT * FROM webhook_endpoints WHERE id = ? AND merchant_id = ?
    `).get(webhookId, merchantId);

        if (!webhook) {
            return res.status(404).json({ error: 'Webhook not found or unauthorized' });
        }

        const deliveries = db.prepare(`
      SELECT id, event_type, status, response_status_code, 
             attempt_count, delivered_at, created_at
      FROM webhook_deliveries
      WHERE webhook_endpoint_id = ?
      ORDER BY created_at DESC
      LIMIT 100
    `).all(webhookId);

        res.json({ deliveries });
    } catch (error) {
        logger.error('Get webhook deliveries error', { error: error.message, webhookId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get single webhook delivery details (including payload)
 */
export const getWebhookDelivery = (req, res) => {
    const { id } = req.params;
    const merchantId = req.user.id;

    try {
        const delivery = db.prepare(`
            SELECT d.* 
            FROM webhook_deliveries d
            JOIN webhook_endpoints e ON d.webhook_endpoint_id = e.id
            WHERE d.id = ? AND e.merchant_id = ?
        `).get(id, merchantId);

        if (!delivery) {
            return res.status(404).json({ error: 'Delivery log not found' });
        }

        res.json({ delivery });
    } catch (error) {
        logger.error('Get webhook delivery details error', { error: error.message, deliveryId: id });
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Retry a failed webhook delivery manually
 */
export const retryWebhookDelivery = (req, res) => {
    const { id } = req.params;
    const merchantId = req.user.id;

    try {
        // Verify ownership and fetch delivery
        const delivery = db.prepare(`
            SELECT d.* 
            FROM webhook_deliveries d
            JOIN webhook_endpoints e ON d.webhook_endpoint_id = e.id
            WHERE d.id = ? AND e.merchant_id = ?
        `).get(id, merchantId);

        if (!delivery) {
            return res.status(404).json({ error: 'Delivery log not found' });
        }

        // Reset status to pending so scheduler picks it up immediately
        db.prepare(`
            UPDATE webhook_deliveries
            SET status = 'pending', next_retry_at = strftime('%s', 'now'), error_message = NULL
            WHERE id = ?
        `).run(id);

        logger.info('Webhook delivery queued for retry', { deliveryId: id });
        res.json({ message: 'Webhook queued for retry' });
    } catch (error) {
        logger.error('Retry webhook delivery error', { error: error.message, deliveryId: id });
        res.status(500).json({ error: 'Internal server error' });
    }
};
