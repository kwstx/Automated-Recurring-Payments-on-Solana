#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envContent = `# Scheduler Configuration

# Solana Configuration
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_PROGRAM_ID=5F2mgGWf8jsJVrNYyvHx8qSTVTK9DdCd5YY77C7kK5H6
SOLANA_PAYER_KEYPAIR_PATH=~/.config/solana/id.json

# Scheduler Configuration
SCHEDULER_INTERVAL_MINUTES=5

# Database Configuration
DATABASE_PATH=./data/subscriptions.db

# Logging Configuration
LOG_LEVEL=info
LOG_FILE=./logs/scheduler.log
`;

const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists. Skipping...');
    console.log('If you want to recreate it, delete the existing .env file first.');
} else {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('📝 Review and update the configuration as needed.');
}
