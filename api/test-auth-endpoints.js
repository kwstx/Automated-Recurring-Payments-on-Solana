


const BASE_URL = 'http://127.0.0.1:4000';

async function testAuth() {
    console.log('--- TESTING AUTH ENDPOINTS ---');

    const timestamp = Date.now();
    const username = `test_user_${timestamp}`;
    const email = `test_${timestamp}@example.com`;
    const password = 'password123';

    console.log(`Targeting: ${BASE_URL}`);
    console.log(`Test Credentials: ${username} / ${password}`);

    // 1. REGISTER
    try {
        console.log('\n[1] Testing Registration...');
        const registerResponse = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const registerData = await registerResponse.json();

        if (registerResponse.status === 201 && registerData.token) {
            console.log('✅ Registration SUCCESS');
        } else {
            console.error('❌ Registration FAILED', registerResponse.status, registerData);
            process.exit(1);
        }

        // 2. LOGIN (Success)
        console.log('\n[2] Testing Login (Correct Credentials)...');
        const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const loginData = await loginResponse.json();

        if (loginResponse.status === 200 && loginData.token) {
            console.log('✅ Login SUCCESS');
        } else {
            console.error('❌ Login FAILED', loginResponse.status, loginData);
            process.exit(1);
        }

        // 3. LOGIN (Failure)
        console.log('\n[3] Testing Login (Wrong Password)...');
        const failResponse = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password: 'wrongpassword' })
        });

        if (failResponse.status === 401) {
            console.log('✅ Login Failure Check SUCCESS (Got 401)');
        } else {
            console.error('❌ Login Failure Check FAILED (Expected 401)', failResponse.status);
            process.exit(1);
        }

        console.log('\n🎉 ALL AUTH TESTS PASSED');

    } catch (error) {
        console.error('Test script error:', error);
    }
}

testAuth();
