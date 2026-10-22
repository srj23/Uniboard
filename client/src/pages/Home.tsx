import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CheckCircle2,
    Clock,
    Users,
    AlertCircle,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    FolderKanban,
    Layers,
    PenTool
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
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-500/10 rounded-full blur-[140px]" />
                <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[140px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
                {/* TOP SECTION: ISSUEFLOW / TASK MANAGEMENT HERO */}
                <motion.div
                    className="flex flex-col items-center justify-center text-center mb-20"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div 
                        variants={itemVariants} 
                        className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-sm text-sm text-blue-400 font-medium"
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Smart Issue Tracking & Attendance Workflow
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight max-w-4xl">
                        Manage Your Tasks & Issues <br />
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                            With Complete Flow & Clarity
                        </span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                        Track progress in real time, delegate tasks across your team, and automatically earn attendance credits for every issue assigned and resolved.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        {user ? (
                            <Link 
                                to="/dashboard" 
                                className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
                            >
                                Open IssueFlow Dashboard
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : (
                            <>
                                <Link 
                                    to="/register" 
                                    className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
                                >
                                    Start Managing Free
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link 
                                    to="/login" 
                                    className="px-8 py-4 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/80 transition-colors border border-border flex items-center justify-center"
                                >
                                    Sign In to Your Workspace
                                </Link>
                            </>
                        )}
                    </motion.div>

                    {/* Quick KPI Preview Cards */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-4xl">
                        <div className="bg-card/50 border border-border p-5 rounded-2xl backdrop-blur-sm text-left">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground font-medium">Open Issues</span>
                                <AlertCircle className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="text-2xl font-bold">173</div>
                            <span className="text-xs text-green-500 font-medium">Real-time sync</span>
                        </div>

                        <div className="bg-card/50 border border-border p-5 rounded-2xl backdrop-blur-sm text-left">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground font-medium">In Progress</span>
                                <Clock className="w-5 h-5 text-purple-400" />
                            </div>
                            <div className="text-2xl font-bold">42</div>
                            <span className="text-xs text-purple-400 font-medium">Active sprints</span>
                        </div>

                        <div className="bg-card/50 border border-border p-5 rounded-2xl backdrop-blur-sm text-left">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground font-medium">Resolved</span>
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                            </div>
                            <div className="text-2xl font-bold">162</div>
                            <span className="text-xs text-green-400 font-medium">+9 vs yesterday</span>
                        </div>

                        <div className="bg-card/50 border border-border p-5 rounded-2xl backdrop-blur-sm text-left">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground font-medium">Team Attendance</span>
                                <ShieldCheck className="w-5 h-5 text-amber-400" />
                            </div>
                            <div className="text-2xl font-bold">100%</div>
                            <span className="text-xs text-amber-400 font-medium">Auto-credited</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* ROLE WORKFLOW SECTION */}
                <div className="mb-28">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-3">Engineered for Clear Team Roles</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Role-based governance ensures every team member knows their exact duty and receives credit for completed deliverables.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Admin</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Complete workspace oversight. Create projects, manage users, set permissions, and oversee company-wide delivery metrics.
                            </p>
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400">Full System Control</span>
                        </div>

                        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                                <FolderKanban className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Manager</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Create and assign issues to team members. Gain automatic attendance credit upon delegating tasks to keep projects flowing.
                            </p>
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400">Task Delegation & Attendance</span>
                        </div>

                        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Team Member</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Focused execution. View assigned issues, transition work to In Progress, and mark as Resolved to earn verified attendance.
                            </p>
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400">Execution & Verified Credits</span>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: UNIBOARD COLLABORATIVE WHITEBOARD */}
                <div className="border-t border-border/60 pt-20">
                    <div className="flex flex-col items-center justify-center text-center mb-12">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-secondary/50 backdrop-blur-sm text-xs text-muted-foreground mb-4">
                            <PenTool className="w-3.5 h-3.5 mr-2 text-primary" />
                            Integrated Canvas Suite
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Collaborate Without Limits
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                            The ultimate collaborative whiteboard for developers and designers.
                            Sketch architectures, plan sprints, and share ideas in real-time with an infinite canvas.
                        </p>
                    </div>

                    <div className="relative rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md p-4 md:p-8 max-w-5xl mx-auto shadow-2xl">
                        <div className="aspect-[16/9] rounded-xl overflow-hidden bg-secondary/30 relative flex items-center justify-center border border-border">
                            <img
                                src="/assets/landing_ss.png"
                                alt="Uniboard Collaborative Canvas"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Fallback if local asset is not available
                                    e.currentTarget.src = "https://github.com/Hunter87ff/uniboard/blob/main/assets/landing_ss.png?raw=true";
                                }}
                            />
                        </div>
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <h4 className="font-semibold text-foreground">Interactive Whiteboard Studio</h4>
                                <p className="text-sm text-muted-foreground">Draw shapes, attach sticky notes, connect workflows, and brainstorm live.</p>
                            </div>
                            <Link 
                                to="/dashboard" 
                                className="px-6 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-medium text-sm border border-border transition-all flex items-center gap-2"
                            >
                                <Layers className="w-4 h-4" />
                                Launch Board
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
