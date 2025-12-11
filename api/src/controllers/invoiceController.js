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
