import express from 'express';
import {
    getCompanyDetails,
    updateCompanyDetails,
    listAPIKeys,
    generateAPIKey,
    revokeAPIKey,
    getNotificationPreferences,
    getNotificationPreferences,
    updateNotificationPreferences,
    updateTier
} from '../controllers/settingsController.js';
import { authenticateToken } from '../auth.js';

const router = express.Router();

// All settings routes require authentication
router.get('/company', authenticateToken, getCompanyDetails);
router.put('/company', authenticateToken, updateCompanyDetails);

router.get('/api-keys', authenticateToken, listAPIKeys);
router.post('/api-keys/generate', authenticateToken, generateAPIKey);
router.delete('/api-keys/:id', authenticateToken, revokeAPIKey);

router.get('/notifications', authenticateToken, getNotificationPreferences);
router.put('/notifications', authenticateToken, updateNotificationPreferences);
router.put('/tier', authenticateToken, updateTier);

export default router;
