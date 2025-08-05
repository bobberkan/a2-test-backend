const Test = require('../models/Test')

// @desc    Create a Test Question
exports.createTest = async (req, res) => {
	try {
		const { question, options, correctAnswer } = req.body
		const test = await Test.create({
			question,
			options,
			correctAnswer,
			createdBy: req.user.id,
		})
		res.status(201).json(test)
	} catch (err) {
		res.status(500).json({ message: 'Server Error', error: err.message })
	}
}

// @desc    Get All Tests (visible to all)
exports.getAllTests = async (req, res) => {
	try {
		const tests = await Test.find()
		res.json(tests)
	} catch (err) {
		res.status(500).json({ message: 'Server Error', error: err.message })
	}
}

// @desc    Update a Test
exports.updateTest = async (req, res) => {
	try {
		const { question, options, correctAnswer } = req.body
		const test = await Test.findByIdAndUpdate(
			req.params.id,
			{ question, options, correctAnswer },
			{ new: true }
		)
		res.json(test)
	} catch (err) {
		res.status(500).json({ message: 'Server Error', error: err.message })
	}
}

// @desc    Delete a Test
exports.deleteTest = async (req, res) => {
	try {
		await Test.findByIdAndDelete(req.params.id)
		res.json({ message: 'Test deleted' })
	} catch (err) {
		res.status(500).json({ message: 'Server Error', error: err.message })
	}
}
