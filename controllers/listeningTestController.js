const ListeningTest = require('../models/ListeningTest')
const fs = require('fs')
const path = require('path')

exports.createListeningTest = async (req, res) => {
	try {
		const { title, questions } = req.body
		const parsedQuestions = JSON.parse(questions)
		const audioFile = req.file

		if (!audioFile) {
			return res.status(400).json({ message: 'Audio file is required' })
		}

		const newTest = new ListeningTest({
			title,
			audioUrl: `/uploads/${audioFile.filename}`, // ← path emas, URL
			questions: parsedQuestions,
			// createdBy: req.user._id ← agar auth ishlayotgan bo‘lsa
		})

		await newTest.save()
		res.status(201).json(newTest)
	} catch (error) {
		console.error('Error uploading listening test:', error)
		res.status(500).json({ message: 'Server error' })
	}
}

exports.getAllListeningTests = async (req, res) => {
	try {
		const tests = await ListeningTest.find()
		res.status(200).json(tests)
	} catch (error) {
		console.error('Error fetching listening tests:', error)
		res.status(500).json({ message: 'Server error' })
	}
}

exports.deleteListeningTest = async (req, res) => {
	try {
		const { id } = req.params
		const test = await ListeningTest.findById(id)
		if (!test) {
			return res.status(404).json({ message: 'Test not found' })
		}

		// Delete audio file if exists
		const filePath = path.join(__dirname, '..', test.audioUrl)
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath)
		}

		await ListeningTest.findByIdAndDelete(id)
		res.status(200).json({ message: 'Test deleted successfully' })
	} catch (error) {
		console.error('Error deleting listening test:', error)
		res.status(500).json({ message: 'Server error' })
	}
}
