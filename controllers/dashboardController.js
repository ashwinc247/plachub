const Student = require('../models/Student');
const Company = require('../models/Company');
const Application = require('../models/Application');
const Faculty = require('../models/Faculty');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getStats = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalCompanies = await Company.countDocuments();
        const totalApplications = await Application.countDocuments();
        const totalFaculty = await Faculty.countDocuments(); // Optional
        const activeCompanies = await Company.countDocuments({ status: 'active' });
        const placedStudents = await Application.countDocuments({ status: 'selected' }); // Assuming unique students, but this counts applications. For unique students, distinct is needed.

        // Accurate placed students count (distinct studentIds with status 'selected')
        const placedStudentsCount = (await Application.distinct('studentId', { status: 'selected' })).length;

        // Pending verifications
        const pendingVerifications = await Student.countDocuments({ verified: false });

        res.status(200).json({
            totalStudents,
            totalCompanies,
            totalApplications,
            totalFaculty,
            activeCompanies,
            placedStudents: placedStudentsCount,
            pendingVerifications,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getStats,
};
