const express = require('express');
const router = express.Router();
const { addVideo, getVideosByCourse, deleteVideo } = require('../controllers/videoController');
const { protect, restrictTo } = require('../middlewares/auth')

router.post('/', protect, restrictTo('mentor'),  addVideo);

// Get all videos for a course (any role)
router.get('/:courseId', getVideosByCourse);

router.delete('/:id', protect, restrictTo('mentor'),  deleteVideo);

module.exports = router;
