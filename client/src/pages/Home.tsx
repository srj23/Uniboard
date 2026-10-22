import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Users,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Layers,
    PenTool,
    Award,
    KanbanSquare,
    MousePointer2,
    Square,
    Circle,
    Type,
    ArrowUpRight
} from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary selection:text-primary-foreground">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[150px]" />
                <div className="absolute top-[25%] right-[-10%] w-[45%] h-[45%] bg-purple-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[10%] left-[20%] w-[35%] h-[35%] bg-emerald-500/10 rounded-full blur-[140px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 max-w-7xl">
                {/* HERO SECTION */}
                <motion.div
                    className="flex flex-col items-center justify-center text-center mb-24"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Badge */}
                    <motion.div 
                        variants={itemVariants} 
                        className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-xs sm:text-sm text-blue-400 font-semibold tracking-wide shadow-sm"
                    >
                        <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                        Next-Gen Workspace • Whiteboard + IssueFlow + Attendance
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight max-w-5xl leading-[1.15]">
                        Where Teams <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Collaborate</span>, <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Resolve Issues</span>, & Track{' '}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Attendance</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl leading-relaxed">
                        Uniboard unites infinite collaborative sketching with robust issue management and automated performance credits. Admins delegate, team members resolve deliverables to earn attendance, and guests explore live whiteboard canvases.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        {user ? (
                            <Link 
                                to="/dashboard" 
                                className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-95 transition-all shadow-xl hover:shadow-primary/25 flex items-center justify-center gap-2 text-sm sm:text-base"
                            >
                                Open Uniboard Dashboard
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : (
                            <>
                                <Link 
                                    to="/register" 
                                    className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-95 transition-all shadow-xl hover:shadow-primary/25 flex items-center justify-center gap-2 text-sm sm:text-base"
                                >
                                    Get Started Free
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link 
                                    to="/login" 
                                    className="px-8 py-4 bg-secondary/80 hover:bg-secondary text-secondary-foreground rounded-2xl font-semibold transition-colors border border-border flex items-center justify-center text-sm sm:text-base backdrop-blur-sm"
                                >
                                    Sign In to Workspace
                                </Link>
                            </>
                        )}
                    </motion.div>

                    {/* Live Tri-Pillar Stats Preview */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-16 w-full max-w-4xl text-left">
                        {/* 1. Whiteboard Pillar */}
                        <div className="bg-card/70 border border-blue-500/20 p-5 rounded-2xl backdrop-blur-md hover:border-blue-500/40 transition-all shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Collaborative Canvas</span>
                                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                                    <PenTool className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="text-2xl font-extrabold text-foreground">Infinite Canvas</div>
                            <p className="text-xs text-muted-foreground mt-1">Multiplayer real-time shapes, connectors, and notes via Socket.IO</p>
                        </div>

                        {/* 2. IssueFlow Pillar */}
                        <div className="bg-card/70 border border-purple-500/20 p-5 rounded-2xl backdrop-blur-md hover:border-purple-500/40 transition-all shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Issue Management</span>
                                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                                    <KanbanSquare className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="text-2xl font-extrabold text-foreground">IssueFlow Engine</div>
                            <p className="text-xs text-muted-foreground mt-1">Assign, track status from open to resolved with sprint metrics</p>
                        </div>

                        {/* 3. Attendance Pillar */}
                        <div className="bg-card/70 border border-emerald-500/20 p-5 rounded-2xl backdrop-blur-md hover:border-emerald-500/40 transition-all shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Verified Attendance</span>
                                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                                    <Award className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="text-2xl font-extrabold text-foreground">Auto-Credit System</div>
                            <p className="text-xs text-muted-foreground mt-1">Earn attendance automatically upon assigning and resolving tasks</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* ROLE MATRIX SECTION */}
                <div className="mb-28">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">Built For Team Cohesion</span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">Clear Roles, Tailored Permissions</h2>
                        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                            Whether you manage the pipeline, resolve bug tickets, or just brainstorm ideas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {/* Admin */}
                        <div className="bg-card/80 border border-border p-6 rounded-3xl shadow-sm hover:border-purple-500/50 transition-all flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-5 font-bold">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Admin</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                                    Full system command. Create projects, create and assign issues to team members, rename members, and grant Admin access. Earns attendance for delegating tasks.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-border flex items-center justify-between">
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">Full System Control</span>
                            </div>
                        </div>

                        {/* Team Member */}
                        <div className="bg-card/80 border border-border p-6 rounded-3xl shadow-sm hover:border-blue-500/50 transition-all flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-5 font-bold">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Team Member</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                                    Access whiteboard studio, view assigned issues, move status to In Progress, and mark as Resolved to automatically earn verified attendance credits and boost performance metrics.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-border flex items-center justify-between">
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Whiteboard + Issue Resolution</span>
                            </div>
                        </div>

                        {/* Others */}
                        <div className="bg-card/80 border border-border p-6 rounded-3xl shadow-sm hover:border-emerald-500/50 transition-all flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-5 font-bold">
                                    <PenTool className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Others</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                                    Pure creativity and collaboration. Guests and external contributors can access the full suite of collaborative whiteboard tools, draw shapes, sketch diagrams, and export boards.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-border flex items-center justify-between">
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400">Dedicated Whiteboard Access</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DEDICATED COLLABORATIVE WHITEBOARD SECTION */}
                <div className="border-t border-border/70 pt-20">
                    <div className="flex flex-col items-center justify-center text-center mb-12">
                        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-sm text-xs text-blue-400 font-semibold mb-4">
                            <PenTool className="w-3.5 h-3.5 mr-2" />
                            Live Interactive Canvas Suite
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight">
                            Collaborate Without Limits
                        </h2>
                        <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                            The ultimate collaborative canvas designed for developers, architects, and designers.
                            Brainstorm in real-time with instant multi-cursor synchronization.
                        </p>
                    </div>

                    {/* Interactive Canvas Mockup with Shapes & Tools (Clean, Responsive Whiteboard UI) */}
                    <div className="relative rounded-3xl border border-border/90 bg-card/70 backdrop-blur-xl p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto shadow-2xl overflow-hidden">
                        {/* Canvas Window Topbar */}
                        <div className="flex items-center justify-between pb-4 border-b border-border/80 text-xs text-muted-foreground flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                                </div>
                                <span className="font-semibold text-foreground ml-2">Sprint Architecture Board</span>
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold text-[10px]">● Live Sync</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-background">AJ</div>
                                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-background">PS</div>
                                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-background">+3</div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Board Visual Canvas */}
                        <div className="relative h-[320px] sm:h-[420px] md:h-[480px] w-full rounded-2xl bg-zinc-950/80 border border-border/60 overflow-hidden my-4 flex items-center justify-center">
                            {/* Canvas Dot Grid Background */}
                            <div 
                                className="absolute inset-0 opacity-20 pointer-events-none"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
                                    backgroundSize: '24px 24px'
                                }}
                            />

                            {/* Canvas Mockup Elements */}
                            <div className="relative w-full h-full p-4 sm:p-8 flex flex-col md:flex-row items-center justify-around gap-6 select-none pointer-events-none">
                                {/* Flowchart Node 1 */}
                                <div className="bg-blue-600/15 border-2 border-blue-500/60 p-4 sm:p-5 rounded-2xl shadow-lg backdrop-blur-sm max-w-[200px] text-center">
                                    <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-1">Issue Flow</div>
                                    <div className="text-xs sm:text-sm font-semibold text-white">#1a79e00b Fix Allocation API</div>
                                    <div className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-medium inline-block">Assigned</div>
                                </div>

                                {/* Flowchart Connecting Arrow */}
                                <div className="hidden md:flex flex-col items-center text-blue-400 font-mono text-xs">
                                    <span>────────►</span>
                                    <span className="text-[10px] text-muted-foreground mt-0.5">Socket Sync</span>
                                </div>

                                {/* Flowchart Node 2: Whiteboard Sticky Note */}
                                <div className="bg-amber-400/20 border-2 border-amber-400/70 p-4 sm:p-5 rounded-2xl shadow-lg backdrop-blur-sm max-w-[220px] text-left transform md:-rotate-2">
                                    <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-1">💡 Architecture Note</div>
                                    <p className="text-xs sm:text-xs font-medium text-amber-100 leading-snug">
                                        Team Member resolves $\rightarrow$ Attendance +1 auto verified in MongoDB.
                                    </p>
                                    <div className="mt-2 text-[10px] text-amber-300/80 font-mono">By Partha Sarkar</div>
                                </div>

                                {/* Flowchart Connecting Arrow */}
                                <div className="hidden md:flex flex-col items-center text-emerald-400 font-mono text-xs">
                                    <span>────────►</span>
                                    <span className="text-[10px] text-muted-foreground mt-0.5">Verified</span>
                                </div>

                                {/* Flowchart Node 3: Result */}
                                <div className="bg-emerald-600/15 border-2 border-emerald-500/60 p-4 sm:p-5 rounded-2xl shadow-lg backdrop-blur-sm max-w-[200px] text-center">
                                    <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1">Attendance</div>
                                    <div className="text-xs sm:text-sm font-semibold text-white">100% On-Time Delivery</div>
                                    <div className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium inline-block">Credit Awarded</div>
                                </div>
                            </div>

                            {/* Floating Toolbar on Bottom of Canvas */}
                            <div className="absolute bottom-4 inset-x-0 mx-auto w-fit bg-card/90 border border-border/80 px-4 py-2 rounded-2xl backdrop-blur-md shadow-xl flex items-center gap-2 sm:gap-4">
                                <div className="p-2 rounded-xl bg-blue-600 text-white"><MousePointer2 className="w-4 h-4" /></div>
                                <div className="p-2 rounded-xl hover:bg-secondary text-muted-foreground"><Square className="w-4 h-4" /></div>
                                <div className="p-2 rounded-xl hover:bg-secondary text-muted-foreground"><Circle className="w-4 h-4" /></div>
                                <div className="p-2 rounded-xl hover:bg-secondary text-muted-foreground"><Type className="w-4 h-4" /></div>
                                <div className="p-2 rounded-xl hover:bg-secondary text-muted-foreground"><PenTool className="w-4 h-4" /></div>
                            </div>
                        </div>

                        {/* Bottom Bar Under Canvas */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                            <div>
                                <h4 className="font-semibold text-foreground text-sm sm:text-base">Real-Time Multiplayer Canvas</h4>
                                <p className="text-xs text-muted-foreground">Unlimited boards, zero latency, free for all registered users.</p>
                            </div>
                            <Link 
                                to={user ? "/dashboard" : "/register"} 
                                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                            >
                                <Layers className="w-4 h-4" />
                                Launch Live Canvas
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
