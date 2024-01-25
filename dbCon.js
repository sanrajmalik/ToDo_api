// Import the Mongoose library
const mongoose = require('mongoose');

// Load environment variables from a .env file
require('dotenv').config();

// Set Mongoose to use strict mode for queries
mongoose.set("strictQuery", true);

// Function to establish a connection to the MongoDB database
const DBConnect = async () => {
    try {
        // Attempt to connect to the MongoDB database using the provided URI
        const connect = await mongoose.connect(process.env.MONGO_URI);

        // Log a success message if the connection is successful
        console.log("DB connected", connect.connection.host);
    } catch (e) {
        // Log an error message if there's an issue connecting to the database
        console.log("error" + e);
    }
};

// Export the DBConnect function to be used elsewhere in the application
module.exports = DBConnect;
