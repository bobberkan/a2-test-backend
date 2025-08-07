const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const listeningTestController = require('../controllers/listeningTestController')

// Multer settings for audio upload
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	},
})

const upload = multer({ storage })

// Routes
router.post(
	'/',
	upload.single('audio'),
	listeningTestController.createListeningTest
)

router.get('/', listeningTestController.getListeningTests)

router.delete('/:id', listeningTestController.deleteListeningTest)

module.exports = router
