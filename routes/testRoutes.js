const express = require('express');
const router = express.Router();
const { protect, teacherOnly } = require('../middlewares/authMiddleware');
const {
  createTest,
  getAllTests,
  updateTest,
  deleteTest
} = require('../controllers/testController');

// Student & Teacher ko'rishi mumkin:
router.get('/', protect, getAllTests);

// Teacher Only (create/update/delete)
router.post('/', protect, teacherOnly, createTest);
router.put('/:id', protect, teacherOnly, updateTest);
router.delete('/:id', protect, teacherOnly, deleteTest);

module.exports = router;
