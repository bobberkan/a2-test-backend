const ListeningTest = require('../models/ListeningTest')
const path = require('path')
const fs = require('fs')

// Upload Listening Test
exports.createListeningTest = async (req, res) => {
	try {
		const { title } = req.body
		const questions = JSON.parse(req.body.questions) // <-- Correctly parse questions

		if (!req.file) {
			return res.status(400).json({ message: 'No audio file uploaded' })
		}

		// Save audio file to 'uploads' directory
		const fileName = `${Date.now()}_${req.file.originalname}`
		const filePath = path.join(__dirname, '..', 'uploads', fileName)
		fs.writeFileSync(filePath, req.file.buffer)

		const newTest = await ListeningTest.create({
			title,
			audioUrl: fileName, // Save only the file name
			questions,
			createdBy: req.user.id,
		})

		res.status(201).json(newTest)
	} catch (err) {
		console.error('Error creating Listening Test:', err)
		res.status(500).json({ message: 'Server Error', error: err.message })
	}
}
