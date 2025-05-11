const axios = require('axios');
const Course = require('../models/Course');
const User = require('../models/User');
const Payment = require('../models/Payment'); // <-- Required


const initiatePayment = async (req, res) => {
    const { studentEmail, courseId } = req.body;

    try {
        const course = await Course.findById(courseId);
        const student = await User.findOne({ email: studentEmail });

        if (!course || !student) {
            return res.status(404).json({ msg: 'Course or student not found' });
        }

        const tx_ref = `TX-${Date.now()}`;

        await Payment.create({
            student: student._id, // store as ObjectId
            course: course._id,
            amount: course.price,
            tx_ref,
            status: 'pending'
        });

        const response = await axios.post('https://api.flutterwave.com/v3/payments', {
            tx_ref,
            amount: course.price,
            currency: "NGN",
            redirect_url: `${process.env.BASE_URL}/api/payment/verify`,
            customer: {
                email: student.email,
                name: student.name
            },
            customizations: {
                title: "Course Enrollment",
                description: `Payment for ${course.title}`
            }
        }, {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET}`
            }
        });

        return res.status(200).json({ link: response.data.data.link });

    } catch (err) {
        console.error("Payment initiation failed:", err.response?.data || err.message, err.stack);
        res.status(500).json({ msg: 'Payment initiation failed' });
    }
};


const verifyPayment = async (req, res) => {
    const { transaction_id } = req.query;

    try {
        const verifyRes = await axios.get(
            `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.FLW_SECRET}`
                }
            }
        );

        const data = verifyRes.data.data;

        if (data.status === 'successful') {
            const tx_ref = data.tx_ref;
            const flutterwave_id = data.id;

            // Update payment record
            await Payment.findOneAndUpdate(
                { tx_ref },
                {
                    status: 'successful',
                    flutterwave_id,
                    paidAt: new Date()
                }
            );

            return res.redirect(`${process.env.FRONTEND_URL}/payment-success`);
        }

        res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ msg: 'Verification failed' });
    }
};

module.exports = {
    initiatePayment,
    verifyPayment
};
