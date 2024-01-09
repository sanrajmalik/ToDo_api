// routes/todoRoutes.js
const express = require('express');
const todoController = require('../Controllers/TodoController');
const authenticate = require('../Middlewares/authenticate');

const router = express.Router();

router.use(authenticate);

router.get('/todos', async (req, res) => {
  const userId = req.userId;
  const todos =     await todoController.getAllTodos(userId);
  res.json(todos);
});

router.post('/todos', async (req, res) => {
  const userId = req.userId;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const todo = await todoController.createTodo(userId, title);
  res.json(todo);
});

module.exports = router;
