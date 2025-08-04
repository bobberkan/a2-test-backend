const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Lesson', lessonSchema)
