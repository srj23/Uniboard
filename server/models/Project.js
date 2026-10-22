const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: { 
        type: String, 
        enum: ['active', 'behind', 'at_risk', 'completed'], 
        default: 'active' 
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    iconColor: { type: String, default: '#3b82f6' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
