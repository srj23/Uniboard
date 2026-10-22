const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    displayName: { type: String, default: '' },
    bio: { type: String, default: '' },
    avatar: { type: String, default: '' },
    location: { type: String, default: '' },
    role: { 
        type: String, 
        enum: ['admin', 'teammember', 'others'], 
        default: 'others' 
    },
    attendanceCount: { type: Number, default: 0 },
    attendanceLogs: [{
        date: { type: Date, default: Date.now },
        reason: { type: String, default: '' }, // e.g. "Resolved issue #123" or "Assigned issue #123"
        issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
