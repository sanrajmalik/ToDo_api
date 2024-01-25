// Import required packages
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Function to generate a JWT token for a user
const generateToken = (user) => {
    // Sign a JSON Web Token with the user's ID, using a secret key, and setting an expiration time of 3 hours
    return jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '3h' });
};

// Function to hash a user's password asynchronously
const hashPassword = async (password) => {
    // Hash the password using bcrypt with a cost factor of 10
    return await bcrypt.hash(password, 10);
};

// Export the utility functions for use in other parts of the application
module.exports = {
    generateToken,
    hashPassword,
};
