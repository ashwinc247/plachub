const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    studentName: { // Storing name to avoid multiple lookups for simple displays
        type: String,
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    appliedDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending_verification', 'applied', 'shortlisted', 'selected', 'rejected'],
        default: 'pending_verification',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Application', applicationSchema);
