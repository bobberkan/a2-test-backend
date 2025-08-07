const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
	question: String,
	options: [String],
	correctAnswer: String,
})

const listeningTestSchema = new mongoose.Schema({
	title: { type: String, required: true },
	audioFilePath: { type: String, required: true },
	questions: [questionSchema],
})

module.exports = mongoose.model('ListeningTest', listeningTestSchema)
