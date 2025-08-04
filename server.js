const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

// Load env variables
dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
const authRoutes = require('./routes/authRoutes')
const lessonRoutes = require('./routes/lessonRoutes')
const testResultRoutes = require('./routes/testResultRoutes')

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/lessons', lessonRoutes)
app.use('/api/test-results', testResultRoutes)

// Home route
app.get('/', (req, res) => {
	res.send('A2 Test Backend API is Running')
})

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 5000

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('MongoDB Connected')
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	})
	.catch(err => {
		console.error('MongoDB Connection Failed', err)
	})
