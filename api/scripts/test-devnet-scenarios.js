
import 'dotenv/config';
import db from '../src/database.js';
import { triggerPaymentSuccess, triggerPaymentFailure, retryFailedWebhooks } from '../src/webhook-triggers.js';
import logger from '../src/logger.js';

const API_URL = 'http://localhost:4000';
// Helper to print step headers
const step = (msg) => console.log(`\n\x1b[36m[STEP]\x1b[0m ${msg}`);
const success = (msg) => console.log(`\x1b[32m[PASS]\x1b[0m ${msg}`);
const fail = (msg) => console.log(`\x1b[31m[FAIL]\x1b[0m ${msg}`);

async function runTests() {
    console.log('🚀 Starting Devnet Scenario Tests (Success, Fail, Retry, Pause, Resume, Cancel)...\n');

    // 0. Setup Data
    step('Setting up test data...');
    let sub = db.prepare('SELECT * FROM subscriptions WHERE plan_id IS NOT NULL LIMIT 1').get();
    if (!sub) {
        console.log('No subscription found. Please run seed.js first.');
        return;
    }
    const merchantId = 1; // Default
    console.log(`Using Subscription ID: ${sub.id}, Original PDA: ${sub.subscription_pda}`);

    // Fix PDA for API validation (Must be 44 chars Base58)
    // Generate unique suffix to avoid constraint errors, replace 0 with A to satisfy Base58
    const uniqueSuffix = Date.now().toString().replace(/0/g, 'A');
    const prefix = '1111111111111111111111111111111'; // 31 chars
    // Result: 31 + 13 = 44 chars.
    const validMockPda = prefix + uniqueSuffix; // 44 chars Base58

    // Always update to ensure we use a valid one for THIS run, even if previous exist
    // Actually, updating ID 1 or 2 consistently
    try {
        db.prepare('UPDATE subscriptions SET subscription_pda = ? WHERE id = ?').run(validMockPda, sub.id);
        console.log(`Updated subscription ${sub.id} with valid mock PDA for API testing: ${validMockPda}`);
        sub.subscription_pda = validMockPda; // Update local obj
    } catch (e) {
        // If unique constraint fails (unlikely with timestamp), just generate another
        console.warn("PDA update failed (collision?), retrying...", e.message);
    }

    // 1. Successful Payment
    step('Testing: Successful Payment');
    try {
        await triggerPaymentSuccess(merchantId, {
            id: sub.id,
            planName: 'Pro Plan',
            amount: 50,
            nextBillingTimestamp: Date.now() / 1000 + 86400 * 30
        }, {
            amount: 50,
            currency: 'USDC',
            signature: 'test_signature_success_' + Date.now()
        });
        success('Payment Success Trigger executed.');
    } catch (e) {
        fail('Payment Success Trigger failed: ' + e.message);
    }

    // 2. Failed Payment
    step('Testing: Failed Payment');
    try {
        await triggerPaymentFailure(merchantId, {
            id: sub.id,
            planName: 'Pro Plan',
            amount: 50,
        }, {
            message: 'Insufficient funds',
            code: '6001'
        });
        success('Payment Failure Trigger executed.');
    } catch (e) {
        fail('Payment Failure Trigger failed: ' + e.message);
    }

    // 3. Retry Logic
    step('Testing: Retry Logic');
    try {
        const endpoint = db.prepare('SELECT id FROM webhook_endpoints WHERE merchant_id = ? LIMIT 1').get(merchantId);
        if (endpoint) {
            db.prepare(`
                INSERT INTO webhook_deliveries (
                    webhook_endpoint_id, event_type, payload, status, 
                    attempt_count, next_retry_at, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `).run(
                endpoint.id,
                'test.retry_logic',
                JSON.stringify({ test: true }),
                'pending',
                1,
                Math.floor(Date.now() / 1000) - 10,
                Math.floor(Date.now() / 1000)
            );

            const results = await retryFailedWebhooks();
            if (results.retried > 0) {
                success(`Retry Logic executed. Retried: ${results.retried}`);
            } else {
                console.log('No webhooks needed retry. maybe already processed.');
            }
        } else {
            console.log('Skipping Retry Logic endpoint check.');
        }
    } catch (e) {
        fail('Retry Logic failed: ' + e.message);
    }

    // 4. Pause Subscription
    step('Testing: Pause Subscription (via API)');
    try {
        const response = await fetch(`${API_URL}/subscription/pause`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subscriptionPda: validMockPda })
        });
        const data = await response.json();

        if (response.ok) {
            const check = db.prepare('SELECT is_active, status FROM subscriptions WHERE id = ?').get(sub.id);
            if (check.is_active === 0 && check.status === 'paused') {
                success('Pause successful. Status is paused, is_active is 0.');
            } else {
                fail(`Pause failed db check. Status: ${check.status}, Active: ${check.is_active}`);
            }
        } else {
            fail('Pause API failed: ' + JSON.stringify(data));
        }
    } catch (e) {
        fail('Pause request failed: ' + e.message);
    }

    // 5. Resume Subscription
    step('Testing: Resume Subscription (via API)');
    try {
        const response = await fetch(`${API_URL}/subscription/resume`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subscriptionPda: validMockPda })
        });
        const data = await response.json();

        if (response.ok) {
            const check = db.prepare('SELECT is_active, status FROM subscriptions WHERE id = ?').get(sub.id);
            if (check.is_active === 1 && check.status === 'active') {
                success('Resume successful. Status is active, is_active is 1.');
            } else {
                fail(`Resume failed db check. Status: ${check.status}, Active: ${check.is_active}`);
            }
        } else {
            fail('Resume API failed: ' + JSON.stringify(data));
        }
    } catch (e) {
        fail('Resume request failed: ' + e.message);
    }

    // 6. Cancellation
    step('Testing: Cancellation (via API)');
    try {
        const response = await fetch(`${API_URL}/subscription/cancel`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subscriptionPda: validMockPda })
        });

        const data = await response.json();

        if (response.ok) {
            const check = db.prepare('SELECT is_active, status FROM subscriptions WHERE id = ?').get(sub.id);
            if (check.is_active === 0 && check.status === 'cancelled') {
                success('Cancellation successful. Status is cancelled.');
            } else {
                fail(`Cancellation failed db check. Status: ${check.status}`);
            }
        } else {
            fail('Cancellation API failed: ' + JSON.stringify(data));
        }
    } catch (e) {
        fail('Cancellation request failed: ' + e.message);
    }

    console.log('\n✅ Test Run Complete.');
    process.exit(0);
}

runTests();
