import Database from 'better-sqlite3';
import config from './src/config.js';

const db = new Database(config.database.path);

try {
    console.log('Adding status column to subscriptions table...');

    // Add status column
    try {
        db.exec("ALTER TABLE subscriptions ADD COLUMN status TEXT DEFAULT 'active'");
        console.log('✅ Added status column');
    } catch (err) {
        if (err.message.includes('duplicate column name')) {
            console.log('⚠️  Column status already exists');
        } else {
            throw err;
        }
    }

    // Migrate data
    console.log('Migrating data...');
    db.exec("UPDATE subscriptions SET status = 'active' WHERE is_active = 1");
    db.exec("UPDATE subscriptions SET status = 'canceled' WHERE is_active = 0");
    console.log('✅ Data migrated');

} catch (error) {
    console.error('❌ Migration failed:', error.message);
}

db.close();
