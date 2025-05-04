const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'mentor', 'student'],
        default: 'student',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)