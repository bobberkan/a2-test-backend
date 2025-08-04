const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }], // [Option A, Option B, Option C, Option D]
  correctAnswer: { type: String, required: true }, // eg. "A" or "B"
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Test', testSchema)
