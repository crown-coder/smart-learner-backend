const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'NGN'
    },
    tx_ref: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    flutterwave_id: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'successful', 'failed'],
        default: 'pending'
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
