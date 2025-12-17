// Using native fetch

const BASE_URL = 'http://localhost:5000/api';

async function debugLogin() {
    const email = `Debug_MixedCase_${Date.now()}@test.com`; // Mixed case to test normalization
    const password = 'password123';
    const role = 'student';

    console.log(`Attempting to register and login with: ${email}`);

    // 1. Register
    try {
        const regPayload = {
            name: 'Debug Student',
            email: email,
            password: password,
            role: role,
            studentId: `REG${Date.now()}`,
            phone: '1234567890',
            department: 'CS',
            year: '4'
        };
        console.log('Registration Payload:', JSON.stringify(regPayload, null, 2));

        const regRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regPayload)
        });

        const regData = await regRes.json();
        console.log(`Registration Status: ${regRes.status}`);
        console.log('Registration Response:', regData);

        if (regRes.status !== 201) {
            console.error('Registration failed, aborting login test.');
            return;
        }

        // 2. Login
        const loginPayload = {
            email: email,
            password: password,
            role: role
        };
        console.log('Login Payload:', JSON.stringify(loginPayload, null, 2));

        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginPayload)
        });

        const loginData = await loginRes.json();
        console.log(`Login Status: ${loginRes.status}`);
        console.log('Login Response:', loginData);

        if (loginRes.status === 200) {
            console.log('SUCESS: Login worked!');
        } else {
            console.error('FAILURE: Login failed!');
        }

    } catch (err) {
        console.error('Error during execution:', err);
    }
}

debugLogin();
