import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Plus, FolderKanban } from 'lucide-react';

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
                return <span className="flex items-center text-xs font-medium text-rose-500"><span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>Behind</span>;
            case 'at_risk':
                return <span className="flex items-center text-xs font-medium text-amber-500"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>At Risk</span>;
            case 'completed':
                return <span className="flex items-center text-xs font-medium text-emerald-500"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>Completed</span>;
            default:
                return <span className="flex items-center text-xs font-medium text-blue-500"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>Active</span>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
                    <p className="text-sm text-muted-foreground">Manage your team's projects and track their progress</p>
                </div>
                {canCreate && (
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        New Project
                    </button>
                )}
            </div>

            {loading ? (
                <div className="py-12 text-center text-muted-foreground text-sm">Loading projects...</div>
            ) : projects.length === 0 ? (
                <div className="bg-card border border-border rounded-2xl p-12 text-center">
                    <FolderKanban className="w-12 h-12 mx-auto text-muted-foreground mb-3 opacity-40" />
                    <h3 className="text-base font-semibold mb-1">No projects yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        {canCreate ? 'Create your first project to start managing tasks and issues.' : 'No projects have been assigned to your workspace yet.'}
                    </p>
                    {canCreate && (
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-xl font-medium"
                        >
                            Create Project
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((proj) => (
                        <div key={proj._id} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow relative">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-lg">
                                        {proj.title.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-base leading-snug">{proj.title}</h3>
                                        <span className="inline-block mt-0.5 text-xs px-2 py-0.5 rounded-full bg-secondary font-medium">active</span>
                                    </div>
                                </div>
                                <div>{getStatusBadge(proj.status)}</div>
                            </div>

                            <p className="text-xs text-muted-foreground line-clamp-2 min-h-[32px] mb-6">
                                {proj.description || 'No description provided.'}
                            </p>

                            <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                                <div>
                                    Created by <span className="font-medium text-foreground">{proj.createdBy?.displayName || proj.createdBy?.username || 'Admin'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Project Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <h3 className="text-lg font-bold mb-1">Create New Project</h3>
                        <p className="text-xs text-muted-foreground mb-4">Add a new project to organize team issues and sprints.</p>

                        <form onSubmit={handleCreateProject} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">Project Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Core Platform Engine"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-xl text-sm outline-none focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">Description</label>
                                <textarea
                                    placeholder="Brief summary of the project goals..."
                                    rows={3}
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-xl text-sm outline-none focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">Initial Health Status</label>
                                <select
                                    value={newStatus}
                                    onChange={(e: any) => setNewStatus(e.target.value)}
                                    className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-xl text-sm outline-none focus:border-primary"
                                >
                                    <option value="active">Active (On Track)</option>
                                    <option value="at_risk">At Risk</option>
                                    <option value="behind">Behind</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-medium bg-secondary hover:bg-secondary/80 text-foreground"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-xl text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Create Project
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
