const ListeningTest = require('../models/ListeningTest')
const path = require('path')
const fs = require('fs')

exports.createListeningTest = async (req, res) => {
	try {
		console.log('File:', req.file)
		console.log('Body:', req.body)

		const { title } = req.body
		const questions = JSON.parse(req.body.questions)

		if (!req.file) {
			return res.status(400).json({ message: 'No audio file uploaded' })
		}

		const fileName = `${Date.now()}_${req.file.originalname}`
		const filePath = path.join(__dirname, '..', 'uploads', fileName)
		fs.writeFileSync(filePath, req.file.buffer)

		const newTest = await ListeningTest.create({
			title,
			audioUrl: fileName,
			questions,
			createdBy: req.user.id,
		})

		res.status(201).json(newTest)
	} catch (err) {
		console.error('Error creating Listening Test:', err)
		res.status(500).json({ message: 'Server Error', error: err.message })
	}
}

exports.getAvailableListeningTest = async (req, res) => {
	try {
		const test = await ListeningTest.findOne()
		if (!test) {
			return res.status(404).json({ message: 'No Listening Tests available' })
		}
		res.json(test)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server Error' })
	}
}
