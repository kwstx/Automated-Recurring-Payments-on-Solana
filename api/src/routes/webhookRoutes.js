import express from 'express';
import {
    registerWebhook,
    listWebhooks,
    deleteWebhook,
    updateWebhook,
    getWebhookDeliveries
} from '../controllers/webhookController.js';
import { authenticateToken } from '../auth.js';
import { validate } from '../middleware/validation.js';
import { registerWebhookSchema, updateWebhookSchema } from '../validation/schemas.js';

const router = express.Router();

// Webhook CRUD operations
router.post('/register', authenticateToken, validate(registerWebhookSchema), registerWebhook);
router.get('/list', authenticateToken, listWebhooks);
router.delete('/:webhookId', authenticateToken, deleteWebhook);
router.patch('/:webhookId', authenticateToken, validate(updateWebhookSchema), updateWebhook);

// Webhook deliveries
router.get('/:webhookId/deliveries', authenticateToken, getWebhookDeliveries);

export default router;
