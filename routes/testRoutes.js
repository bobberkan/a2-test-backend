const express = require('express')
const router = express.Router()
const { protect, teacherOnly } = require('../middlewares/authMiddleware')
const {
	createTest,
	getAllTests,
	updateTest,
	deleteTest,
} = require('../controllers/testController') // submitResult olib tashlandi

// Test uchun route-lar
router.post('/', protect, createTest)
router.get('/all', protect, teacherOnly, getAllTests)
router.put('/:id', protect, teacherOnly, updateTest)
router.delete('/:id', protect, teacherOnly, deleteTest)

module.exports = router
