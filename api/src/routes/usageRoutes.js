import express from 'express';
import { createMeter, recordUsage, getSubscriptionUsage } from '../controllers/usageController.js';
import { authenticateToken } from '../auth.js';

const router = express.Router();

router.post('/meters', authenticateToken, createMeter);
router.post('/record', authenticateToken, recordUsage); // Internal or API key protected usually
router.get('/subscriptions/:id', authenticateToken, getSubscriptionUsage);

export default router;
