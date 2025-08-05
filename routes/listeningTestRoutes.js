const express = require('express')
const multer = require('multer')
const {
	createListeningTest,
} = require('../controllers/listeningTestController')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

// Disk Storage Multer config
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '_' + file.originalname)
	},
})
const upload = multer({ storage })

router.post('/', protect, upload.single('audio'), createListeningTest)

module.exports = router
