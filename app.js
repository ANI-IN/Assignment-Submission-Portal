require('dotenv').config();
const express = require('express');
const connectDB = require('./db/mongoose');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');


// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
