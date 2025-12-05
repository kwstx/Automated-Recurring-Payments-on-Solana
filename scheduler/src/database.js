import Database from 'better-sqlite3';
import config from './config.js';
import logger from './logger.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SubscriptionDatabase {
    constructor() {
        this.db = new Database(config.database.path);
        this.db.pragma('journal_mode = WAL');
        this.initializeSchema();
    }

    initializeSchema() {
        const schemaPath = path.join(__dirname, '..', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        this.db.exec(schema);
        logger.info('Database schema initialized');
    }

    getDueSubscriptions() {
        const now = Math.floor(Date.now() / 1000);
        const stmt = this.db.prepare(`
      SELECT * FROM subscriptions
      WHERE status = 'active' AND next_billing_timestamp <= ?
      ORDER BY next_billing_timestamp ASC
    `);
        return stmt.all(now);
    }

    updateSubscriptionAfterPayment(subscriptionId, nextBillingTimestamp, transactionSignature) {
        const now = Math.floor(Date.now() / 1000);
        const stmt = this.db.prepare(`
      UPDATE subscriptions
      SET next_billing_timestamp = ?,
          last_payment_at = ?,
          payment_count = payment_count + 1,
          retry_count = 0,
          updated_at = ?
      WHERE id = ?
    `);
        stmt.run(nextBillingTimestamp, now, now, subscriptionId);
    }

    updateSubscriptionRetry(subscriptionId, nextRetryTimestamp) {
        const now = Math.floor(Date.now() / 1000);
        const stmt = this.db.prepare(`
      UPDATE subscriptions
      SET next_billing_timestamp = ?,
          retry_count = retry_count + 1,
          updated_at = ?
      WHERE id = ?
    `);
        stmt.run(nextRetryTimestamp, now, subscriptionId);
    }

    cancelSubscription(subscriptionId) {
        const now = Math.floor(Date.now() / 1000);
        const stmt = this.db.prepare(`
      UPDATE subscriptions
      SET status = 'canceled', updated_at = ?
      WHERE id = ?
    `);
        stmt.run(now, subscriptionId);
    }

    markSubscriptionFailed(subscriptionId) {
        const now = Math.floor(Date.now() / 1000);
        const stmt = this.db.prepare(`
      UPDATE subscriptions
      SET status = 'failed', updated_at = ?
      WHERE id = ?
    `);
        stmt.run(now, subscriptionId);
    }

    logPayment(subscriptionId, status, transactionSignature = null, errorMessage = null) {
        const stmt = this.db.prepare(`
      INSERT INTO payment_logs (subscription_id, transaction_signature, status, error_message)
      VALUES (?, ?, ?, ?)
    `);
        stmt.run(subscriptionId, transactionSignature, status, errorMessage);
    }

    addSubscription(subscription) {
        const stmt = this.db.prepare(`
      INSERT INTO subscriptions (
        subscription_pda, subscriber_pubkey, plan_pda,
        subscriber_token_account, merchant_token_account,
        next_billing_timestamp
      ) VALUES (?, ?, ?, ?, ?, ?)
    `);
        return stmt.run(
            subscription.subscriptionPda,
            subscription.subscriberPubkey,
            subscription.planPda,
            subscription.subscriberTokenAccount,
            subscription.merchantTokenAccount,
            subscription.nextBillingTimestamp
        );
    }

    close() {
        this.db.close();
    }
}

export default SubscriptionDatabase;
