const express = require('express')
const multer = require('multer')
const { protect } = require('../middlewares/authMiddleware')
const {
	createListeningTest,
	getAvailableListeningTest,
	deleteListeningTest,
} = require('../controllers/listeningTestController')

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/', protect, upload.single('audio'), createListeningTest)
router.get('/available', protect, getAvailableListeningTest)
router.delete('/:id', protect, deleteListeningTest)

module.exports = router
