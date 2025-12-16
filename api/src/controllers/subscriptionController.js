import db from '../database.js';
import logger from '../logger.js';
import { emailService } from '../services/emailService.js';
import { verifySubscriptionOnChain, verifyTransaction, connection } from '../solana-client.js';
import { Keypair, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, Wallet } from '@coral-xyz/anchor';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import fs from 'fs';
import path from 'path';

// Load IDL
const idl = JSON.parse(fs.readFileSync(path.resolve('../frontend/utils/idl.json'), 'utf-8'));

// Configuration for server wallet (Keeper)
const KEYPAIR_PATH = process.env.KEYPAIR_PATH || '../subscription_billing/target/deploy/subscription_billing-keypair.json';

export const activateSubscription = async (req, res) => {
    const {
        subscriptionPda,
        planId,
        subscriberPubkey,
        subscriberTokenAccount,
        merchantTokenAccount,
        nextBillingTimestamp,
        transactionSignature,
        verifyOnChain
    } = req.body;

    if (!subscriptionPda || !planId || !subscriberPubkey || !subscriberTokenAccount || !merchantTokenAccount || !nextBillingTimestamp) {
        return res.status(400).json({
            error: 'Subscription PDA, plan ID, subscriber pubkey, token accounts, and next billing timestamp are required'
        });
    }

    try {
        // Verify plan exists
        const plan = db.prepare('SELECT * FROM plans WHERE id = ?').get(planId);

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        // Optional transaction verification
        if (transactionSignature) {
            const txVerification = await verifyTransaction(transactionSignature);
            if (!txVerification.verified) {
                return res.status(400).json({
                    error: 'Transaction verification failed',
                    reason: txVerification.reason
                });
            }
            logger.info('Transaction verified', { transactionSignature, txVerification });
        }

        // Optional on-chain verification
        if (verifyOnChain) {
            const verification = await verifySubscriptionOnChain(subscriptionPda);
            if (!verification.verified) {
                return res.status(400).json({
                    error: 'On-chain verification failed',
                    reason: verification.reason
                });
            }
            logger.info('Subscription verified on-chain before activation', { subscriptionPda, verification });
        }

        // Insert subscription
        const result = db.prepare(`
      INSERT INTO subscriptions (
        subscription_pda, plan_id, subscriber_pubkey, subscriber_token_account,
        merchant_token_account, next_billing_timestamp, is_active, status
      )
      VALUES (?, ?, ?, ?, ?, ?, 1, 'active')
    `).run(
            subscriptionPda,
            planId,
            subscriberPubkey,
            subscriberTokenAccount,
            merchantTokenAccount,
            nextBillingTimestamp
        );

        logger.info('Subscription activated', {
            subscriptionId: result.lastInsertRowid,
            subscriptionPda,
            planId
        });

        // Send Welcome Email
        try {
            const emailSettings = db.prepare(`
                SELECT ms.resend_api_key, ms.email_sender, ms.notification_new_sub
                FROM merchant_settings ms
                JOIN plans p ON p.merchant_id = ms.merchant_id
                WHERE p.id = ?
            `).get(planId);

            if (emailSettings && emailSettings.notification_new_sub) {
                // Ideally prompt for email or fetch from DB if we had it. 
                // Currently 'subscriber_email' column exists but isn't passed in body.
                // Assuming we might have it or skip for now if not passed.
                // NOTE: frontend needs to capture email.
                // For now, I'll check if req.body has email, if not, skip.
                if (req.body.email) {
                    await emailService.sendWelcomeEmail(
                        req.body.email,
                        'Merchant', // TODO: Fetch Merchant Name
                        plan.name,
                        plan.amount / Math.pow(10, plan.decimals || 6),
                        plan.currency,
                        { apiKey: emailSettings.resend_api_key, fromEmail: emailSettings.email_sender }
                    );
                }
            }
        } catch (emailErr) {
            logger.error('Failed to send welcome email', emailErr);
        }

        res.status(201).json({
            message: 'Subscription activated successfully',
            subscriptionId: result.lastInsertRowid,
            subscriptionPda
        });
    } catch (error) {
        logger.error('Activate subscription error', { error: error.message });

        if (error.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ error: 'Subscription PDA already exists' });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
};

export const cancelSubscription = (req, res) => {
    const { subscriptionPda } = req.body;

    if (!subscriptionPda) {
        return res.status(400).json({ error: 'Subscription PDA is required' });
    }

    try {
        const result = db.prepare(`
      UPDATE subscriptions
      SET is_active = 0, status = 'cancelled', updated_at = strftime('%s', 'now')
      WHERE subscription_pda = ?
    `).run(subscriptionPda);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        logger.info('Subscription cancelled', { subscriptionPda });

        res.json({ message: 'Subscription cancelled successfully' });
    } catch (error) {
        logger.error('Cancel subscription error', { error: error.message, subscriptionPda });
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const pauseSubscription = (req, res) => {
    const { subscriptionPda } = req.body;

    try {
        const result = db.prepare(`
      UPDATE subscriptions
      SET is_active = 0, status = 'paused', updated_at = strftime('%s', 'now')
      WHERE subscription_pda = ?
    `).run(subscriptionPda);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        logger.info('Subscription paused', { subscriptionPda });
        res.json({ message: 'Subscription paused successfully' });
    } catch (error) {
        logger.error('Pause subscription error', { error: error.message, subscriptionPda });
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const resumeSubscription = (req, res) => {
    const { subscriptionPda } = req.body;

    try {
        const result = db.prepare(`
      UPDATE subscriptions
      SET is_active = 1, status = 'active', updated_at = strftime('%s', 'now')
      WHERE subscription_pda = ?
    `).run(subscriptionPda);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        logger.info('Subscription resumed', { subscriptionPda });
        res.json({ message: 'Subscription resumed successfully' });
    } catch (error) {
        logger.error('Resume subscription error', { error: error.message, subscriptionPda });
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getSubscriptionStatus = (req, res) => {
    const { subscriptionPda } = req.query;

    if (!subscriptionPda) {
        return res.status(400).json({ error: 'Subscription PDA is required' });
    }

    try {
        const subscription = db.prepare(`
      SELECT 
        s.*,
        p.name as plan_name,
        p.amount as plan_amount,
        p.currency as plan_currency,
        p.interval as plan_interval
      FROM subscriptions s
      JOIN plans p ON s.plan_id = p.id
      WHERE s.subscription_pda = ?
    `).get(subscriptionPda);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        // Get recent payment logs
        const paymentLogs = db.prepare(`
      SELECT transaction_signature, status, error_message, processed_at
      FROM payment_logs
      WHERE subscription_id = ?
      ORDER BY processed_at DESC
      LIMIT 10
    `).all(subscription.id);

        res.json({
            subscription: {
                subscriptionPda: subscription.subscription_pda,
                subscriberPubkey: subscription.subscriber_pubkey,
                status: subscription.status,
                isActive: subscription.is_active === 1,
                nextBillingTimestamp: subscription.next_billing_timestamp,
                paymentCount: subscription.payment_count,
                lastPaymentAt: subscription.last_payment_at,
                plan: {
                    name: subscription.plan_name,
                    amount: subscription.plan_amount,
                    currency: subscription.plan_currency,
                    interval: subscription.plan_interval
                }
            },
            recentPayments: paymentLogs
        });
    } catch (error) {
        logger.error('Get subscription status error', { error: error.message, subscriptionPda });
        res.status(500).json({ error: 'Internal server error' });
    }
};
// NEW: Get all subscriptions for a merchant
export const getMerchantSubscriptions = (req, res) => {
    const merchantId = req.user.id;

    try {
        const subscriptions = db.prepare(`
            SELECT 
                s.id,
                s.subscription_pda,
                s.subscriber_pubkey,
                s.status,
                s.next_billing_timestamp,
                s.payment_count,
                s.created_at,
                s.last_payment_at,
                p.name as plan_name,
                p.amount as plan_amount
            FROM subscriptions s
            JOIN plans p ON s.plan_id = p.id
            WHERE p.merchant_id = ?
            ORDER BY s.created_at DESC
        `).all(merchantId);

        res.json({
            subscriptions: subscriptions.map(sub => ({
                id: sub.id,
                subscriptionPda: sub.subscription_pda,
                wallet: sub.subscriber_pubkey, // Mapped for frontend compatibility
                plan: sub.plan_name,
                amount: sub.plan_amount,
                status: sub.status,
                nextBilling: sub.next_billing_timestamp,
                paymentCount: sub.payment_count,
                createdAt: sub.created_at,
                lastPaymentAt: sub.last_payment_at
            }))
        });
    } catch (error) {
        logger.error('Get merchant subscriptions error', { error: error.message, merchantId });
        res.status(500).json({ error: 'Internal server error' });
    }
};

// NEW: Charge subscription (Keeper/Admin trigger)
export const chargeSubscription = async (req, res) => {
    const { subscriptionPda } = req.body;

    if (!subscriptionPda) {
        return res.status(400).json({ error: 'Subscription PDA is required' });
    }

    try {
        // 1. Get Subscription Details
        const sub = db.prepare(`
            SELECT 
                s.id, 
                s.subscription_pda,
                s.subscriber_token_account,
                p.plan_pda,
                p.merchant_pubkey,
                p.token_mint
            FROM subscriptions s
            JOIN plans p ON s.plan_id = p.id
            WHERE s.subscription_pda = ?
        `).get(subscriptionPda);

        if (!sub) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        // 2. Load Server Wallet
        let keypair;
        try {
            // Check if absolute or relative path
            const keypairPath = path.resolve(KEYPAIR_PATH);
            if (!fs.existsSync(keypairPath)) {
                // Return mock success if on mock chain/no wallet
                if (process.env.MOCK_CHAIN === 'true') {
                    logger.info('MOCK_CHAIN: Simulating charge success');
                    return res.json({ message: 'Charge triggered successfully (MOCK)', transactionSignature: 'mock-tx-sig' });
                }
                throw new Error(`Keypair not found at ${keypairPath}`);
            }
            const keypairData = JSON.parse(fs.readFileSync(keypairPath, 'utf-8'));
            keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));
        } catch (e) {
            logger.error('Server wallet missing', { error: e.message });
            return res.status(503).json({ error: 'Server wallet not configured for charges' });
        }

        const wallet = new Wallet(keypair);
        const provider = new AnchorProvider(connection, wallet, { preflightCommitment: 'confirmed' });
        const program = new Program(idl, provider);

        // 3. Prepare Accounts
        const tokenMint = new PublicKey(sub.token_mint);
        const merchantPubkey = new PublicKey(sub.merchant_pubkey);
        const merchantTokenAccount = await getAssociatedTokenAddress(tokenMint, merchantPubkey);

        logger.info(`Processing manual charge for ${subscriptionPda}...`);

        // 4. Execute Transaction
        // Note: For real environment, we should check if due.
        // But for "Audit" validation, we force call. Smart contract will fail if not due.

        try {
            const tx = await program.methods
                .processPayment()
                .accounts({
                    subscription: new PublicKey(sub.subscription_pda),
                    plan: new PublicKey(sub.plan_pda),
                    subscriberTokenAccount: new PublicKey(sub.subscriber_token_account),
                    merchantTokenAccount: merchantTokenAccount,
                    tokenProgram: TOKEN_PROGRAM_ID,
                })
                .rpc();

            logger.info(`Charge successful! TX: ${tx}`, { subscriptionPda });

            res.json({
                message: 'Charge triggered successfully',
                transactionSignature: tx
            });
        } catch (err) {
            // Handle specific anchor errors if needed
            throw err;
        }

    } catch (error) {
        logger.error('Charge API error', { error: error.message, subscriptionPda });

        if (error.message.includes('0x1771') || error.message.includes('PaymentNotDue')) {
            return res.status(400).json({ error: 'Payment is not due yet' });
        }

        res.status(500).json({ error: 'Charge failed: ' + error.message });
    }
};
