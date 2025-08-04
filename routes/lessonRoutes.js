const express = require('express')
const router = express.Router()
const {
	createLesson,
	getLessons,
	updateLesson,
	deleteLesson
} = require('../controllers/lessonController')
const { protect } = require('../middlewares/authMiddleware');

// Protected routes
router.post('/', protect, createLesson)
router.get('/', protect, getLessons)
router.put('/:id', protect, updateLesson)
router.delete('/:id', protect, deleteLesson)

module.exports = router
