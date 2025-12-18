import { Keypair } from '@solana/web3.js';
import fs from 'fs';

const BASE_URL = 'http://localhost:4000';

async function debugSubscriptionActivation() {
    console.log('--- DEBUG SUBSCRIPTION ACTIVATION ---');

    try {
        // 1. Register Merchant
        const username = 'sub_debug_' + Math.floor(Math.random() * 10000);
        console.log('Registering:', username);

        const regRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password: 'password123',
                email: `${username}@example.com`
            })
        });

        if (!regRes.ok) throw new Error('Registration failed: ' + await regRes.text());
        const { token, merchant } = await regRes.json();
        console.log('Token obtained');

        // 2. Create Plan
        console.log('Creating Plan via HTTP...');
        const planPda = Keypair.generate().publicKey.toBase58();
        console.log('Plan PDA:', planPda);

        const planRes = await fetch(`${BASE_URL}/plan/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                planPda,
                name: 'Subscription Debug Plan',
                amount: 5000000,
                interval: 'monthly',
                verifyOnChain: false
            })
        });

        const planText = await planRes.text();
        if (!planRes.ok) {
            console.log('SERVER_ERROR_START');
            console.log(planText);
            console.log('SERVER_ERROR_END');
            throw new Error('Plan failed: ' + planText);
        }
        const planData = JSON.parse(planText);
        console.log('Plan created successfully, ID:', planData.planId);

        // 3. Activate Subscription
        console.log('Activating Subscription...');
        const subscriptionPda = Keypair.generate().publicKey.toBase58();
        const subscriberPubkey = Keypair.generate().publicKey.toBase58();
        const subscriberTokenAccount = Keypair.generate().publicKey.toBase58();
        const merchantTokenAccount = Keypair.generate().publicKey.toBase58();

        const subRes = await fetch(`${BASE_URL}/subscription/activate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Merchant activates it? No, usually subscriber calls smart contract. 
                // Taking a look at api/src/controllers/subscriptionController.js:
                // It usually requires signature.
                // But let's see if we can call it.
            },
            body: JSON.stringify({
                subscriptionPda,
                planId: planData.planId,
                subscriberPubkey,
                subscriberTokenAccount,
                merchantTokenAccount,
                nextBillingTimestamp: Math.floor(Date.now() / 1000) + 30 * 24 * 3600,
                // transactionSignature: 'mock_signature_' + Math.floor(Math.random() * 10000), 
                // Omitting signature to skip verification for debug
                verifyOnChain: false
            })
        });

        const subText = await subRes.text();
        if (!subRes.ok) {
            console.log('SUB_ERROR_START');
            console.log(subText);
            console.log('SUB_ERROR_END');
            throw new Error('Subscription failed: ' + subText);
        }
        console.log('Subscription activated successfully:', subText);

    } catch (err) {
        console.error('CAUGHT ERROR:', err);
        process.exit(1);
    }
}

debugSubscriptionActivation();
