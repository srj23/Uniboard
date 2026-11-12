import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    ArrowRight,
    ShieldCheck,
    CheckCircle2,
    KanbanSquare,
    Clock,
    AlertCircle,
    Activity,
    Layers,
    Terminal,
    ArrowUpRight,
    GitBranch,
    GitCommit,
    Check,
    Flame,
    Cpu
} from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Mock stream events for interactive tech reactor terminal
const TECH_EVENTS = [
    { id: '1', code: 'IF-108', msg: 'POST /api/issues -> Assigned to @partha', status: 'IN_PROGRESS', time: '12ms' },
    { id: '2', code: 'IF-104', msg: 'JWT signature verified for role:admin', status: 'AUTH_OK', time: '4ms' },
    { id: '3', code: 'IF-099', msg: 'Status updated -> resolved (1.2h duration)', status: 'RESOLVED', time: '18ms' },
    { id: '4', code: 'IF-102', msg: 'Socket.IO broadcast: room:project-01', status: 'SYNCED', time: '2ms' },
    { id: '5', code: 'IF-107', msg: 'Attendance ledger: +1 credit logged in MongoDB', status: 'CREDITED', time: '9ms' }
];

const Home = () => {
    const { user } = useContext(AuthContext);
    const [eventIndex, setEventIndex] = useState(0);

    // Live pipeline pulse ticker
    useEffect(() => {
        const interval = setInterval(() => {
            setEventIndex((prev) => (prev + 1) % TECH_EVENTS.length);
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    const currentEvent = TECH_EVENTS[eventIndex];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-pink-500 selection:text-black">
            <div className="container mx-auto px-4 py-10 md:py-16 max-w-6xl">
                {/* HERO SECTION WITH ANIMATED INTERACTIVE TECH CONSOLE */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
                    {/* Left Column (7 cols): Main Headline & CTA */}
                    <div className="lg:col-span-7">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-medium mb-6">
                            <Terminal className="w-3.5 h-3.5" />
                            Simple Issue & Sprint Tracker
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 font-mono leading-[1.06]">
                            Deliver software. <br />
                            <span className="text-pink-500">Cut the noise.</span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-base sm:text-lg text-zinc-400 mb-8 max-w-xl leading-relaxed">
                            A focused issue and task manager for teams that value speed. Simple status transitions, verified completion timestamps, and role-based delegation without bloated enterprise dashboards.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-3 items-center">
                            {user ? (
                                <Link 
                                    to="/dashboard" 
                                    className="px-6 py-3 bg-pink-500 hover:bg-pink-400 text-black font-semibold text-sm rounded transition-all flex items-center gap-2 font-mono shadow-sm"
                                >
                                    Open Workspace
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            ) : (
                                <>
                                    <Link 
                                        to="/register" 
                                        className="px-6 py-3 bg-pink-500 hover:bg-pink-400 text-black font-semibold text-sm rounded transition-all flex items-center gap-2 font-mono"
                                    >
                                        Create Account
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link 
                                        to="/login" 
                                        className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold text-sm rounded transition-all font-mono"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                            <Link
                                to="/about"
                                className="px-4 py-3 text-zinc-400 hover:text-pink-400 text-xs font-mono transition-colors flex items-center gap-1"
                            >
                                Read architecture notes <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column (5 cols): Futuristic Reactive Technology Console */}
                    <div className="lg:col-span-5 relative">
                        {/* Subtle Pink Ambient Reactor Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 via-pink-500/10 to-transparent rounded-lg blur-xl pointer-events-none" />

                        {/* Outer Frame */}
                        <div className="relative border border-zinc-800 bg-[#0e0e0e] rounded-lg overflow-hidden shadow-2xl">
                            {/* Terminal Top Window Controls */}
                            <div className="px-4 py-2.5 bg-[#141414] border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 block"></span>
                                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 block"></span>
                                        <span className="w-2.5 h-2.5 rounded-full bg-pink-500 block animate-pulse"></span>
                                    </div>
                                    <span className="text-zinc-400 text-[11px] font-semibold ml-2">issueflow.engine</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-pink-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping"></span>
                                    <span>WEBSOCKET: ACTIVE</span>
                                </div>
                            </div>

                            {/* Animated Pipeline Stage Flow Visualizer */}
                            <div className="p-5 border-b border-zinc-800 bg-[#0d0d0d]">
                                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-3">
                                    <span className="flex items-center gap-1.5 text-zinc-300">
                                        <Cpu className="w-3.5 h-3.5 text-pink-500" />
                                        LIVE_PIPELINE_ORCHESTRATOR
                                    </span>
                                    <span className="text-pink-400 font-bold">120 FPS</span>
                                </div>

                                {/* Multi-Stage Circuit Nodes */}
                                <div className="grid grid-cols-3 gap-2">
                                    <motion.div
                                        animate={{ borderColor: eventIndex === 0 ? '#f43f8e' : '#27272a' }}
                                        className="p-2.5 rounded bg-[#161616] border border-zinc-800 text-center"
                                    >
                                        <div className="text-[10px] font-mono text-zinc-500 mb-1">01_INGEST</div>
                                        <div className="text-xs font-mono font-bold text-white flex items-center justify-center gap-1">
                                            <GitBranch className="w-3 h-3 text-pink-400" /> OPEN
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        animate={{ borderColor: eventIndex === 1 || eventIndex === 2 ? '#f43f8e' : '#27272a' }}
                                        className="p-2.5 rounded bg-[#161616] border border-zinc-800 text-center"
                                    >
                                        <div className="text-[10px] font-mono text-zinc-500 mb-1">02_SPRINT</div>
                                        <div className="text-xs font-mono font-bold text-white flex items-center justify-center gap-1">
                                            <Flame className="w-3 h-3 text-pink-400" /> ACTIVE
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        animate={{ borderColor: eventIndex >= 3 ? '#f43f8e' : '#27272a' }}
                                        className="p-2.5 rounded bg-[#161616] border border-zinc-800 text-center"
                                    >
                                        <div className="text-[10px] font-mono text-zinc-500 mb-1">03_VERIFY</div>
                                        <div className="text-xs font-mono font-bold text-white flex items-center justify-center gap-1">
                                            <Check className="w-3 h-3 text-emerald-400" /> CREDITED
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Dynamic Real-Time Ticker Feed */}
                            <div className="p-4 space-y-2 bg-[#090909] font-mono text-xs">
                                <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                                    <span>Incoming Event Bus</span>
                                    <span className="text-zinc-400">SYNC_LATENCY: 4ms</span>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentEvent.id}
                                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                        transition={{ duration: 0.25 }}
                                        className="p-3 rounded border border-pink-500/40 bg-pink-500/5 shadow-inner"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-pink-400">{currentEvent.code}</span>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-semibold">
                                                {currentEvent.status}
                                            </span>
                                        </div>
                                        <div className="text-zinc-200 text-xs truncate">{currentEvent.msg}</div>
                                        <div className="mt-1.5 flex items-center justify-between text-[10px] text-zinc-500">
                                            <span>PROCESSED IN {currentEvent.time}</span>
                                            <span className="text-pink-400">VERIFIED ✓</span>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Background Stream Log Lines */}
                                <div className="pt-2 border-t border-zinc-800/80 space-y-1 text-[11px] text-zinc-500">
                                    <div className="flex items-center gap-2">
                                        <GitCommit className="w-3 h-3 text-zinc-600" />
                                        <span className="text-zinc-400">[git:sha]</span>
                                        <span className="text-zinc-600 truncate">b765e69: issue state transition engine</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-3 h-3 text-zinc-600" />
                                        <span className="text-zinc-400">[mongo]</span>
                                        <span className="text-zinc-600 truncate">atomic $inc attendanceCount + 1</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Status Ticker Bar */}
                            <div className="px-4 py-2 bg-[#121212] border-t border-zinc-800 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                                <span>STATUS: CLUSTER_READY</span>
                                <span className="text-pink-400 font-bold">ZERO_DATA_LOSS</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3 Metric Summary Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
                    <div className="border border-zinc-800 bg-[#121212] p-5 rounded">
                        <div className="flex items-center justify-between text-zinc-400 mb-3">
                            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">01 / Scope</span>
                            <Layers className="w-4 h-4 text-pink-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Project Workspaces</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">Group tasks under specific initiatives with deadlines and milestone tracking.</p>
                    </div>

                    <div className="border border-zinc-800 bg-[#121212] p-5 rounded">
                        <div className="flex items-center justify-between text-zinc-400 mb-3">
                            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">02 / Execution</span>
                            <KanbanSquare className="w-4 h-4 text-pink-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Strict Lifecycle</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">Predictable progression: Open ➔ In Progress ➔ Resolved ➔ Closed.</p>
                    </div>

                    <div className="border border-zinc-800 bg-[#121212] p-5 rounded">
                        <div className="flex items-center justify-between text-zinc-400 mb-3">
                            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">03 / Attribution</span>
                            <Activity className="w-4 h-4 text-pink-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Attendance Ledger</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">Automated timestamps & credits when engineers push deliverables across the line.</p>
                    </div>
                </div>

                {/* ROLE MATRIX */}
                <div className="mb-20 border-t border-zinc-800 pt-16">
                    <div className="mb-8">
                        <span className="text-xs font-mono uppercase tracking-widest text-pink-500 mb-1 block">// Access Control</span>
                        <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white">Three Distinct Roles</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Admin */}
                        <div className="border border-zinc-800 bg-[#121212] p-5 rounded flex flex-col justify-between hover:border-pink-500/40 transition-colors">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30">ADMIN</span>
                                    <ShieldCheck className="w-4 h-4 text-pink-500" />
                                </div>
                                <h4 className="text-base font-semibold text-white mb-2">Team Lead / Admin</h4>
                                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                                    Create projects, create issues, delegate tasks to engineers, and modify user access roles from the admin panel.
                                </p>
                            </div>
                            <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-800">
                                permissions: [create, assign, grant_role]
                            </div>
                        </div>

                        {/* Team Member */}
                        <div className="border border-zinc-800 bg-[#121212] p-5 rounded flex flex-col justify-between hover:border-pink-500/40 transition-colors">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">MEMBER</span>
                                    <Users className="w-4 h-4 text-zinc-400" />
                                </div>
                                <h4 className="text-base font-semibold text-white mb-2">Software Engineer</h4>
                                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                                    View assigned tickets, update state to In-Progress during active sprints, and mark tickets as Resolved to earn attendance credits.
                                </p>
                            </div>
                            <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-800">
                                permissions: [read, update_status, resolve]
                            </div>
                        </div>

                        {/* Viewer */}
                        <div className="border border-zinc-800 bg-[#121212] p-5 rounded flex flex-col justify-between hover:border-pink-500/40 transition-colors">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">VIEWER</span>
                                    <Clock className="w-4 h-4 text-zinc-500" />
                                </div>
                                <h4 className="text-base font-semibold text-white mb-2">Stakeholder / Guest</h4>
                                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                                    Read-only visibility across active roadmap items, open bugs, and sprint velocity without modification rights.
                                </p>
                            </div>
                            <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-800">
                                permissions: [read_only]
                            </div>
                        </div>
                    </div>
                </div>

                {/* SPRINT LIFECYCLE WALKTHROUGH */}
                <div className="border-t border-zinc-800 pt-16">
                    <div className="mb-8">
                        <span className="text-xs font-mono uppercase tracking-widest text-pink-500 mb-1 block">// Workflow</span>
                        <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white">How An Issue Flows</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-5 border border-zinc-800 bg-[#121212] rounded">
                            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-3">
                                <span>STAGE 01</span>
                                <AlertCircle className="w-4 h-4 text-amber-400" />
                            </div>
                            <div className="font-mono text-xs text-amber-400 mb-1">status: "open"</div>
                            <h4 className="text-sm font-semibold text-white mb-2">Admin Creates Ticket</h4>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Defines title, technical requirements, priority (low / medium / high), and sets an assignee.
                            </p>
                        </div>

                        <div className="p-5 border border-zinc-800 bg-[#121212] rounded">
                            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-3">
                                <span>STAGE 02</span>
                                <Clock className="w-4 h-4 text-pink-500" />
                            </div>
                            <div className="font-mono text-xs text-pink-400 mb-1">status: "in_progress"</div>
                            <h4 className="text-sm font-semibold text-white mb-2">Engineer Takes Ownership</h4>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Member flags task as In-Progress. Socket.IO broadcasts the status change live to the team.
                            </p>
                        </div>

                        <div className="p-5 border border-zinc-800 bg-[#121212] rounded">
                            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-3">
                                <span>STAGE 03</span>
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            </div>
                            <div className="font-mono text-xs text-emerald-400 mb-1">status: "resolved"</div>
                            <h4 className="text-sm font-semibold text-white mb-2">Resolution & Credit</h4>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Ticket resolution computes exact turnaround duration and immediately records verifiable attendance.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Action Box */}
                    <div className="mt-12 p-6 border border-zinc-800 bg-[#121212] rounded flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h4 className="font-mono font-bold text-white text-base">Ready to test the pipeline?</h4>
                            <p className="text-xs text-zinc-400">Launch the dashboard or register a test account.</p>
                        </div>
                        <Link 
                            to={user ? "/dashboard" : "/register"} 
                            className="px-5 py-2.5 bg-pink-500 hover:bg-pink-400 text-black font-semibold text-xs font-mono rounded transition-colors whitespace-nowrap"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
