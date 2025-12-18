import express from 'express';
import * as planController from '../controllers/planController.js';
import { verifyToken } from '../auth.js';
import { validator } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/public/:planPda', planController.getPublicPlan);

// Protected routes (apply verifyToken middleware)
router.use(verifyToken);

router.post('/create', validator.createPlan, planController.createPlan);
router.post('/update', validator.updatePlan, planController.updatePlan);
router.get('/list', planController.getPlans);
router.get('/list-paginated', planController.listPlans);
router.get('/:id/subscribers', planController.getPlanSubscribers);
router.delete('/:id', planController.deletePlan);

export default router;
