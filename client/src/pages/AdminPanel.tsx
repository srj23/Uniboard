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
            alert('User permissions and details updated successfully!');
            setEditingUserId(null);
            fetchUsers();
        } catch (err: any) {
            alert(err.response?.data || 'Failed to update user role');
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-600 flex items-center justify-center">
                        <Shield className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Admin Control Panel</h2>
                        <p className="text-xs text-muted-foreground">
                            Manage workspace roles, grant Admin access to team members, and configure permissions
                        </p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-xs text-muted-foreground">Loading workspace users...</div>
            ) : (
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-border bg-secondary/30">
                        <h3 className="font-semibold text-sm">Registered Members ({users.length})</h3>
                    </div>

                    <div className="divide-y divide-border">
                        {users.map((u) => {
                            const isEditing = editingUserId === u._id;
                            return (
                                <div key={u._id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                                            {u.displayName?.substring(0, 2).toUpperCase() || u.username.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    className="px-2.5 py-1 bg-secondary border border-border rounded-lg text-xs font-semibold outline-none"
                                                    placeholder="Display name..."
                                                />
                                            ) : (
                                                <div className="font-semibold text-sm text-foreground">
                                                    {u.displayName || u.username}
                                                </div>
                                            )}
                                            <div className="text-xs text-muted-foreground">
                                                {u.email} • Joined {new Date(u.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-border">
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <Award className="w-4 h-4 text-emerald-500" />
                                            <span>{u.attendanceCount || 0} Attendance</span>
                                        </div>

                                        {isEditing ? (
                                            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                                                <select
                                                    value={editRole}
                                                    onChange={(e: any) => setEditRole(e.target.value)}
                                                    className="px-3 py-1.5 bg-secondary border border-border rounded-xl text-xs outline-none font-medium flex-1 sm:flex-none"
                                                >
                                                    <option value="others">Others (Whiteboard only)</option>
                                                    <option value="teammember">Team Member</option>
                                                    <option value="admin">Admin (Full Control)</option>
                                                </select>
                                                <button
                                                    onClick={() => handleSaveRole(u._id)}
                                                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingUserId(null)}
                                                    className="px-2.5 py-1.5 bg-secondary text-xs rounded-xl"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${
                                                    u.role === 'admin' 
                                                        ? 'bg-purple-500/10 text-purple-600' 
                                                        : u.role === 'teammember' 
                                                        ? 'bg-blue-500/10 text-blue-600' 
                                                        : 'bg-secondary text-muted-foreground'
                                                }`}>
                                                    {u.role || 'others'}
                                                </span>

                                                <button
                                                    onClick={() => startEditing(u)}
                                                    className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition"
                                                    title="Change role or name"
                                                >
                                                    <Edit3 className="w-4 h-4" />
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
