import express from 'express';
import { activateSubscription, cancelSubscription, pauseSubscription, resumeSubscription, getSubscriptionStatus, chargeSubscription } from '../controllers/subscriptionController.js';
import { validate, validateQuery } from '../middleware/validation.js';
import { activateSubscriptionSchema, cancelSubscriptionSchema, pauseSubscriptionSchema, resumeSubscriptionSchema, subscriptionStatusQuerySchema } from '../validation/schemas.js';

import { authenticateToken } from '../auth.js';

const router = express.Router();

router.post('/activate', validate(activateSubscriptionSchema), activateSubscription); // Public (Checkout) - Verifies on-chain state
router.get('/status', validateQuery(subscriptionStatusQuerySchema), getSubscriptionStatus); // Public (Portal)

// Protected Merchant Routes
router.use(authenticateToken);
router.post('/cancel', validate(cancelSubscriptionSchema), cancelSubscription);
router.post('/pause', validate(pauseSubscriptionSchema), pauseSubscription);
router.post('/resume', validate(resumeSubscriptionSchema), resumeSubscription);
router.post('/charge', chargeSubscription);

export default router;
