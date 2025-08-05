const ListeningTest = require('../models/ListeningTest')

// Upload Listening Test
exports.createListeningTest = async (req, res) => {
	try {
		const { title } = req.body
		const questions = JSON.parse(req.body.questions)

		if (!req.file) {
			return res.status(400).json({ message: 'No audio file uploaded' })
		}

		const newTest = await ListeningTest.create({
			title,
			audioUrl: req.file.filename, // Faqat filename saqlaymiz
			questions,
			createdBy: req.user.id,
		})

		res.status(201).json(newTest)
	} catch (err) {
		console.error('Error creating Listening Test:', err)
		res.status(500).json({ message: 'Server Error', error: err.message })
	}
}
