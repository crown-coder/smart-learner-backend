const Enrollment = require('../models/Enrollment')
const Course = require('../models/Course')

// Get all available courses (public)
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('mentor', 'fullName email')
        res.json(courses)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Enroll in a course
exports.enroll = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ msg: 'Course not found' })

        const enrollment = await Enrollment.create({
            student: req.user.id,
            course: course._id
        })

        res.status(201).json({ msg: 'Enrolled sucessfully', enrollment })
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ msg: 'Already enrolled' })
        } else {
            res.status(500).json({ msg: err.message })
        }
    }
}

// Get student's enrolled courses
exports.getMyCourses = async (req, res) => {
    try {
        const enrolled = await Enrollment.find({ student: req.user.id }).populate({
            path: 'course',
            populate: { path: 'mentor', select: 'fullName email' }
        })
        res.json(enrolled.map((e) => e.course))
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}