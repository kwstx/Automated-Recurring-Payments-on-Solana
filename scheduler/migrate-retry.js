import Database from 'better-sqlite3';
import config from './src/config.js';

const db = new Database(config.database.path);

try {
    console.log('Adding retry_count column to subscriptions table...');
    db.exec('ALTER TABLE subscriptions ADD COLUMN retry_count INTEGER DEFAULT 0');
    console.log('✅ Migration successful');
} catch (error) {
    if (error.message.includes('duplicate column name')) {
        console.log('⚠️  Column retry_count already exists');
    } else {
        console.error('❌ Migration failed:', error.message);
    }
}

db.close();
