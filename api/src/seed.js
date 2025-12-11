
import db from './database.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const runSeed = async () => {
    console.log('🌱 Starting database seed...');

    try {
        // 1. Fetch all merchants
        let merchants = db.prepare('SELECT * FROM merchants').all();
        console.log(`Checking ${merchants.length} merchants for seeding...`);

        if (merchants.length === 0) {
            console.log('  ℹ️ No merchants found. Creating test merchants...');
            const passwordHash = await bcrypt.hash('password123', 10);

            const newMerchants = [
                ['test_merchant', 'merchant@test.com', 'HA5ZghrJ83893b0284f'],
                ['demo_user', 'demo@example.com', 'F7383hfh38f83h329']
            ];

            for (const [username, email, wallet] of newMerchants) {
                db.prepare(`
                    INSERT INTO merchants (username, password_hash, email, wallet_address)
                    VALUES (?, ?, ?, ?)
                `).run(username, passwordHash, email, wallet);
            }

            // Re-fetch
            merchants = db.prepare('SELECT * FROM merchants').all();
        }

        for (const merchant of merchants) {
            const merchantId = merchant.id;
            console.log(`Processing merchant: ${merchant.username} (ID: ${merchantId})`);

            // 2. Create Plans
            const plans = [
                { name: 'Starter Plan', amount: 29000000, interval: 'monthly', pda: `plan_starter_${merchantId}_v1` },
                { name: 'Pro Plan', amount: 99000000, interval: 'monthly', pda: `plan_pro_${merchantId}_v1` },
                { name: 'Enterprise', amount: 499000000, interval: 'yearly', pda: `plan_ent_${merchantId}_v1` }
            ];

            for (const plan of plans) {
                const existing = db.prepare('SELECT * FROM plans WHERE plan_pda = ?').get(plan.pda);
                if (!existing) {
                    db.prepare(`
                        INSERT INTO plans (merchant_id, plan_pda, name, amount, interval)
                        VALUES (?, ?, ?, ?, ?)
                    `).run(merchantId, plan.pda, plan.name, plan.amount, plan.interval);
                    console.log(`  ✅ Created plan: ${plan.name}`);
                }
            }

            // Get plan IDs
            const planRows = db.prepare('SELECT * FROM plans WHERE merchant_id = ?').all(merchantId);
            if (planRows.length === 0) continue;

            // 3. Create Subscriptions & Payment Logs
            const now = Math.floor(Date.now() / 1000);
            const day = 86400;
            const month = 30 * day;

            // Check if subs exist already
            const existingSubs = db.prepare('SELECT count(*) as count FROM subscriptions WHERE plan_id IN (SELECT id FROM plans WHERE merchant_id = ?)').get(merchantId);

            if (existingSubs.count < 5) { // Add more if less than 5
                // Create 10 mock subscribers
                for (let i = 0; i < 10; i++) {
                    const plan = planRows[i % planRows.length];
                    const startOffset = Math.floor(Math.random() * 6 * month); // Started within last 6 months
                    const createdAt = now - startOffset;
                    const subPda = `sub_mock_${merchantId}_${i}_${Date.now()}`;

                    const isActive = Math.random() > 0.2;
                    const status = isActive ? 'active' : 'cancelled';

                    const result = db.prepare(`
                        INSERT INTO subscriptions (
                            subscription_pda, plan_id, subscriber_pubkey, 
                            subscriber_email,
                            subscriber_token_account, merchant_token_account, 
                            next_billing_timestamp, is_active, status, 
                            created_at, payment_count
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `).run(
                        subPda, plan.id,
                        `subscriber_${merchantId}_${i}_pubkey`,
                        `subscriber${i}@example.com`,
                        `subscriber_${merchantId}_${i}_token_account`,
                        `merchant_token_account`,
                        createdAt + month,
                        isActive ? 1 : 0, status,
                        createdAt,
                        Math.floor(startOffset / month) + 1
                    );

                    const subId = result.lastInsertRowid;

                    // Generate payment logs
                    let paymentTime = createdAt;
                    while (paymentTime < now) {
                        db.prepare(`
                            INSERT INTO payment_logs (subscription_id, status, processed_at)
                            VALUES (?, 'success', ?)
                        `).run(subId, paymentTime);
                        paymentTime += month;
                    }
                }
                console.log(`  ✅ Generated mock subscriptions`);
            } else {
                console.log(`  ℹ️ Subscriptions already exist`);
            }

            // 4. Create Recent Invoices (if none)
            const existingInvoices = db.prepare('SELECT count(*) as count FROM invoices WHERE merchant_id = ?').get(merchantId);
            if (existingInvoices.count === 0) {
                const invoiceStatuses = ['paid', 'sent', 'draft', 'paid', 'paid'];
                for (let i = 0; i < 5; i++) {
                    db.prepare(`
                        INSERT INTO invoices (
                            merchant_id, customer_email, customer_name, 
                            amount, status, due_date, invoice_number, created_at
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    `).run(
                        merchantId,
                        `client${i}@corp.com`,
                        `Client ${i} Corp`,
                        (100 + i * 50) * 1000000, // Amount in units
                        invoiceStatuses[i],
                        now + (7 * day),
                        `INV-2024-00${i + 1}`,
                        now - (i * day)
                    );
                }
                console.log(`  ✅ Created mock invoices`);
            } else {
                console.log(`  ℹ️ Invoices already exist`);
            }

            // 5. Create Webhook (if none)
            const webhooks = db.prepare('SELECT * FROM webhook_endpoints WHERE merchant_id = ?').all(merchantId);
            if (webhooks.length === 0) {
                db.prepare(`
                    INSERT INTO webhook_endpoints (merchant_id, url, events, secret)
                    VALUES (?, ?, ?, ?)
                `).run(merchantId, 'https://webhook.site/test-endpoint', 'payment.success,subscription.renewal', 'whsec_test_secret');
                console.log(`  ✅ Created mock webhook`);
            }
        }

        console.log('🎉 Database seed completed successfully!');

    } catch (error) {
        console.error('❌ Data seed failed:', error);
    }
};

runSeed();
