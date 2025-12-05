import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const config = {
  solana: {
    rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
    programId: process.env.SOLANA_PROGRAM_ID || '5F2mgGWf8jsJVrNYyvHx8qSTVTK9DdCd5YY77C7kK5H6',
    payerKeypairPath: process.env.SOLANA_PAYER_KEYPAIR_PATH?.replace('~', process.env.HOME || process.env.USERPROFILE) || 
                      path.join(process.env.HOME || process.env.USERPROFILE, '.config', 'solana', 'id.json'),
  },
  scheduler: {
    intervalMinutes: parseInt(process.env.SCHEDULER_INTERVAL_MINUTES) || 5,
  },
  database: {
    path: process.env.DATABASE_PATH || path.join(__dirname, '..', 'data', 'subscriptions.db'),
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || path.join(__dirname, '..', 'logs', 'scheduler.log'),
  },
};

// Ensure directories exist
const dataDir = path.dirname(config.database.path);
const logDir = path.dirname(config.logging.file);

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export default config;
