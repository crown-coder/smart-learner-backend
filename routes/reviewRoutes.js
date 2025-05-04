const express = require('express')
const router = express.Router()
const reviewCtrl = require('../controllers/reviewController')
const { protect, restrictTo } = require('../middlewares/auth')

// Public
router.get('/:courseId', reviewCtrl.getCourseReviews)

// Students only
router.post('/:courseId', protect, restrictTo('student'), reviewCtrl.addReview)

module.exports = router