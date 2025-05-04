const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true })

reviewSchema.index({ course: 1, student: 1 }, { unique: true }) // 1 review per student per course

module.exports = mongoose.model('Review', reviewSchema)