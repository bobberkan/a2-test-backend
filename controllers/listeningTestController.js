const ListeningTest = require('../models/ListeningTest')
const fs = require('fs')
const path = require('path')

// @desc    Create new listening test
// @route   POST /api/listening-tests
// @access  Private (teacher only)
exports.createListeningTest = async (req, res) => {
	try {
		const { title, questions } = req.body
		const audioFile = req.file

		if (!audioFile) {
			return res.status(400).json({ message: 'Audio file is required' })
		}

		const newTest = new ListeningTest({
			title,
			audioUrl: `/uploads/${audioFile.filename}`,
			questions: JSON.parse(questions),
		})

		await newTest.save()
		res.status(201).json(newTest)
	} catch (err) {
		console.error('Error creating test:', err)
		res.status(500).json({ message: 'Server error while creating test' })
	}
}

// @desc    Get all listening tests
// @route   GET /api/listening-tests
// @access  Public (or student)
exports.getListeningTests = async (req, res) => {
	try {
		const tests = await ListeningTest.find()
		res.json(tests)
	} catch (err) {
		console.error('Error fetching tests:', err)
		res.status(500).json({ message: 'Server error while fetching tests' })
	}
}

// @desc    Delete a listening test
// @route   DELETE /api/listening-tests/:id
// @access  Private (teacher only)
exports.deleteListeningTest = async (req, res) => {
	try {
		const { id } = req.params
		console.log(`Received delete request for ID: ${id}`)

		const test = await ListeningTest.findById(id)
		if (!test) {
			return res.status(404).json({ message: 'Test not found' })
		}

		// Remove audio file from uploads
		const filePath = path.join(
			__dirname,
			'..',
			'uploads',
			path.basename(test.audioUrl)
		)
		fs.unlink(filePath, err => {
			if (err) console.warn('Could not delete audio file:', err.message)
		})

		await ListeningTest.findByIdAndDelete(id)

		res.json({ message: 'Listening test deleted successfully' })
	} catch (err) {
		console.error('Error during deletion:', err)
		res.status(500).json({ message: 'Server error while deleting test' })
	}
}
