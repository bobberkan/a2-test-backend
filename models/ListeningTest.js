const mongoose = require('mongoose')

const listeningTestSchema = new mongoose.Schema({
	title: { type: String, required: true },
	audioUrl: { type: String, required: true },
	questions: [
		{
			questionText: { type: String, required: true },
			options: [{ type: String, required: true }],
			correctAnswer: { type: String, required: true },
		},
	],
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('ListeningTest', listeningTestSchema)
