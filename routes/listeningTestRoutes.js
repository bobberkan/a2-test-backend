const express = require('express')
const router = express.Router()
const { protect, teacherOnly } = require('../middlewares/authMiddleware')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const {
	createListeningTest,
	getAllListeningTests,
} = require('../controllers/listeningTestController')

// Teacher Upload Test
router.post(
	'/',
	protect,
	teacherOnly,
	upload.single('audio'),
	createListeningTest
)

// Students View Tests
router.get('/', protect, getAllListeningTests)

module.exports = router
