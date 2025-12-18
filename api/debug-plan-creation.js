
import { createPlan } from './src/controllers/planController.js';
import { Keypair } from '@solana/web3.js';

const mockRes = {
    status: (code) => ({ json: (data) => console.log('STATUS:', code, 'DATA:', data) }),
    json: (data) => console.log('DATA:', data)
};

const mockReq = {
    user: { id: 1 },
    body: {
        planPda: Keypair.generate().publicKey.toBase58(),
        name: 'Debug Plan',
        amount: 1000000,
        interval: 'month',
        verifyOnChain: false
    }
};

console.log('--- DEBUG PLAN CREATION ---');
try {
    await createPlan(mockReq, mockRes);
} catch (e) {
    console.error('CRASH:', e);
}
