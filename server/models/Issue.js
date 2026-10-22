const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    issueCode: { type: String, unique: true }, // e.g. #d2191e4b
    title: { type: String, required: true },
    description: { type: String, default: '' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high', 'critical'], 
        default: 'medium' 
    },
    status: { 
        type: String, 
        enum: ['open', 'in_progress', 'resolved', 'closed'], 
        default: 'open' 
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dueDate: { type: Date },
    resolvedAt: { type: Date },
    resolveDuration: { type: String, default: '' } // e.g. "28d 11h" or "2h 30m"
}, { timestamps: true });

// Auto-generate short issue code before save
issueSchema.pre('validate', function(next) {
    if (!this.issueCode) {
        this.issueCode = '#' + Math.random().toString(16).substring(2, 10);
    }
    next();
});

module.exports = mongoose.model('Issue', issueSchema);
