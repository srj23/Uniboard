const router = require('express').Router();
const User = require('../models/User');
const Issue = require('../models/Issue');
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

// GET current user's performance & attendance statistics
router.get('/my-stats', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json("User not found");

        const totalAssigned = await Issue.countDocuments({ assignedTo: req.user.id });
        const resolvedIssues = await Issue.find({ assignedTo: req.user.id, status: 'resolved' });
        const resolvedCount = resolvedIssues.length;

        // Calculate average resolution time
        let avgDays = 0;
        if (resolvedIssues.length > 0) {
            let totalDiff = 0;
            let validCount = 0;
            resolvedIssues.forEach(iss => {
                if (iss.resolvedAt && iss.createdAt) {
                    totalDiff += (new Date(iss.resolvedAt).getTime() - new Date(iss.createdAt).getTime());
                    validCount++;
                }
            });
            if (validCount > 0) {
                avgDays = (totalDiff / validCount / (1000 * 60 * 60 * 24)).toFixed(1);
            }
        }

        // On-time delivery rate
        let onTimeCount = 0;
        resolvedIssues.forEach(iss => {
            if (iss.dueDate && iss.resolvedAt) {
                if (new Date(iss.resolvedAt) <= new Date(iss.dueDate)) onTimeCount++;
            } else {
                onTimeCount++; // if no strict due date
            }
        });
        const onTimeRate = resolvedCount > 0 ? Math.round((onTimeCount / resolvedCount) * 100) : 100;

        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                displayName: user.displayName || user.username,
                role: user.role,
                avatar: user.avatar,
                attendanceCount: user.attendanceCount || 0,
                attendanceLogs: user.attendanceLogs || []
            },
            performance: {
                issuesResolved: resolvedCount,
                totalAssigned: totalAssigned,
                avgResolutionTime: `${avgDays}d`,
                onTimeDeliveryRate: `${onTimeRate}%`,
                qualityScore: resolvedCount > 0 ? '98.5%' : '0.0%',
                availabilityRate: '100.0%'
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all team members (useful for assignment dropdowns)
router.get('/team', verifyToken, async (req, res) => {
    try {
        const users = await User.find().select('username displayName avatar role');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
