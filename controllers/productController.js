const Product = require('../models/Product')

// Add a product
exports.addProduct = async (req, res) => {
    try {
        const product = await Product.create({
            ...req.body,
            addedBy: req.user.id,
            addedByRole: req.user.role
        })
        res.status(201).json(product)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Get all products (public)
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 })
        res.json(products)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Update product (owner only)
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, addedby: req.user.id })
        if (!product) return res.status(403).json({ msg: 'Unauthorized or not found' })

        Object.assign(product, req.body)
        await product.save()
        res.json(product)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Delete product (owner only)
exports.deletedProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, addedBy: req.user.id })
        if (!product) return res.status(403).json({ msg: 'Unauthorized or not found' })
        res.json({ msg: 'Product deleted' })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}