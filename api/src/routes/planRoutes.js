import express from 'express';
import { createPlan, updatePlan, getPlans, listPlans, getPlanSubscribers, deletePlan } from '../controllers/planController.js';
import { authenticateToken } from '../auth.js';
import { validate } from '../middleware/validation.js';
import { createPlanSchema, updatePlanSchema } from '../validation/schemas.js';

const router = express.Router();

router.post('/create', authenticateToken, validate(createPlanSchema), createPlan);
router.post('/update', authenticateToken, validate(updatePlanSchema), updatePlan);
router.get('/list', authenticateToken, getPlans);
router.get('/list-paginated', authenticateToken, listPlans);
router.get('/:id/subscribers', authenticateToken, getPlanSubscribers);
router.delete('/:id', authenticateToken, deletePlan);

export default router;

