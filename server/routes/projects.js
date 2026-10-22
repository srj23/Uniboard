const router = require('express').Router();
const Project = require('../models/Project');
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

// GET all projects
router.get('/', verifyToken, async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('createdBy', 'username displayName avatar role')
            .populate('teamMembers', 'username displayName avatar role')
            .sort({ updatedAt: -1 });
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single project
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('createdBy', 'username displayName avatar')
            .populate('teamMembers', 'username displayName avatar');
        if (!project) return res.status(404).json("Project not found");
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE project (Admin only)
router.post('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== 'admin') {
            return res.status(403).json("Only admins can create projects.");
        }

        const newProject = new Project({
            ...req.body,
            createdBy: req.user.id,
            teamMembers: req.body.teamMembers || [req.user.id]
        });
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE project (Admin only)
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== 'admin') {
            return res.status(403).json("Only admins can edit projects.");
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE project (Admin only)
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== 'admin') {
            return res.status(403).json("Only admins can delete projects.");
        }

        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json("Project deleted successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
