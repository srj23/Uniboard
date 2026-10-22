import { useState, useEffect } from 'react';
import api from '../utils/api';
import { 
    Activity, 
    Calendar, 
    Award
} from 'lucide-react';

const MyPerformance = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'trends'>('overview');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const res = await api.get('/api/performance/my-stats');
                setData(res.data);
            } catch (err) {
                console.error('Failed to load performance metrics', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const user = data?.user;
    const stats = data?.performance;

    return (
        <div className="space-y-6">
            {/* Header matching Screenshot 5 */}
            <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Activity className="w-5 h-5 text-blue-500" />
                            <h2 className="text-2xl font-bold tracking-tight">My Performance Dashboard</h2>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Track your personal productivity, quality metrics, and performance trends
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-xl border border-border text-xs text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>Today: {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </div>

                {/* User Info Bar */}
                <div className="mt-6 pt-6 border-t border-border flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                            {user?.displayName?.substring(0, 2).toUpperCase() || 'U'}
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm leading-none">{user?.displayName || user?.username}</h4>
                            <span className="text-xs capitalize text-muted-foreground mt-1 inline-block">
                                Role: <strong className="text-foreground">{user?.role || 'Team Member'}</strong>
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-right">
                            <div className="text-xs font-semibold text-emerald-600">Total Attendance Points</div>
                            <div className="text-xl font-extrabold text-emerald-500 flex items-center justify-end gap-1.5">
                                <Award className="w-5 h-5" />
                                {user?.attendanceCount || 0} Points
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub-Tabs matching Screenshot 5 */}
            <div className="flex bg-secondary/50 p-1 rounded-xl border border-border max-w-md">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                        activeTab === 'overview' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab('attendance')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                        activeTab === 'attendance' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                    My Attendance Logs
                </button>
            </div>

            {loading ? (
                <div className="py-12 text-center text-xs text-muted-foreground">Loading performance data...</div>
            ) : activeTab === 'overview' ? (
                /* Overview 5 Metric Cards matching Screenshot 5 */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Issues Resolved
                        </div>
                        <div className="text-3xl font-extrabold tracking-tight">
                            {stats?.issuesResolved || 0}
                        </div>
                        <span className="text-xs text-muted-foreground mt-2 block">— out of {stats?.totalAssigned || 0} assigned</span>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Avg Resolution Time
                        </div>
                        <div className="text-3xl font-extrabold tracking-tight">
                            {stats?.avgResolutionTime || '0.0d'}
                        </div>
                        <span className="text-xs text-muted-foreground mt-2 block">Real-time compute</span>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            On-Time Delivery
                        </div>
                        <div className="text-3xl font-extrabold tracking-tight text-emerald-500">
                            {stats?.onTimeDeliveryRate || '100%'}
                        </div>
                        <span className="text-xs text-muted-foreground mt-2 block">Within due date</span>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Quality Score
                        </div>
                        <div className="text-3xl font-extrabold tracking-tight text-blue-500">
                            {stats?.qualityScore || '98.5%'}
                        </div>
                        <span className="text-xs text-muted-foreground mt-2 block">Deliverable rating</span>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Availability Rate
                        </div>
                        <div className="text-3xl font-extrabold tracking-tight text-purple-500">
                            {stats?.availabilityRate || '100.0%'}
                        </div>
                        <span className="text-xs text-muted-foreground mt-2 block">Active status</span>
                    </div>
                </div>
            ) : (
                /* Attendance Logs List */
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-base font-bold mb-1">Attendance Verification Activity</h3>
                    <p className="text-xs text-muted-foreground mb-6">
                        Verified log of all task assignments and issue resolutions contributing to your attendance standing.
                    </p>

                    {!user?.attendanceLogs || user.attendanceLogs.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground text-xs">
                            No attendance logs yet. Resolve an issue or assign a task to earn attendance!
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {user.attendanceLogs.map((log: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-3.5 bg-secondary/40 rounded-xl border border-border text-xs">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                                            ✓
                                        </div>
                                        <div>
                                            <div className="font-semibold text-foreground">{log.reason}</div>
                                            <div className="text-[11px] text-muted-foreground">
                                                {new Date(log.date).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold">
                                        +1 Credit
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyPerformance;
