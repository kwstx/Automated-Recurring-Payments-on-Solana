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
        SUM(CASE WHEN s.is_active = 1 THEN 1 ELSE 0 END) as active_subscriptions,
        SUM(CASE WHEN s.status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_subscriptions
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

// NEW: Get Monthly Recurring Revenue
export const getMRR = (req, res) => {
  const merchantId = req.user.id;

  try {
    const mrrData = db.prepare(`
            SELECT 
                SUM(CASE 
                    WHEN p.interval = 'monthly' THEN p.amount
                    WHEN p.interval = 'yearly' THEN p.amount / 12
                    WHEN p.interval = 'weekly' THEN p.amount * 4.33
                    WHEN p.interval = 'daily' THEN p.amount * 30
                    ELSE 0
                END) / 1000000 as mrr
            FROM subscriptions s
            JOIN plans p ON s.plan_id = p.id
            WHERE p.merchant_id = ? AND s.is_active = 1
        `).get(merchantId);

    res.json({
      mrr: (mrrData.mrr || 0).toFixed(2),
      currency: 'USDC'
    });
  } catch (error) {
    logger.error('Get MRR error', { error: error.message, merchantId });
    res.status(500).json({ error: 'Internal server error' });
  }
};

// NEW: Get Churn Rate
export const getChurnRate = (req, res) => {
  const merchantId = req.user.id;

  try {
    // Calculate churn for last 30 days
    const thirtyDaysAgo = Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60);

    const churnData = db.prepare(`
            SELECT 
                COUNT(DISTINCT CASE WHEN s.created_at < ? THEN s.id END) as customers_start,
                COUNT(DISTINCT CASE WHEN s.status = 'cancelled' AND s.updated_at >= ? THEN s.id END) as churned_customers
            FROM subscriptions s
            JOIN plans p ON s.plan_id = p.id
            WHERE p.merchant_id = ?
        `).get(thirtyDaysAgo, thirtyDaysAgo, merchantId);

    const churnRate = churnData.customers_start > 0
      ? ((churnData.churned_customers / churnData.customers_start) * 100).toFixed(2)
      : 0;

    res.json({
      churnRate: parseFloat(churnRate),
      period: 'last_30_days',
      churnedCustomers: churnData.churned_customers,
      totalCustomers: churnData.customers_start
    });
  } catch (error) {
    logger.error('Get churn rate error', { error: error.message, merchantId });
    res.status(500).json({ error: 'Internal server error' });
  }
};

// NEW: Get Revenue by Plan
export const getRevenueByPlan = (req, res) => {
  const merchantId = req.user.id;

  try {
    const revenueByPlan = db.prepare(`
            SELECT 
                p.name,
                p.id,
                COUNT(s.id) as subscriber_count,
                SUM(s.payment_count * p.amount) / 1000000 as total_revenue
            FROM plans p
            LEFT JOIN subscriptions s ON p.id = s.plan_id AND s.is_active = 1
            WHERE p.merchant_id = ?
            GROUP BY p.id, p.name
            ORDER BY total_revenue DESC
        `).all(merchantId);

    res.json({
      plans: revenueByPlan.map(plan => ({
        name: plan.name,
        subscriberCount: plan.subscriber_count,
        revenue: (plan.total_revenue || 0).toFixed(2)
      }))
    });
  } catch (error) {
    logger.error('Get revenue by plan error', { error: error.message, merchantId });
    res.status(500).json({ error: 'Internal server error' });
  }
};

// NEW: Export Analytics as CSV
export const exportAnalyticsCSV = (req, res) => {
  const merchantId = req.user.id;

  try {
    const subscriptions = db.prepare(`
            SELECT 
                s.subscription_pda,
                s.subscriber_pubkey,
                p.name as plan_name,
                p.amount / 1000000 as price,
                p.interval,
                s.status,
                s.payment_count,
                s.created_at,
                s.last_payment_at
            FROM subscriptions s
            JOIN plans p ON s.plan_id = p.id
            WHERE p.merchant_id = ?
            ORDER BY s.created_at DESC
        `).all(merchantId);

    // Generate CSV
    const headers = ['Subscription PDA', 'Subscriber', 'Plan', 'Price (USDC)', 'Interval', 'Status', 'Payments', 'Created At', 'Last Payment'];
    const rows = subscriptions.map(sub => [
      sub.subscription_pda,
      sub.subscriber_pubkey,
      sub.plan_name,
      sub.price,
      sub.interval,
      sub.status,
      sub.payment_count,
      new Date(sub.created_at * 1000).toISOString(),
      sub.last_payment_at ? new Date(sub.last_payment_at * 1000).toISOString() : 'N/A'
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=analytics-${Date.now()}.csv`);
    res.send(csv);
  } catch (error) {
    logger.error('Export analytics CSV error', { error: error.message, merchantId });
    res.status(500).json({ error: 'Internal server error' });
  }
};
