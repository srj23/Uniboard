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
    const [activeTab, setActiveTab] = useState<'overview' | 'attendance'>('overview');

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
        <div className="space-y-4">
            {/* Header */}
            <div className="border border-zinc-800 bg-[#121212] rounded p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Activity className="w-4 h-4 text-pink-500" />
                            <h2 className="text-xl font-bold font-mono tracking-tight text-white">Performance Ledger</h2>
                        </div>
                        <p className="text-xs font-mono text-zinc-500">
                            Verified delivery metrics & attendance points
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-[#0a0a0a] px-3 py-1.5 rounded border border-zinc-800 text-xs font-mono text-zinc-400">
                        <Calendar className="w-3.5 h-3.5 text-pink-500" />
                        <span>DATE: {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </div>

                {/* User Info Bar */}
                <div className="mt-5 pt-5 border-t border-zinc-800 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded bg-pink-500 text-black font-mono font-bold flex items-center justify-center text-xs">
                            {user?.displayName?.substring(0, 2).toUpperCase() || 'U'}
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm font-mono text-white leading-none">{user?.displayName || user?.username}</h4>
                            <span className="text-xs font-mono text-zinc-500 mt-1 inline-block">
                                ROLE: <strong className="text-pink-400 font-normal">{user?.role || 'Team Member'}</strong>
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-[#0a0a0a] border border-zinc-800 px-4 py-2 rounded text-right">
                            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Attendance Points</div>
                            <div className="text-lg font-bold font-mono text-pink-400 flex items-center justify-end gap-1.5">
                                <Award className="w-4 h-4" />
                                {user?.attendanceCount || 0} PTS
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub-Tabs */}
            <div className="flex bg-[#121212] p-1 rounded border border-zinc-800 max-w-xs">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex-1 py-1.5 text-xs font-mono font-medium rounded transition-colors ${
                        activeTab === 'overview' ? 'bg-pink-500 text-black font-semibold' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab('attendance')}
                    className={`flex-1 py-1.5 text-xs font-mono font-medium rounded transition-colors ${
                        activeTab === 'attendance' ? 'bg-pink-500 text-black font-semibold' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                    Attendance Logs
                </button>
            </div>

            {loading ? (
                <div className="py-8 border border-zinc-800 bg-[#121212] rounded text-center text-xs font-mono text-zinc-500">Loading metrics...</div>
            ) : activeTab === 'overview' ? (
                /* Overview 5 Metric Cards */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    <div className="border border-zinc-800 bg-[#121212] rounded p-4">
                        <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                            Resolved
                        </div>
                        <div className="text-2xl font-bold font-mono text-white">
                            {stats?.issuesResolved || 0}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 mt-2 block">of {stats?.totalAssigned || 0} total</span>
                    </div>

                    <div className="border border-zinc-800 bg-[#121212] rounded p-4">
                        <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                            Avg Duration
                        </div>
                        <div className="text-2xl font-bold font-mono text-white">
                            {stats?.avgResolutionTime || '0.0d'}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 mt-2 block">Computed on-the-fly</span>
                    </div>

                    <div className="border border-zinc-800 bg-[#121212] rounded p-4">
                        <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                            On-Time Rate
                        </div>
                        <div className="text-2xl font-bold font-mono text-emerald-400">
                            {stats?.onTimeDeliveryRate || '100%'}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 mt-2 block">Due date compliance</span>
                    </div>

                    <div className="border border-zinc-800 bg-[#121212] rounded p-4">
                        <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                            Quality Rating
                        </div>
                        <div className="text-2xl font-bold font-mono text-pink-400">
                            {stats?.qualityScore || '98.5%'}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 mt-2 block">Deliverable score</span>
                    </div>

                    <div className="border border-zinc-800 bg-[#121212] rounded p-4">
                        <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                            Availability
                        </div>
                        <div className="text-2xl font-bold font-mono text-white">
                            {stats?.availabilityRate || '100.0%'}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 mt-2 block">Sprint participation</span>
                    </div>
                </div>
            ) : (
                /* Attendance Logs List */
                <div className="border border-zinc-800 bg-[#121212] rounded p-5">
                    <h3 className="text-sm font-bold font-mono text-white mb-1">Audit Ledger</h3>
                    <p className="text-xs font-mono text-zinc-500 mb-4">
                        Verified events where tasks were assigned or resolved.
                    </p>

                    {!user?.attendanceLogs || user.attendanceLogs.length === 0 ? (
                        <div className="text-center py-8 text-zinc-500 text-xs font-mono">
                            No attendance logs on record yet.
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {user.attendanceLogs.map((log: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded border border-zinc-800 text-xs">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-5 h-5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-[10px]">
                                            ✓
                                        </div>
                                        <div>
                                            <div className="font-mono text-white">{log.reason}</div>
                                            <div className="text-[10px] font-mono text-zinc-500">
                                                {new Date(log.date).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30 text-[10px] font-mono font-semibold">
                                        +1 PTS
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
