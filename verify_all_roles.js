// verify_all_roles.js
const BASE_URL = 'http://localhost:5000/api';

async function testRole(role, extraData = {}) {
    const timestamp = Date.now();
    const email = `${role}_${timestamp}@test.com`; // Normalized by backend
    const password = 'password123';

    console.log(`\n--- Testing ${role.toUpperCase()} ---`);
    console.log(`Target Email: ${email}`);

    // 1. Register
    const regPayload = {
        name: `Test ${role}`,
        email: email,
        password: password,
        role: role,
        ...extraData
    };

    // Add role-specific required fields if any (based on schemas)
    if (role === 'student' && !extraData.studentId) {
        regPayload.studentId = `REG${timestamp}`;
        regPayload.phone = '9998887776';
        regPayload.department = 'CS';
        regPayload.year = '4';
    }
    if (role === 'faculty' && !extraData.department) {
        regPayload.department = 'CS';
    }

    try {
        const regRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regPayload)
        });

        const regData = await regRes.json();

        if (regRes.status === 201) {
            console.log(`✅ [${role}] Registration SUCCESS`);
        } else {
            console.error(`❌ [${role}] Registration FAILED:`, regRes.status, regData);
            return; // Stop if registration details
        }

        // 2. Login
        const loginPayload = {
            email: email,
            password: password,
            role: role
        };

        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginPayload)
        });

        const loginData = await loginRes.json();

        if (loginRes.status === 200) {
            console.log(`✅ [${role}] Login SUCCESS`);
            console.log(`   Token: ${loginData.token ? 'Present' : 'Missing'}`);
            console.log(`   Role in Verified Response: ${loginData.role}`);
        } else {
            console.error(`❌ [${role}] Login FAILED:`, loginRes.status, loginData);
        }

    } catch (err) {
        console.error(`⚠️ [${role}] Exception:`, err.message);
    }
}

async function runAllTests() {
    console.log('Starting verification of all roles...');

    await testRole('student');
    await testRole('faculty');
    await testRole('admin');

    console.log('\nAll tests completed.');
}

runAllTests();
