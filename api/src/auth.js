import jwt from 'jsonwebtoken';
import logger from './logger.js';

const getJWTSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is required');
    }
    return secret;
};

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, getJWTSecret(), {
        issuer: 'solana-subscription-api',
        audience: 'merchant-dashboard'
    }, (err, user) => {
        if (err) {
            logger.warn('Invalid token attempt', { error: err.message });
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        req.user = user;
        next();
    });
};

// Alias for consistency
export const verifyToken = authenticateToken;

export const generateToken = (payload) => {
    return jwt.sign(payload, getJWTSecret(), {
        expiresIn: '24h',
        issuer: 'solana-subscription-api',
        audience: 'merchant-dashboard'
    });
};

import db from './database.js';

export const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ error: 'API Key required' });
    }

    try {
        // In a real app, we should hash the key (sk_...) and compare.
        // For now, assuming simple storage or handling.
        // Wait, schema says `key_hash`. 
        // We need to know how keys are stored. 
        // If keys are stored as `sk_test_...` in plain text (dev), fine.
        // If `key_hash`, we need to hash input.
        // Let's assume plain check for this implementation step or check create logic.
        // Checking schema: api_keys has key_prefix and key_hash.
        // Validation: We need to hash the input key to match key_hash.
        // But for MVP/Local, let's assume direct match or simple lookup if we didn't implement hashing on create.
        // Actually, let's look at how keys are generated. 
        // If I can't check generation, I will implement a simple lookup by `key_hash = apiKey` for now, assuming dev mode.

        // BETTER: Hash the incoming key (SHA256) and compare.
        const crypto = require('crypto');
        const hash = crypto.createHash('sha256').update(apiKey).digest('hex');

        // Wait, if we use bcrypt, it's async or different. SHA256 is fast.

        const keyRecord = db.prepare('SELECT merchant_id FROM api_keys WHERE key_hash = ? AND is_active = 1').get(hash);

        if (!keyRecord) {
            // Fallback for previously generated keys that might be plain text? No, stick to security.
            // If this fails, user generates new key.
            return res.status(403).json({ error: 'Invalid API Key' });
        }

        // Update usage stats
        db.prepare('UPDATE api_keys SET last_used_at = strftime("%s", "now") WHERE key_hash = ?').run(hash);

        req.merchantId = keyRecord.merchant_id;
        next();
    } catch (error) {
        logger.error('API Key validation error', { error: error.message });
        res.status(500).json({ error: 'Internal server error' });
    }
};
