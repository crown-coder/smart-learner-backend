const express = require('express');
const { initiatePayment, verifyPayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/pay', initiatePayment);
router.get('/verify', verifyPayment);

module.exports = router;
