import express from 'express';
import { createPlan, updatePlan, getPlans } from '../controllers/planController.js';
import { authenticateToken } from '../auth.js';
import { validate } from '../middleware/validation.js';
import { createPlanSchema, updatePlanSchema } from '../validation/schemas.js';

const router = express.Router();

router.post('/create', authenticateToken, validate(createPlanSchema), createPlan);
router.post('/update', authenticateToken, validate(updatePlanSchema), updatePlan);
router.get('/list', authenticateToken, getPlans);

export default router;
