import express from 'express';
import { activateSubscription, cancelSubscription, pauseSubscription, resumeSubscription, getSubscriptionStatus } from '../controllers/subscriptionController.js';
import { validate, validateQuery } from '../middleware/validation.js';
import { activateSubscriptionSchema, cancelSubscriptionSchema, pauseSubscriptionSchema, resumeSubscriptionSchema, subscriptionStatusQuerySchema } from '../validation/schemas.js';

const router = express.Router();

router.post('/activate', validate(activateSubscriptionSchema), activateSubscription);
router.post('/cancel', validate(cancelSubscriptionSchema), cancelSubscription);
router.post('/pause', validate(pauseSubscriptionSchema), pauseSubscription);
router.post('/resume', validate(resumeSubscriptionSchema), resumeSubscription);
router.get('/status', validateQuery(subscriptionStatusQuerySchema), getSubscriptionStatus);

export default router;
