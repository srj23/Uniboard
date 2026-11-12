import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

const Register = () => {
    const [info, setInfo] = useState({ username: "", email: "", password: "", role: "others" });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/api/auth/register", info);
            navigate("/login");
        } catch (err: any) {
            const msg = err.response?.data?.message || err.response?.data || err.message || "Registration failed";
            setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[#0a0a0a]">
            <div className="w-full max-w-sm border border-zinc-800 bg-[#121212] rounded p-6 shadow-xl">
                <div className="mb-6 pb-4 border-b border-zinc-800">
                    <h2 className="text-xl font-bold text-white tracking-tight">
                        Create Account
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                        Sign up to get started with Issueflow
                    </p>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">Username</label>
                        <div className="relative">
                            <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                            <input
                                type="text"
                                id="username"
                                onChange={handleChange}
                                className="w-full pl-8 pr-3 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-white outline-none focus:border-pink-500"
                                placeholder="johndoe"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                            <input
                                type="email"
                                id="email"
                                onChange={handleChange}
                                className="w-full pl-8 pr-3 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-white outline-none focus:border-pink-500"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                            <input
                                type="password"
                                id="password"
                                onChange={handleChange}
                                className="w-full pl-8 pr-3 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-white outline-none focus:border-pink-500"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">Role Permissions</label>
                        <select
                            id="role"
                            value={info.role}
                            onChange={handleChange}
                            className="w-full px-2.5 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-zinc-300 outline-none focus:border-pink-500"
                        >
                            <option value="others">Viewer (Read-only)</option>
                            <option value="teammember">Team Member (Resolve tasks)</option>
                            <option value="admin">Admin (Create projects & assign)</option>
                        </select>
                    </div>

                    {error && (
                        <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                            {String(error)}
                        </div>
                    )}

                    <button
                        onClick={handleClick}
                        disabled={loading}
                        className="w-full py-2 bg-pink-500 hover:bg-pink-400 text-black font-semibold text-xs font-mono rounded transition-colors flex items-center justify-center gap-1.5"
                    >
                        {loading ? "Registering..." : (
                            <>
                                Register Account <ArrowRight className="w-3.5 h-3.5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-5 pt-4 border-t border-zinc-800 text-center text-xs font-mono text-zinc-500">
                    Already registered?{' '}
                    <Link to="/login" className="text-pink-400 hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
