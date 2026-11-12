import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await api.post("/api/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate("/dashboard");
        } catch (err: any) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || "Login failed" });
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[#0a0a0a]">
            <div className="w-full max-w-sm border border-zinc-800 bg-[#121212] rounded p-6 shadow-xl">
                <div className="mb-6 pb-4 border-b border-zinc-800">
                    <h2 className="text-xl font-bold text-white tracking-tight">
                        Sign In
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                        Enter your email and password to access your workspace
                    </p>
                </div>

                <form className="space-y-4">
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
                        {loading ? "Authenticating..." : (
                            <>
                                Sign In <ArrowRight className="w-3.5 h-3.5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-5 pt-4 border-t border-zinc-800 text-center text-xs font-mono text-zinc-500">
                    Need an account?{' '}
                    <Link to="/register" className="text-pink-400 hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
