import express from 'express';
import * as planController from '../controllers/planController.js';
import { verifyToken } from '../auth.js';
import { validate } from '../middleware/validation.js';
import { createPlanSchema, updatePlanSchema } from '../validation/schemas.js';

const router = express.Router();

// Public routes
router.get('/public/:planPda', planController.getPublicPlan);

// Protected routes (apply verifyToken middleware)
router.use(verifyToken);

router.post('/', validate(createPlanSchema), planController.createPlan); // Note: Original might have been /create, but RESTful is POST /
// Check original: it was /create. I should stick to original paths or update frontend. 
// Standard in this project seems to vary. Let's check other routes or just keep /create to be safe.
// Wait, index.js mounts it on /plan. 
// The file I saw before had router.post('/create'...).
// I will keep the explicit paths to match frontend expectations.

router.post('/create', validate(createPlanSchema), planController.createPlan);
router.post('/update', validate(updatePlanSchema), planController.updatePlan);
router.get('/list', planController.getPlans);
router.get('/list-paginated', planController.listPlans);
router.get('/:id/subscribers', planController.getPlanSubscribers);
router.delete('/:id', planController.deletePlan);

export default router;
