
import 'dotenv/config';
import db from '../src/database.js';
import { triggerPaymentSuccess, triggerPaymentFailure, triggerSubscriptionRenewal } from '../src/webhook-triggers.js';

const run = async () => {
    console.log('Testing Email Notifications...');

    // Get first subscription
    const sub = db.prepare('SELECT * FROM subscriptions WHERE is_active = 1 LIMIT 1').get();

    if (!sub) {
        console.error('No active subscription found to test with.');
        return;
    }

    // Get plan details
    const plan = db.prepare('SELECT * FROM plans WHERE id = ?').get(sub.plan_id);

    if (!plan) {
        console.error('Plan not found.');
        return;
    }

    // Mock Subscription Data object as expected by triggers
    const subscriptionData = {
        id: sub.id,
        subscriptionPda: sub.subscription_pda,
        merchantId: plan.merchant_id,
        planName: plan.name,
        amount: (plan.amount / 1000000).toFixed(2),
        nextBillingTimestamp: sub.next_billing_timestamp
    };

    console.log(`Using Subscription ID: ${sub.id}, Email: ${sub.subscriber_email || 'None'}`);

    // 1. Test Payment Success
    console.log('\n--- Testing Payment Success ---');
    await triggerPaymentSuccess(plan.merchant_id, subscriptionData, {
        amount: subscriptionData.amount,
        currency: 'USDC',
        signature: 'mock_tx_signature_123'
    });

    // 2. Test Payment Failure
    console.log('\n--- Testing Payment Failure ---');
    await triggerPaymentFailure(plan.merchant_id, subscriptionData, {
        message: 'Insufficient funds',
        code: 'insufficient_funds'
    });

    // 3. Test Renewal
    console.log('\n--- Testing Renewal Notification ---');
    await triggerSubscriptionRenewal(plan.merchant_id, subscriptionData);

    console.log('\nDone.');
};

run().catch(console.error);
