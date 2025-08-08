const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const path = require('path')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// 🔧 Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir)
}

// 🔗 MongoDB connection (no deprecated options)
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.error('MongoDB connection error:', err))

// Routes
const testRoutes = require('./routes/testRoutes')
const resultRoutes = require('./routes/resultRoutes')
const listeningTestRoutes = require('./routes/listeningTestRoutes')

app.use('/api/tests', testRoutes)
app.use('/api/results', resultRoutes)
app.use('/api/listening-tests', listeningTestRoutes)

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
