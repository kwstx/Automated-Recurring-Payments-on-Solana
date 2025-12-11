
import cron from 'node-cron';
import { Connection, PublicKey } from '@solana/web3.js';
import * as Sentry from '@sentry/node';
import db from './database.js';
import logger from './logger.js';
import { emailService } from './services/emailService.js';

// USDC Mint on Devnet (hardcoded for now as per project context)
const USDC_MINT = new PublicKey('7XSjE8CZaabDrkP3MxKqL5zJwJtiK1CSuJbHHx9dgv9k');
const LOW_BALANCE_THRESHOLD = 10; // 10 USDC

const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com', 'confirmed');

export const runBalanceCheck = async () => {
    logger.info('Starting daily balance check...');

    try {
        // Get all active subscriptions with emails
        const subscriptions = db.prepare(`
            SELECT s.id, s.subscriber_email, s.subscriber_token_account, s.subscriber_pubkey
            FROM subscriptions s
            WHERE s.is_active = 1 AND s.subscriber_email IS NOT NULL
        `).all();

        logger.info(`Checking balances for ${subscriptions.length} active subscriptions`);

        for (const sub of subscriptions) {
            try {
                // Check USDC balance of token account
                const tokenAccount = new PublicKey(sub.subscriber_token_account);
                const balanceInfo = await connection.getTokenAccountBalance(tokenAccount);

                const balance = balanceInfo.value.uiAmount;

                if (balance < LOW_BALANCE_THRESHOLD) {
                    logger.warn(`Low balance detected for subscription ${sub.id}: ${balance} USDC`);

                    await emailService.sendLowBalanceAlert(sub.subscriber_email, {
                        balance,
                        currency: 'USDC',
                        threshold: LOW_BALANCE_THRESHOLD
                    });
                }
            } catch (err) {
                logger.error(`Error checking balance for sub ${sub.id}`, { error: err.message });
                Sentry.captureException(err, {
                    tags: { scheduler: 'balance-monitor', subscriptionId: sub.id }
                });
            }

            // Rate limit slightly to avoid RPC spam
            await new Promise(r => setTimeout(r, 200));
        }

        logger.info('Daily balance check completed.');
    } catch (error) {
        logger.error('Critical error in balance monitor', { error: error.message });
        Sentry.captureException(error, { tags: { scheduler: 'balance-monitor', type: 'critical' } });
    }
};

export const startBalanceMonitor = () => {
    // Run every day at 10:00 AM
    cron.schedule('0 10 * * *', runBalanceCheck);

    logger.info('Balance monitor scheduler started');
};
