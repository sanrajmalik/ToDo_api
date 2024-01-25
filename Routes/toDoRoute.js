// Import required packages and modules
const express = require('express');
const authenticate = require('../Middlewares/authenticate'); // Custom middleware for authentication
const Task = require('../Models/todo'); // Assuming this is the model for a to-do task

// Create an Express router
const router = express.Router();

// Middleware: Authenticate all routes in this file
router.use(authenticate);

// Route: Get to-dos for the authenticated user
router.get('/getTodo', async (req, res) => {
  try {
    // Retrieve tasks for the authenticated user from the database
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (error) {
    // Handle server error
    res.status(500).json({ error: error.message });
  }
});

// Route: Create a new to-do for the authenticated user
router.post('/createTodo', async (req, res) => {
  try {
    // Extract task data from the request body and associate it with the authenticated user
    const taskData = { ...req.body, user: req.userId };
    
    // Create a new task in the database
    const newTask = new Task(taskData);
    const savedTask = await newTask.save();

    // Respond with the saved task data
    res.status(201).json(savedTask);
  } catch (error) {
    // Handle client error
    res.status(400).json({ error: error.message });
  }
});

// Route: Get all tasks (for testing purposes)
router.get('/', async (req, res) => {
  try {
    // Retrieve all tasks from the database
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    // Handle server error
    res.status(500).json({ error: error.message });
  }
});

// Route: Update a specific to-do task for the authenticated user
router.put('/updateTodo/:taskId', async (req, res) => {
  try {
    // Find and update the specified task in the database
    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });

    // Respond with the updated task data
    res.json(updatedTask);
  } catch (error) {
    // Handle client error
    res.status(400).json({ error: error.message });
  }
});

// Route: Delete a specific to-do task for the authenticated user
router.delete('/deleteTodo/:taskId', async (req, res) => {
  try {
    // Find and delete the specified task in the database
    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);

    // Respond based on whether the task was found and deleted
    if (deletedTask) {
      return res.status(200).json({ message: "Task deleted" });
    } else {
      res.json({ message: "Task not found!" });
    }
  } catch (error) {
    // Handle client error
    res.status(400).json({ error: error.message });
  }
});

// Export the router for use in other parts of the application
module.exports = router;
