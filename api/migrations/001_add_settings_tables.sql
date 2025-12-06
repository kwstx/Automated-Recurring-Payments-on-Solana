-- Migration: Add API Keys and Merchant Settings tables
-- Run this after the main schema.sql

-- API Keys table for merchant API key management
CREATE TABLE IF NOT EXISTS api_keys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  merchant_id INTEGER NOT NULL,
  key_hash TEXT NOT NULL,
  key_prefix TEXT NOT NULL,
  name TEXT,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  last_used_at INTEGER,
  is_active INTEGER DEFAULT 1,
  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);

CREATE INDEX IF NOT EXISTS idx_api_keys_merchant ON api_keys(merchant_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_active ON api_keys(is_active);

-- Merchant settings table for company details and preferences
CREATE TABLE IF NOT EXISTS merchant_settings (
  merchant_id INTEGER PRIMARY KEY,
  company_name TEXT,
  company_website TEXT,
  support_email TEXT,
  brand_color TEXT DEFAULT '#6366F1',
  logo_url TEXT,
  notification_new_sub INTEGER DEFAULT 1,
  notification_payment_failed INTEGER DEFAULT 1,
  notification_weekly_summary INTEGER DEFAULT 1,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);
