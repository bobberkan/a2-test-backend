const ListeningTest = require('../models/ListeningTest')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose') // MUHIM: mongoose shu yerda bo'lishi kerak

// CREATE
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

// READ
exports.getAllListeningTests = async (req, res) => {
	try {
		const tests = await ListeningTest.find()
		res.json(tests)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// DELETE
exports.deleteListeningTest = async (req, res) => {
	try {
		const { id } = req.params

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: 'Invalid ID format' })
		}

		const test = await ListeningTest.findById(id)
		if (!test) {
			return res.status(404).json({ message: 'Test not found' })
		}

		// Delete the audio file
		const filePath = path.join(__dirname, '..', 'uploads', test.audioUrl)
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath)
		}

		await ListeningTest.findByIdAndDelete(id)
		res.json({ message: 'Test deleted successfully' })
	} catch (err) {
		console.error('Error deleting Listening Test:', err)
		res.status(500).json({ message: 'Server Error' })
	}
}
