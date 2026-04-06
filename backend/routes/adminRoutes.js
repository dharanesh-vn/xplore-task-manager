const express = require('express');
const { getEmployees, toggleApproval, assignTask } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.use(protect, admin);

router.get('/employees', getEmployees);
router.patch('/approve/:id', toggleApproval);
router.post('/tasks', assignTask);

module.exports = router;
