const ListeningTest = require('../models/ListeningTest')

exports.createListeningTest = async (req, res) => {
	try {
		const { title } = req.body
		const questions = JSON.parse(req.body.questions)

		const audioUrl = `${req.protocol}://${req.get('host')}/uploads/${
			req.file.filename
		}`

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

exports.getAllListeningTests = async (req, res) => {
	try {
		const tests = await ListeningTest.find()
		res.json(tests)
	} catch (err) {
		res.status(500).json({ message: 'Server Error', error: err.message })
	}
}
