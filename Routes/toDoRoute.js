// routes/todoRoutes.js
const express = require('express');
const authenticate = require('../Middlewares/authenticate');
const todo = require('../Models/todo');

const router = express.Router();

//authenticate
router.use(authenticate);

//get todo for user
router.get('/getTodo', async (req, res) => {
  try {
    const tasks = await todo.find({ user: req.userId});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//create todo
router.post('/createTodo', async (req, res) => {
  try {
    const taskData = { ...req.body, user: req.userId};
    const task = new todo(taskData);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const tasks = await todo.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/updateTodo/:taskId', async (req, res) => {
  try {
    const updatedTask = await todo.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/deleteTodo/:taskId', async (req, res) => {
  try {
    const deletedTask = await todo.findByIdAndDelete(req.params.taskId);
    if(deletedTask){
      return res.status(200).json({message: "Task deleted"})
    }
    else{
      res.json({message: "Task not found!"});
    }
   
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
