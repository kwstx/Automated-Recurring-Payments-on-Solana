import express from 'express';
import { verifyToken } from '../auth.js';
import { getAuditLogs } from '../controllers/auditController.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', getAuditLogs);

export default router;
