const express = require('express')
const router = express.Router()
const courseCtrl = require('../controllers/courseController')
const { protect, restrictTo } = require('../middlewares/auth')

//Mentor routes
router.post('/', protect, restrictTo('mentor'), courseCtrl.createCourse)
router.get('/my-courses', protect, restrictTo('mentor'), courseCtrl.getMyCourses)
router.put('/:id', protect, restrictTo('mentor'), courseCtrl.updateCourse)
router.delete('/:id', protect, restrictTo('mentor'), courseCtrl.deleteCourse)

module.exports = router