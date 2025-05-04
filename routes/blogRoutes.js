const express = require('express')
const router = express.Router()
const blogCtrl = require('../controllers/blogController')
const { protect, restrictTo } = require('../middlewares/auth')

// Public
router.get('/', blogCtrl.getAllBlogs)
router.get('/:id', blogCtrl.getBlog)

// Auth: admin or mentor
router.post('/', protect, restrictTo('admin', 'mentor'), blogCtrl.createBlog)
router.put('/:id', protect, restrictTo('admin', 'mentor'), blogCtrl.updateBlog)
router.delete('/:id', protect, restrictTo('admin', 'mentor'), blogCtrl.deleteBlog)

module.exports = router