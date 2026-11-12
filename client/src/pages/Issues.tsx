import { useState, useEffect } from 'react';
import api from '../utils/api';
import { 
    Plus, 
    Search, 
    Check,
    Trash2
} from 'lucide-react';

interface IssueItem {
    _id: string;
    issueCode: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    project?: { _id: string; title: string };
    assignedTo?: { _id: string; username: string; displayName?: string; avatar?: string };
    createdBy?: { _id: string; username: string; displayName?: string };
    resolveDuration?: string;
    dueDate?: string;
    createdAt: string;
}

interface IssuesProps {
    currentUser: any;
}

const Issues = ({ currentUser }: IssuesProps) => {
    const [issues, setIssues] = useState<IssueItem[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Tab & filter states
    const [activeTab, setActiveTab] = useState<'my' | 'team'>('my');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [projectFilter, setProjectFilter] = useState('all');

    // Create Issue modal
    const [showModal, setShowModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newProjectId, setNewProjectId] = useState('');
    const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
    const [newAssignedTo, setNewAssignedTo] = useState('');
    const [newDueDate, setNewDueDate] = useState('');

    const userRole = currentUser?.role || 'others';
    const canCreateAndAssign = userRole === 'admin';

    const fetchIssues = async () => {
        try {
            setLoading(true);
            const params: any = {};
            if (activeTab === 'my') params.assignedTo = 'me';
            if (statusFilter !== 'all') params.status = statusFilter;
            if (priorityFilter !== 'all') params.priority = priorityFilter;
            if (projectFilter !== 'all') params.project = projectFilter;
            if (search.trim()) params.search = search.trim();

            const res = await api.get('/api/issues', { params });
            setIssues(res.data);
        } catch (err) {
            console.error('Failed to load issues', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchDropdownData = async () => {
        try {
            const [projRes, teamRes] = await Promise.all([
                api.get('/api/projects'),
                api.get('/api/performance/team')
            ]);
            setProjects(projRes.data);
            if (projRes.data && projRes.data.length > 0) {
                setNewProjectId(projRes.data[0]._id);
            }
            setTeamMembers(teamRes.data);
        } catch (err) {
            console.error('Failed to load dropdown data', err);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, [activeTab, statusFilter, priorityFilter, projectFilter, search]);

    useEffect(() => {
        fetchDropdownData();
    }, []);

    // Create Issue handler (Admin only)
    const handleCreateIssue = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload: any = {
                title: newTitle,
                description: newDescription,
                project: newProjectId,
                priority: newPriority
            };
            if (newAssignedTo) payload.assignedTo = newAssignedTo;
            if (newDueDate) payload.dueDate = newDueDate;

            const res = await api.post('/api/issues', payload);
            if (res.data.attendanceAwarded) {
                alert('Issue created & assigned. Attendance point credited.');
            }
            setShowModal(false);
            setNewTitle('');
            setNewDescription('');
            fetchIssues();
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || err.response?.data?.message || err.response?.data || err.message || 'Failed to create issue';
            alert(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
        }
    };

    // Update Issue status
    const handleStatusChange = async (issueId: string, newStatus: string) => {
        try {
            const res = await api.put(`/api/issues/${issueId}`, { status: newStatus });
            if (res.data.attendanceAwarded) {
                alert('Issue marked as Resolved. Attendance credited.');
            }
            fetchIssues();
        } catch (err: any) {
            alert(err.response?.data || 'Failed to update issue status');
        }
    };

    // Delete issue permanently (Admin only)
    const handleDeleteIssue = async (issueId: string) => {
        if (!confirm('Are you sure you want to permanently delete this issue?')) return;
        try {
            await api.delete(`/api/issues/${issueId}`);
            fetchIssues();
        } catch (err: any) {
            alert(err.response?.data || 'Failed to delete issue');
        }
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'high':
            case 'critical':
                return <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase">high</span>;
            case 'medium':
                return <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase">med</span>;
            default:
                return <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 uppercase">low</span>;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'resolved':
                return <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">resolved</span>;
            case 'in_progress':
                return <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30 uppercase">in progress</span>;
            case 'closed':
                return <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-500 border border-zinc-800 uppercase">closed</span>;
            default:
                return <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase">open</span>;
        }
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="border border-zinc-800 bg-[#121212] rounded p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-pink-500 text-black flex items-center justify-center font-mono font-bold text-sm">
                        #
                    </div>
                    <div>
                        <h2 className="text-xl font-bold font-mono tracking-tight text-white">Issue Tracker</h2>
                        <p className="text-xs font-mono text-zinc-500">Pipeline & deliverable status</p>
                    </div>
                </div>

                {canCreateAndAssign && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-pink-500 hover:bg-pink-400 text-black font-semibold text-xs font-mono rounded transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Create Issue
                    </button>
                )}
            </div>

            {/* Toggle Tabs: My Issues vs Team Issues */}
            <div className="flex bg-[#121212] p-1 rounded border border-zinc-800 max-w-xs">
                <button
                    onClick={() => setActiveTab('my')}
                    className={`flex-1 py-1.5 text-xs font-mono font-medium rounded transition-colors ${
                        activeTab === 'my' ? 'bg-pink-500 text-black font-semibold' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                    Assigned To Me
                </button>
                <button
                    onClick={() => setActiveTab('team')}
                    className={`flex-1 py-1.5 text-xs font-mono font-medium rounded transition-colors ${
                        activeTab === 'team' ? 'bg-pink-500 text-black font-semibold' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                    All Issues
                </button>
            </div>

            {/* Filter Bar */}
            <div className="border border-zinc-800 bg-[#121212] rounded p-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Filter by keyword..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-white outline-none focus:border-pink-500"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-2.5 py-1.5 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-zinc-300 outline-none focus:border-pink-500"
                    >
                        <option value="all">Status: All</option>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                    </select>

                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="px-2.5 py-1.5 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-zinc-300 outline-none focus:border-pink-500"
                    >
                        <option value="all">Priority: All</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                    </select>

                    <select
                        value={projectFilter}
                        onChange={(e) => setProjectFilter(e.target.value)}
                        className="px-2.5 py-1.5 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-zinc-300 outline-none focus:border-pink-500"
                    >
                        <option value="all">Project: All</option>
                        {projects.map((p) => (
                            <option key={p._id} value={p._id}>{p.title}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Issue List */}
            <div className="space-y-2">
                {loading ? (
                    <div className="p-8 border border-zinc-800 bg-[#121212] rounded text-center text-xs font-mono text-zinc-500">
                        Querying database...
                    </div>
                ) : issues.length === 0 ? (
                    <div className="p-10 border border-zinc-800 bg-[#121212] rounded text-center">
                        <div className="text-zinc-500 text-xs font-mono">No matching issues found.</div>
                    </div>
                ) : (
                    issues.map((issue) => {
                        const isAssignedToMe = issue.assignedTo && (issue.assignedTo._id === currentUser?.id || issue.assignedTo._id === currentUser?._id);

                        return (
                            <div key={issue._id} className="border border-zinc-800 bg-[#121212] rounded p-4 hover:border-zinc-700 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                    <div className="space-y-1 flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-xs font-mono text-pink-400 font-bold">{issue.issueCode}</span>
                                            {getPriorityBadge(issue.priority)}
                                            {getStatusBadge(issue.status)}
                                            {issue.resolveDuration && (
                                                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                                    Duration: {issue.resolveDuration}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-semibold text-sm text-white">{issue.title}</h3>

                                        <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 flex-wrap">
                                            <span>PROJECT: <strong className="text-zinc-300 font-normal">{issue.project?.title || 'General'}</strong></span>
                                            {issue.dueDate && (
                                                <span>DUE: {new Date(issue.dueDate).toLocaleDateString()}</span>
                                            )}
                                            {issue.assignedTo && (
                                                <span>ASSIGNEE: <strong className="text-zinc-300 font-normal">{issue.assignedTo.displayName || issue.assignedTo.username}</strong></span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex items-center gap-2 self-end md:self-center">
                                        {issue.status !== 'in_progress' && issue.status !== 'resolved' && (isAssignedToMe || canCreateAndAssign) && (
                                            <button
                                                onClick={() => handleStatusChange(issue._id, 'in_progress')}
                                                className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700 transition"
                                            >
                                                Start Working
                                            </button>
                                        )}

                                        {issue.status !== 'resolved' && (isAssignedToMe || canCreateAndAssign) && (
                                            <button
                                                onClick={() => handleStatusChange(issue._id, 'resolved')}
                                                className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-pink-500 hover:bg-pink-400 text-black transition flex items-center gap-1"
                                            >
                                                <Check className="w-3 h-3" />
                                                Resolve
                                            </button>
                                        )}

                                        {canCreateAndAssign && issue.status === 'resolved' && (
                                            <button
                                                onClick={() => handleStatusChange(issue._id, 'closed')}
                                                className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-zinc-800 text-zinc-400 hover:text-white transition"
                                            >
                                                Close
                                            </button>
                                        )}

                                        {canCreateAndAssign && (
                                            <button
                                                onClick={() => handleDeleteIssue(issue._id)}
                                                className="p-1 rounded text-zinc-500 hover:text-rose-400 transition"
                                                title="Delete issue"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        )}

                                        <div className="w-6 h-6 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center text-[10px] font-mono font-bold ml-1">
                                            {issue.assignedTo?.displayName?.substring(0, 2).toUpperCase() || 'TM'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Create Issue Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                    <div className="bg-[#121212] border border-zinc-800 rounded max-w-lg w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                            <h3 className="text-base font-bold font-mono text-white">Create New Deliverable</h3>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30">ADMIN_ACTION</span>
                        </div>

                        <form onSubmit={handleCreateIssue} className="space-y-3.5">
                            <div>
                                <label className="block text-xs font-mono text-zinc-400 mb-1">Issue Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Implement refresh token rotation"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-white outline-none focus:border-pink-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-mono text-zinc-400 mb-1">Project</label>
                                    <select
                                        required
                                        value={newProjectId}
                                        onChange={(e) => setNewProjectId(e.target.value)}
                                        className="w-full px-2.5 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-zinc-300 outline-none focus:border-pink-500"
                                    >
                                        {projects.map((p) => (
                                            <option key={p._id} value={p._id}>{p.title}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-zinc-400 mb-1">Priority</label>
                                    <select
                                        value={newPriority}
                                        onChange={(e: any) => setNewPriority(e.target.value)}
                                        className="w-full px-2.5 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-zinc-300 outline-none focus:border-pink-500"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="critical">Critical</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-mono text-zinc-400 mb-1">Assignee</label>
                                    <select
                                        value={newAssignedTo}
                                        onChange={(e) => setNewAssignedTo(e.target.value)}
                                        className="w-full px-2.5 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-zinc-300 outline-none focus:border-pink-500"
                                    >
                                        <option value="">Select Assignee</option>
                                        {teamMembers.map((m) => (
                                            <option key={m._id} value={m._id}>
                                                {m.displayName || m.username} ({m.role})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-zinc-400 mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        value={newDueDate}
                                        onChange={(e) => setNewDueDate(e.target.value)}
                                        className="w-full px-2.5 py-1.5 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-zinc-300 outline-none focus:border-pink-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-zinc-400 mb-1">Implementation Notes</label>
                                <textarea
                                    placeholder="Technical scope, API contract, or reproduction steps..."
                                    rows={3}
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-white outline-none focus:border-pink-500"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-3 py-1.5 rounded text-xs font-mono text-zinc-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-1.5 rounded text-xs font-mono font-semibold bg-pink-500 hover:bg-pink-400 text-black"
                                >
                                    Confirm & Delegate
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Issues;
