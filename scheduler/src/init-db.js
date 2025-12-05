import SubscriptionDatabase from './database.js';
import logger from './logger.js';

// Example script to add a test subscription
const db = new SubscriptionDatabase();

// Example subscription data
const testSubscription = {
    subscriptionPda: 'EXAMPLE_SUBSCRIPTION_PDA_HERE',
    subscriberPubkey: 'EXAMPLE_SUBSCRIBER_PUBKEY',
    planPda: 'EXAMPLE_PLAN_PDA',
    subscriberTokenAccount: 'EXAMPLE_SUBSCRIBER_TOKEN_ACCOUNT',
    merchantTokenAccount: 'EXAMPLE_MERCHANT_TOKEN_ACCOUNT',
    nextBillingTimestamp: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago (due for payment)
};

try {
    const result = db.addSubscription(testSubscription);
    logger.info(`Test subscription added with ID: ${result.lastInsertRowid}`);
    logger.info('Database initialized successfully');
} catch (error) {
    logger.error(`Failed to add test subscription: ${error.message}`);
}

db.close();
