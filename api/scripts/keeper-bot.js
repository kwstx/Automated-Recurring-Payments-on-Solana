
import 'dotenv/config';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, Wallet } from '@coral-xyz/anchor';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import db from '../src/database.js';
import logger from '../src/logger.js';
import fs from 'fs';

// Configuration
// In production, this Keypair calls the 'process_payment' instruction.
// It receives a reward (if implemented) or just pays gas.
// Using the deployer keypair for now as the "Keeper".
const KEYPAIR_PATH = process.env.KEYPAIR_PATH || '../subscription_billing/target/deploy/subscription_billing-keypair.json';
const RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com';
const PROGRAM_ID = new PublicKey(process.env.PROGRAM_ID || '5F2mgGWf8jsJVrNYyvHx8qSTVTK9DdCd5YY77C7kK5H6');

// Load IDL
const idl = JSON.parse(fs.readFileSync('../frontend/utils/idl.json', 'utf-8'));

async function runKeeper() {
    logger.info('🤖 Starting Keeper Bot...');

    // 1. Setup Connection & Wallet
    const connection = new Connection(RPC_URL, 'confirmed');
    let keypair;
    try {
        const keypairData = JSON.parse(fs.readFileSync(KEYPAIR_PATH, 'utf-8'));
        keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));
    } catch (e) {
        logger.error('Failed to load Keeper Keypair', { error: e.message });
        process.exit(1);
    }
    const wallet = new Wallet(keypair);
    const provider = new AnchorProvider(connection, wallet, { preflightCommitment: 'confirmed' });
    const program = new Program(idl, provider); // idl as any? Anchor JS handles generic JSON usually

    // 2. Identify Due Subscriptions
    // We look for subscriptions where next_billing_timestamp <= NOW
    // AND status is 'active'
    const now = Math.floor(Date.now() / 1000);
    const dueSubscriptions = db.prepare(`
        SELECT 
            s.id, 
            s.subscription_pda,
            s.subscriber_pubkey,
            s.subscriber_token_account,
            p.id as plan_id,
            p.plan_pda,
            p.merchant_pubkey, /* We need this for Merchant Token Account derivation */
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
            const tx = await program.methods
                .processPayment()
                .accounts({
                    subscription: new PublicKey(sub.subscription_pda),
                    plan: new PublicKey(sub.plan_pda),
                    subscriberTokenAccount: new PublicKey(sub.subscriber_token_account),
                    merchantTokenAccount: merchantTokenAccount, // Derived
                    tokenProgram: TOKEN_PROGRAM_ID,
                })
                .rpc();

            logger.info(`✅ Payment Processed! TX: ${tx}`);

            // Update DB (Local state update - ideally we wait for webhook/event, but Keeper assumes success)
            // We increment payment_count and next_billing_timestamp based on plan interval
            // Actually, the Smart Contract updates the on-chain state.
            // The Backend should sync from Chain (or we assume optimistically).

            // For now, we log it. A separate "Syncer" process should update the DB.

        } catch (error) {
            logger.error(`❌ Payment Failed for Sub ${sub.id}`, { error: error.message });
            // TODO: Implement retry logic or mark as 'failed_payment' in DB
        }
    }

    logger.info('🤖 Keeper run complete.');
}

// Execute
runKeeper().catch(console.error);
