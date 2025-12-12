import db from '../database.js';
import logger from '../logger.js';
import crypto from 'crypto';
import { auditService } from '../services/auditService.js';

// Get company details
export const getCompanyDetails = (req, res) => {
    const merchantId = req.user.id;

    try {
        // Get merchant details for wallet address
        const merchant = db.prepare(`SELECT wallet_address FROM merchants WHERE id = ?`).get(merchantId);

        let settings = db.prepare(`
            SELECT * FROM merchant_settings WHERE merchant_id = ?
        `).get(merchantId);

        // Create default settings if none exist
        if (!settings) {
            db.prepare(`
                INSERT INTO merchant_settings (merchant_id) VALUES (?)
            `).run(merchantId);

            settings = db.prepare(`
                SELECT * FROM merchant_settings WHERE merchant_id = ?
            `).get(merchantId);
        }

        res.json({
            companyName: settings.company_name,
            companyWebsite: settings.company_website,
            supportEmail: settings.support_email,
            brandColor: settings.brand_color,
            logoUrl: settings.logo_url,
            walletAddress: merchant ? merchant.wallet_address : null
        });
    } catch (error) {
        logger.error('Get company details error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update company details
export const updateCompanyDetails = (req, res) => {
    const merchantId = req.user.id;
    const { companyName, companyWebsite, supportEmail, brandColor, logoUrl } = req.body;

    try {
        db.prepare(`
            INSERT INTO merchant_settings (
                merchant_id, company_name, company_website, support_email, brand_color, logo_url, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, strftime('%s', 'now'))
            ON CONFLICT(merchant_id) DO UPDATE SET
                company_name = excluded.company_name,
                company_website = excluded.company_website,
                support_email = excluded.support_email,
                brand_color = excluded.brand_color,
                logo_url = excluded.logo_url,
                updated_at = excluded.updated_at
        `).run(merchantId, companyName, companyWebsite, supportEmail, brandColor, logoUrl);

        logger.info('Company details updated', { merchantId });
        auditService.log(merchantId, 'update_company', 'settings', merchantId, { companyName, companyWebsite });

        res.json({ message: 'Company details updated successfully' });
    } catch (error) {
        logger.error('Update company details error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

// List API keys
export const listAPIKeys = (req, res) => {
    const merchantId = req.user.id;

    try {
        const keys = db.prepare(`
            SELECT id, key_prefix, name, created_at, last_used_at, is_active
            FROM api_keys
            WHERE merchant_id = ?
            ORDER BY created_at DESC
        `).all(merchantId);

        res.json({
            apiKeys: keys.map(key => ({
                id: key.id,
                keyPrefix: key.key_prefix,
                name: key.name,
                createdAt: key.created_at,
                lastUsedAt: key.last_used_at,
                isActive: key.is_active === 1
            }))
        });
    } catch (error) {
        logger.error('List API keys error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Generate new API key
export const generateAPIKey = (req, res) => {
    const merchantId = req.user.id;
    const { name } = req.body;

    try {
        // Generate random API key
        const apiKey = `sk_${crypto.randomBytes(32).toString('hex')}`;
        const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');
        const keyPrefix = apiKey.substring(0, 12) + '...';

        // Store hashed key
        const result = db.prepare(`
            INSERT INTO api_keys (merchant_id, key_hash, key_prefix, name)
            VALUES (?, ?, ?, ?)
        `).run(merchantId, keyHash, keyPrefix, name || 'Default Key');

        logger.info('API key generated', { merchantId, keyId: result.lastInsertRowid });
        auditService.log(merchantId, 'generate_api_key', 'api_key', result.lastInsertRowid, { name: name || 'Default' });

        // Return the full key only once (never stored in plain text)
        res.json({
            apiKey: apiKey,
            keyPrefix: keyPrefix,
            message: 'API key generated successfully. Save this key securely - it will not be shown again.'
        });
    } catch (error) {
        logger.error('Generate API key error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Revoke API key
export const revokeAPIKey = (req, res) => {
    const merchantId = req.user.id;
    const { id } = req.params;

    try {
        const result = db.prepare(`
            UPDATE api_keys 
            SET is_active = 0
            WHERE id = ? AND merchant_id = ?
        `).run(id, merchantId);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'API key not found' });
        }

        logger.info('API key revoked', { merchantId, keyId: id });
        auditService.log(merchantId, 'revoke_api_key', 'api_key', id, {});

        res.json({ message: 'API key revoked successfully' });
    } catch (error) {
        logger.error('Revoke API key error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get notification preferences
export const getNotificationPreferences = (req, res) => {
    const merchantId = req.user.id;

    try {
        let settings = db.prepare(`
            SELECT * FROM merchant_settings WHERE merchant_id = ?
        `).get(merchantId);

        if (!settings) {
            db.prepare(`
                INSERT INTO merchant_settings (merchant_id) VALUES (?)
            `).run(merchantId);

            settings = db.prepare(`
                SELECT * FROM merchant_settings WHERE merchant_id = ?
            `).get(merchantId);
        }

        res.json({
            notificationNewSub: settings.notification_new_sub === 1,
            notificationPaymentFailed: settings.notification_payment_failed === 1,
            notificationWeeklySummary: settings.notification_weekly_summary === 1
        });
    } catch (error) {
        logger.error('Get notification preferences error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update notification preferences
export const updateNotificationPreferences = (req, res) => {
    const merchantId = req.user.id;
    const { notificationNewSub, notificationPaymentFailed, notificationWeeklySummary } = req.body;

    try {
        db.prepare(`
            INSERT INTO merchant_settings (
                merchant_id, notification_new_sub, notification_payment_failed, notification_weekly_summary, updated_at
            ) VALUES (?, ?, ?, ?, strftime('%s', 'now'))
            ON CONFLICT(merchant_id) DO UPDATE SET
                notification_new_sub = excluded.notification_new_sub,
                notification_payment_failed = excluded.notification_payment_failed,
                notification_weekly_summary = excluded.notification_weekly_summary,
                updated_at = excluded.updated_at
        `).run(
            merchantId,
            notificationNewSub ? 1 : 0,
            notificationPaymentFailed ? 1 : 0,
            notificationWeeklySummary ? 1 : 0
        );

        logger.info('Notification preferences updated', { merchantId });
        res.json({ message: 'Notification preferences updated successfully' });
    } catch (error) {
        logger.error('Update notification preferences error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};
