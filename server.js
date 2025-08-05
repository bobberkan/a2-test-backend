const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

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
