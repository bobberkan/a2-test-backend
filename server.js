const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

// Load environment variables
dotenv.config()

const app = express()

// CORS
app.use(
	cors({
		origin: 'http://localhost:5173', // yoki Vercel frontendi bo‘lsa, uni yozing
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
)

// Body parser
app.use(express.json())

// Serve static files (audio uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
const authRoutes = require('./routes/authRoutes')
const lessonRoutes = require('./routes/lessonRoutes')
const resultRoutes = require('./routes/resultRoutes')
const testRoutes = require('./routes/testRoutes')
const listeningTestRoutes = require('./routes/listeningTestRoutes')

app.use('/api/auth', authRoutes)
app.use('/api/lessons', lessonRoutes)
app.use('/api/results', resultRoutes)
app.use('/api/tests', testRoutes)
app.use('/api/listening-tests', listeningTestRoutes)

// Home route
app.get('/', (req, res) => {
	res.send('A2 Test Backend API is Running')
})

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('MongoDB Connected')
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	})
	.catch(err => {
		console.error('MongoDB Connection Failed:', err)
	})
