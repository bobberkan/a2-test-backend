const ListeningTest = require('../models/ListeningTest')
const fs = require('fs')
const path = require('path')

// POST - Yangi test yuklash
exports.createListeningTest = async (req, res) => {
	try {
		console.log('req.body:', req.body)
		console.log('req.file:', req.file)

		const { title } = req.body

		let questions
		try {
			questions =
				typeof req.body.questions === 'string'
					? JSON.parse(req.body.questions)
					: req.body.questions
		} catch (err) {
			console.error('Failed to parse questions:', req.body.questions)
			return res.status(400).json({ error: 'Invalid questions format' })
		}

		if (!req.file) {
			return res.status(400).json({ error: 'Audio file is required' })
		}

		const audioUrl = req.file.filename

		const newTest = new ListeningTest({
			title,
			audioUrl,
			questions,
		})

		await newTest.save()
		res.status(201).json(newTest)
	} catch (error) {
		console.error('Error in createListeningTest:', error)
		res.status(500).json({ error: error.message })
	}
}

// GET - Barcha testlarni olish
exports.getAllListeningTests = async (req, res) => {
	try {
		const tests = await ListeningTest.find()
		res.json(tests)
	} catch (error) {
		res.status(500).json({ error: 'Server error' })
	}
}

// DELETE - Testni o‘chirish
exports.deleteListeningTest = async (req, res) => {
	try {
		const test = await ListeningTest.findById(req.params.id)
		if (!test) {
			return res.status(404).json({ error: 'Test not found' })
		}

		const audioPath = path.join(
			__dirname,
			'..',
			'uploads',
			path.basename(test.audioUrl)
		)
		if (fs.existsSync(audioPath)) {
			fs.unlinkSync(audioPath)
		}

		await ListeningTest.findByIdAndDelete(req.params.id)
		res.json({ message: 'Test deleted' })
	} catch (error) {
		console.error('Error during deletion:', error)
		res.status(500).json({ error: 'Server error during deletion' })
	}
}
