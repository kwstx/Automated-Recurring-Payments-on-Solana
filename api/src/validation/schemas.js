import Joi from 'joi';
import { solanaPublicKey, urlValidator, timestamp, positiveInteger, currency, interval, eventType } from '../middleware/validation.js';

/**
 * Auth schemas
 */
export const registerSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(8).max(100).required(),
    email: Joi.string().email().required()
});

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

/**
 * Plan schemas
 */
export const createPlanSchema = Joi.object({
    planPda: solanaPublicKey.required(),
    name: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500).optional(),
    amount: positiveInteger.required(),
    currency: currency.default('USDC'),
    interval: interval.required(),
    verifyOnChain: Joi.boolean().optional()
});

export const updatePlanSchema = Joi.object({
    planId: positiveInteger.required(),
    name: Joi.string().min(1).max(100).optional(),
    description: Joi.string().max(500).optional().allow(''),
    amount: positiveInteger.optional(),
    isActive: Joi.boolean().optional()
}).min(2); // At least planId + one field to update

/**
 * Subscription schemas
 */
export const activateSubscriptionSchema = Joi.object({
    subscriptionPda: solanaPublicKey.required(),
    planId: positiveInteger.required(),
    subscriberPubkey: solanaPublicKey.required(),
    subscriberTokenAccount: solanaPublicKey.required(),
    merchantTokenAccount: solanaPublicKey.required(),
    nextBillingTimestamp: timestamp.required(),
    transactionSignature: Joi.string().optional(),
    verifyOnChain: Joi.boolean().optional()
});

export const cancelSubscriptionSchema = Joi.object({
    subscriptionPda: solanaPublicKey.required()
});

export const pauseSubscriptionSchema = Joi.object({
    subscriptionPda: solanaPublicKey.required()
});

export const resumeSubscriptionSchema = Joi.object({
    subscriptionPda: solanaPublicKey.required()
});

export const subscriptionStatusQuerySchema = Joi.object({
    subscriptionPda: solanaPublicKey.required()
});

/**
 * Webhook schemas
 */
export const registerWebhookSchema = Joi.object({
    url: urlValidator.required(),
    events: Joi.array().items(eventType).min(1).required()
});

export const updateWebhookSchema = Joi.object({
    isActive: Joi.boolean().optional(),
    events: Joi.array().items(eventType).min(1).optional()
}).min(1);

/**
 * Metadata schemas
 */
export const planIdParamSchema = Joi.object({
    planId: positiveInteger.required()
});

export const subscriptionIdParamSchema = Joi.object({
    subscriptionId: positiveInteger.required()
});

export const webhookIdParamSchema = Joi.object({
    webhookId: positiveInteger.required()
});
