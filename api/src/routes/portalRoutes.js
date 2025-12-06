import express from 'express';
import {
    getSubscriptionsByWallet,
    pauseSubscription,
    resumeSubscription,
    cancelSubscription,
    getPaymentHistory
} from '../controllers/portalController.js';

const router = express.Router();

// Public portal endpoints (no auth required, wallet-based)
router.get('/subscriptions/:walletAddress', getSubscriptionsByWallet);
router.post('/subscriptions/:id/pause', pauseSubscription);
router.post('/subscriptions/:id/resume', resumeSubscription);
router.post('/subscriptions/:id/cancel', cancelSubscription);
router.get('/subscriptions/:id/history', getPaymentHistory);

export default router;
