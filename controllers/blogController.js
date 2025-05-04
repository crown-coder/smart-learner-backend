const Blog = require('../models/Blog')

// Create blog
exports.createBlog = async (req, res) => {
    try {
        const blog = await Blog.create({
            title: req.body.title,
            body: req.body.body,
            author: req.user.id,
            authorRole: req.user.role
        })
        res.status(201).json(blog)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Get all blogs (public)
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }).populate('author', 'fullName email')
        res.json(blogs)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Get single blog
exports.getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'fullName email')
        if (!blog) return res.status(404).json({ msg: 'Blog not found' })
        res.json(blog)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Update blog
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id, author: req.user.id })
        if (!blog) return res.status(403).json({ msg: 'Unauthorized or not found' })

        blog.title = req.body.title || blog.title
        blog.body = req.body.body || blog.body
        await blog.save()

        res.json(blog)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

// Delete blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ _id: req.params.id, author: req.user.id })
        if (!blog) return res.status(403).json({ msg: 'Unauthorized or not found' })

        res.json({ msg: 'Blog deleted successfully' })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}