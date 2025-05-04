const Course = require('../models/Course')

//Create a course
exports.createCourse = async (req, res) => {
    try {
        if (req.user.role !== 'mentor') {
            return res.status(403).json({ msg: 'Only mentors can create courses' });
        }

        if (!req.body.title) {
            return res.status(400).json({ msg: 'Title is required' });
        }

        const course = await Course.create({
            ...req.body,
            mentor: req.user.id
        });

        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


// Get Mentor's courses
exports.getMyCourses = async (req, res) => {
    try {
        const courses = await Course.find({ mentor: req.user.id })
        res.json(courses)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Update course
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate(
            { _id: req.params.id, mentor: req.user.id },
            req.body,
            { new: true }
        )
        if (!course) return res.status(404).json({ msg: 'Course not found or unauthorized' })
        res.json(course)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Delete course
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({
            _id: req.params.id,
            mentor: req.user.id
        })
        if (!course) return res.status(404).json({ msg: 'Course not found or unauthorized' })
        res.json({ msg: 'Course deleted' })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}