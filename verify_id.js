const mongoose = require('mongoose');
const Student = require('./models/Student');
const dotenv = require('dotenv');

dotenv.config();

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/plachub2', {});
        console.log('MongoDB Connected');

        const student = await Student.findOne({});
        if (student) {
            console.log('Sample Student Data:');
            console.log(`Name: ${student.name}`);
            console.log(`Email: ${student.email}`);
            console.log(`Student ID: ${student.studentId}`); // This is what we want to verify
            console.log(`Phone: ${student.phone}`);
            console.log(`Role: ${student.role}`);
        } else {
            console.log('No students found.');
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkData();
