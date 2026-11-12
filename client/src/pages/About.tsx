import {
    Target,
    Eye,
    Shield,
    Award,
    KanbanSquare,
    Layers,
    Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    const stats = [
        { label: 'PROJECTS_TRACKED', value: '12K+', icon: Layers },
        { label: 'ISSUES_RESOLVED', value: '160K+', icon: KanbanSquare },
        { label: 'ACTIVE_DEVELOPERS', value: '10K+', icon: Users },
        { label: 'ATTENDANCE_ACCURACY', value: '99.9%', icon: Award }
    ];

    const values = [
        {
            icon: Target,
            title: 'Zero Overhead',
            description: 'No 30-field forms to file a bug. Just an issue code, title, project, priority, and an assignee.'
        },
        {
            icon: Eye,
            title: 'Verifiable Merit',
            description: 'Automated performance points recorded only when tickets move across the resolution line.'
        },
        {
            icon: Shield,
            title: 'Clean Permissions',
            description: 'Strict role gates prevent team members from stepping on admin settings, preserving audit trails.'
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 py-16 px-4 font-sans">
            <div className="container mx-auto max-w-5xl">
                {/* Hero Section */}
                <div className="mb-16 pb-8 border-b border-zinc-800">
                    <span className="text-xs font-mono uppercase tracking-widest text-pink-500 mb-2 block">// About</span>
                    <h1 className="text-3xl sm:text-5xl font-bold font-mono tracking-tight text-white mb-4">
                        Architecture & Purpose
                    </h1>
                    <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
                        Issueflow was engineered to replace slow, heavy enterprise project trackers with a lightweight, high-contrast system designed for daily developer sprints.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="p-4 rounded border border-zinc-800 bg-[#121212]"
                        >
                            <stat.icon className="w-4 h-4 mb-2 text-pink-500" />
                            <div className="text-xl font-bold font-mono text-white mb-0.5">{stat.value}</div>
                            <div className="text-[10px] font-mono text-zinc-500">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Principles */}
                <div className="mb-16">
                    <h2 className="text-lg font-bold font-mono text-white mb-6">Design Principles</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="p-5 rounded border border-zinc-800 bg-[#121212]"
                            >
                                <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 text-pink-400 flex items-center justify-center mb-4">
                                    <value.icon className="w-4 h-4" />
                                </div>
                                <h3 className="text-sm font-semibold font-mono text-white mb-2">{value.title}</h3>
                                <p className="text-xs text-zinc-400 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack Spec */}
                <div className="p-6 rounded border border-zinc-800 bg-[#121212] mb-16">
                    <h2 className="text-base font-bold font-mono text-white mb-4">System Architecture</h2>
                    <div className="space-y-2 text-xs font-mono text-zinc-400">
                        <div className="flex justify-between py-1.5 border-b border-zinc-800">
                            <span className="text-zinc-500">BACKEND_RUNTIME</span>
                            <span className="text-zinc-200">Node.js + Express (Port 5001)</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-zinc-800">
                            <span className="text-zinc-500">DATABASE</span>
                            <span className="text-zinc-200">MongoDB with Mongoose ODM</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-zinc-800">
                            <span className="text-zinc-500">REALTIME_TRANSPORT</span>
                            <span className="text-zinc-200">Socket.IO Rooms per Project</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-zinc-800">
                            <span className="text-zinc-500">AUTH_MECHANISM</span>
                            <span className="text-zinc-200">JWT (Header Bearer) + bcrypt Password Hashing</span>
                        </div>
                        <div className="flex justify-between py-1.5">
                            <span className="text-zinc-500">FRONTEND_STACK</span>
                            <span className="text-zinc-200">React + TypeScript + Vite + Tailwind CSS</span>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="p-6 border border-zinc-800 bg-[#121212] rounded flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="font-mono font-bold text-white text-sm">Deploy or test locally</h3>
                        <p className="text-xs text-zinc-500 font-mono">Create an account to explore the dashboard.</p>
                    </div>
                    <Link
                        to="/register"
                        className="px-5 py-2.5 bg-pink-500 hover:bg-pink-400 text-black font-semibold text-xs font-mono rounded"
                    >
                        Sign Up Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;
