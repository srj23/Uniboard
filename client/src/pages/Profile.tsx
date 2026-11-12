import { useState, useEffect, useRef } from 'react';
import {
    User,
    Mail,
    MapPin,
    Calendar,
    Camera,
    Save,
    Loader2,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import api from '../utils/api';

interface UserProfile {
    _id: string;
    username: string;
    email: string;
    displayName: string;
    bio: string;
    avatar: string;
    location: string;
    createdAt: string;
}

const Profile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        displayName: '',
        bio: '',
        location: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await api.get('/api/users/me');
            setProfile(res.data);
            setFormData({
                displayName: res.data.displayName || '',
                bio: res.data.bio || '',
                location: res.data.location || ''
            });
        } catch (err) {
            console.error('Error fetching profile:', err);
            showMessage('error', 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await api.put('/api/users/profile', formData);
            setProfile(res.data);
            showMessage('success', 'Profile updated successfully!');
        } catch (err) {
            console.error('Error updating profile:', err);
            showMessage('error', 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            showMessage('error', 'Image size must be less than 5MB');
            return;
        }

        const uploadFormData = new FormData();
        uploadFormData.append('avatar', file);

        setUploading(true);
        try {
            const res = await api.post('/api/users/avatar', uploadFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setProfile(prev => prev ? { ...prev, avatar: res.data.avatar } : null);
            showMessage('success', 'Avatar updated successfully!');
        } catch (err) {
            console.error('Error uploading avatar:', err);
            showMessage('error', 'Failed to upload avatar');
        } finally {
            setUploading(false);
        }
    };

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 5000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 py-16 px-4 font-sans">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-10 pb-6 border-b border-zinc-800">
                    <span className="text-xs font-mono uppercase tracking-widest text-pink-500 mb-2 block">// User Settings</span>
                    <h1 className="text-3xl font-bold font-mono tracking-tight text-white mb-2">
                        Profile Configuration
                    </h1>
                    <p className="text-xs font-mono text-zinc-400">
                        Manage your identity, bio, and display settings across Issueflow
                    </p>
                </div>

                {message && (
                    <div
                        className={`mb-6 p-3 rounded border text-xs font-mono flex items-center gap-2 ${
                            message.type === 'success'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                        }`}
                    >
                        {message.type === 'success' ? (
                            <CheckCircle2 className="w-4 h-4" />
                        ) : (
                            <AlertCircle className="w-4 h-4" />
                        )}
                        <span>{message.text}</span>
                    </div>
                )}

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Left: Avatar & Meta Card */}
                    <div className="border border-zinc-800 bg-[#121212] rounded p-6 text-center md:col-span-1 flex flex-col items-center justify-between">
                        <div className="w-full flex flex-col items-center">
                            <div className="relative mb-4">
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-pink-400 text-3xl font-mono font-bold">
                                    {profile?.avatar ? (
                                        <img
                                            src={profile.avatar}
                                            alt={profile.username}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        profile?.username?.charAt(0).toUpperCase()
                                    )}
                                </div>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="absolute bottom-0 right-0 p-2 rounded-full bg-pink-500 hover:bg-pink-400 text-black shadow transition-colors"
                                    title="Upload Avatar"
                                >
                                    {uploading ? (
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    ) : (
                                        <Camera className="w-3.5 h-3.5" />
                                    )}
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    className="hidden"
                                />
                            </div>

                            <h3 className="font-mono font-bold text-base text-white">
                                {profile?.displayName || profile?.username}
                            </h3>
                            <p className="text-xs font-mono text-zinc-500 mt-0.5">@{profile?.username}</p>
                        </div>

                        <div className="w-full pt-4 mt-6 border-t border-zinc-800 text-left space-y-2 text-xs font-mono text-zinc-400">
                            <div className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                                <span className="truncate">{profile?.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                                <span>Joined {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Recently'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Profile Edit Form */}
                    <div className="border border-zinc-800 bg-[#121212] rounded p-6 md:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-zinc-400 mb-1">Display Name</label>
                                <div className="relative">
                                    <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                                    <input
                                        type="text"
                                        name="displayName"
                                        value={formData.displayName}
                                        onChange={handleInputChange}
                                        placeholder="Your full name or handle"
                                        className="w-full pl-8 pr-3 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-white outline-none focus:border-pink-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-zinc-400 mb-1">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="City, Country"
                                        className="w-full pl-8 pr-3 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-white outline-none focus:border-pink-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-zinc-400 mb-1">Developer Bio</label>
                                <textarea
                                    name="bio"
                                    rows={4}
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    placeholder="Tell the team about your stack and focus areas..."
                                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-white outline-none focus:border-pink-500"
                                />
                            </div>

                            <div className="pt-2 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-5 py-2 bg-pink-500 hover:bg-pink-400 text-black font-semibold text-xs font-mono rounded transition-colors flex items-center gap-1.5"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-3.5 h-3.5" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
