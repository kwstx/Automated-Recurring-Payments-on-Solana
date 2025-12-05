import express from 'express';
import { getMerchantAnalytics } from '../controllers/analyticsController.js';
import { authenticateToken } from '../auth.js';

const router = express.Router();

router.get('/analytics', authenticateToken, getMerchantAnalytics);

export default router;
