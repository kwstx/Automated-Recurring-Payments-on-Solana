import Database from 'better-sqlite3';

const db = new Database('../billing.db');

try {
    console.log('Migrating metered billing tables...');

    db.exec(`
        CREATE TABLE IF NOT EXISTS plan_meters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            plan_id INTEGER NOT NULL,
            event_name TEXT NOT NULL,
            price_per_unit INTEGER NOT NULL,
            included_units INTEGER DEFAULT 0,
            created_at INTEGER DEFAULT (strftime('%s', 'now')),
            FOREIGN KEY (plan_id) REFERENCES plans(id)
        );

        CREATE TABLE IF NOT EXISTS usage_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subscription_id INTEGER NOT NULL,
            meter_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            idempotency_key TEXT UNIQUE,
            recorded_at INTEGER DEFAULT (strftime('%s', 'now')),
            FOREIGN KEY (subscription_id) REFERENCES subscriptions(id),
            FOREIGN KEY (meter_id) REFERENCES plan_meters(id)
        );
    `);

    console.log('Migration successful');
} catch (error) {
    console.error('Migration failed:', error);
}
