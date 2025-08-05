const ListeningTest = require('../models/ListeningTest')

// Upload Listening Test
exports.createListeningTest = async (req, res) => {
	try {
		const { title, questions } = req.body
		const audioUrl = req.file.path // Multer uploads audio here

		const newTest = await ListeningTest.create({
			title,
			audioUrl,
			questions,
			createdBy: req.user.id,
		})

		res.status(201).json(newTest)
	} catch (err) {
		res.status(500).json({ message: 'Server Error', error: err.message })
	}
}

// Get All Listening Tests
exports.getAllListeningTests = async (req, res) => {
	try {
		const tests = await ListeningTest.find()
		res.json(tests)
	} catch (err) {
		res.status(500).json({ message: 'Server Error', error: err.message })
	}
}
