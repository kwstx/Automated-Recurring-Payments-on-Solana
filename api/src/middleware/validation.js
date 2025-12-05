import Joi from 'joi';

/**
 * Validation middleware factory
 */
export const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({
                error: 'Validation failed',
                details: errors
            });
        }

        req.body = value;
        next();
    };
};

/**
 * Query parameter validation
 */
export const validateQuery = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.query, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({
                error: 'Validation failed',
                details: errors
            });
        }

        req.query = value;
        next();
    };
};

/**
 * Custom validators
 */

// Solana public key validator
export const solanaPublicKey = Joi.string().length(44).pattern(/^[1-9A-HJ-NP-Za-km-z]{44}$/);

// URL validator
export const urlValidator = Joi.string().uri({ scheme: ['http', 'https'] });

// Timestamp validator (Unix timestamp)
export const timestamp = Joi.number().integer().positive();

// Positive integer
export const positiveInteger = Joi.number().integer().positive();

// Currency code
export const currency = Joi.string().valid('USDC', 'SOL', 'USDT');

// Interval validator
export const interval = Joi.string().valid('daily', 'weekly', 'monthly', 'yearly');

// Event type validator
export const eventType = Joi.string().valid('payment.success', 'payment.failure', 'subscription.renewal', '*');
