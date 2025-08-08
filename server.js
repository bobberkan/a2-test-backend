const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// 🔧 uploads papkasini yaratish (agar mavjud bo'lmasa)
const uploadPath = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadPath)) {
	fs.mkdirSync(uploadPath)
	console.log('✅ uploads/ papkasi yaratildi.')
}

// 🔌 Middleware'lar
app.use(cors())
app.use(express.json())
app.use(fileUpload())

// 📁 Static folder – audio fayllarni ochish uchun kerak
app.use('/uploads', express.static(uploadPath))

// 🔗 MongoDB ulanish
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('✅ MongoDB connected'))
	.catch(err => console.error('❌ MongoDB connection error:', err))

// 🛣️ Routing
const testRoutes = require('./routes/testRoutes')
const resultRoutes = require('./routes/resultRoutes')
const listeningTestRoutes = require('./routes/listeningTestRoutes')

app.use('/api/tests', testRoutes)
app.use('/api/results', resultRoutes)
app.use('/api/listening-tests', listeningTestRoutes)

// 🚀 Serverni ishga tushurish
app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`)
})
