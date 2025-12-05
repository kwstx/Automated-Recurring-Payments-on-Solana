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

    jwt.verify(token, getJWTSecret(), (err, user) => {
        if (err) {
            logger.warn('Invalid token attempt', { error: err.message });
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        req.user = user;
        next();
    });
};

export const generateToken = (payload) => {
    return jwt.sign(payload, getJWTSecret(), { expiresIn: '24h' });
};
