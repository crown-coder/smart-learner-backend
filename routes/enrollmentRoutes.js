const express = require('express')
const router = express.Router()
const enrollCtrl = require('../controllers/enrollmentController')
const { protect, restrictTo } = require('../middlewares/auth')

// Public: list all courses
router.get('/all', enrollCtrl.getAllCourses)

// Student: enroll in a course
router.post('/enroll/:id', protect, restrictTo('student'), enrollCtrl.enroll)

// Student: get enrolled courses
router.get('/my-courses', protect, restrictTo('student'), enrollCtrl.getAllCourses)

module.exports = router;