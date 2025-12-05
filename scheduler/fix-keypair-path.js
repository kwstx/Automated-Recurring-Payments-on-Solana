#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine the correct keypair path based on OS
const homeDir = os.homedir();
const keypairPath = path.join(homeDir, '.config', 'solana', 'id.json');

console.log('🔍 Checking Solana keypair...');
console.log(`Home directory: ${homeDir}`);
console.log(`Expected keypair path: ${keypairPath}`);

if (fs.existsSync(keypairPath)) {
    console.log('✅ Keypair found!');

    // Update .env file with correct path
    const envPath = path.join(__dirname, '.env');
    let envContent = fs.readFileSync(envPath, 'utf8');

    // Replace the keypair path
    envContent = envContent.replace(
        /SOLANA_PAYER_KEYPAIR_PATH=.*/,
        `SOLANA_PAYER_KEYPAIR_PATH=${keypairPath.replace(/\\/g, '/')}`
    );

    fs.writeFileSync(envPath, envContent);
    console.log('✅ Updated .env with correct keypair path');
    console.log(`Path set to: ${keypairPath}`);
} else {
    console.log('❌ Keypair not found at expected location');
    console.log('Please ensure you have a Solana keypair at:');
    console.log(`  ${keypairPath}`);
    console.log('Or update SOLANA_PAYER_KEYPAIR_PATH in .env manually');
    process.exit(1);
}
