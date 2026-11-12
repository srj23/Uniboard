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
    Check,
    Sparkles,
    Award
} from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Simple, human-friendly task cards that everyone understands
const SAMPLE_CARDS = [
    {
        id: '1',
        title: 'Fix mobile navigation menu',
        stage: 'In Progress',
        stageColor: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
        assignee: 'Sarah Miller',
        avatarText: 'SM',
        note: 'Testing on iPhone and Android screens',
        time: 'Updated 2 mins ago'
    },
    {
        id: '2',
        title: 'Design clean sign-in screen',
        stage: 'Resolved',
        stageColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        assignee: 'Alex Chen',
        avatarText: 'AC',
        note: 'Completed on time • Attendance credit awarded',
        time: 'Completed today'
    },
    {
        id: '3',
        title: 'Update monthly pricing plans',
        stage: 'New Task',
        stageColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        assignee: 'David Patel',
        avatarText: 'DP',
        note: 'Assigned by team admin with high priority',
        time: 'Assigned 1 hour ago'
    }
];

const Home = () => {
    const { user } = useContext(AuthContext);
    const [cardIndex, setCardIndex] = useState(0);

    // Automatically transition through sample tasks
    useEffect(() => {
        const interval = setInterval(() => {
            setCardIndex((prev) => (prev + 1) % SAMPLE_CARDS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const activeCard = SAMPLE_CARDS[cardIndex];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-pink-500 selection:text-black">
            <div className="container mx-auto px-4 py-10 md:py-16 max-w-6xl">
                {/* HERO SECTION WITH SIMPLE VISUAL TASK BOARD */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
                    {/* Left Column (7 cols): Main Headline & CTA */}
                    <div className="lg:col-span-7">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-medium mb-6">
                            <Terminal className="w-3.5 h-3.5" />
                            Simple Issue & Task Tracker
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 font-mono leading-[1.06]">
                            Deliver software. <br />
                            <span className="text-pink-500">Cut the noise.</span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-base sm:text-lg text-zinc-400 mb-8 max-w-xl leading-relaxed">
                            A straightforward way for teams to assign tasks, follow progress, and automatically reward members when work gets completed.
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
                                Read how it works <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column (5 cols): Clean, Simple Task Preview Card */}
                    <div className="lg:col-span-5 relative">
                        {/* Soft background glow */}
                        <div className="absolute -inset-1 bg-pink-500/15 rounded-xl blur-lg pointer-events-none" />

                        <div className="relative border border-zinc-800 bg-[#121212] rounded-xl overflow-hidden shadow-2xl p-5">
                            {/* Card Header */}
                            <div className="flex items-center justify-between pb-3.5 border-b border-zinc-800">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block animate-pulse"></span>
                                    <span className="text-xs font-bold text-white tracking-wide">Live Team Activity</span>
                                </div>
                                <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3 text-pink-400" />
                                    Real-time
                                </span>
                            </div>

                            {/* 3 Step Workflow Tabs */}
                            <div className="grid grid-cols-3 gap-2 my-4">
                                <button
                                    onClick={() => setCardIndex(2)}
                                    className={`py-2 px-1 text-center rounded border transition-colors ${
                                        cardIndex === 2 
                                            ? 'border-pink-500 bg-pink-500/10 text-white font-semibold' 
                                            : 'border-zinc-800 bg-[#181818] text-zinc-400 hover:text-zinc-200'
                                    }`}
                                >
                                    <div className="text-[10px] text-zinc-500">Step 1</div>
                                    <div className="text-xs">New Tasks</div>
                                </button>
                                <button
                                    onClick={() => setCardIndex(0)}
                                    className={`py-2 px-1 text-center rounded border transition-colors ${
                                        cardIndex === 0 
                                            ? 'border-pink-500 bg-pink-500/10 text-white font-semibold' 
                                            : 'border-zinc-800 bg-[#181818] text-zinc-400 hover:text-zinc-200'
                                    }`}
                                >
                                    <div className="text-[10px] text-zinc-500">Step 2</div>
                                    <div className="text-xs">In Progress</div>
                                </button>
                                <button
                                    onClick={() => setCardIndex(1)}
                                    className={`py-2 px-1 text-center rounded border transition-colors ${
                                        cardIndex === 1 
                                            ? 'border-pink-500 bg-pink-500/10 text-white font-semibold' 
                                            : 'border-zinc-800 bg-[#181818] text-zinc-400 hover:text-zinc-200'
                                    }`}
                                >
                                    <div className="text-[10px] text-zinc-500">Step 3</div>
                                    <div className="text-xs">Done</div>
                                </button>
                            </div>

                            {/* Animated Task Card Container */}
                            <div className="min-h-[140px] flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeCard.id}
                                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                                        transition={{ duration: 0.25 }}
                                        className="w-full bg-[#181818] border border-zinc-700/60 rounded-lg p-4 shadow-sm"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-semibold text-white">
                                                {activeCard.title}
                                            </span>
                                            <span className={`text-[11px] px-2 py-0.5 rounded border font-medium ${activeCard.stageColor}`}>
                                                {activeCard.stage}
                                            </span>
                                        </div>

                                        <p className="text-xs text-zinc-400 mb-3">
                                            {activeCard.note}
                                        </p>

                                        <div className="flex items-center justify-between pt-2.5 border-t border-zinc-800 text-xs">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-pink-500 text-black flex items-center justify-center font-bold text-[10px]">
                                                    {activeCard.avatarText}
                                                </div>
                                                <span className="text-zinc-300 font-medium">{activeCard.assignee}</span>
                                            </div>
                                            <span className="text-[11px] text-zinc-500">{activeCard.time}</span>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Bottom Helper Points */}
                            <div className="mt-4 pt-3 border-t border-zinc-800 space-y-1.5 text-xs text-zinc-400">
                                <div className="flex items-center gap-2">
                                    <Check className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                                    <span>Assign tasks to team members in one click</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                                    <span>Team members automatically earn attendance when tasks are done</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3 Metric Summary Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
                    <div className="border border-zinc-800 bg-[#121212] p-5 rounded">
                        <div className="flex items-center justify-between text-zinc-400 mb-3">
                            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">01 / Projects</span>
                            <Layers className="w-4 h-4 text-pink-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Project Workspaces</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">Group tasks under specific projects with clear goals and due dates.</p>
                    </div>

                    <div className="border border-zinc-800 bg-[#121212] p-5 rounded">
                        <div className="flex items-center justify-between text-zinc-400 mb-3">
                            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">02 / Clear Flow</span>
                            <KanbanSquare className="w-4 h-4 text-pink-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Simple Stages</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">Follow tasks easily: Open ➔ In Progress ➔ Resolved ➔ Closed.</p>
                    </div>

                    <div className="border border-zinc-800 bg-[#121212] p-5 rounded">
                        <div className="flex items-center justify-between text-zinc-400 mb-3">
                            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">03 / Recognition</span>
                            <Activity className="w-4 h-4 text-pink-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Attendance Credits</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">Get recognized and earn points automatically when you complete tasks.</p>
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
                                <h4 className="text-base font-semibold text-white mb-2">Team Member</h4>
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
                                <h4 className="text-base font-semibold text-white mb-2">Viewer / Guest</h4>
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
                                Defines title, requirements, priority (low / medium / high), and sets an assignee.
                            </p>
                        </div>

                        <div className="p-5 border border-zinc-800 bg-[#121212] rounded">
                            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-3">
                                <span>STAGE 02</span>
                                <Clock className="w-4 h-4 text-pink-500" />
                            </div>
                            <div className="font-mono text-xs text-pink-400 mb-1">status: "in_progress"</div>
                            <h4 className="text-sm font-semibold text-white mb-2">Member Starts Work</h4>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Member flags task as In-Progress. Real-time updates notify the team instantly.
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
                                Ticket resolution calculates turnaround duration and automatically awards attendance.
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
