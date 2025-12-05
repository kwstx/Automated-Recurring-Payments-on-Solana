# Subscription Payment Scheduler

Automated scheduler for processing Solana subscription payments on-chain.

## Features

- ✅ Runs every X minutes (configurable)
- ✅ Queries active subscriptions from SQLite database
- ✅ Processes payments for subscriptions where `next_billing_timestamp <= now`
- ✅ Calls on-chain `process_payment` instruction
- ✅ Updates database after successful payments
- ✅ Comprehensive error handling and logging
- ✅ Graceful shutdown handling

## Setup

### 1. Install Dependencies

```bash
cd scheduler
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Edit `.env`:
- `SOLANA_RPC_URL`: Your Solana RPC endpoint
- `SOLANA_PROGRAM_ID`: Your deployed program ID (already set to devnet deployment)
- `SOLANA_PAYER_KEYPAIR_PATH`: Path to your wallet keypair
- `SCHEDULER_INTERVAL_MINUTES`: How often to check for due payments (default: 5)

### 3. Initialize Database

```bash
npm run init-db
```

This creates the SQLite database with the schema and adds a test subscription.

### 4. Start Scheduler

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Database Schema

### Subscriptions Table
- `id`: Primary key
- `subscription_pda`: On-chain subscription account address
- `subscriber_pubkey`: Subscriber's wallet address
- `plan_pda`: On-chain plan account address
- `subscriber_token_account`: Subscriber's token account
- `merchant_token_account`: Merchant's token account
- `next_billing_timestamp`: Unix timestamp for next payment
- `is_active`: Boolean flag
- `payment_count`: Number of successful payments
- `last_payment_at`: Timestamp of last payment

### Payment Logs Table
- Tracks all payment attempts with status and transaction signatures

## Adding Subscriptions

You can add subscriptions programmatically:

```javascript
import SubscriptionDatabase from './src/database.js';

const db = new SubscriptionDatabase();
db.addSubscription({
  subscriptionPda: 'YOUR_SUBSCRIPTION_PDA',
  subscriberPubkey: 'SUBSCRIBER_WALLET',
  planPda: 'PLAN_PDA',
  subscriberTokenAccount: 'SUBSCRIBER_TOKEN_ACCOUNT',
  merchantTokenAccount: 'MERCHANT_TOKEN_ACCOUNT',
  nextBillingTimestamp: Math.floor(Date.now() / 1000) + 86400, // Tomorrow
});
db.close();
```

## Logs

Logs are written to:
- Console (colorized, human-readable)
- `./logs/scheduler.log` (JSON format for parsing)

## Architecture

```
index.js → scheduler.js → payment-processor.js → solana-client.js
                              ↓
                         database.js
```

1. **Scheduler**: Cron job that triggers every X minutes
2. **Payment Processor**: Queries DB, processes payments, handles errors
3. **Solana Client**: Builds and sends transactions to Solana
4. **Database**: SQLite storage for subscription metadata

## Important Notes

### Instruction Discriminator
The `solana-client.js` file contains a placeholder discriminator for the `process_payment` instruction. You need to calculate the correct discriminator from your program:

```javascript
// Calculate using: sha256("global:process_payment")[0..8]
const discriminator = Buffer.from([...]); // Update this
```

### Billing Frequency
Currently hardcoded to 30 days (2592000 seconds). You should fetch this from the on-chain plan account for accurate billing.

## Production Considerations

1. **Error Handling**: Add retry logic with exponential backoff
2. **Monitoring**: Integrate with monitoring services (Datadog, Sentry, etc.)
3. **Rate Limiting**: Implement rate limiting for RPC calls
4. **Database Backups**: Set up automated backups of SQLite database
5. **Health Checks**: Add HTTP endpoint for health monitoring
6. **Concurrency**: Consider using a job queue (Bull, BullMQ) for better scalability
