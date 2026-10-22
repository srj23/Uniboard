const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Auth middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token || req.headers.authorization;
    if (authHeader) {
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(" ")[1] : authHeader;
        jwt.verify(token, config.JWT.SECRET, (err, user) => {
            if (err) return res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

// GET all users (Admin only)
router.get('/', verifyToken, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        if (!currentUser || currentUser.role !== 'admin') {
            return res.status(403).json("Admin access required.");
        }
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PROMOTE / CHANGE USER ROLE or DISPLAY NAME (Admin only)
// e.g. give admin access to team member, rename team member
router.put('/:id/role', verifyToken, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        if (!currentUser || currentUser.role !== 'admin') {
            return res.status(403).json("Only admins can modify user roles and team member details.");
        }

        const { role, displayName } = req.body;
        const updateData = {};
        if (role && ['admin', 'teammember', 'others'].includes(role)) {
            updateData.role = role;
        }
        if (displayName) {
            updateData.displayName = displayName;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        ).select('-password');

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
