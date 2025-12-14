const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Student = require('./models/Student');

dotenv.config();

const newStudents = [
    {
        name: "Arun Kumar",
        email: "arun.kumar01@example.com",
        phone: "9876543210",
        studentId: "REG2024011",
        password: "Arun@123",
        role: "student",
        department: "CSE",
        year: "3",
        cgpa: 8.2,
        skills: ["JavaScript", "React", "HTML"]
    },
    {
        name: "Priya Raj",
        email: "priya.raj@example.com",
        phone: "9123456780",
        studentId: "REG2024012",
        password: "Priya@123",
        role: "student",
        department: "IT",
        year: "2",
        cgpa: 7.9,
        skills: ["Python", "Django", "SQL"]
    },
    {
        name: "Vignesh S",
        email: "vignesh.s@example.com",
        phone: "9001122334",
        studentId: "REG2024013",
        password: "Vicky@123",
        role: "student",
        department: "ECE",
        year: "4",
        cgpa: 8.5,
        skills: ["Embedded C", "VLSI", "Matlab"]
    },
    {
        name: "Meena Devi",
        email: "meena.devi@example.com",
        phone: "9090901122",
        studentId: "REG2024014",
        password: "Meena@123",
        role: "student",
        department: "EEE",
        year: "3",
        cgpa: 8.1,
        skills: ["Power Systems", "MATLAB", "AutoCAD"]
    },
    {
        name: "Ashwin Chithra",
        email: "ashwin.c@example.com",
        phone: "9845672100",
        studentId: "REG2024015",
        password: "Ashwin@123",
        role: "student",
        department: "CSE",
        year: "1",
        cgpa: 7.8,
        skills: ["HTML", "CSS", "JavaScript"]
    },
    {
        name: "Janani M",
        email: "janani.m@example.com",
        phone: "9988776655",
        studentId: "REG2024016",
        password: "Janani@123",
        role: "student",
        department: "AIML",
        year: "2",
        cgpa: 9.1,
        skills: ["Machine Learning", "Python", "Pandas"]
    },
    {
        name: "Karthik R",
        email: "karthik.r@example.com",
        phone: "9012345678",
        studentId: "REG2024017",
        password: "Karthik@123",
        role: "student",
        department: "MECH",
        year: "4",
        cgpa: 7.5,
        skills: ["SolidWorks", "CAD", "CNC"]
    },
    {
        name: "Sneha R",
        email: "sneha.r@example.com",
        phone: "9091817263",
        studentId: "REG2024018",
        password: "Sneha@123",
        role: "student",
        department: "CSE",
        year: "3",
        cgpa: 8.9,
        skills: ["React", "Node.js", "MongoDB"]
    },
    {
        name: "Harish K",
        email: "harish.k@example.com",
        phone: "9123467890",
        studentId: "REG2024019",
        password: "Harish@123",
        role: "student",
        department: "IT",
        year: "1",
        cgpa: 7.2,
        skills: ["C", "Java", "SQL"]
    },
    {
        name: "Deepika L",
        email: "deepika.l@example.com",
        phone: "9345678123",
        studentId: "REG2024020",
        password: "Deepika@123",
        role: "student",
        department: "BIO",
        year: "2",
        cgpa: 8.3,
        skills: ["Biotech", "Research", "Lab Tools"]
    },
    {
        name: "Saran V",
        email: "saran.v@example.com",
        phone: "9876001122",
        studentId: "REG2024021",
        password: "Saran@123",
        role: "student",
        department: "CSE",
        year: "4",
        cgpa: 9.0,
        skills: ["Next.js", "TypeScript", "Tailwind"]
    },
    {
        name: "Lakshmi P",
        email: "lakshmi.p@example.com",
        phone: "9000876543",
        studentId: "REG2024022",
        password: "Lakshmi@123",
        role: "student",
        department: "ECE",
        year: "2",
        cgpa: 7.7,
        skills: ["Digital Electronics", "IoT", "Arduino"]
    },
    {
        name: "Siva Kumar",
        email: "siva.k@example.com",
        phone: "9445566778",
        studentId: "REG2024023",
        password: "Siva@123",
        role: "student",
        department: "MECH",
        year: "3",
        cgpa: 8.0,
        skills: ["Thermodynamics", "ANSYS", "AutoCAD"]
    },
    {
        name: "Nisha B",
        email: "nisha.b@example.com",
        phone: "9876512345",
        studentId: "REG2024024",
        password: "Nisha@123",
        role: "student",
        department: "IT",
        year: "4",
        cgpa: 8.8,
        skills: ["Java", "Spring Boot", "MySQL"]
    },
    {
        name: "Ragul M",
        email: "ragul.m@example.com",
        phone: "9099123488",
        studentId: "REG2024025",
        password: "Ragul@123",
        role: "student",
        department: "AIML",
        year: "1",
        cgpa: 7.6,
        skills: ["Python", "Data Analysis", "TensorFlow"]
    },
    {
        name: "Harini S",
        email: "harini.s@example.com",
        phone: "9500098877",
        studentId: "REG2024026",
        password: "Harini@123",
        role: "student",
        department: "CSE",
        year: "2",
        cgpa: 8.7,
        skills: ["HTML", "CSS", "Bootstrap"]
    },
    {
        name: "Bharath D",
        email: "bharath.d@example.com",
        phone: "9301124533",
        studentId: "REG2024027",
        password: "Bharath@123",
        role: "student",
        department: "EEE",
        year: "3",
        cgpa: 8.4,
        skills: ["Circuit Design", "MATLAB", "Simulink"]
    },
    {
        name: "Kavya K",
        email: "kavya.k@example.com",
        phone: "9789012344",
        studentId: "REG2024028",
        password: "Kavya@123",
        role: "student",
        department: "ECE",
        year: "1",
        cgpa: 7.4,
        skills: ["Signal Processing", "C Programming", "VHDL"]
    },
    {
        name: "Manoj P",
        email: "manoj.p@example.com",
        phone: "9845012344",
        studentId: "REG2024029",
        password: "Manoj@123",
        role: "student",
        department: "CSE",
        year: "4",
        cgpa: 8.6,
        skills: ["Node.js", "Express", "MongoDB"]
    },
    {
        name: "Swathi V",
        email: "swathi.v@example.com",
        phone: "8923456712",
        studentId: "REG2024030",
        password: "Swathi@123",
        role: "student",
        department: "IT",
        year: "2",
        cgpa: 9.2,
        skills: ["UI/UX", "Figma", "HTML"]
    }
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/plachub2', {});
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const seedExtra = async () => {
    await connectDB();

    console.log(`Starting seed of ${newStudents.length} additional students...`);

    let createdCount = 0;

    for (const s of newStudents) {
        try {
            // Check if exists
            const exists = await Student.findOne({ email: s.email });
            if (exists) {
                // UPDATE user with studentId if they exist but don't have it
                if (!exists.studentId) {
                    exists.studentId = s.studentId;
                    await exists.save();
                    console.log(`Updated existing user with ID: ${s.email}`);
                } else {
                    console.log(`Skipping existing: ${s.email}`);
                }
                continue;
            }

            // Hash Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(s.password, salt);

            // Create
            await Student.create({
                ...s,
                password: hashedPassword,
                verified: true
            });
            console.log(`Added: ${s.email}`);
            createdCount++;
        } catch (error) {
            console.error(`Error adding ${s.email}:`, error.message);
        }
    }

    console.log(`--- Seed Complete. Processed ${newStudents.length} entries. ---`);
    process.exit();
};

seedExtra();
