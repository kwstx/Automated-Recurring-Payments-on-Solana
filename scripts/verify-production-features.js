const API_URL = 'http://localhost:4000';

async function verifyFeatures() {
    console.log('🚀 Verifying Production Features...\n');

    // 1. Status Page / Health Check
    console.log('1️⃣ Checking System Status API...');
    try {
        const healthRes = await fetch(`${API_URL}/health`);
        if (healthRes.ok) {
            const health = await healthRes.json();
            console.log('✅ Health Endpoint Reachable:', healthRes.status);
            console.log('   API Status:', health.api);
            console.log('   Database:', health.database);
            console.log('   Solana:', health.solana);

            if (health.database === 'operational' && health.solana === 'operational') {
                console.log('   -> STATUS PAGE BACKEND PASS');
            } else {
                console.log('   -> STATUS PAGE BACKEND WARNING (Some systems down - this is expected if no local solana validator)');
            }
        } else {
            console.error('❌ Health Endpoint Failed:', healthRes.status);
        }
    } catch (error) {
        console.error('❌ Connection Failed:', error.message);
    }
    console.log('');

    // 2. Audit Logs Route
    console.log('2️⃣ Checking Audit Logs Endpoint...');
    try {
        const auditRes = await fetch(`${API_URL}/audit`);
        if (auditRes.status === 401 || auditRes.status === 403) {
            console.log('✅ Audit Endpoint Exists (Protected):', auditRes.status);
            console.log('   -> AUDIT ROUTE PASS (Security working)');
        } else if (auditRes.ok) {
            console.log('⚠️ Audit Endpoint Public (Unexpected but reachable):', auditRes.status);
        } else {
            console.error('❌ Audit Endpoint Error:', auditRes.status);
        }
    } catch (error) {
        console.error('❌ Connection Failed:', error.message);
    }
    console.log('');

    console.log('Verification Complete.');
}

verifyFeatures();
