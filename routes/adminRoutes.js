const express = require('express');
const User = require('../models/userModel');
const Assignment = require('../models/assignmentModel');
const authMiddleware = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');

const router = express.Router();

//Register a new admin
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the admin already exists
        let admin = await User.findOne({ email });
        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Create a new admin
        admin = new User({ name, email, password, role: 'admin' });
        await admin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

//Admin login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the admin exists
        const admin = await User.findOne({ email });
        if (!admin || admin.role !== 'admin') {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: admin._id, role: admin.role },   
            'mySuperSecretKey',   
            { expiresIn: '1h' }
        );
          

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// View assignments tagged to the admin
router.get('/assignments', authMiddleware, async (req, res) => {
    try {
        // Ensure the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Fetch assignments tagged to the admin
        const assignments = await Assignment.find({ adminId: req.user.userId })
            .populate('userId', 'name email')
            .select('task status submissionTime');

        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

//Accept an assignment
router.post('/assignments/:id/accept', authMiddleware, async (req, res) => {
    try {
        // Ensure the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Update the assignment status to accepted
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment || assignment.adminId.toString() !== req.user.userId) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        assignment.status = 'accepted';
        await assignment.save();

        res.json({ message: 'Assignment accepted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

//Reject an assignment
router.post('/assignments/:id/reject', authMiddleware, async (req, res) => {
    try {
        // Ensure the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Update the assignment status to rejected
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment || assignment.adminId.toString() !== req.user.userId) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        assignment.status = 'rejected';
        await assignment.save();

        res.json({ message: 'Assignment rejected' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
