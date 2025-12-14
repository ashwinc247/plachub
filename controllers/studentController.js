const Student = require('../models/Student');

// @desc    Get student profile
// @route   GET /api/students/profile
// @access  Private/Student
const getProfile = async (req, res) => {
    // req.userIs is populated by authMiddleware
    res.status(200).json(req.userIs);
};

// @desc    Update student profile
// @route   PUT /api/students/profile
// @access  Private/Student
const updateProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id);

        if (student) {
            student.name = req.body.name || student.name;
            student.phone = req.body.phone || student.phone;
            student.department = req.body.department || student.department;
            student.year = req.body.year || student.year;
            student.cgpa = req.body.cgpa || student.cgpa;
            student.skills = req.body.skills || student.skills;
            student.resume = req.body.resume || student.resume;
            student.avatar = req.body.avatar || student.avatar;

            if (req.body.password) {
                // Note: Ideally should hash password here if changed, but for simplicity assuming separate change password route or handled here with bcrypt
                // If implementing password change here:
                // const salt = await bcrypt.genSalt(10);
                // student.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedStudent = await student.save();
            res.status(200).json(updatedStudent);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Admin/Faculty
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({}).select('-password');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify student
// @route   PUT /api/students/:id/verify
// @access  Private/Faculty
const verifyStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student) {
            student.verified = true; // Or toggle: !student.verified
            const updatedStudent = await student.save();
            res.status(200).json(updatedStudent);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    getAllStudents,
    verifyStudent,
};
