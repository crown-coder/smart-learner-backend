const express = require('express');
const router = express.Router();
const paidCoursesController = require('../controllers/paidController');
const { protect } = require('../middlewares/auth');

// @desc    Get all paid courses for authenticated student
// @route   GET /api/paid-courses
// @access  Private (Student only)
router.get('/', protect, paidCoursesController.getMyCourses);

module.exports = router;