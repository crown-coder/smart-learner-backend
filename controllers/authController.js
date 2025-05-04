const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })
}

// Register 
exports.register = async (req, res) => {
    const { fullName, email, password, role } = req.body
    try {
        const existing = await User.findOne({ email })
        if (existing) return res.status(400).json({ msg:'Email already in use' })

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ fullName, email, password: hashed, role })

        res.status(201).json({
            msg: 'Registered successfully',
            token: generateToken(user),
            user: { id: user._id, fullName, email, role: user.role }
        })

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ msg: 'User not found' })

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: 'Invalid Credentials' })

        res.json({
            token: generateToken(user),
            user: { id: user._id, fullName: user.fullName, email, role: user.role }
        })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}