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
const resultRoutes = require('./routes/resultRoutes') // For result submission & fetching
const testRoutes = require('./routes/testRoutes') // For test CRUD operations
const listeningTestRoutes = require('./routes/listeningTestRoutes')


// API Endpoints
app.use('/api/auth', authRoutes)
app.use('/api/lessons', lessonRoutes)
app.use('/api/results', resultRoutes)
app.use('/api/tests', testRoutes)
app.use('/api/listening-tests', listeningTestRoutes)
app.use('/uploads', express.static('uploads'))



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
