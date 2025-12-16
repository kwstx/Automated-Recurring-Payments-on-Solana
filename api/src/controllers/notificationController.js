import db from '../database.js';
import logger from '../logger.js';

export const getNotifications = (req, res) => {
    const merchantId = req.user.id;

    try {
        // 1. Get recent audit logs (System actions)
        const auditLogs = db.prepare(`
            SELECT 
                'audit' as type,
                id,
                action as title,
                details as message,
                timestamp as created_at,
                0 as read_status -- Mock read status for now
            FROM audit_logs
            WHERE merchant_id = ?
            ORDER BY timestamp DESC
            LIMIT 5
        `).all(merchantId);

        // 2. Get recent payments (Success/Fail) for *this merchant's* subscriptions
        const paymentLogs = db.prepare(`
            SELECT 
                'payment' as type,
                pl.id,
                'Payment ' || pl.status as title,
                'Subscription ' || s.subscription_pda || ': ' || COALESCE(pl.error_message, 'Processed successfully') as message,
                pl.processed_at as created_at,
                0 as read_status
            FROM payment_logs pl
            JOIN subscriptions s ON pl.subscription_id = s.id
            JOIN plans p ON s.plan_id = p.id
            WHERE p.merchant_id = ?
            ORDER BY pl.processed_at DESC
            LIMIT 5
        `).all(merchantId);

        // 3. New Subscriptions
        const newSubs = db.prepare(`
            SELECT 
                'subscription' as type,
                s.id,
                'New Subscription' as title,
                'New subscriber: ' || s.subscriber_pubkey as message,
                s.created_at,
                0 as read_status
            FROM subscriptions s
            JOIN plans p ON s.plan_id = p.id
            WHERE p.merchant_id = ?
            ORDER BY s.created_at DESC
            LIMIT 5
        `).all(merchantId);

        // Combine and sort
        const allNotifications = [...auditLogs, ...paymentLogs, ...newSubs]
            .sort((a, b) => b.created_at - a.created_at)
            .slice(0, 10) // Limit to 10 most recent
            .map(n => ({
                id: `${n.type}-${n.id}`,
                title: n.title,
                message: maxLength(n.message, 60),
                time: timeAgo(n.created_at),
                unread: true // defaulting to true since we don't track read state yet
            }));

        res.json({ notifications: allNotifications });

    } catch (error) {
        logger.error('Get notifications error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Helper: Time Ago
function timeAgo(timestamp) {
    const seconds = Math.floor(Date.now() / 1000) - timestamp;
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
}

// Helper: Truncate
function maxLength(str, len) {
    if (!str) return '';
    if (str.length <= len) return str;
    return str.substring(0, len) + '...';
}
