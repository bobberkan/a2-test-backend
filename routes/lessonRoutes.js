const express = require('express')
const router = express.Router()
const { getLessons, createLesson, deleteLesson } = require('../controllers/lessonController')
const authMiddleware = require('../middlewares/authMiddleware')

router.use(authMiddleware)

router.get('/', getLessons)
router.post('/', createLesson)
router.delete('/:id', deleteLesson)

module.exports = router
