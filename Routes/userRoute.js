// Import required packages and modules
const express = require('express');
const jwtAuth = require('../Middlewares/jwtAuth'); // Custom middleware for JWT authentication
const User = require('../Models/User'); // Model for user data
const bcrypt = require('bcrypt'); // Library for hashing and comparing passwords

// Create an Express router
const router = express.Router();

// User registration route
router.post('/register', async (req, resp) => {
    try {
        // Extract user details from the request body
        const { name, email, password } = req.body;

        // Check if name and email are provided
        if (!name || !email) {
            return resp.status(400).json({ error: 'Please enter name and email' });
        }

        // Hash the user's password
        const hashPassword = await jwtAuth.hashPassword(password);

        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return resp.status(409).json({ error: 'User already registered' });
        }

        // Create a new user in the database
        const user = await User.create({ name, email, password: hashPassword });
        const userName = user.name;

        // Generate a JWT token for the user
        const token = jwtAuth.generateToken(user);

        // Respond with the token and user name
        resp.status(201).json({ token, userName });
    } catch (error) {
        // Handle server error
        resp.status(500).json({ error: 'Registration failed' });
    }
});

// User login route
router.post('/login', async (req, resp) => {
    try {
        // Extract user credentials from the request body
        const { email, password } = req.body;

        // Find the user with the provided email in the database
        const user = await User.findOne({ email });

        // If no user is found, respond with an error
        if (!user) {
            return resp.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If passwords do not match, respond with an error
        if (!isPasswordValid) {
            return resp.status(401).json({ error: 'Invalid credentials' });
        }

        // If credentials are valid, extract user name
        const userName = user.name;

        // Generate a JWT token for the user
        const token = jwtAuth.generateToken(user);

        // Respond with the token and user name
        resp.json({ token, userName });
    } catch (error) {
        // Handle server error
        resp.status(500).json({ error: 'Login failed' });
    }
});

// Export the router for use in other parts of the application
module.exports = router;
