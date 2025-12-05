import fs from 'fs';

// Mock Solana Client
class MockSolanaClient {
    constructor() {
        this.shouldFail = true;
    }

    async processPayment(subscription) {
        if (this.shouldFail) {
            return { success: false, error: 'Simulated failure' };
        }
        return { success: true, signature: 'mock_signature' };
    }
}

async function runTest() {
    console.log('🧪 Starting Retry Logic Test...');

    // Use a test database file
    const testDbPath = './data/test_retry.db';
    if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);

    // Override config for test BEFORE importing modules
    process.env.DATABASE_PATH = testDbPath;

    // Dynamic imports to ensure config uses new env var
    const { default: PaymentProcessor } = await import('./src/payment-processor.js');
    const { default: SubscriptionDatabase } = await import('./src/database.js');

    const db = new SubscriptionDatabase();
    const processor = new PaymentProcessor();

    // Inject mock client
    processor.solanaClient = new MockSolanaClient();
    processor.db = db; // Ensure processor uses the same DB instance

    // Add test subscription
    const subId = db.addSubscription({
        subscriptionPda: 'TEST_SUB',
        subscriberPubkey: 'TEST_PUBKEY',
        planPda: 'TEST_PLAN',
        subscriberTokenAccount: 'TEST_TOKEN',
        merchantTokenAccount: 'TEST_MERCHANT',
        nextBillingTimestamp: Math.floor(Date.now() / 1000) - 100 // Due now
    }).lastInsertRowid;

    console.log(`Created test subscription ID: ${subId}`);

    // Helper to get subscription
    const getSub = () => db.db.prepare('SELECT * FROM subscriptions WHERE id = ?').get(subId);

    // Attempt 1 (Initial Failure)
    console.log('\n--- Attempt 1 (Should schedule Retry 1) ---');
    await processor.processAllDuePayments();
    let sub = getSub();
    console.log(`Retry Count: ${sub.retry_count}`);
    console.log(`Next Billing: ${new Date(sub.next_billing_timestamp * 1000).toISOString()}`);

    if (sub.retry_count !== 1) throw new Error('Expected retry_count to be 1');

    // Fast forward time to make it due again
    db.db.prepare('UPDATE subscriptions SET next_billing_timestamp = ? WHERE id = ?')
        .run(Math.floor(Date.now() / 1000) - 100, subId);

    // Attempt 2 (Retry 1 Failure)
    console.log('\n--- Attempt 2 (Should schedule Retry 2) ---');
    await processor.processAllDuePayments();
    sub = getSub();
    console.log(`Retry Count: ${sub.retry_count}`);

    if (sub.retry_count !== 2) throw new Error('Expected retry_count to be 2');

    // Fast forward
    db.db.prepare('UPDATE subscriptions SET next_billing_timestamp = ? WHERE id = ?')
        .run(Math.floor(Date.now() / 1000) - 100, subId);

    // Attempt 3 (Retry 2 Failure)
    console.log('\n--- Attempt 3 (Should schedule Retry 3) ---');
    await processor.processAllDuePayments();
    sub = getSub();
    console.log(`Retry Count: ${sub.retry_count}`);

    if (sub.retry_count !== 3) throw new Error('Expected retry_count to be 3');

    // Fast forward
    db.db.prepare('UPDATE subscriptions SET next_billing_timestamp = ? WHERE id = ?')
        .run(Math.floor(Date.now() / 1000) - 100, subId);

    // Attempt 4 (Retry 3 Failure - Max Reached)
    console.log('\n--- Attempt 4 (Should mark as failed) ---');
    await processor.processAllDuePayments();
    sub = getSub();
    console.log(`Retry Count: ${sub.retry_count}`);
    console.log(`Status: ${sub.status}`);

    if (sub.status !== 'failed') throw new Error(`Expected subscription status to be 'failed', got '${sub.status}'`);
    if (sub.retry_count !== 3) throw new Error('Expected retry_count to remain 3');

    console.log('\n✅ Test Passed: Retry logic works correctly!');

    // Cleanup
    db.close();
    fs.unlinkSync(testDbPath);
}

runTest().catch(err => {
    console.error('❌ Test Failed:', err);
    process.exit(1);
});
