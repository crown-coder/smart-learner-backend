const express = require('express')
const router = express.Router()
const certController = require('../controllers/certificateController')
const { protect, restrictTo } = require('../middlewares/auth')

//Generate certificate (student)
router.post('/', protect, certController.generateCertificate)
router.get('/my', protect, certController.getMyCertificates)

// Admin: View all certificates
router.get('/', protect, restrictTo('admin'), certController.getAllCertificates)

module.exports = router