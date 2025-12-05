import express from 'express';
import { activateSubscription, cancelSubscription, getSubscriptionStatus } from '../controllers/subscriptionController.js';
import { validate, validateQuery } from '../middleware/validation.js';
import { activateSubscriptionSchema, cancelSubscriptionSchema, subscriptionStatusQuerySchema } from '../validation/schemas.js';

const router = express.Router();

router.post('/activate', validate(activateSubscriptionSchema), activateSubscription);
router.post('/cancel', validate(cancelSubscriptionSchema), cancelSubscription);
router.get('/status', validateQuery(subscriptionStatusQuerySchema), getSubscriptionStatus);

export default router;
