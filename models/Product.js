const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    buyLink: {
        type: String,
        required: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    addedByRole: {
        type: String,
        enum: ['admin', 'mentor'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)