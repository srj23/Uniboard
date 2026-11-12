import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Shield, Edit3, Award } from 'lucide-react';

const AdminPanel = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [editRole, setEditRole] = useState<'admin' | 'teammember' | 'others'>('teammember');
    const [editName, setEditName] = useState('');

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get('/api/admin');
            setUsers(res.data);
        } catch (err) {
            console.error('Failed to load user management', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const startEditing = (u: any) => {
        setEditingUserId(u._id);
        setEditRole(u.role || 'others');
        setEditName(u.displayName || u.username);
    };

    const handleSaveRole = async (userId: string) => {
        try {
            await api.put(`/api/admin/${userId}/role`, {
                role: editRole,
                displayName: editName
            });
            alert('User role and name updated.');
            setEditingUserId(null);
            fetchUsers();
        } catch (err: any) {
            alert(err.response?.data || 'Failed to update user role');
        }
    };

    return (
        <div className="space-y-4">
            <div className="border border-zinc-800 bg-[#121212] rounded p-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center">
                        <Shield className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold font-mono tracking-tight text-white">Access Governance</h2>
                        <p className="text-xs font-mono text-zinc-500">
                            Manage workspace roles, promote engineers, and grant admin permissions
                        </p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-8 text-xs font-mono text-zinc-500 border border-zinc-800 bg-[#121212] rounded">Loading team roster...</div>
            ) : (
                <div className="border border-zinc-800 bg-[#121212] rounded overflow-hidden">
                    <div className="p-3 border-b border-zinc-800 bg-[#0d0d0d] flex items-center justify-between">
                        <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold">Registered Team ({users.length})</h3>
                        <span className="text-[10px] font-mono text-zinc-600">ROLE_POLICY: STRICT</span>
                    </div>

                    <div className="divide-y divide-zinc-800">
                        {users.map((u) => {
                            const isEditing = editingUserId === u._id;
                            return (
                                <div key={u._id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 text-pink-400 font-mono font-bold flex items-center justify-center text-xs">
                                            {u.displayName?.substring(0, 2).toUpperCase() || u.username.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    className="px-2 py-1 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-white outline-none focus:border-pink-500"
                                                    placeholder="Display name..."
                                                />
                                            ) : (
                                                <div className="font-semibold text-xs font-mono text-white">
                                                    {u.displayName || u.username}
                                                </div>
                                            )}
                                            <div className="text-[10px] font-mono text-zinc-500">
                                                {u.email} • JOINED: {new Date(u.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-zinc-800">
                                        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                                            <Award className="w-3.5 h-3.5 text-pink-400" />
                                            <span>{u.attendanceCount || 0} PTS</span>
                                        </div>

                                        {isEditing ? (
                                            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                                                <select
                                                    value={editRole}
                                                    onChange={(e: any) => setEditRole(e.target.value)}
                                                    className="px-2 py-1 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-zinc-300 outline-none focus:border-pink-500"
                                                >
                                                    <option value="others">Viewer (Read-only)</option>
                                                    <option value="teammember">Team Member</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                                <button
                                                    onClick={() => handleSaveRole(u._id)}
                                                    className="px-2.5 py-1 bg-pink-500 hover:bg-pink-400 text-black text-xs font-mono font-semibold rounded"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingUserId(null)}
                                                    className="px-2 py-1 bg-zinc-800 text-xs font-mono text-zinc-400 rounded"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase border ${
                                                    u.role === 'admin' 
                                                        ? 'bg-pink-500/10 text-pink-400 border-pink-500/30' 
                                                        : u.role === 'teammember' 
                                                        ? 'bg-zinc-800 text-zinc-300 border-zinc-700' 
                                                        : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                                                }`}>
                                                    {u.role || 'others'}
                                                </span>

                                                <button
                                                    onClick={() => startEditing(u)}
                                                    className="p-1 text-zinc-500 hover:text-white transition"
                                                    title="Modify role"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
