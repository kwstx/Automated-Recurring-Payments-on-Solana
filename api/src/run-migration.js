import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, '../billing.db'));

// Read and execute migration
const migrationPath = path.join(__dirname, '../migrations/001_add_settings_tables.sql');
const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

try {
    db.exec(migrationSQL);
    console.log('✅ Migration 001_add_settings_tables.sql executed successfully');
} catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
}

db.close();
