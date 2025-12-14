const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Faculty', facultySchema);
