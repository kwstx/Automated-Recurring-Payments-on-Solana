-- Subscription Billing API Database Schema

-- Merchants table
CREATE TABLE IF NOT EXISTS merchants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_merchants_username ON merchants(username);

-- Plans table
CREATE TABLE IF NOT EXISTS plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  merchant_id INTEGER NOT NULL,
  plan_pda TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USDC',
  interval TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);

CREATE INDEX IF NOT EXISTS idx_plans_merchant ON plans(merchant_id);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subscription_pda TEXT NOT NULL UNIQUE,
  plan_id INTEGER NOT NULL,
  subscriber_pubkey TEXT NOT NULL,
  subscriber_token_account TEXT NOT NULL,
  merchant_token_account TEXT NOT NULL,
  next_billing_timestamp INTEGER NOT NULL,
  is_active INTEGER DEFAULT 1,
  status TEXT DEFAULT 'active',
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  last_payment_at INTEGER,
  payment_count INTEGER DEFAULT 0,
  retry_count INTEGER DEFAULT 0,
  FOREIGN KEY (plan_id) REFERENCES plans(id)
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_plan ON subscriptions(plan_id);
CREATE INDEX IF NOT EXISTS idx_active_billing ON subscriptions(is_active, next_billing_timestamp);

-- Payment logs table
CREATE TABLE IF NOT EXISTS payment_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subscription_id INTEGER NOT NULL,
  transaction_signature TEXT,
  status TEXT NOT NULL,
  error_message TEXT,
  processed_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
);

CREATE INDEX IF NOT EXISTS idx_payment_logs_subscription ON payment_logs(subscription_id);

-- Plan metadata table (stores on-chain data)
CREATE TABLE IF NOT EXISTS plan_metadata (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  plan_id INTEGER NOT NULL UNIQUE,
  plan_pda TEXT NOT NULL,
  on_chain_merchant TEXT,
  on_chain_name TEXT,
  on_chain_amount INTEGER,
  on_chain_interval INTEGER,
  on_chain_is_active INTEGER,
  last_synced_at INTEGER DEFAULT (strftime('%s', 'now')),
  sync_status TEXT DEFAULT 'pending',
  FOREIGN KEY (plan_id) REFERENCES plans(id)
);

CREATE INDEX IF NOT EXISTS idx_plan_metadata_plan ON plan_metadata(plan_id);
CREATE INDEX IF NOT EXISTS idx_plan_metadata_sync ON plan_metadata(sync_status);

-- Subscription metadata table (stores on-chain data)
CREATE TABLE IF NOT EXISTS subscription_metadata (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subscription_id INTEGER NOT NULL UNIQUE,
  subscription_pda TEXT NOT NULL,
  on_chain_subscriber TEXT,
  on_chain_plan TEXT,
  on_chain_next_billing INTEGER,
  on_chain_is_active INTEGER,
  on_chain_payment_count INTEGER,
  last_synced_at INTEGER DEFAULT (strftime('%s', 'now')),
  sync_status TEXT DEFAULT 'pending',
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
);

CREATE INDEX IF NOT EXISTS idx_subscription_metadata_subscription ON subscription_metadata(subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscription_metadata_sync ON subscription_metadata(sync_status);

-- Webhook endpoints table
CREATE TABLE IF NOT EXISTS webhook_endpoints (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  merchant_id INTEGER NOT NULL,
  url TEXT NOT NULL,
  events TEXT NOT NULL,
  secret TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);

CREATE INDEX IF NOT EXISTS idx_webhook_endpoints_merchant ON webhook_endpoints(merchant_id);
CREATE INDEX IF NOT EXISTS idx_webhook_endpoints_active ON webhook_endpoints(is_active);

-- Webhook delivery logs table
CREATE TABLE IF NOT EXISTS webhook_deliveries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  webhook_endpoint_id INTEGER NOT NULL,
  event_type TEXT NOT NULL,
  payload TEXT NOT NULL,
  status TEXT NOT NULL,
  response_status_code INTEGER,
  response_body TEXT,
  error_message TEXT,
  attempt_count INTEGER DEFAULT 1,
  next_retry_at INTEGER,
  delivered_at INTEGER,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (webhook_endpoint_id) REFERENCES webhook_endpoints(id)
);

CREATE INDEX IF NOT EXISTS idx_webhook_deliveries_endpoint ON webhook_deliveries(webhook_endpoint_id);
CREATE INDEX IF NOT EXISTS idx_webhook_deliveries_status ON webhook_deliveries(status);
CREATE INDEX IF NOT EXISTS idx_webhook_deliveries_retry ON webhook_deliveries(next_retry_at) WHERE status = 'pending';


