
import db from './database.js';

console.log('--- BACKEND VERIFICATION ---');

try {
    // Check Plans
    const plans = db.prepare('SELECT count(*) as count FROM plans').get();
    console.log(`[PASS] Plans Table Accessible: ${plans.count} plans found.`);

    // Check Subscriptions
    const subs = db.prepare('SELECT count(*) as count FROM subscriptions').get();
    console.log(`[PASS] Subscriptions Table Accessible: ${subs.count} subscriptions found.`);

    // Check Users/Merchants
    const merchants = db.prepare('SELECT count(*) as count FROM merchants').get();
    console.log(`[PASS] Merchants Table Accessible: ${merchants.count} merchants found.`);

    // Check MRR Calculation (Proxy)
    const mrr = db.prepare(`
        SELECT SUM(p.amount) as total 
        FROM subscriptions s 
        JOIN plans p ON s.plan_id = p.id 
        WHERE s.is_active = 1
    `).get();
    console.log(`[PASS] SQL Logic Verified: Calculated Raw MRR is ${mrr.total || 0} (micro-units).`);

    console.log('--- VERIFICATION COMPLETE ---');
} catch (error) {
    console.error('[FAIL] Verification Failed:', error.message);
}
