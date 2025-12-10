import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DATABASE_PATH || './billing.db';
const db = new Database(dbPath);

// Initialize database with schema
try {
    const schema = readFileSync(join(__dirname, '../schema.sql'), 'utf-8');
    db.exec(schema);
    console.log('Database initialized successfully');
} catch (error) {
    console.error('Failed to initialize database schema:', error);
    process.exit(1);
}

export default db;
