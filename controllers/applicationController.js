const Application = require('../models/Application');

// @desc    Apply for a company
// @route   POST /api/applications
// @access  Private/Student
const applyForCompany = async (req, res) => {
    // req.user has { id, role }
    // req.body has { companyId, companyName, position }
    try {
        const { companyId, companyName, position } = req.body;

        // Check if student is verified by faculty
        if (!req.userIs.verified) {
            return res.status(403).json({ message: 'You are not verified by faculty yet. Please contact your department faculty.' });
        }

        // Check if already applied
        const existingApplication = await Application.findOne({
            studentId: req.user.id,
            companyId,
        });

        if (existingApplication) {
            return res.status(400).json({ message: 'Already applied to this company' });
        }

        const application = await Application.create({
            studentId: req.user.id,
            studentName: req.userIs.name, // Derived from authMiddleware populating userIs
            companyId,
            companyName,
            position,
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get my applications
// @route   GET /api/applications/my
// @access  Private/Student
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ studentId: req.user.id }).sort({ appliedDate: -1 });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get applications for a company (Admin/Faculty)
// @route   GET /api/applications/company/:id
// @access  Private/Admin/Faculty
const getCompanyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ companyId: req.params.id }).populate('studentId', 'name email cgpa department resume');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private/Admin/Faculty
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.status(200).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all applications (Admin view)
// @route   GET /api/applications
// @access  Private/Admin
const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find({}).populate('studentId', 'name email').populate('companyId', 'name');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    applyForCompany,
    getMyApplications,
    getCompanyApplications,
    updateApplicationStatus,
    getAllApplications
};
