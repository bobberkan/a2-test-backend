const express = require('express')
const router = express.Router()
const { protect, teacherOnly } = require('../middlewares/authMiddleware')
const {
	createTest,
	getAllTests,
	updateTest,
	deleteTest,
} = require('../controllers/testController')

router.get('/', protect, getAllTests)

router.post('/', protect, teacherOnly, createTest)
router.put('/:id', protect, teacherOnly, updateTest)
router.delete('/:id', protect, teacherOnly, deleteTest)

module.exports = router
