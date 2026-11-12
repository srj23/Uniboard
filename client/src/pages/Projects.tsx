import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Plus } from 'lucide-react';

interface Project {
    _id: string;
    title: string;
    description: string;
    status: 'active' | 'behind' | 'at_risk' | 'completed';
    createdBy?: { username: string; displayName?: string };
    teamMembers?: { username: string; displayName?: string }[];
    totalIssues?: number;
    openIssues?: number;
}

interface ProjectsProps {
    userRole?: string;
}

const Projects = ({ userRole }: ProjectsProps) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newStatus, setNewStatus] = useState<'active' | 'behind' | 'at_risk'>('active');

    const canCreate = userRole === 'admin';

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await api.get('/api/projects');
            setProjects(res.data);
        } catch (err) {
            console.error('Failed to fetch projects', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        try {
            await api.post('/api/projects', {
                title: newTitle,
                description: newDescription,
                status: newStatus
            });
            setShowCreateModal(false);
            setNewTitle('');
            setNewDescription('');
            fetchProjects();
        } catch (err: any) {
            alert(err.response?.data || 'Failed to create project');
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'behind':
                return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase">behind</span>;
            case 'at_risk':
                return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase">at risk</span>;
            case 'completed':
                return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">done</span>;
            default:
                return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30 uppercase">active</span>;
        }
    };

    return (
        <div className="space-y-4">
            <div className="border border-zinc-800 bg-[#121212] rounded p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold font-mono tracking-tight text-white">Project Registries</h2>
                    <p className="text-xs font-mono text-zinc-500">Initiatives and sprint boundaries</p>
                </div>
                {canCreate && (
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-pink-500 hover:bg-pink-400 text-black font-semibold text-xs font-mono rounded transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        New Project
                    </button>
                )}
            </div>

            {loading ? (
                <div className="py-8 border border-zinc-800 bg-[#121212] rounded text-center text-xs font-mono text-zinc-500">Loading projects...</div>
            ) : projects.length === 0 ? (
                <div className="border border-zinc-800 bg-[#121212] rounded p-10 text-center">
                    <h3 className="text-sm font-mono font-semibold text-white mb-1">No registered projects</h3>
                    <p className="text-xs font-mono text-zinc-500 mb-4">
                        {canCreate ? 'Initialize your first workspace to begin delegating issues.' : 'No projects active.'}
                    </p>
                    {canCreate && (
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-3 py-1.5 bg-pink-500 text-black text-xs font-mono font-semibold rounded"
                        >
                            Create Project
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {projects.map((proj) => (
                        <div key={proj._id} className="border border-zinc-800 bg-[#121212] rounded p-4 hover:border-zinc-700 transition-colors flex flex-col justify-between">
                            <div>
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 text-pink-400 flex items-center justify-center font-mono font-bold text-xs">
                                            {proj.title.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-sm text-white font-mono leading-tight">{proj.title}</h3>
                                            <span className="text-[10px] font-mono text-zinc-500">SCOPE_ID: {proj._id.slice(-6)}</span>
                                        </div>
                                    </div>
                                    <div>{getStatusBadge(proj.status)}</div>
                                </div>

                                <p className="text-xs text-zinc-400 line-clamp-2 min-h-[32px] mb-4">
                                    {proj.description || 'No description provided.'}
                                </p>
                            </div>

                            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                                <div>
                                    OWNER: <span className="text-zinc-300">{proj.createdBy?.displayName || proj.createdBy?.username || 'Admin'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Project Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                    <div className="bg-[#121212] border border-zinc-800 rounded max-w-md w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                            <h3 className="text-base font-bold font-mono text-white">Create New Project</h3>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30">ADMIN</span>
                        </div>

                        <form onSubmit={handleCreateProject} className="space-y-3.5">
                            <div>
                                <label className="block text-xs font-mono text-zinc-400 mb-1">Project Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Core API Service"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-white outline-none focus:border-pink-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-zinc-400 mb-1">Description</label>
                                <textarea
                                    placeholder="Brief technical summary..."
                                    rows={3}
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-white outline-none focus:border-pink-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-zinc-400 mb-1">Initial Health</label>
                                <select
                                    value={newStatus}
                                    onChange={(e: any) => setNewStatus(e.target.value)}
                                    className="w-full px-2.5 py-1.5 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-zinc-300 outline-none focus:border-pink-500"
                                >
                                    <option value="active">Active (On Track)</option>
                                    <option value="at_risk">At Risk</option>
                                    <option value="behind">Behind</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-3 py-1.5 rounded text-xs font-mono text-zinc-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-1.5 rounded text-xs font-mono font-semibold bg-pink-500 hover:bg-pink-400 text-black"
                                >
                                    Initialize Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
