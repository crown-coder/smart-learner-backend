const Certificate = require('../models/Certificate')
const Course = require('../models/Course')
const { v4: uuidv4 } = require('uuid')

// Generate certificate after course completion
exports.generateCertificate = async (req, res) => {
    try {
        const { courseId } = req.body

        // Check if certificate already exists
        const exists = await Certificate.findOne({
            course: courseId,
            student: req.user.id,
        })

        if (exists) return res.status(400).json({ msg: 'Certificate already issued' })

        const certificate = await Certificate.create({
            course: courseId,
            student: req.user.id,
            certificateId: uuidv4(),
        })

        res.status(201).json(certificate)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Get student's certificates
exports.getMyCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find({ student: req.user.id }).populate('course')
        res.json(certificates)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Admin: Get all certificates
exports.getAllCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find().populate('course student')
        res.json(certificates)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}