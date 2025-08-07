const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const listeningTestController = require('../controllers/listeningTestController')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		const uniqueName = `${Date.now()}-${file.originalname}`
		cb(null, uniqueName)
	},
})

const upload = multer({ storage })

// Create
router.post(
	'/',
	upload.single('audio'),
	listeningTestController.createListeningTest
)

// Read
router.get('/', listeningTestController.getAllListeningTests)

// Delete
router.delete('/:id', listeningTestController.deleteListeningTest)

module.exports = router
