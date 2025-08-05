const express = require('express')
const multer = require('multer')
const {
	createListeningTest,
} = require('../controllers/listeningTestController')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

const storage = multer.memoryStorage() // Using memoryStorage
const upload = multer({ storage })

router.post('/', protect, upload.single('audio'), createListeningTest)

module.exports = router
