import express from 'express';
import { verifyToken } from '../auth.js';
import { getNotifications } from '../controllers/notificationController.js';

const router = express.Router();

router.use(verifyToken);
router.get('/', getNotifications);

export default router;
