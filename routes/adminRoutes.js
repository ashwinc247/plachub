const express = require('express');
const router = express.Router();
const {
    getAllFaculty,
    deleteStudent,
    deleteFaculty,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/faculty', protect, authorize('admin'), getAllFaculty);
router.delete('/student/:id', protect, authorize('admin'), deleteStudent);
router.delete('/faculty/:id', protect, authorize('admin'), deleteFaculty);

module.exports = router;
