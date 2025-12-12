import db from '../database.js';
import logger from '../logger.js';

/**
 * List all invoices for a merchant
 */
export const listInvoices = (req, res) => {
    const merchantId = req.user.id;
    const { status } = req.query;

    try {
        let query = `
      SELECT * FROM invoices
      WHERE merchant_id = ?
    `;
        const params = [merchantId];

        if (status) {
            query += ` AND status = ?`;
            params.push(status);
        }

        query += ` ORDER BY created_at DESC`;

        const invoices = db.prepare(query).all(...params);
        res.json({ invoices });
    } catch (error) {
        logger.error('List invoices error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Create a new invoice
 */
export const createInvoice = (req, res) => {
    const merchantId = req.user.id;
    const { customerEmail, customerName, amount, currency, dueDate, description, invoiceNumber } = req.body;

    if (!amount) {
        return res.status(400).json({ error: 'Amount is required' });
    }

    try {
        const result = db.prepare(`
      INSERT INTO invoices (
        merchant_id, customer_email, customer_name, amount, 
        currency, due_date, description, invoice_number, status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'draft')
    `).run(
            merchantId,
            customerEmail,
            customerName,
            amount,
            currency || 'USDC',
            dueDate,
            description,
            invoiceNumber
        );

        const newInvoice = db.prepare('SELECT * FROM invoices WHERE id = ?').get(result.lastInsertRowid);

        logger.info('Invoice created', { invoiceId: newInvoice.id, merchantId });
        res.status(201).json({ invoice: newInvoice });
    } catch (error) {
        logger.error('Create invoice error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get single invoice
 */
export const getInvoice = (req, res) => {
    const { id } = req.params;
    const merchantId = req.user.id;

    try {
        const invoice = db.prepare(`
      SELECT * FROM invoices WHERE id = ? AND merchant_id = ?
    `).get(id, merchantId);

        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        res.json({ invoice });
    } catch (error) {
        logger.error('Get invoice error', { error: error.message, id });
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Generate PDF for invoice
 */
import PDFDocument from 'pdfkit';

export const downloadInvoicePdf = (req, res) => {
    const { id } = req.params;
    const merchantId = req.user.id;

    try {
        const invoice = db.prepare(`
            SELECT i.*, m.username as merchant_name, m.email as merchant_email
            FROM invoices i
            JOIN merchants m ON i.merchant_id = m.id
            WHERE i.id = ? AND i.merchant_id = ?
        `).get(id, merchantId);

        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoice_number || invoice.id}.pdf`);

        doc.pipe(res);

        // Header
        doc.fontSize(25).text('INVOICE', 100, 50);

        // Merchant Details
        doc.fontSize(10).text(invoice.merchant_name, 100, 100);
        doc.text(invoice.merchant_email, 100, 115);

        // Customer Details
        doc.text(`Bill To:`, 400, 100);
        doc.text(invoice.customer_name || 'N/A', 400, 115);
        doc.text(invoice.customer_email || 'N/A', 400, 130);

        // Invoice Meta
        doc.text(`Invoice #: ${invoice.invoice_number || invoice.id}`, 100, 150);
        doc.text(`DateT: ${new Date(invoice.created_at * 1000).toLocaleDateString()}`, 100, 165);
        doc.text(`Due Date: ${invoice.due_date ? new Date(invoice.due_date * 1000).toLocaleDateString() : 'Upon Receipt'}`, 100, 180);

        // Line Items (Simple)
        doc.moveDown();
        doc.text('Description', 100, 250, { width: 300 });
        doc.text('Amount', 400, 250, { width: 100, align: 'right' });

        doc.moveTo(100, 265).lineTo(500, 265).stroke();

        doc.moveDown();
        doc.text(invoice.description || 'Subscription Charge', 100, 280, { width: 300 });

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: invoice.currency || 'USD', // Simplified
        });

        // Assuming amount is in cents/atomic units, divide by 100 (naive assumption for now, should check decimals)
        // Since we store atomic units for crypto, likely 6 decimals for USDC.
        // Let's assume 6 decimals for USDC standard.
        const decimals = 6;
        const displayAmount = (invoice.amount / Math.pow(10, decimals)).toFixed(2);

        doc.text(displayAmount, 400, 280, { width: 100, align: 'right' });

        // Total
        doc.moveDown();
        doc.font('Helvetica-Bold').text(`Total: ${displayAmount} ${invoice.currency}`, 400, 320, { align: 'right' });

        doc.end();

    } catch (error) {
        logger.error('Generate PDF error', { error: error.message, id });
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

