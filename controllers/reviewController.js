const Review = require('../models/Review')
const Enrollment = require('../models/Enrollment')

// Add a review
exports.addReview = async (req, res) => {
    try {
        const { courseId } = req.params
        const [rating, comment] = req.body

        // Chech if user is enrolled
        const enrolled = await Enrollment.findOne({ course: courseId, student: req.user.id })
        if (!enrolled) return res.status(403).json({ msg: 'You must be enrolled to review this course' })

        const review = await Review.create({
            course: courseId,
            student: req.user.id,
            rating,
            comment
        })

        res.status(201).json(review)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Get all reviews for a course
exports.getCourseReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ course: req.params.courseId }).populate('student', 'fullName')
        res.json(reviews)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}