// Import required packages
const express = require('express');
const connectDb = require('./dbCon'); // custom module for connecting to the database
const cors = require('cors'); // Cross-Origin Resource Sharing middleware
const authRoutes = require('./Routes/userRoute'); // Routes related to authentication
const todoRoutes = require('./Routes/toDoRoute'); // Routes related to to-do functionality
const bodyParser = require('body-parser'); // Middleware to parse JSON requests
const rateLimit = require('express-rate-limit'); // Middleware for rate limiting

// Connect to the database
connectDb();

// Set up the port for the server
const PORT = process.env.PORT || 3000;

// Create an Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());

// Rate limiting middleware setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Set up routes for authentication
app.use('/auth', authRoutes);

// Set up routes for to-dos
app.use('/todos', todoRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
