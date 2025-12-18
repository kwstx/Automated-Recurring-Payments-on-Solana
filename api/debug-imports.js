
// checks imports from index.js
async function check() {
    console.log('Checking imports...');
    try { await import('./src/logger.js'); console.log('logger ok'); } catch (e) { console.error('logger fail', e); }
    try { await import('./src/swagger.js'); console.log('swagger ok'); } catch (e) { console.error('swagger fail', e); }
    try { await import('./src/routes/authRoutes.js'); console.log('authRoutes ok'); } catch (e) { console.error('authRoutes fail', e); }
    try { await import('./src/middleware/rateLimiter.js'); console.log('rateLimiter ok'); } catch (e) { console.error('rateLimiter fail', e); }
    try { await import('./src/database.js'); console.log('database ok'); } catch (e) { console.error('database fail', e); }
    try { await import('./src/solana-client.js'); console.log('solana-client ok'); } catch (e) { console.error('solana-client fail', e); }
    try { await import('./src/services/emailService.js'); console.log('emailService ok'); } catch (e) { console.error('emailService fail', e); }
    try { await import('./src/services/keeperService.js'); console.log('keeperService ok'); } catch (e) { console.error('keeperService fail', e); }
    console.log('Done checking basic imports');
}
check();
