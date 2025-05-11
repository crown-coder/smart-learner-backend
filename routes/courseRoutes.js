const express = require('express')
const router = express.Router()
const courseCtrl = require('../controllers/courseController')
const { protect, restrictTo } = require('../middlewares/auth')

// Public routes
router.get('/all', courseCtrl.getAllCourses);

router.get('/my-courses', protect, restrictTo('mentor'), courseCtrl.getMyCourses);

// Mentor-only routes
router.post('/', protect, restrictTo('mentor'), courseCtrl.createCourse)
router.put('/:id', protect, restrictTo('mentor'), courseCtrl.updateCourse)
router.delete('/:id', protect, restrictTo('mentor'), courseCtrl.deleteCourse)
router.get('/:id', courseCtrl.getCourseById)
module.exports = router;
