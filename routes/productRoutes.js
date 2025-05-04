const express = require('express')
const router = express.Router()
const productCtrl = require('../controllers/productController')
const { protect, restrictTo } = require('../middlewares/auth')

// Public 
router.get('/', productCtrl.getAllProducts)

// Admin or mentor
router.post('/', protect, restrictTo('admin', 'mentor'), productCtrl.addProduct)
router.put('/:id', protect, restrictTo('admin', 'mentor'), productCtrl.updateProduct)
router.delete('/:id', protect, restrictTo('admin', 'mentor'), productCtrl.deletedProduct)

module.exports = router