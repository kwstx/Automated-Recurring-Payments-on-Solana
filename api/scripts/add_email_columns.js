const db = require('../src/database');

try {
    console.log('Migrating merchant_settings table...');

    // Add resend_api_key column
    try {
        db.prepare("ALTER TABLE merchant_settings ADD COLUMN resend_api_key TEXT").run();
        console.log('Added resend_api_key column.');
    } catch (error) {
        if (error.message.includes('duplicate column name')) {
            console.log('resend_api_key column already exists.');
        } else {
            console.error('Error adding resend_api_key:', error.message);
        }
    }

    // Add email_sender column
    try {
        db.prepare("ALTER TABLE merchant_settings ADD COLUMN email_sender TEXT").run();
        console.log('Added email_sender column.');
    } catch (error) {
        if (error.message.includes('duplicate column name')) {
            console.log('email_sender column already exists.');
        } else {
            console.error('Error adding email_sender:', error.message);
        }
    }

    console.log('Migration complete.');
} catch (error) {
    console.error('Migration failed:', error);
}
