const express = require('express')
const multer = require('multer')
const {
	createListeningTest,
	getAllListeningTests,
} = require('../controllers/listeningTestController')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/') // Fayllar uploads/ papkaga saqlanadi
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	},
})

const upload = multer({ storage })

router.post('/', protect, upload.single('audio'), createListeningTest)
router.get('/', protect, getAllListeningTests)

module.exports = router
