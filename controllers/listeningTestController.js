const ListeningTest = require('../models/ListeningTest')
const path = require('path')
const fs = require('fs')

exports.createListeningTest = async (req, res) => {
	try {
		const { title } = req.body
		const questions = JSON.parse(req.body.questions)

		if (!req.file) {
			return res.status(400).json({ message: 'No audio file uploaded' })
		}

		const uploadsDir = path.join(__dirname, '..', 'uploads')
		if (!fs.existsSync(uploadsDir)) {
			fs.mkdirSync(uploadsDir)
		}

		const fileName = `${Date.now()}_${req.file.originalname}`
		const filePath = path.join(uploadsDir, fileName)
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
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.getAllListeningTests = async (req, res) => {
	try {
		const tests = await ListeningTest.find()
		res.json(tests)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.deleteListeningTest = async (req, res) => {
	try {
		const test = await ListeningTest.findById(req.params.id)
		if (!test) {
			return res.status(404).json({ message: 'Test not found' })
		}

		// Delete the audio file
		const filePath = path.join(__dirname, '..', 'uploads', test.audioUrl)
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath)
		}

		await test.remove()
		res.json({ message: 'Test deleted successfully' })
	} catch (err) {
		console.error('Error deleting Listening Test:', err)
		res.status(500).json({ message: 'Server Error' })
	}
}
