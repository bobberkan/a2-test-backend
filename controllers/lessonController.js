const Lesson = require('../models/Lesson')

exports.createLesson = async (req, res) => {
	try {
		const { title, description } = req.body
		const lesson = await Lesson.create({
			title,
			description,
			createdBy: req.user.id
		})
		res.status(201).json(lesson)
	} catch (err) {
		res.status(500).json({ message: 'Server Error', error: err.message })
	}
}

exports.getLessons = async (req, res) => {
	try {
		const lessons = await Lesson.find({ createdBy: req.user.id })
		res.json(lessons)
	} catch (err) {
		res.status(500).json({ message: 'Server Error', error: err.message })
	}
}

exports.updateLesson = async (req, res) => {
	try {
		const { title, description } = req.body
		const lesson = await Lesson.findByIdAndUpdate(
			req.params.id,
			{ title, description },
			{ new: true }
		)
		res.json(lesson)
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
