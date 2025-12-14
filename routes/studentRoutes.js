const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateProfile,
    getAllStudents,
    verifyStudent,
} = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/profile', protect, authorize('student'), getProfile);
router.put('/profile', protect, authorize('student'), updateProfile);
router.get('/', protect, authorize('admin', 'faculty'), getAllStudents);
router.put('/:id/verify', protect, authorize('faculty'), verifyStudent);

module.exports = router;
