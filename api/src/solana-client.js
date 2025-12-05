import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import logger from './logger.js';

// Solana configuration
const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com';
const PROGRAM_ID = process.env.PROGRAM_ID;

// Create Solana connection
export const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

// Program instance (will be initialized when needed)
let programInstance = null;

export const initializeProgram = (idl) => {
    if (!PROGRAM_ID) {
        logger.warn('PROGRAM_ID not set, Solana integration disabled');
        return null;
    }

    try {
        const programId = new PublicKey(PROGRAM_ID);
        // Note: For API server, we don't have a wallet, so we'll create a read-only provider
        // For write operations, we'll need the merchant's wallet
        programInstance = new Program(idl, programId, { connection });
        logger.info('Anchor program initialized', { programId: PROGRAM_ID });
        return programInstance;
    } catch (error) {
        logger.error('Failed to initialize Anchor program', { error: error.message });
        return null;
    }
};

export const getProgram = () => programInstance;

/**
 * Verify a plan exists on-chain
 */
export const verifyPlanOnChain = async (planPda) => {
    if (!programInstance) {
        logger.warn('Program not initialized, skipping on-chain verification');
        return { verified: false, reason: 'Program not initialized' };
    }

    try {
        const planPublicKey = new PublicKey(planPda);
        const planAccount = await programInstance.account.plan.fetch(planPublicKey);

        logger.info('Plan verified on-chain', { planPda, planAccount });
        return {
            verified: true,
            data: {
                merchant: planAccount.merchant.toBase58(),
                name: planAccount.name,
                amount: planAccount.amount.toString(),
                interval: planAccount.interval.toString(),
                isActive: planAccount.isActive
            }
        };
    } catch (error) {
        logger.error('Failed to verify plan on-chain', { planPda, error: error.message });
        return { verified: false, reason: error.message };
    }
};

/**
 * Verify a subscription exists on-chain
 */
export const verifySubscriptionOnChain = async (subscriptionPda) => {
    if (!programInstance) {
        logger.warn('Program not initialized, skipping on-chain verification');
        return { verified: false, reason: 'Program not initialized' };
    }

    try {
        const subscriptionPublicKey = new PublicKey(subscriptionPda);
        const subscriptionAccount = await programInstance.account.subscription.fetch(subscriptionPublicKey);

        logger.info('Subscription verified on-chain', { subscriptionPda, subscriptionAccount });
        return {
            verified: true,
            data: {
                subscriber: subscriptionAccount.subscriber.toBase58(),
                plan: subscriptionAccount.plan.toBase58(),
                nextBillingTimestamp: subscriptionAccount.nextBillingTimestamp.toString(),
                isActive: subscriptionAccount.isActive,
                paymentCount: subscriptionAccount.paymentCount.toString()
            }
        };
    } catch (error) {
        logger.error('Failed to verify subscription on-chain', { subscriptionPda, error: error.message });
        return { verified: false, reason: error.message };
    }
};

/**
 * Verify a transaction signature
 */
export const verifyTransaction = async (signature) => {
    try {
        const tx = await connection.getTransaction(signature, {
            commitment: 'confirmed',
            maxSupportedTransactionVersion: 0
        });

        if (!tx) {
            return { verified: false, reason: 'Transaction not found' };
        }

        logger.info('Transaction verified', { signature, slot: tx.slot });
        return {
            verified: true,
            data: {
                slot: tx.slot,
                blockTime: tx.blockTime,
                meta: {
                    err: tx.meta.err,
                    fee: tx.meta.fee
                }
            }
        };
    } catch (error) {
        logger.error('Failed to verify transaction', { signature, error: error.message });
        return { verified: false, reason: error.message };
    }
};
