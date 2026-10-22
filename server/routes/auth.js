const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config');

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role, displayName } = req.body;
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword,
            role: role && ['admin', 'teammember', 'others'].includes(role) ? role : 'others',
            displayName: displayName || username
        });
        const savedUser = await newUser.save();

        const token = jwt.sign(
            { id: savedUser._id, role: savedUser.role }, 
            config.JWT.SECRET, 
            { expiresIn: '3d' }
        );

        const { password: _, ...others } = savedUser._doc;
        res.status(201).json({ ...others, token });
    } catch (err) {
        console.error('Registration error:', err);
        const errorMessage = err?.message || "Registration failed";
        res.status(500).json(errorMessage);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).select('+password');
        if (!user) return res.status(404).json("User not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json("Wrong password");

        const token = jwt.sign(
            { id: user._id, role: user.role || 'teammember' }, 
            config.JWT.SECRET, 
            { expiresIn: '3d' }
        );
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, token });
    } catch (err) {
        console.error('Registration error:', err);
        const errorMessage = err?.message || "Registration failed";
        res.status(500).json(errorMessage);
    }
});

module.exports = router;
