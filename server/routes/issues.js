const router = require('express').Router();
const Issue = require('../models/Issue');
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

// GET metrics summary for dashboard
router.get('/metrics/summary', verifyToken, async (req, res) => {
    try {
        const totalIssues = await Issue.countDocuments();
        const openIssues = await Issue.countDocuments({ status: 'open' });
        const inProgress = await Issue.countDocuments({ status: 'in_progress' });
        const resolved = await Issue.countDocuments({ status: 'resolved' });
        const closed = await Issue.countDocuments({ status: 'closed' });

        // User specific metrics
        const myIssuesCount = await Issue.countDocuments({ assignedTo: req.user.id });
        const myResolved = await Issue.countDocuments({ assignedTo: req.user.id, status: 'resolved' });

        res.status(200).json({
            open: openIssues,
            inProgress: inProgress,
            resolved: resolved,
            closed: closed,
            totalTeam: totalIssues,
            myIssues: myIssuesCount,
            myResolved: myResolved
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all issues (supports ?assignedTo=me, ?status=..., ?priority=..., ?project=...)
router.get('/', verifyToken, async (req, res) => {
    try {
        const { assignedTo, status, priority, project, search } = req.query;
        let query = {};

        if (assignedTo === 'me') {
            query.assignedTo = req.user.id;
        } else if (assignedTo) {
            query.assignedTo = assignedTo;
        }

        if (status && status !== 'all') query.status = status;
        if (priority && priority !== 'all') query.priority = priority;
        if (project && project !== 'all') query.project = project;

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { issueCode: { $regex: search, $options: 'i' } }
            ];
        }

        const issues = await Issue.find(query)
            .populate('project', 'title status iconColor')
            .populate('assignedTo', 'username displayName avatar role')
            .populate('createdBy', 'username displayName avatar role')
            .sort({ createdAt: -1 });

        res.status(200).json(issues);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE issue (Admin or Manager only can assign & create)
router.post('/', verifyToken, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        if (!currentUser) return res.status(404).json("User not found");

        // Admin & Manager have full rights to create & assign
        if (currentUser.role !== 'admin' && currentUser.role !== 'manager') {
            return res.status(403).json("Only admins and managers can create issues.");
        }

        const newIssue = new Issue({
            ...req.body,
            createdBy: req.user.id
        });
        const savedIssue = await newIssue.save();

        // Admin / Manager gains attendance for delegating / assigning issue!
        currentUser.attendanceCount = (currentUser.attendanceCount || 0) + 1;
        currentUser.attendanceLogs.push({
            reason: `Assigned issue ${savedIssue.issueCode}: "${savedIssue.title}"`,
            issueId: savedIssue._id,
            date: new Date()
        });
        await currentUser.save();

        const populatedIssue = await Issue.findById(savedIssue._id)
            .populate('project', 'title status iconColor')
            .populate('assignedTo', 'username displayName avatar role')
            .populate('createdBy', 'username displayName avatar role');

        res.status(201).json({ issue: populatedIssue, attendanceAwarded: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE issue status or details
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        if (!currentUser) return res.status(404).json("User not found");

        const issue = await Issue.findById(req.params.id);
        if (!issue) return res.status(404).json("Issue not found");

        // Role-based permissions:
        // Team member can only change status to "in_progress" or "resolved" on their assigned issues
        if (currentUser.role === 'teammember') {
            if (issue.assignedTo && issue.assignedTo.toString() !== req.user.id.toString()) {
                return res.status(403).json("Team members can only update issues assigned to them.");
            }

            // Restrict updates from team members to status only
            const newStatus = req.body.status;
            if (newStatus && !['in_progress', 'resolved'].includes(newStatus)) {
                return res.status(403).json("Team members can only mark issues as 'in_progress' or 'resolved'.");
            }

            // If marking as resolved, calculate duration and award attendance!
            let attendanceAwarded = false;
            if (newStatus === 'resolved' && issue.status !== 'resolved') {
                issue.status = 'resolved';
                issue.resolvedAt = new Date();
                
                // Calculate resolve duration
                const durationMs = issue.resolvedAt.getTime() - new Date(issue.createdAt).getTime();
                const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));
                const hours = Math.floor((durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                issue.resolveDuration = days > 0 ? `${days}d ${hours}h` : `${hours}h`;

                // Award attendance to team member
                currentUser.attendanceCount = (currentUser.attendanceCount || 0) + 1;
                currentUser.attendanceLogs.push({
                    reason: `Resolved issue ${issue.issueCode}: "${issue.title}"`,
                    issueId: issue._id,
                    date: new Date()
                });
                await currentUser.save();
                attendanceAwarded = true;
            } else if (newStatus) {
                issue.status = newStatus;
            }

            await issue.save();
            const updated = await Issue.findById(issue._id)
                .populate('project', 'title status iconColor')
                .populate('assignedTo', 'username displayName avatar role')
                .populate('createdBy', 'username displayName avatar role');

            return res.status(200).json({ issue: updated, attendanceAwarded });
        }

        // Admin & Manager have full rights to modify anything
        let attendanceAwarded = false;
        if (req.body.status === 'resolved' && issue.status !== 'resolved') {
            req.body.resolvedAt = new Date();
            const durationMs = req.body.resolvedAt.getTime() - new Date(issue.createdAt).getTime();
            const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));
            const hours = Math.floor((durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            req.body.resolveDuration = days > 0 ? `${days}d ${hours}h` : `${hours}h`;
        }

        const updatedIssue = await Issue.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
            .populate('project', 'title status iconColor')
            .populate('assignedTo', 'username displayName avatar role')
            .populate('createdBy', 'username displayName avatar role');

        res.status(200).json({ issue: updatedIssue, attendanceAwarded });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE issue (Admin or Manager only)
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'manager')) {
            return res.status(403).json("Only admins and managers can delete issues.");
        }

        await Issue.findByIdAndDelete(req.params.id);
        res.status(200).json("Issue deleted successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
