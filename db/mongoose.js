const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URI from the .env file
const mongoURI = process.env.MONGO_URI;

// Function to connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);  
    }
};

module.exports = connectDB;
