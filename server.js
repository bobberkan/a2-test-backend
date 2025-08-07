const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

// Load env variables
dotenv.config()

const app = express()

// Middlewares
app.use(
	cors({
		origin: ['http://localhost:5173', 'https://a2-test-frontend.vercel.app/'], // ← 2 ta origin bo‘lishi mumkin
		methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
)

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // ← file upload bo‘lsa kerak bo‘ladi

// Serve static files
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

app.get('/', (req, res) => {
	res.send('A2 Test Backend API is Running')
})

// Global error handler (foydali log uchun)
app.use((err, req, res, next) => {
	console.error('❌ Global Error:', err.stack)
	res.status(500).json({ message: 'Internal Server Error' })
})

const PORT = process.env.PORT || 5000

// Connect to MongoDB and start server
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB Connected')
		app.listen(PORT, () =>
			console.log(`Server running on http://localhost:${PORT}`)
		)
	})
	.catch(err => {
		console.error('MongoDB Connection Failed', err)
	})
