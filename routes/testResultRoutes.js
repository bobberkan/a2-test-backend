const express = require('express')
const router = express.Router()
const { submitResult, getAllResults } = require('../controllers/testResultController')
const { protect, teacherOnly } = require('../middlewares/authMiddleware')

router.post('/submit', protect, submitResult) // Student submit qiladi
router.get('/all', protect, teacherOnly, getAllResults) // Teacher ko‘radi

module.exports = router
