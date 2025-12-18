import Joi from 'joi';

const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
        .min(10)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .message('Password must be at least 10 characters long and contain at least one lowercase letter, one uppercase letter, and one number')
        .required(),
    email: Joi.string().email().required()
});

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

export const createPlanSchema = Joi.object({
    planPda: Joi.string().required(),
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(200).allow(null, ''),
    amount: Joi.number().positive().required(),
    interval: Joi.number().integer().positive().required(),
    currency: Joi.string().length(3).uppercase().optional(),
    currencyMint: Joi.string().optional(),
    decimals: Joi.number().integer().min(0).max(18).optional(),
    verifyOnChain: Joi.boolean().optional()
});

export const updatePlanSchema = Joi.object({
    planId: Joi.number().integer().positive().required(),
    name: Joi.string().min(3).max(50).optional(),
    description: Joi.string().max(200).allow(null, '').optional(),
    amount: Joi.number().positive().optional(),
    isActive: Joi.boolean().optional()
});

export const validator = {
    register: validateRequest(registerSchema),
    login: validateRequest(loginSchema),
    createPlan: validateRequest(createPlanSchema),
    updatePlan: validateRequest(updatePlanSchema)
};
