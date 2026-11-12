import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { 
    AlertCircle, 
    Clock, 
    CheckCircle2, 
    XCircle, 
    Users, 
    ArrowRight,
    Check
} from 'lucide-react';
import Projects from './Projects';
import Issues from './Issues';
import MyPerformance from './MyPerformance';
import AdminPanel from './AdminPanel';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const userRole = user?.role || 'others';

    const [activeSection, setActiveSection] = useState<'dashboard' | 'projects' | 'issues' | 'performance' | 'admin'>('dashboard');

    const [metrics, setMetrics] = useState({
        open: 0,
        inProgress: 0,
        resolved: 0,
        closed: 0,
        totalTeam: 0
    });
    const [myRecentIssues, setMyRecentIssues] = useState<any[]>([]);
    const [activeProjects, setActiveProjects] = useState<any[]>([]);

    const fetchDashboardData = async () => {
        try {
            const [metricsRes, myIssuesRes, projRes] = await Promise.all([
                api.get('/api/issues/metrics/summary').catch(() => ({ data: { open: 0, inProgress: 0, resolved: 0, closed: 0, totalTeam: 0 } })),
                api.get('/api/issues?assignedTo=me').catch(() => ({ data: [] })),
                api.get('/api/projects').catch(() => ({ data: [] }))
            ]);

            setMetrics(metricsRes.data);
            setMyRecentIssues(myIssuesRes.data.slice(0, 5));
            setActiveProjects(projRes.data.slice(0, 4));
        } catch (err) {
            console.error('Failed to load dashboard data', err);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleResolve = async (issueId: string) => {
        try {
            await api.put(`/api/issues/${issueId}`, { status: 'resolved' });
            alert('Issue marked as Resolved. Attendance credited!');
            fetchDashboardData();
        } catch (err: any) {
            alert(err.response?.data || 'Failed to update issue');
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 pb-16 font-sans">
            {/* Top Sub-nav / Breadcrumb bar */}
            <div className="border-b border-zinc-800 bg-[#0d0d0d] sticky top-16 z-30">
                <div className="container mx-auto px-4 flex items-center gap-1.5 overflow-x-auto py-2">
                    <button
                        onClick={() => setActiveSection('dashboard')}
                        className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors whitespace-nowrap ${
                            activeSection === 'dashboard' 
                                ? 'bg-pink-500 text-black font-semibold' 
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                        }`}
                    >
                        // overview
                    </button>
                    <button
                        onClick={() => setActiveSection('projects')}
                        className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors whitespace-nowrap ${
                            activeSection === 'projects' 
                                ? 'bg-pink-500 text-black font-semibold' 
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                        }`}
                    >
                        // projects
                    </button>
                    <button
                        onClick={() => setActiveSection('issues')}
                        className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors whitespace-nowrap ${
                            activeSection === 'issues' 
                                ? 'bg-pink-500 text-black font-semibold' 
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                        }`}
                    >
                        // issues
                    </button>
                    <button
                        onClick={() => setActiveSection('performance')}
                        className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors whitespace-nowrap ${
                            activeSection === 'performance' 
                                ? 'bg-pink-500 text-black font-semibold' 
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                        }`}
                    >
                        // performance
                    </button>

                    {userRole === 'admin' && (
                        <button
                            onClick={() => setActiveSection('admin')}
                            className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors whitespace-nowrap ml-auto ${
                                activeSection === 'admin' 
                                ? 'bg-zinc-200 text-black font-semibold' 
                                : 'text-pink-400 border border-pink-500/30 hover:bg-pink-500/10'
                            }`}
                        >
                            [admin settings]
                        </button>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 pt-8">
                {activeSection === 'admin' && <AdminPanel />}
                {activeSection === 'projects' && <Projects userRole={userRole} />}
                {activeSection === 'issues' && <Issues currentUser={user} />}
                {activeSection === 'performance' && <MyPerformance />}

                {/* Main Overview Dashboard */}
                {activeSection === 'dashboard' && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-2">
                            <div>
                                <h1 className="text-2xl font-bold font-mono tracking-tight text-white">System Dashboard</h1>
                                <p className="text-xs font-mono text-zinc-500 mt-0.5">Active sprint status & assigned deliverables</p>
                            </div>
                            <div className="text-xs font-mono text-zinc-500">
                                LOGGED_AS: <span className="text-pink-400 font-semibold">{user?.username}</span> ({userRole})
                            </div>
                        </div>

                        {/* Top 5 Metric Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            <div className="border border-zinc-800 bg-[#121212] p-4 rounded">
                                <div className="flex items-center justify-between text-zinc-400 mb-2">
                                    <span className="text-[11px] font-mono uppercase tracking-wider">Open</span>
                                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                                </div>
                                <div className="text-2xl font-bold font-mono text-white">{metrics.open}</div>
                                <div className="text-[10px] font-mono text-zinc-500 mt-1">Pending kickoff</div>
                            </div>

                            <div className="border border-zinc-800 bg-[#121212] p-4 rounded">
                                <div className="flex items-center justify-between text-zinc-400 mb-2">
                                    <span className="text-[11px] font-mono uppercase tracking-wider">In Progress</span>
                                    <Clock className="w-3.5 h-3.5 text-pink-400" />
                                </div>
                                <div className="text-2xl font-bold font-mono text-white">{metrics.inProgress}</div>
                                <div className="text-[10px] font-mono text-zinc-500 mt-1">Active branch/code</div>
                            </div>

                            <div className="border border-zinc-800 bg-[#121212] p-4 rounded">
                                <div className="flex items-center justify-between text-zinc-400 mb-2">
                                    <span className="text-[11px] font-mono uppercase tracking-wider">Resolved</span>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                </div>
                                <div className="text-2xl font-bold font-mono text-white">{metrics.resolved}</div>
                                <div className="text-[10px] font-mono text-zinc-500 mt-1">Attendance awarded</div>
                            </div>

                            <div className="border border-zinc-800 bg-[#121212] p-4 rounded">
                                <div className="flex items-center justify-between text-zinc-400 mb-2">
                                    <span className="text-[11px] font-mono uppercase tracking-wider">Closed</span>
                                    <XCircle className="w-3.5 h-3.5 text-zinc-500" />
                                </div>
                                <div className="text-2xl font-bold font-mono text-white">{metrics.closed}</div>
                                <div className="text-[10px] font-mono text-zinc-500 mt-1">Archived/Verified</div>
                            </div>

                            <div className="col-span-2 sm:col-span-1 border border-zinc-800 bg-[#121212] p-4 rounded">
                                <div className="flex items-center justify-between text-zinc-400 mb-2">
                                    <span className="text-[11px] font-mono uppercase tracking-wider">Total</span>
                                    <Users className="w-3.5 h-3.5 text-zinc-400" />
                                </div>
                                <div className="text-2xl font-bold font-mono text-white">{metrics.totalTeam}</div>
                                <div className="text-[10px] font-mono text-zinc-500 mt-1">System tickets</div>
                            </div>
                        </div>

                        {/* Split Row: My Recent Issues + Active Projects */}
                        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
                            {/* Left: My Recent Issues (7 cols) */}
                            <div className="lg:col-span-7 border border-zinc-800 bg-[#121212] p-5 rounded">
                                <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
                                    <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-zinc-300">
                                        Assigned Deliverables ({myRecentIssues.length})
                                    </h3>
                                    <button 
                                        onClick={() => setActiveSection('issues')}
                                        className="text-xs text-pink-400 hover:underline flex items-center gap-1 font-mono"
                                    >
                                        View all <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>

                                {myRecentIssues.length === 0 ? (
                                    <div className="text-center py-10 text-zinc-500 text-xs font-mono">
                                        No active issues assigned to you.
                                    </div>
                                ) : (
                                    <div className="space-y-2.5">
                                        {myRecentIssues.map((issue) => (
                                            <div key={issue._id} className="p-3 bg-[#0f0f0f] rounded border border-zinc-800 hover:border-zinc-700 transition">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-mono text-pink-400 font-bold">{issue.issueCode}</span>
                                                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 capitalize border border-zinc-700">{issue.priority}</span>
                                                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 capitalize border border-zinc-700">{issue.status}</span>
                                                    </div>
                                                    {issue.status !== 'resolved' && (
                                                        <button
                                                            onClick={() => handleResolve(issue._id)}
                                                            className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-pink-500 hover:bg-pink-400 text-black transition flex items-center gap-1"
                                                        >
                                                            <Check className="w-3 h-3" />
                                                            Mark Resolved
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="text-xs font-medium text-white">{issue.title}</div>
                                                <div className="text-[11px] font-mono text-zinc-500 mt-1 flex items-center gap-3">
                                                    <span>PROJECT: {issue.project?.title || 'General'}</span>
                                                    {issue.dueDate && <span>DUE: {new Date(issue.dueDate).toLocaleDateString()}</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right: Active Projects (3 cols) */}
                            <div className="lg:col-span-3 border border-zinc-800 bg-[#121212] p-5 rounded">
                                <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
                                    <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-zinc-300">
                                        Active Projects
                                    </h3>
                                    <button 
                                        onClick={() => setActiveSection('projects')}
                                        className="text-xs text-pink-400 hover:underline flex items-center gap-1 font-mono"
                                    >
                                        All <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>

                                {activeProjects.length === 0 ? (
                                    <div className="text-center py-10 text-zinc-500 text-xs font-mono">
                                        No active projects.
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {activeProjects.map((p) => (
                                            <div key={p._id} className="p-3 bg-[#0f0f0f] rounded border border-zinc-800">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-semibold text-white font-mono">{p.title}</span>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                                                </div>
                                                <div className="text-[11px] text-zinc-400 mt-1 line-clamp-1">{p.description || 'No description provided'}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
