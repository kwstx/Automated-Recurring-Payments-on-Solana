import bcrypt from 'bcrypt';
import db from '../database.js';
import { generateToken } from '../auth.js';
import logger from '../logger.js';

export const register = (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Username, password, and email are required' });
    }

    try {
        // Check if username already exists
        const existing = db.prepare('SELECT id FROM merchants WHERE username = ?').get(username);
        if (existing) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        // Hash password
        const passwordHash = bcrypt.hashSync(password, 10);

        // Insert merchant
        // Note: wallet_address is NOT NULL in schema, so we insert a placeholder initially
        const result = db.prepare(`
      INSERT INTO merchants (username, password_hash, email, wallet_address)
      VALUES (?, ?, ?, ?)
    `).run(username, passwordHash, email, 'Pending_Setup');

        // Generate token
        const token = generateToken({
            id: result.lastInsertRowid,
            username: username,
            walletAddress: 'Pending_Setup'
        });

        logger.info('Merchant registered', { merchantId: result.lastInsertRowid, username });

        res.status(201).json({
            message: 'Merchant registered successfully',
            token,
            merchant: {
                id: result.lastInsertRowid,
                username,
                walletAddress: 'Pending_Setup',
                tier: 'starter'
            }
        });
    } catch (error) {
        logger.error('Registration error', { error: error.message });
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Get merchant
        const merchant = db.prepare('SELECT * FROM merchants WHERE username = ?').get(username);

        if (!merchant) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const validPassword = bcrypt.compareSync(password, merchant.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken({
            id: merchant.id,
            username: merchant.username,
            walletAddress: merchant.wallet_address
        });

        logger.info('Merchant logged in', { merchantId: merchant.id, username });

        res.json({
            token,
            merchant: {
                id: merchant.id,
                username: merchant.username,
                walletAddress: merchant.wallet_address,
                tier: merchant.tier || 'starter'
            }
        });
    } catch (error) {
        logger.error('Login error', { error: error.message });
        res.status(500).json({ error: 'Internal server error' });
    }
};
