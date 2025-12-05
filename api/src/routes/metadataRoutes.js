import express from 'express';
import {
    syncPlan,
    syncSubscription,
    getPlanWithMetadata,
    getSubscriptionWithMetadata,
    syncAllMerchantPlans
} from '../controllers/metadataController.js';
import { authenticateToken } from '../auth.js';

const router = express.Router();

// Sync endpoints
router.post('/plan/:planId/sync', authenticateToken, syncPlan);
router.post('/subscription/:subscriptionId/sync', syncSubscription);
router.post('/plans/sync-all', authenticateToken, syncAllMerchantPlans);

// Get with metadata endpoints
router.get('/plan/:planId', authenticateToken, getPlanWithMetadata);
router.get('/subscription/:subscriptionId', getSubscriptionWithMetadata);

export default router;
