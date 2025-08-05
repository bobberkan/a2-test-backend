const express = require('express')
const multer = require('multer')
const { protect } = require('../middlewares/authMiddleware')
const {
    createListeningTest,
    getAvailableListeningTest
} = require('../controllers/listeningTestController')

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/', protect, upload.single('audio'), createListeningTest)
router.get('/available', protect, getAvailableListeningTest)

module.exports = router
