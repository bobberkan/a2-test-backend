const express = require('express')
const router = express.Router()
const { submitResult, getAllResults } = require('../controllers/testResultController')
const { protect, teacherOnly } = require('../middlewares/authMiddleware')

// Student submits result
router.post('/submit', protect, submitResult)

// Teacher views all results
router.get('/all', protect, teacherOnly, getAllResults)

module.exports = router
