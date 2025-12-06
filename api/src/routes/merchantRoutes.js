import express from 'express';
import { getMerchantAnalytics, getMRR, getChurnRate, getRevenueByPlan, exportAnalyticsCSV } from '../controllers/analyticsController.js';
import { authenticateToken } from '../auth.js';

const router = express.Router();

router.get('/analytics', authenticateToken, getMerchantAnalytics);
router.get('/analytics/mrr', authenticateToken, getMRR);
router.get('/analytics/churn', authenticateToken, getChurnRate);
router.get('/analytics/revenue-by-plan', authenticateToken, getRevenueByPlan);
router.get('/analytics/export', authenticateToken, exportAnalyticsCSV);

export default router;
