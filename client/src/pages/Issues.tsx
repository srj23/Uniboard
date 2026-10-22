import { useState, useEffect } from 'react';
import api from '../utils/api';
import { 
    Plus, 
    Search, 
    AlertCircle,
    Check
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

    const userRole = currentUser?.role || 'teammember';
    const canCreateAndAssign = userRole === 'admin' || userRole === 'manager';

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
            setTeamMembers(teamRes.data);
            if (projRes.data.length > 0) setNewProjectId(projRes.data[0]._id);
        } catch (err) {
            console.error('Failed to load filter options', err);
        }
    };

    useEffect(() => {
        fetchDropdownData();
    }, []);

    useEffect(() => {
        fetchIssues();
    }, [activeTab, statusFilter, priorityFilter, projectFilter, search]);

    const handleCreateIssue = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim() || !newProjectId) return;

        try {
            const payload: any = {
                title: newTitle,
                description: newDescription,
                project: newProjectId,
                priority: newPriority,
            };
            if (newAssignedTo) payload.assignedTo = newAssignedTo;
            if (newDueDate) payload.dueDate = newDueDate;

            const res = await api.post('/api/issues', payload);
            if (res.data.attendanceAwarded) {
                alert('Issue created & assigned! +1 Attendance point credited to you for delegating tasks.');
            }
            setShowModal(false);
            setNewTitle('');
            setNewDescription('');
            fetchIssues();
        } catch (err: any) {
            alert(err.response?.data || 'Failed to create issue');
        }
    };

    // Update Issue status (Team member can resolve or in_progress; Manager/Admin can set any)
    const handleStatusChange = async (issueId: string, newStatus: string) => {
        try {
            const res = await api.put(`/api/issues/${issueId}`, { status: newStatus });
            if (res.data.attendanceAwarded) {
                alert('Congratulations! Issue marked as Resolved. +1 Attendance point credited to your performance.');
            }
            fetchIssues();
        } catch (err: any) {
            alert(err.response?.data || 'Failed to update issue status');
        }
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'high':
            case 'critical':
                return <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 font-medium">high</span>;
            case 'medium':
                return <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-medium">medium</span>;
            default:
                return <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-medium">low</span>;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'resolved':
                return <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">resolved</span>;
            case 'in_progress':
                return <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-500 font-medium">in progress</span>;
            case 'closed':
                return <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground font-medium">closed</span>;
            default:
                return <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-medium">open</span>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header matching Screenshot 4 */}
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        #
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Issues Management</h2>
                        <p className="text-xs text-muted-foreground">Track, organize and resolve project issues efficiently</p>
                    </div>
                </div>

                {canCreateAndAssign && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Create New Issue
                    </button>
                )}
            </div>

            {/* Toggle Tabs: My Issues vs Team Issues */}
            <div className="flex bg-secondary/50 p-1 rounded-xl border border-border max-w-md">
                <button
                    onClick={() => setActiveTab('my')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                        activeTab === 'my' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                    My Issues
                </button>
                <button
                    onClick={() => setActiveTab('team')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                        activeTab === 'team' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                    Team Issues
                </button>
            </div>

            {/* Filter Bar matching Screenshot 4 */}
            <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
                <div className="text-xs font-semibold text-muted-foreground">Filter Issues</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by title, description, code..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-secondary/50 border border-border rounded-xl text-xs outline-none focus:border-primary"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-secondary/50 border border-border rounded-xl text-xs outline-none focus:border-primary"
                    >
                        <option value="all">All Statuses</option>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                    </select>

                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="px-3 py-2 bg-secondary/50 border border-border rounded-xl text-xs outline-none focus:border-primary"
                    >
                        <option value="all">All Priorities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                    </select>

                    <select
                        value={projectFilter}
                        onChange={(e) => setProjectFilter(e.target.value)}
                        className="px-3 py-2 bg-secondary/50 border border-border rounded-xl text-xs outline-none focus:border-primary"
                    >
                        <option value="all">All Projects</option>
                        {projects.map((p) => (
                            <option key={p._id} value={p._id}>{p.title}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Issue List */}
            <div className="space-y-3">
                <div className="text-xs font-semibold text-muted-foreground px-1">
                    {issues.length} Issues found
                </div>

                {loading ? (
                    <div className="py-12 text-center text-xs text-muted-foreground">Loading issues...</div>
                ) : issues.length === 0 ? (
                    <div className="bg-card border border-border rounded-2xl p-12 text-center">
                        <AlertCircle className="w-10 h-10 mx-auto text-muted-foreground mb-3 opacity-40" />
                        <h4 className="font-semibold text-sm">No issues found</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                            {canCreateAndAssign ? 'Create an issue to assign work to your team.' : 'Great job! No pending issues matching this filter.'}
                        </p>
                    </div>
                ) : (
                    issues.map((issue) => {
                        const isAssignedToMe = issue.assignedTo?._id === currentUser?._id;
                        return (
                            <div key={issue._id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/40 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="space-y-1.5 flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-xs font-mono text-muted-foreground">{issue.issueCode}</span>
                                            {getPriorityBadge(issue.priority)}
                                            {getStatusBadge(issue.status)}
                                            {issue.resolveDuration && (
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">
                                                    Resolve Time: {issue.resolveDuration}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-semibold text-sm text-foreground">{issue.title}</h3>

                                        <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                                            <span className="font-medium text-foreground">{issue.project?.title || 'General'}</span>
                                            {issue.dueDate && (
                                                <span>• Due {new Date(issue.dueDate).toLocaleDateString()}</span>
                                            )}
                                            {issue.assignedTo && (
                                                <span>• Assigned: <strong className="text-foreground">{issue.assignedTo.displayName || issue.assignedTo.username}</strong></span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action buttons (Move status) */}
                                    <div className="flex items-center gap-2 self-end md:self-center">
                                        {/* Status transitions based on user role */}
                                        {issue.status !== 'in_progress' && issue.status !== 'resolved' && (isAssignedToMe || canCreateAndAssign) && (
                                            <button
                                                onClick={() => handleStatusChange(issue._id, 'in_progress')}
                                                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 transition"
                                            >
                                                Start Working
                                            </button>
                                        )}

                                        {issue.status !== 'resolved' && (isAssignedToMe || canCreateAndAssign) && (
                                            <button
                                                onClick={() => handleStatusChange(issue._id, 'resolved')}
                                                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center gap-1.5"
                                            >
                                                <Check className="w-3.5 h-3.5" />
                                                Resolve & Earn Attendance
                                            </button>
                                        )}

                                        {canCreateAndAssign && issue.status === 'resolved' && (
                                            <button
                                                onClick={() => handleStatusChange(issue._id, 'closed')}
                                                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-secondary text-muted-foreground hover:bg-secondary/80 transition"
                                            >
                                                Close Issue
                                            </button>
                                        )}

                                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold ml-2">
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
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl">
                        <h3 className="text-lg font-bold mb-1">Create & Assign New Issue</h3>
                        <p className="text-xs text-muted-foreground mb-4">
                            Delegating tasks grants you management attendance points automatically.
                        </p>

                        <form onSubmit={handleCreateIssue} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">Issue Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Scroll bar added on hello teacher sidebar"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-xl text-xs outline-none focus:border-primary"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-muted-foreground mb-1">Project</label>
                                    <select
                                        required
                                        value={newProjectId}
                                        onChange={(e) => setNewProjectId(e.target.value)}
                                        className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-xl text-xs outline-none focus:border-primary"
                                    >
                                        {projects.map((p) => (
                                            <option key={p._id} value={p._id}>{p.title}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-muted-foreground mb-1">Priority</label>
                                    <select
                                        value={newPriority}
                                        onChange={(e: any) => setNewPriority(e.target.value)}
                                        className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-xl text-xs outline-none focus:border-primary"
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
                                    <label className="block text-xs font-medium text-muted-foreground mb-1">Assign To Team Member</label>
                                    <select
                                        value={newAssignedTo}
                                        onChange={(e) => setNewAssignedTo(e.target.value)}
                                        className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-xl text-xs outline-none focus:border-primary"
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
                                    <label className="block text-xs font-medium text-muted-foreground mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        value={newDueDate}
                                        onChange={(e) => setNewDueDate(e.target.value)}
                                        className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-xl text-xs outline-none focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">Description</label>
                                <textarea
                                    placeholder="Steps to reproduce, expected result, or implementation notes..."
                                    rows={3}
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-xl text-xs outline-none focus:border-primary"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-medium bg-secondary hover:bg-secondary/80 text-foreground"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-xl text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Create & Award Attendance
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
