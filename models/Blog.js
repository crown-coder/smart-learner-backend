const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorRole: {
        type: String,
        enum: ['admin', 'mentor'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true })

module.exports = mongoose.model('Blog', blogSchema)