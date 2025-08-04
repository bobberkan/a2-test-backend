const Lesson = require('../models/Lesson')

exports.getLessons = async (req, res) => {
	try {
		const lessons = await Lesson.find({ createdBy: req.user.id })
		res.json(lessons)
	} catch (err) {
		res.status(500).json({ message: 'Server Error', error: err.message })
	}
}

exports.createLesson = async (req, res) => {
	try {
		const { title, description } = req.body
		const newLesson = new Lesson({
			title,
			description,
			createdBy: req.user.id,
		})
		await newLesson.save()
		res.status(201).json(newLesson)
	} catch (err) {
		res.status(500).json({ message: 'Server Error', error: err.message })
	}
}

exports.deleteLesson = async (req, res) => {
	try {
		await Lesson.findByIdAndDelete(req.params.id)
		res.json({ message: 'Lesson deleted' })
	} catch (err) {
		res.status(500).json({ message: 'Server Error', error: err.message })
	}
}
