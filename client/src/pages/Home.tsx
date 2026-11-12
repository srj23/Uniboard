import { Link } from 'react-router-dom';
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
    ArrowUpRight
} from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-pink-500 selection:text-black">
            <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
                {/* HERO SECTION */}
                <div className="mb-20">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-medium mb-6">
                        <Terminal className="w-3.5 h-3.5" />
                        Simple Issue & Sprint Tracker
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 font-mono leading-[1.08]">
                        Deliver software. <br />
                        <span className="text-pink-500">Cut the noise.</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-base sm:text-lg text-zinc-400 mb-8 max-w-2xl leading-relaxed">
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

                    {/* 3 Metric Summary Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
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
