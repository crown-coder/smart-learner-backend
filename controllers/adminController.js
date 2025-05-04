const User = require('../models/User')
const Course = require('../models/Course')
const Enrollment = require('../models/Enrollment')

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.json(users)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Approve mentor
exports.approveMentor = async (req, res) => {
    try {
        const mentor = await User.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        )
        if (!mentor || mentor.role !== 'mentor') {
            return res.status(404).json({ msg: 'Mentor not found' })
        }
        res.json({ msg: 'Mentor approved', mentor })
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

// Block/unblock user
exports.toggleblock = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ msg: 'User not found' })

        user.isBlocked = !user.isBlocked
        await user.save()

        res.json({ msg: user.isBlocked ? 'User blocked' : 'User unbloked' })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Platform stats
exports.getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments()
        const totalMentors = await User.countDocuments({ role: 'mentor' })
        const totalStudents = await User.countDocuments({ role: 'student' })
        const totalCourses = await Course.countDocuments()
        const totalEnrollments = await Enrollment.countDocuments()

        res.json({
            totalUsers,
            totalMentors,
            totalStudents,
            totalCourses,
            totalEnrollments
        })

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}