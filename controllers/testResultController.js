const TestResult = require('../models/TestResult')

exports.submitResult = async (req, res) => {
  try {
    const { testType, score } = req.body
    const studentId = req.user.id

    const result = await TestResult.create({
      student: studentId,
      testType,
      score
    })

    res.status(201).json(result)
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message })
  }
}

exports.getAllResults = async (req, res) => {
  try {
    const results = await TestResult.find().populate('student', 'name email')
    res.json(results)
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message })
  }
}
