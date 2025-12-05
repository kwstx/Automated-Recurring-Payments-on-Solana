-- Subscription Payment Scheduler Database Schema

CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subscription_pda TEXT NOT NULL UNIQUE,
  subscriber_pubkey TEXT NOT NULL,
  plan_pda TEXT NOT NULL,
  subscriber_token_account TEXT NOT NULL,
  merchant_token_account TEXT NOT NULL,
  next_billing_timestamp INTEGER NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  last_payment_at INTEGER,
  payment_count INTEGER DEFAULT 0,
  retry_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active'
);

CREATE INDEX IF NOT EXISTS idx_active_billing 
ON subscriptions(is_active, next_billing_timestamp);

CREATE TABLE IF NOT EXISTS payment_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subscription_id INTEGER NOT NULL,
  transaction_signature TEXT,
  status TEXT NOT NULL,
  error_message TEXT,
  processed_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
);

CREATE INDEX IF NOT EXISTS idx_payment_logs_subscription 
ON payment_logs(subscription_id);
