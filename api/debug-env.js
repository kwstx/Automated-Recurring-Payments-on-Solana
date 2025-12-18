
import { Keypair } from '@solana/web3.js';
import fs from 'fs';

console.log('--- ENV CHECK ---');
console.log('Node:', process.version);
try {
    const k = Keypair.generate();
    console.log('Keypair:', k.publicKey.toBase58());
} catch (e) {
    console.error('Keypair error:', e);
}

try {
    console.log('Fetch available:', typeof fetch);
    const res = await fetch('http://127.0.0.1:4000/auth/register', { method: 'OPTIONS' }).catch(e => 'Fetch error: ' + e.message);
    console.log('Fetch result:', typeof res === 'string' ? res : res.status);
} catch (e) {
    console.error('Fetch check error:', e);
}
