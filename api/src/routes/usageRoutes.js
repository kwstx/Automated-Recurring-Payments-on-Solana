import express from 'express';
import * as usageController from '../controllers/usageController.js';
import { verifyToken, verifyApiKey } from '../middleware/auth.js';

const router = express.Router();

// Usage reporting can be done by Frontend (authenticated user) or Backend (API Key)
// We'll create a middleware wrapper that checks either
const allowUserOrApiKey = (req, res, next) => {
    if (req.headers['x-api-key']) {
        return verifyApiKey(req, res, next);
    }
    return verifyToken(req, res, next);
};

router.post('/report', allowUserOrApiKey, usageController.reportUsage);
router.get('/:subscriptionId', allowUserOrApiKey, usageController.getUsage);

export default router;
