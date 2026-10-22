const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
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
}, { 
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    },
    toObject: {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('User', userSchema);
