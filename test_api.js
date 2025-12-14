const BASE_URL = 'http://localhost:5000/api';

const runTests = async () => {
    try {
        console.log('--- Starting Tests ---');

        // 1. Register Admin
        console.log('\n1. Registering Admin...');
        const adminRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Admin User',
                email: 'admin@test.com',
                password: 'password123',
                role: 'admin'
            })
        });
        const adminData = await adminRes.json();
        console.log('Admin Register Status:', adminRes.status);
        // If already exists, try login
        let adminToken;
        if (adminRes.status === 400 && adminData.message === 'User already exists') {
            console.log('Admin already exists, logging in...');
            const loginRes = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'admin@test.com',
                    password: 'password123',
                    role: 'admin'
                })
            });
            const loginData = await loginRes.json();
            adminToken = loginData.token;
        } else {
            adminToken = adminData.token;
        }
        console.log('Admin Token obtained');

        // 2. Register Student
        console.log('\n2. Registering Student...');
        const studentRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Student User',
                email: 'student@test.com',
                password: 'password123',
                role: 'student',
                phone: '1234567890',
                department: 'CS',
                year: '4'
            })
        });
        const studentData = await studentRes.json();
        console.log('Student Register Status:', studentRes.status);
        let studentToken;
        if (studentRes.status === 400 && studentData.message === 'User already exists') {
            console.log('Student already exists, logging in...');
            const loginRes = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'student@test.com',
                    password: 'password123',
                    role: 'student'
                })
            });
            const loginData = await loginRes.json();
            studentToken = loginData.token;
        } else {
            studentToken = studentData.token;
        }
        console.log('Student Token obtained');

        // 3. Create Company (Admin)
        console.log('\n3. Creating Company info...');
        const companyRes = await fetch(`${BASE_URL}/companies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`
            },
            body: JSON.stringify({
                name: 'Test Corp',
                industry: 'Tech',
                location: 'Remote',
                description: 'Great place',
                package: '10 LPA',
                deadline: '2025-12-31'
            })
        });
        const companyData = await companyRes.json();
        console.log('Create Company Status:', companyRes.status);
        const companyId = companyData._id || companyData.id;

        // 4. Get Companies (Student)
        console.log('\n4. Fetching Companies...');
        const getCompRes = await fetch(`${BASE_URL}/companies`, {
            headers: { 'Authorization': `Bearer ${studentToken}` }
        });
        console.log('Get Companies Status:', getCompRes.status);

        // 5. Apply (Student)
        if (companyId) {
            console.log('\n5. Applying to Company...');
            const applyRes = await fetch(`${BASE_URL}/applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${studentToken}`
                },
                body: JSON.stringify({
                    companyId: companyId,
                    companyName: 'Test Corp',
                    position: 'SDE'
                })
            });
            console.log('Apply Status:', applyRes.status);
            console.log('Apply Response:', await applyRes.json());
        }

        // 6. Check Dashboard Stats (Admin)
        console.log('\n6. Checking Dashboard Stats...');
        const statsRes = await fetch(`${BASE_URL}/dashboard/stats`, {
            headers: { 'Authorization': `Bearer ${adminToken}` }
        });
        console.log('Stats Status:', statsRes.status);
        console.log('Stats:', await statsRes.json());

        console.log('\n--- Tests Completed ---');

    } catch (error) {
        console.error('Test Failed:', error);
    }
};

runTests();
