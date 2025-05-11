const Payment = require('../models/Payment');

exports.getMyCourses = async (req, res) => {
    try {
        // Debug: log the entire user object
        // console.log('User from token:', req.user);

        // Ensure user is authenticated and has _id
        if (!req.user?._id) {
            return res.status(401).json({
                success: false,
                message: 'User authentication failed'
            });
        }

        const studentId = req.user._id;

        // Debug: log the studentId being used for query
        // console.log('Searching courses for student ID:', studentId);

        const payments = await Payment.find({
            student: studentId,
            status: 'successful',
        }).populate({
            path: 'course',
            select: 'title instructor duration rating category thumbnail'
        });

        if (!payments || payments.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No purchased courses found',
                data: []
            });
        }

        const purchasedCourses = payments.map(payment => ({
            id: payment.course._id,
            title: payment.course.title,
            instructor: payment.course.instructor,
            duration: payment.course.duration,
            rating: payment.course.rating,
            category: payment.course.category,
            thumbnail: payment.course.thumbnail || 'https://via.placeholder.com/300x200?text=Course',
            purchaseDate: payment.paidAt
        })).filter(course => course.id); // Filter out any invalid entries

        res.status(200).json({
            success: true,
            data: purchasedCourses
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};