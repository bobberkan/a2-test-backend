const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }], // [A, B, C, D]
  correctAnswer: { type: String, required: true }, // eg. "A"
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Test', testSchema)
