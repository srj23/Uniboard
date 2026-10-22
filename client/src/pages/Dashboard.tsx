import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { 
    AlertCircle, 
    Clock, 
    CheckCircle2, 
    XCircle, 
    Users, 
    Layers, 
    ArrowRight,
    Plus,
    Check
} from 'lucide-react';
import Projects from './Projects';
import Issues from './Issues';
import MyPerformance from './MyPerformance';
import AdminPanel from './AdminPanel';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const userRole = user?.role || 'others';

    // If 'others', default to whiteboards
    const [activeSection, setActiveSection] = useState<'dashboard' | 'projects' | 'issues' | 'performance' | 'whiteboards' | 'admin'>(
        userRole === 'others' ? 'whiteboards' : 'dashboard'
    );

    const [metrics, setMetrics] = useState({
        open: 0,
        inProgress: 0,
        resolved: 0,
        closed: 0,
        totalTeam: 0
    });
    const [myRecentIssues, setMyRecentIssues] = useState<any[]>([]);
    const [activeProjects, setActiveProjects] = useState<any[]>([]);
    const [boards, setBoards] = useState<any[]>([]);

    const fetchDashboardData = async () => {
        try {
            const [metricsRes, myIssuesRes, projRes, boardsRes] = await Promise.all([
                api.get('/api/issues/metrics/summary').catch(() => ({ data: { open: 0, inProgress: 0, resolved: 0, closed: 0, totalTeam: 0 } })),
                api.get('/api/issues?assignedTo=me').catch(() => ({ data: [] })),
                api.get('/api/projects').catch(() => ({ data: [] })),
                api.get('/api/boards').catch(() => ({ data: [] }))
            ]);

            setMetrics(metricsRes.data);
            setMyRecentIssues(myIssuesRes.data.slice(0, 5));
            setActiveProjects(projRes.data.slice(0, 4));
            setBoards(boardsRes.data || []);
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
            alert('Congratulations! Issue marked as Resolved. Attendance credited!');
            fetchDashboardData();
        } catch (err: any) {
            alert(err.response?.data || 'Failed to update issue');
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Top Sub-Navigation matching Screenshot 1 & 4 */}
            <div className="border-b border-border bg-card/60 backdrop-blur-md sticky top-16 z-30">
                <div className="container mx-auto px-4 flex items-center gap-1 sm:gap-4 overflow-x-auto py-2">
                    <button
                        onClick={() => setActiveSection('whiteboards')}
                        className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                            activeSection === 'whiteboards' 
                                ? 'bg-primary text-primary-foreground shadow-sm' 
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        <Layers className="w-3.5 h-3.5" />
                        Whiteboards
                    </button>

                    {userRole !== 'others' && (
                        <>
                            <button
                                onClick={() => setActiveSection('dashboard')}
                                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                                    activeSection === 'dashboard' 
                                        ? 'bg-primary text-primary-foreground shadow-sm' 
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => setActiveSection('projects')}
                                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                                    activeSection === 'projects' 
                                        ? 'bg-primary text-primary-foreground shadow-sm' 
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Projects
                            </button>
                            <button
                                onClick={() => setActiveSection('issues')}
                                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                                    activeSection === 'issues' 
                                        ? 'bg-primary text-primary-foreground shadow-sm' 
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Issues
                            </button>
                            <button
                                onClick={() => setActiveSection('performance')}
                                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                                    activeSection === 'performance' 
                                        ? 'bg-primary text-primary-foreground shadow-sm' 
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                My Performance
                            </button>
                        </>
                    )}

                    {userRole === 'admin' && (
                        <button
                            onClick={() => setActiveSection('admin')}
                            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                                activeSection === 'admin' 
                                    ? 'bg-purple-600 text-white shadow-sm' 
                                    : 'text-purple-500 hover:text-purple-600'
                            }`}
                        >
                            Admin Settings
                        </button>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 pt-8">
                {activeSection === 'admin' && <AdminPanel />}
                {activeSection === 'projects' && <Projects userRole={userRole} />}
                {activeSection === 'issues' && <Issues currentUser={user} />}
                {activeSection === 'performance' && <MyPerformance />}
                
                {/* Whiteboard Canvas Studio View */}
                {activeSection === 'whiteboards' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Collaborative Whiteboards</h2>
                                <p className="text-sm text-muted-foreground">Brainstorm, sketch architectures, and share real-time canvases</p>
                            </div>
                            <Link 
                                to="/board/new" 
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition shadow-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Create Canvas
                            </Link>
                        </div>

                        {boards.length === 0 ? (
                            <div className="bg-card border border-border rounded-2xl p-12 text-center">
                                <Layers className="w-12 h-12 mx-auto text-muted-foreground mb-3 opacity-40" />
                                <h3 className="text-base font-semibold mb-1">No whiteboards created yet</h3>
                                <p className="text-sm text-muted-foreground mb-4">Start a collaborative canvas to sketch out user flows and diagrams.</p>
                                <Link 
                                    to="/board/new"
                                    className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-xl font-medium inline-block"
                                >
                                    New Canvas
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {boards.map((b) => (
                                    <Link
                                        key={b._id}
                                        to={`/board/${b._id}`}
                                        className="bg-card border border-border rounded-2xl p-5 hover:border-primary/50 transition-all group"
                                    >
                                        <div className="aspect-video bg-secondary/50 rounded-xl mb-4 flex items-center justify-center border border-border group-hover:scale-[1.02] transition-transform">
                                            <Layers className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                        <h4 className="font-semibold text-base mb-1">{b.title || 'Untitled Board'}</h4>
                                        <span className="text-xs text-muted-foreground">Updated {new Date(b.updatedAt).toLocaleDateString()}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Main Overview Dashboard (matching Screenshot 1) */}
                {activeSection === 'dashboard' && (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
                            <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening with your projects.</p>
                        </div>

                        {/* Top 5 Metric Cards matching Screenshot 1 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            {/* Open Issues */}
                            <div className="bg-card border border-border rounded-2xl p-5 relative overflow-hidden shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold text-muted-foreground">Open Issues</span>
                                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                        <AlertCircle className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="text-3xl font-extrabold">{metrics.open} <span className="text-xs font-normal text-muted-foreground">+0</span></div>
                                <div className="text-[11px] text-muted-foreground mt-2">Issues + Sub-issues</div>
                            </div>

                            {/* In Progress */}
                            <div className="bg-card border border-border rounded-2xl p-5 relative overflow-hidden shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold text-muted-foreground">In Progress</span>
                                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="text-3xl font-extrabold">{metrics.inProgress} <span className="text-xs font-normal text-muted-foreground">+0</span></div>
                                <div className="text-[11px] text-muted-foreground mt-2">Issues + Sub-issues</div>
                            </div>

                            {/* Resolved */}
                            <div className="bg-card border border-border rounded-2xl p-5 relative overflow-hidden shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold text-muted-foreground">Resolved</span>
                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="text-3xl font-extrabold text-emerald-500">{metrics.resolved} <span className="text-xs font-normal text-emerald-600">+9</span></div>
                                <div className="text-[11px] text-muted-foreground mt-2">Issues + Sub-issues</div>
                            </div>

                            {/* Closed */}
                            <div className="bg-card border border-border rounded-2xl p-5 relative overflow-hidden shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold text-muted-foreground">Closed</span>
                                    <div className="w-8 h-8 rounded-xl bg-secondary text-muted-foreground flex items-center justify-center">
                                        <XCircle className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="text-3xl font-extrabold">{metrics.closed} <span className="text-xs font-normal text-muted-foreground">+0</span></div>
                                <div className="text-[11px] text-muted-foreground mt-2">Issues + Sub-issues</div>
                            </div>

                            {/* Team Issues */}
                            <div className="bg-card border border-border rounded-2xl p-5 relative overflow-hidden shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold text-muted-foreground">Team Issues</span>
                                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                                        <Users className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="text-3xl font-extrabold">{metrics.totalTeam}</div>
                                <div className="text-[11px] text-muted-foreground mt-2">Workspace total</div>
                            </div>
                        </div>

                        {/* 3-Column Split Layout matching Screenshot 1 & 2 */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Left: Priority Issues (3 cols) */}
                            <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                                <div className="w-full text-left mb-6 flex items-center gap-2 text-rose-500 font-semibold text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    Priority Issues
                                </div>
                                <div className="my-auto py-8">
                                    <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-30" />
                                    <div className="text-sm font-semibold">No priority issues at the moment</div>
                                    <p className="text-xs text-muted-foreground mt-1">Great job staying on top of things! 🎉</p>
                                </div>
                            </div>

                            {/* Middle: My Issues (6 cols) */}
                            <div className="lg:col-span-6 bg-card border border-border rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-base">My Issues</h3>
                                    <button 
                                        onClick={() => setActiveSection('issues')}
                                        className="text-xs text-blue-500 hover:underline flex items-center gap-1 font-medium"
                                    >
                                        View all <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {myRecentIssues.length === 0 ? (
                                    <div className="text-center py-12 text-muted-foreground text-xs">
                                        No active issues assigned to you. Enjoy your clean queue!
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {myRecentIssues.map((issue) => (
                                            <div key={issue._id} className="p-3.5 bg-secondary/40 rounded-xl border border-border hover:border-primary/40 transition-colors">
                                                <div className="flex items-center justify-between gap-2 mb-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-mono text-muted-foreground">{issue.issueCode}</span>
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-medium capitalize">{issue.priority}</span>
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium capitalize">{issue.status}</span>
                                                    </div>
                                                    {issue.status !== 'resolved' && (
                                                        <button
                                                            onClick={() => handleResolve(issue._id)}
                                                            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-1"
                                                        >
                                                            <Check className="w-3 h-3" />
                                                            Resolve
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="text-xs font-semibold text-foreground">{issue.title}</div>
                                                <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-3">
                                                    <span>{issue.project?.title || 'General'}</span>
                                                    {issue.dueDate && <span>Due {new Date(issue.dueDate).toLocaleDateString()}</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right: Active Projects (3 cols) */}
                            <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-base">Active Projects</h3>
                                    <button 
                                        onClick={() => setActiveSection('projects')}
                                        className="text-xs text-blue-500 hover:underline flex items-center gap-1 font-medium"
                                    >
                                        View all <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {activeProjects.length === 0 ? (
                                    <div className="text-center py-10 text-muted-foreground text-xs">
                                        No active projects yet.
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {activeProjects.map((p) => (
                                            <div key={p._id} className="p-3 bg-secondary/40 rounded-xl border border-border">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-semibold text-foreground">{p.title}</span>
                                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                </div>
                                                <div className="text-[11px] text-muted-foreground mt-1 line-clamp-1">{p.description || 'Active project'}</div>
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
