
import 'dotenv/config';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, Wallet } from '@coral-xyz/anchor';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import db from '../database.js';
import logger from '../logger.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cron from 'node-cron';
import emailService from './emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const KEYPAIR_PATH = process.env.KEYPAIR_PATH || path.join(__dirname, '../../../subscription_billing/target/deploy/subscription_billing-keypair.json');
const RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com';
const PROGRAM_ID = new PublicKey(process.env.PROGRAM_ID || '5F2mgGWf8jsJVrNYyvHx8qSTVTK9DdCd5YY77C7kK5H6');

// Load IDL
const IDL_PATH = path.join(__dirname, '../../../frontend/utils/idl.json');

// --- Core Logic ---
export async function runKeeper() {
    logger.info('🤖 Starting Keeper (Payment Processor)...');

    if (!fs.existsSync(IDL_PATH)) {
        logger.warn('⚠️ IDL not found, skipping Keeper run.');
        return;
    }
    const idl = JSON.parse(fs.readFileSync(IDL_PATH, 'utf-8'));

    // 1. Setup Connection & Wallet
    const connection = new Connection(RPC_URL, 'confirmed');
    let keypair;
    try {
        if (!fs.existsSync(KEYPAIR_PATH)) {
            // In production we might pull secret from env instead of file
            logger.warn('⚠️ Keeper Keypair not found, skipping run.');
            return;
        }
        const keypairData = JSON.parse(fs.readFileSync(KEYPAIR_PATH, 'utf-8'));
        keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));
    } catch (e) {
        logger.error('Failed to load Keeper Keypair', { error: e.message });
        return;
    }
    const wallet = new Wallet(keypair);
    const provider = new AnchorProvider(connection, wallet, { preflightCommitment: 'confirmed' });
    const program = new Program(idl, provider);

    // 2. Identify Due Subscriptions
    const now = Math.floor(Date.now() / 1000);
    const dueSubscriptions = db.prepare(`
        SELECT 
            s.id, 
            s.subscription_pda,
            s.subscriber_pubkey,
            s.subscriber_token_account,
            p.id as plan_id,
            p.plan_pda,
            p.merchant_pubkey,
            p.token_mint
        FROM subscriptions s
        JOIN plans p ON s.plan_id = p.id
        WHERE s.is_active = 1 
          AND s.next_billing_timestamp <= ?
    `).all(now);

    logger.info(`Found ${dueSubscriptions.length} subscriptions due for payment.`);

    for (const sub of dueSubscriptions) {
        logger.info(`Processing payment for Subscription ${sub.id} (${sub.subscription_pda})...`);

        try {
            // Re-derive accounts to be safe
            const tokenMint = new PublicKey(sub.token_mint);
            const merchantPubkey = new PublicKey(sub.merchant_pubkey);

            // Merchant ATA
            const merchantTokenAccount = await getAssociatedTokenAddress(tokenMint, merchantPubkey);

            // Execute Transaction
            // Note: In Mock Mode (if Program ID matches mock), this will fail on-chain but logic holds.
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

            logger.info(`✅ Payment Processed! TX: ${tx}`);

            // Send Receipt
            // Note: In real app, we'd fetch subscriber email from DB if stored (currently schema has it but we might not have populated it)
            // For demo, we fake the email or use a placeholder
            if (sub.subscriber_email) {
                await emailService.sendReceipt(
                    sub.subscriber_email,
                    sub.merchant_pubkey.toString().slice(0, 8), // simplified name
                    `Plan #${sub.plan_id}`,
                    "?", // amount we'd need to fetch from plan details or on-chain
                    "USDC",
                    tx
                );
            }

            // Note: We don't update DB manually here; we expect the Webhook or next Sync to catch the new 'next_billing_timestamp'
            // from the chain state. However, for a robust Keeper, we might want to optimistically update 'last_payment_at'.

        } catch (error) {
            logger.error(`❌ Payment Failed for Sub ${sub.id}`, { error: error.message });

            // Send Dunning Email
            if (sub.subscriber_email) {
                await emailService.sendPaymentFailed(
                    sub.subscriber_email,
                    "Merchant",
                    `Plan #${sub.plan_id}`,
                    "?",
                    "USDC",
                    error.message
                );
            }
        }
    }

    logger.info('🤖 Keeper run complete.');
}

// --- Scheduler ---
export const startKeeperScheduler = () => {
    // Run every hour: '0 * * * *'
    // For demo/testing: Run every minute '*/1 * * * *'
    cron.schedule('*/1 * * * *', async () => {
        try {
            await runKeeper();
        } catch (err) {
            logger.error('Keeper Scheduler Failed', { error: err.message });
        }
    });

    logger.info('Keeper Bot Scheduler started (Running every minute).');
};
