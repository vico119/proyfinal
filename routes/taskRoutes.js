const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} = require('../controllers/taskController');

router.use(authenticateToken);

router.get('/', authenticateToken, getTasks);
router.post('/', authenticateToken, createTask);
router.put('/:id', authenticateToken, updateTask);
router.delete('/:id', authenticateToken, deleteTask);
router.get('/:id', authenticateToken, getTaskById);
router.get('/tasks', authenticateToken, getTasks);

module.exports = router;