const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },
    industry: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    package: {
        type: String,
        required: true,
    },
    eligibility: {
        minCgpa: {
            type: Number,
            default: 0,
        },
        departments: [String],
        backlogs: {
            type: Number,
            default: 0,
        },
    },
    positions: [String],
    deadline: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'closed', 'upcoming'],
        default: 'active',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Company', companySchema);
