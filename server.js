const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/authRoutes'))

app.get('/', (req, res) => {
	res.send('A2 Test Backend API is Running')
})

// MongoDB Connection
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('MongoDB Connected')
		app.listen(process.env.PORT, () => {
			console.log(`Server is running on port ${process.env.PORT}`)
		})
	})
	.catch(err => console.error(err))
