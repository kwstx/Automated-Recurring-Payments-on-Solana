import db from '../database.js';
import logger from '../logger.js';

export const auditService = {
    /**
     * Log an action to the audit trail
     */
    log: (merchantId, action, targetType, targetId, details = {}, ipAddress = null) => {
        try {
            db.prepare(`
                INSERT INTO audit_logs (
                    merchant_id, action, target_type, target_id, details, ip_address
                ) VALUES (?, ?, ?, ?, ?, ?)
            `).run(
                merchantId,
                action,
                targetType,
                String(targetId),
                JSON.stringify(details),
                ipAddress
            );
        } catch (error) {
            // Don't crash the app if logging fails, but emit error
            logger.error('Failed to write audit log', { error: error.message, merchantId, action });
        }
    },

    /**
     * Retrieve logs for a merchant
     */
    getLogs: (merchantId, limit = 50, offset = 0) => {
        try {
            return db.prepare(`
                SELECT * FROM audit_logs 
                WHERE merchant_id = ? 
                ORDER BY timestamp DESC 
                LIMIT ? OFFSET ?
            `).all(merchantId, limit, offset);
        } catch (error) {
            logger.error('Failed to get audit logs', { error: error.message, merchantId });
            return [];
        }
    }
};
