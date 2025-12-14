const Student = require('../models/Student');
const Faculty = require('../models/Faculty');

// @desc    Get all faculty
// @route   GET /api/admin/faculty
// @access  Private/Admin
const getAllFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.find({}).select('-password');
        res.status(200).json(faculty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a student
// @route   DELETE /api/admin/student/:id
// @access  Private/Admin
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (student) {
            res.status(200).json({ message: 'Student removed' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a faculty
// @route   DELETE /api/admin/faculty/:id
// @access  Private/Admin
const deleteFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndDelete(req.params.id);
        if (faculty) {
            res.status(200).json({ message: 'Faculty removed' });
        } else {
            res.status(404).json({ message: 'Faculty not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFaculty,
    deleteStudent,
    deleteFaculty,
};
