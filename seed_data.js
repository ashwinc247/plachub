const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Student = require('./models/Student');
const Faculty = require('./models/Faculty');
const Admin = require('./models/Admin');
const Company = require('./models/Company');
const Application = require('./models/Application');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/plachub2', {
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectDB();

    console.log('Clearing existing data...');
    await Student.deleteMany({});
    await Faculty.deleteMany({});
    await Admin.deleteMany({});
    await Company.deleteMany({});
    await Application.deleteMany({});

    console.log('Creating Admin...');
    const adminSalt = await bcrypt.genSalt(10);
    const adminHash = await bcrypt.hash('password123', adminSalt);
    const admin = await Admin.create({
        name: 'Admin User',
        email: 'admin@college.edu', // Matches placeholder
        password: adminHash
    });
    console.log('Admin created: admin@college.edu / password123');

    console.log('Creating Faculty...');
    const facSalt = await bcrypt.genSalt(10);
    const facHash = await bcrypt.hash('password123', facSalt);
    const faculty = await Faculty.create({
        name: 'Dr. Faculty',
        email: 'faculty@college.edu', // Matches placeholder
        password: facHash,
        department: 'Computer Science'
    });
    console.log('Faculty created: faculty@college.edu / password123');

    console.log('Creating 10 Students...');
    const students = [];
    const studSalt = await bcrypt.genSalt(10);
    const studHash = await bcrypt.hash('password123', studSalt);

    const departments = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil'];

    for (let i = 1; i <= 10; i++) {
        const student = await Student.create({
            name: `Student ${i}`,
            email: `student${i}@college.edu`,
            password: studHash,
            department: departments[(i - 1) % 5],
            year: '4',
            cgpa: (6 + Math.random() * 4).toFixed(2), // Random CGPA 6-10
            skills: ['React', 'Node.js', 'Python'],
            verified: i <= 5 ? true : false, // First 5 verified, rest unverified
            phone: `98765432${i.toString().padStart(2, '0')}`,
            studentId: `REG2024${i.toString().padStart(3, '0')}` // Generate ID
        });
        students.push(student);
    }
    console.log('10 Students created (5 verified, 5 unverified). Login: student1@college.edu / password123');

    console.log('Creating Companies...');
    const companies = await Company.create([
        {
            name: 'Tech Giants Inc',
            industry: 'IT Services',
            location: 'Bangalore',
            description: 'Leading IT services company.',
            package: '12 LPA',
            eligibility: { minCgpa: 8.0, departments: ['Computer Science', 'Information Technology'], backlogs: 0 },
            positions: ['Software Engineer', 'System Analyst'],
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            status: 'active'
        },
        {
            name: 'BuildIt Construction',
            industry: 'Infrastructure',
            location: 'Mumbai',
            description: 'Major construction firm.',
            package: '8 LPA',
            eligibility: { minCgpa: 7.0, departments: ['Civil', 'Mechanical'], backlogs: 0 },
            positions: ['Site Engineer'],
            deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            status: 'active'
        },
        {
            name: 'Startup Hub',
            industry: 'SaaS',
            location: 'Remote',
            description: 'Fast growing startup.',
            package: '15 LPA',
            eligibility: { minCgpa: 8.5, departments: ['Computer Science'], backlogs: 0 },
            positions: ['Full Stack Dev'],
            deadline: new Date(Date.now() - 24 * 60 * 60 * 1000), // Expired yesterday
            status: 'closed'
        }
    ]);
    console.log('3 Companies created.');

    console.log('Creating Applications...');
    // Apps for Student 1 (Verified, high CGPA)
    await Application.create({
        studentId: students[0]._id,
        studentName: students[0].name,
        companyId: companies[0]._id,
        companyName: companies[0].name,
        position: companies[0].positions[0],
        status: 'applied',
        appliedDate: new Date()
    });

    // Apps for Student 2
    await Application.create({
        studentId: students[1]._id,
        studentName: students[1].name,
        companyId: companies[0]._id,
        companyName: companies[0].name,
        position: companies[0].positions[1],
        status: 'shortlisted',
        appliedDate: new Date()
    });

    // Apps for Student 3
    await Application.create({
        studentId: students[2]._id,
        studentName: students[2].name,
        companyId: companies[2]._id,
        companyName: companies[2].name,
        position: companies[2].positions[0],
        status: 'selected',
        appliedDate: new Date()
    });

    console.log('Sample applications created.');

    console.log('--- SEEDING COMPLETED ---');
    process.exit();
};

seedData();
