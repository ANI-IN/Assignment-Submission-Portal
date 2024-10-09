const express = require('express');
const User = require('../models/userModel');
const Assignment = require('../models/assignmentModel');
const authMiddleware = require('../middlewares/authMiddleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

//Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

//User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            'mySuperSecretKey',   
            { expiresIn: '1h' }
          );
          

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

//Upload an assignment
router.post('/upload', authMiddleware, async (req, res) => {
    const { task, adminId } = req.body;

    try {
        // Check if admin exists
        const admin = await User.findById(adminId);
        if (!admin || admin.role !== 'admin') {
            return res.status(400).json({ message: 'Invalid admin ID' });
        }

        // Create a new assignment
        const assignment = new Assignment({
            userId: req.user.userId,  // req.user is set by authMiddleware
            adminId,
            task
        });
        await assignment.save();

        res.status(201).json({ message: 'Assignment uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

//Fetch all admins
router.get('/admins', async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' }).select('name email');
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
