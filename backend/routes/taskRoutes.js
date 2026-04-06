const express = require('express');
const { getMyTasks, updateTaskStatus, getAllTasks } = require('../controllers/taskController');
const { protect, approvedEmployee, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/mine', protect, approvedEmployee, getMyTasks);
router.patch('/:id/status', protect, approvedEmployee, updateTaskStatus);

// Admin can also view all tasks
router.get('/all', protect, admin, getAllTasks);

module.exports = router;
