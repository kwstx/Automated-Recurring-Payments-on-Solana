import express from 'express';
import * as invoiceController from '../controllers/invoiceController.js';

const router = express.Router();

// All routes here should be protected by apiLimiter and verifyToken in index.js
// We already have generic middlewares applied at app level for /invoices? No.
// We need to check if auth middleware is applied in index.js or if we need it here.

// I will import verifyToken here to be safe and explicit.
import { verifyToken } from '../auth.js';

router.use(verifyToken);

router.post('/', invoiceController.createInvoice);
router.get('/', invoiceController.listInvoices);
router.get('/:id', invoiceController.getInvoice);
router.get('/:id/pdf', invoiceController.downloadInvoicePdf);

export default router;
