import express from 'express';
import { getMerchantAnalytics, getMRR, getChurnRate, getRevenueByPlan, exportAnalyticsCSV } from '../controllers/analyticsController.js';
import { authenticateToken } from '../auth.js';

import { getMerchantSubscriptions } from '../controllers/subscriptionController.js';
import { listInvoices, createInvoice, getInvoice } from '../controllers/invoiceController.js';

const router = express.Router();

router.get('/analytics', authenticateToken, getMerchantAnalytics);
router.get('/analytics/mrr', authenticateToken, getMRR);
router.get('/analytics/churn', authenticateToken, getChurnRate);
router.get('/analytics/revenue-by-plan', authenticateToken, getRevenueByPlan);
router.get('/analytics/export', authenticateToken, exportAnalyticsCSV);

// New endpoint for subscriptions list
router.get('/subscriptions', authenticateToken, getMerchantSubscriptions);

// Invoice Routes
router.get('/invoices', authenticateToken, listInvoices);
router.post('/invoices', authenticateToken, createInvoice);
router.get('/invoices/:id', authenticateToken, getInvoice);

export default router;
