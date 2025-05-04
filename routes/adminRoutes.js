const express = require('express')
const router = express.Router()
const adminCtrl = require('../controllers/adminController')
const { protect, restrictTo } = require('../middlewares/auth')

// Admin only
router.get('/users', protect, restrictTo('admin'), adminCtrl.getAllUsers)
router.put('/approve-mentor/:id', protect, restrictTo('admin'), adminCtrl.approveMentor)
router.put('/block-user/:id', protect, restrictTo('admin'), adminCtrl.toggleblock)
router.get('/stats', protect, restrictTo('admin'), adminCtrl.getStats)

module.exports = router