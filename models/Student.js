const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    studentId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    cgpa: {
        type: Number,
        default: 0,
    },
    resume: {
        type: String, // URL to resume
    },
    skills: [String],
    verified: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);
