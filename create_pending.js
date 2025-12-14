const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Student = require('./models/Student');

dotenv.config();

const createUnverified = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/plachub2', {});

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('password123', salt);

        await Student.create({
            name: "Demo Pending User",
            email: "pending.demo@example.com",
            phone: "0000000000",
            password: password,
            role: "student",
            department: "Civil",
            year: "1",
            cgpa: 6.5,
            verified: false // EXPLICITLY UNVERIFIED
        });

        console.log("Created: pending.demo@example.com (Unverified)");

        // Count to confirm
        const total = await Student.countDocuments();
        const pending = await Student.countDocuments({ verified: false });
        console.log(`New Stats -> Total: ${total}, Pending: ${pending}`);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createUnverified();
