const express = require('express');
const router = express.Router();
const {
    applyForCompany,
    getMyApplications,
    getCompanyApplications,
    updateApplicationStatus,
    getAllApplications
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('student'), applyForCompany);
router.get('/my', protect, authorize('student'), getMyApplications);
router.get('/company/:id', protect, authorize('admin', 'faculty'), getCompanyApplications);
router.put('/:id/status', protect, authorize('admin', 'faculty'), updateApplicationStatus);
router.get('/', protect, authorize('admin', 'faculty'), getAllApplications);

module.exports = router;
