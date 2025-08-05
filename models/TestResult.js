const mongoose = require('mongoose')

const testResultSchema = new mongoose.Schema({
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	testType: {
		type: String,
		enum: ['listening', 'reading', 'writing', 'speaking'],
		required: true,
	},
	score: { type: Number, required: true },
	submittedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('TestResult', testResultSchema)
