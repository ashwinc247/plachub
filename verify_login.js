const login = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'final@test.com',
                password: 'password123',
                role: 'student'
            })
        });

        const data = await response.json();
        console.log('Login Status:', response.status);
        console.log('Login Response:', JSON.stringify(data, null, 2));

        if (response.status === 200) {
            console.log('TEST PASSED: User login successful.');
        } else {
            console.log('TEST FAILED: Login refused.');
        }
    } catch (e) {
        console.error('Error:', e);
    }
};

login();
