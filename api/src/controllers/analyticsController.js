import db from '../database.js';
import logger from '../logger.js';

export const getMerchantAnalytics = (req, res) => {
    const merchantId = req.user.id;

    try {
        // Get total plans
        const planStats = db.prepare(`
      SELECT 
        COUNT(*) as total_plans,
        SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active_plans
      FROM plans
      WHERE merchant_id = ?
    `).get(merchantId);

        // Get subscription stats
        const subscriptionStats = db.prepare(`
      SELECT 
        COUNT(*) as total_subscriptions,
        SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active_subscriptions,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_subscriptions
      FROM subscriptions s
      JOIN plans p ON s.plan_id = p.id
      WHERE p.merchant_id = ?
    `).get(merchantId);

        // Get revenue stats (based on payment count and plan amounts)
        const revenueStats = db.prepare(`
      SELECT 
        SUM(s.payment_count * p.amount) as total_revenue,
        COUNT(DISTINCT s.id) as paying_customers
      FROM subscriptions s
      JOIN plans p ON s.plan_id = p.id
      WHERE p.merchant_id = ? AND s.payment_count > 0
    `).get(merchantId);

        // Get recent activity
        const recentSubscriptions = db.prepare(`
      SELECT 
        s.subscription_pda,
        s.subscriber_pubkey,
        s.status,
        s.created_at,
        p.name as plan_name
      FROM subscriptions s
      JOIN plans p ON s.plan_id = p.id
      WHERE p.merchant_id = ?
      ORDER BY s.created_at DESC
      LIMIT 10
    `).all(merchantId);

        // Get payment success rate
        const paymentStats = db.prepare(`
      SELECT 
        COUNT(*) as total_payments,
        SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as successful_payments,
        SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed_payments
      FROM payment_logs pl
      JOIN subscriptions s ON pl.subscription_id = s.id
      JOIN plans p ON s.plan_id = p.id
      WHERE p.merchant_id = ?
    `).get(merchantId);

        const successRate = paymentStats.total_payments > 0
            ? ((paymentStats.successful_payments / paymentStats.total_payments) * 100).toFixed(2)
            : 0;

        res.json({
            analytics: {
                plans: {
                    total: planStats.total_plans,
                    active: planStats.active_plans
                },
                subscriptions: {
                    total: subscriptionStats.total_subscriptions,
                    active: subscriptionStats.active_subscriptions,
                    cancelled: subscriptionStats.cancelled_subscriptions
                },
                revenue: {
                    total: revenueStats.total_revenue || 0,
                    payingCustomers: revenueStats.paying_customers || 0
                },
                payments: {
                    total: paymentStats.total_payments,
                    successful: paymentStats.successful_payments,
                    failed: paymentStats.failed_payments,
                    successRate: `${successRate}%`
                },
                recentActivity: recentSubscriptions
            }
        });
    } catch (error) {
        logger.error('Get merchant analytics error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};
