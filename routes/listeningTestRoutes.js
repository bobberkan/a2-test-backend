const express = require('express')
const multer = require('multer')
const { protect } = require('../middlewares/authMiddleware')
const {
	createListeningTest,
	getAllListeningTests,
	deleteListeningTest,
} = require('../controllers/listeningTestController')

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/', protect, upload.single('audio'), createListeningTest)
router.get('/', protect, getAllListeningTests)
router.delete('/:id', protect, deleteListeningTest)

module.exports = router
