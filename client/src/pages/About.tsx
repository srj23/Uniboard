import { motion } from 'framer-motion';
import {
    Target,
    Eye,
    Heart,
    Shield,
    Sparkles,
    Award,
    PenTool,
    KanbanSquare,
    Layers,
    Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    const stats = [
        { label: 'Whiteboards Created', value: '50K+', icon: Layers },
        { label: 'Issues Resolved', value: '160K+', icon: KanbanSquare },
        { label: 'Active Teams', value: '10K+', icon: Users },
        { label: 'Attendance Verified', value: '99.9%', icon: Award }
    ];

    const values = [
        {
            icon: Target,
            title: 'Unified Flow',
            description: 'Bridging visual brainstorming directly with deliverable execution. Ideas created on the whiteboard turn into trackable issues seamlessly.',
            gradient: 'from-blue-400 to-cyan-400'
        },
        {
            icon: Eye,
            title: 'Transparent Merit',
            description: 'Automated performance and attendance tracking that gives genuine credit to developers for resolved tasks and admins for proactive management.',
            gradient: 'from-purple-400 to-pink-400'
        },
        {
            icon: Heart,
            title: 'Collaborative Freedom',
            description: 'Simplicity and speed for everyone. Whether sketcher, engineer, or team lead, Uniboard provides an open canvas with zero friction.',
            gradient: 'from-emerald-400 to-teal-400'
        }
    ];

    const features = [
        {
            icon: PenTool,
            title: 'Real-Time Multiplayer Canvas',
            description: 'Draw shapes, connect ideas, attach notes, and collaborate across borders using low-latency WebSockets.'
        },
        {
            icon: KanbanSquare,
            title: 'IssueFlow Engine',
            description: 'Organize project deliverables, track priorities, filter sprints, and resolve technical bugs with clear accountability.'
        },
        {
            icon: Award,
            title: 'Automated Attendance System',
            description: 'Gain verifiable attendance credits whenever you assign tasks as an Admin or resolve tickets as a Team Member.'
        },
        {
            icon: Shield,
            title: 'Role-Based Governance',
            description: 'Granular permissions tailored for Admins, Team Members, and Guests with JWT authentication and protected endpoints.'
        }
    ];

    return (
        <div className="min-h-screen bg-background py-16 px-4">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-500/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-purple-500/10 rounded-full blur-[140px]" />
            </div>

            <div className="relative z-10 container mx-auto max-w-6xl">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-sm text-xs font-semibold text-blue-400 mb-6">
                        <Sparkles className="w-4 h-4 mr-2" />
                        About Uniboard Workspace
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Revolutionizing How Teams <br />
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                            Sketch, Track & Deliver
                        </span>
                    </h1>
                    <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Uniboard unites real-time collaborative whiteboards, comprehensive issue tracking, and an automated attendance system into a single cohesive ecosystem.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20"
                >
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-2xl bg-card border border-border text-center hover:border-primary/50 transition-all shadow-sm"
                        >
                            <stat.icon className="w-6 h-6 mx-auto mb-3 text-primary" />
                            <div className="text-2xl sm:text-3xl font-extrabold mb-1">{stat.value}</div>
                            <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Our Mission & Values */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-20"
                >
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-12">
                        Core Principles Driving Uniboard
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all shadow-sm flex flex-col justify-between"
                            >
                                <div>
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6`}>
                                        <value.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Story Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-8 sm:p-12 rounded-3xl bg-card/70 border border-border backdrop-blur-md mb-20 shadow-sm"
                >
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-6">The Uniboard Story</h2>
                    <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        <p>
                            Modern engineering and design teams often face a disconnect: creative diagrams happen in one whiteboard app, tasks are scattered across a complex issue tracker, and attendance/performance logging is handled in another outdated spreadsheet.
                        </p>
                        <p>
                            We built <strong>Uniboard</strong> to solve this fragmentation. By bridging infinite collaborative canvases with an intuitive IssueFlow pipeline, tasks flow naturally from conception to resolution.
                        </p>
                        <p>
                            With our automated attendance ledger, every deliverable resolved and every sprint managed translates directly into verifiable performance points—rewarding high-performing team members and proactive leaders.
                        </p>
                    </div>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-20"
                >
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-12">
                        Built For High-Velocity Teams
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all shadow-sm"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-base mb-1.5">{feature.title}</h3>
                                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-emerald-600/10 border border-border text-center shadow-lg"
                >
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Ready to Transform Your Workflow?</h2>
                    <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-6">
                        Join teams organizing their visual ideas, task pipelines, and attendance tracking on Uniboard.
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-2xl hover:opacity-95 transition-all shadow-lg text-sm"
                    >
                        Get Started with Uniboard
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
