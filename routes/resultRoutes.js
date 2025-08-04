const express = require('express')
const router = express.Router()
const { submitResult, getAllResults } = require('../controllers/testResultController')
const { protect, teacherOnly } = require('../middlewares/authMiddleware')

router.post('/submit', protect, submitResult)
router.get('/all', protect, teacherOnly, getAllResults)

module.exports = router
