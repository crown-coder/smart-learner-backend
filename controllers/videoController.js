const Video = require('../models/Video');
const Course = require('../models/Course');

// Add video to a course
exports.addVideo = async (req, res) => {
    try {
        if (req.user.role !== 'mentor') {
            return res.status(403).json({ msg: 'Only mentors can upload videos' });
        }

        const course = await Course.findById(req.body.course);
        if (!course) return res.status(404).json({ msg: 'Course not found' });

        if (course.mentor.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'You can only add videos to your own courses' });
        }

        const video = await Video.create({
            ...req.body
        });

        res.status(201).json(video);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Get videos by course
exports.getVideosByCourse = async (req, res) => {
    try {
        const videos = await Video.find({ course: req.params.courseId });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Delete a video
exports.deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json({ msg: 'Video not found' });

        // Only mentor who owns the course can delete
        const course = await Course.findById(video.course);
        if (course.mentor.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Unauthorized' });
        }

        await video.deleteOne();
        res.json({ msg: 'Video deleted' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
