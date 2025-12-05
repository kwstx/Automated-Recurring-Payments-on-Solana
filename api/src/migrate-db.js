import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DATABASE_PATH || './billing.db';
const db = new Database(dbPath);

// Run migration
console.log('Running database migration...');

const schema = readFileSync(join(__dirname, '../schema.sql'), 'utf-8');
db.exec(schema);

console.log('Migration completed successfully');
