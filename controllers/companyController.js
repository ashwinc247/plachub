const Company = require('../models/Company');

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public (or Private based on requirement, usually Student/Faculty/Admin can see)
const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find({}).sort({ createdAt: -1 });
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single company
// @route   GET /api/companies/:id
// @access  Public
const getCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (company) {
            res.status(200).json(company);
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a company
// @route   POST /api/companies
// @access  Private/Admin
const createCompany = async (req, res) => {
    try {
        const company = await Company.create(req.body);
        res.status(201).json(company);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a company
// @route   PUT /api/companies/:id
// @access  Private/Admin
const updateCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        if (company) {
            const updatedCompany = await Company.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            res.status(200).json(updatedCompany);
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a company
// @route   DELETE /api/companies/:id
// @access  Private/Admin
const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        if (company) {
            await company.remove(); // Or findByIdAndDelete
            res.status(200).json({ message: 'Company removed' });
        } else {
            // Trying findByIdAndDelete if remove() is deprecated in newer mongoose
            const deleted = await Company.findByIdAndDelete(req.params.id);
            if (deleted) {
                res.status(200).json({ message: 'Company removed' });
            } else {
                res.status(404).json({ message: 'Company not found' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany,
};
