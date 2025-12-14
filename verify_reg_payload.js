// Native fetch (Node 18+)

const payload = {
    name: "Simulation User",
    email: "simulated@test.com",
    phone: "1122334455",
    password: "password123",
    role: "student",
    department: "Computer Science",
    year: "4",
    cgpa: 8.5,
    skills: ["Simulation", "Testing"]
};

const register = async () => {
    try {
        console.log('Sending payload:', JSON.stringify(payload, null, 2));
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Status:', response.status);

        if (response.status === 201) {
            console.log('SUCCESS: Backend accepted the payload.');
        } else {
            console.log('FAILURE:', JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.error('Error:', e);
    }
};

register();
