const express = require('express')
const router = express.Router()
const { protect, teacherOnly } = require('../middlewares/authMiddleware')
const {
  createTest,
  getAllTests,
  updateTest,
  deleteTest
} = require('../controllers/testController')

// Routes for Test CRUD (Teachers)
router.post('/', protect, teacherOnly, createTest)
router.get('/', protect, teacherOnly, getAllTests)
router.put('/:id', protect, teacherOnly, updateTest)
router.delete('/:id', protect, teacherOnly, deleteTest)

module.exports = router
