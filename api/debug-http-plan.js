
import { Keypair } from '@solana/web3.js';
import fs from 'fs';

const BASE_URL = 'http://127.0.0.1:4000';

async function debugHttpPlan() {
    console.log('--- DEBUG HTTP PLAN ---');
    try {
        // 1. Register
        const username = `debug_${Date.now()}`;
        console.log('Registering:', username);
        const regRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password: 'password123', email: 'debug@example.com' })
        });

        if (!regRes.ok) {
            console.error('Reg failed:', await regRes.text());
            return;
        }
        const token = (await regRes.json()).token;
        console.log('Token obtained');

        // 2. Create Plan
        console.log('Creating Plan via HTTP...');
        const planPda = Keypair.generate().publicKey.toBase58();
        const body = JSON.stringify({
            planPda,
            name: 'Http Debug Plan',
            amount: 5000000,
            interval: 'month',
            verifyOnChain: false
        });

        const planRes = await fetch(`${BASE_URL}/plan/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body
        });

        console.log('Plan Response Status:', planRes.status);
        const text = await planRes.text();
        console.log('Plan Response Text:', text);
        if (!planRes.ok) {
            console.log('SERVER_ERROR_START');
            console.log(text);
            console.log('SERVER_ERROR_END');
            throw new Error('Plan failed: ' + text);
        }
        console.log('Plan created successfully');

    } catch (err) {
        console.error('CAUGHT ERROR:', err);
        fs.writeFileSync('debug_error.log', err.toString() + '\n' + (err.stack || ''));
    }
}

debugHttpPlan();
