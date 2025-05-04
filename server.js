const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const courseRoutes = require('./routes/courseRoutes')
const enrollmentRoutes = require('./routes/enrollmentRoutes')
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')
const productRoutes = require('./routes/productRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const videoRoutes = require('./routes/videoRoutes')
const certificateRoutes = require('./routes/certificateRoutes')

dotenv.config()
connectDB()

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json())

// App routes
app.use('/api/auth', authRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/students', enrollmentRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/products', productRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/videos', videoRoutes)
app.use('/api/certificate', certificateRoutes)

app.get('/', (req, res) => {
    res.send('E-learning API is running...')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))