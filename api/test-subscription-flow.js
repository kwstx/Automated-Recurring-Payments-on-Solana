
import { Keypair } from '@solana/web3.js';

const BASE_URL = 'http://127.0.0.1:4000';

async function runTest() {
    console.log('--- TESTING SUBSCRIPTION FLOW ---');

    // 1. Register Merchant
    const username = `merchant_${Date.now()}`;
    const password = 'password123';
    const email = `${username}@example.com`;

    console.log(`[1] Registering Merchant: ${username}`);
    const regRes = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
    });

    if (!regRes.ok) throw new Error(`Registration failed: ${await regRes.text()}`);
    const regData = await regRes.json();
    const token = regData.token;
    console.log('✅ Merchant Registered');

    // 2. Create Plan
    console.log('[2] Creating Plan...');
    const planPda = Keypair.generate().publicKey.toBase58();
    const planRes = await fetch(`${BASE_URL}/plan/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            planPda,
            name: 'Pro Plan',
            amount: 10000000, // 10 USDC
            interval: 'month',
            verifyOnChain: false
        })
    });

    if (!planRes.ok) throw new Error(`Plan creation failed: ${await planRes.text()}`);
    const planData = await planRes.json();
    const planId = planData.planId;
    console.log(`✅ Plan Created (ID: ${planId}, PDA: ${planPda})`);

    // 3. Activate Subscription
    console.log('[3] Activating Subscription...');
    const subscriptionPda = Keypair.generate().publicKey.toBase58();
    const subscriberPubkey = Keypair.generate().publicKey.toBase58();
    const subscriberTokenAccount = Keypair.generate().publicKey.toBase58();
    const merchantTokenAccount = Keypair.generate().publicKey.toBase58();
    const nextBillingTimestamp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days from now

    const subRes = await fetch(`${BASE_URL}/subscription/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            subscriptionPda,
            planId,
            subscriberPubkey,
            subscriberTokenAccount,
            merchantTokenAccount,
            nextBillingTimestamp,
            verifyOnChain: false
        })
    });

    if (!subRes.ok) throw new Error(`Subscription activation failed: ${await subRes.text()}`);
    const subData = await subRes.json();
    console.log(`✅ Subscription Activated (ID: ${subData.subscriptionId}, PDA: ${subscriptionPda})`);

    // 4. Verify Status
    console.log('[4] Verifying Subscription Status...');
    const statusRes = await fetch(`${BASE_URL}/subscription/status?subscriptionPda=${subscriptionPda}`);

    if (!statusRes.ok) throw new Error(`Status check failed: ${await statusRes.text()}`);
    const statusData = await statusRes.json();

    if (statusData.subscription.status === 'active' && statusData.subscription.subscriptionPda === subscriptionPda) {
        console.log('✅ Subscription Status Verified: Active');
    } else {
        throw new Error(`Invalid status: ${JSON.stringify(statusData)}`);
    }

    console.log('🎉 ALL SUBSCRIPTION TESTS PASSED');
}

runTest().catch(err => {
    import('fs').then(fs => fs.writeFileSync('error.log', err.toString() + '\\n' + (err.stack || '')));
    console.error('❌ TEST FAILED');
    process.exit(1);
});
