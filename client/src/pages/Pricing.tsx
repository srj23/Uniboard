import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const Pricing = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 py-16 px-4 font-sans">
            <div className="container mx-auto max-w-4xl">
                <div className="mb-12 pb-6 border-b border-zinc-800">
                    <span className="text-xs font-mono uppercase tracking-widest text-pink-500 mb-2 block">// Workspace Tiers</span>
                    <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white mb-2">
                        Simple, Fixed Pricing
                    </h1>
                    <p className="text-xs sm:text-sm font-mono text-zinc-400">
                        Choose your deployment tier. No hidden per-seat multipliers.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-16">
                    {/* Free Tier */}
                    <div className="border border-zinc-800 bg-[#121212] p-6 rounded flex flex-col justify-between">
                        <div>
                            <div className="text-xs font-mono uppercase text-zinc-500 mb-2">TIER 01 / GUEST</div>
                            <h3 className="text-xl font-bold font-mono text-white mb-1">Viewer</h3>
                            <p className="text-xs text-zinc-400 mb-6">Read-only oversight across project roadmaps</p>

                            <div className="text-3xl font-bold font-mono text-white mb-6">
                                ₹0 <span className="text-xs text-zinc-500 font-normal">/ forever</span>
                            </div>

                            <ul className="space-y-2.5 text-xs font-mono text-zinc-400 mb-8">
                                <li className="flex items-center gap-2">
                                    <Check className="w-3.5 h-3.5 text-pink-500" />
                                    <span>Inspect active initiatives</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-3.5 h-3.5 text-pink-500" />
                                    <span>View sprint issue states</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-3.5 h-3.5 text-pink-500" />
                                    <span>Summary velocity metrics</span>
                                </li>
                            </ul>
                        </div>

                        <Link
                            to="/register"
                            className="block w-full py-2.5 text-center text-xs font-mono font-medium rounded border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 transition-colors"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Pro Workspace */}
                    <div className="border border-pink-500/50 bg-[#141013] p-6 rounded flex flex-col justify-between relative">
                        <div className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30">
                            STANDARD
                        </div>

                        <div>
                            <div className="text-xs font-mono uppercase text-pink-400 mb-2">TIER 02 / PRO</div>
                            <h3 className="text-xl font-bold font-mono text-white mb-1">Full Team</h3>
                            <p className="text-xs text-zinc-400 mb-6">Complete issue tracking, delegation, and attendance</p>

                            <div className="text-3xl font-bold font-mono text-white mb-6">
                                ₹79 <span className="text-xs text-zinc-500 font-normal">/ month</span>
                            </div>

                            <ul className="space-y-2.5 text-xs font-mono text-zinc-300 mb-8">
                                <li className="flex items-center gap-2">
                                    <Check className="w-3.5 h-3.5 text-pink-500" />
                                    <span>Full project creation & issue assignment</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-3.5 h-3.5 text-pink-500" />
                                    <span>Strict role gates (Admin, Team Member)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-3.5 h-3.5 text-pink-500" />
                                    <span>Automated attendance verification ledger</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-3.5 h-3.5 text-pink-500" />
                                    <span>Real-time resolution time calculation</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-3.5 h-3.5 text-pink-500" />
                                    <span>Socket.IO live board synchronization</span>
                                </li>
                            </ul>
                        </div>

                        <Link
                            to="/register"
                            className="block w-full py-2.5 text-center text-xs font-mono font-semibold rounded bg-pink-500 hover:bg-pink-400 text-black transition-colors"
                        >
                            Upgrade Team Workspace
                        </Link>
                    </div>
                </div>

                {/* FAQ */}
                <div className="border-t border-zinc-800 pt-10">
                    <h3 className="text-sm font-bold font-mono text-white mb-4">// FAQ</h3>
                    <div className="space-y-3">
                        <div className="border border-zinc-800 bg-[#121212] p-4 rounded text-xs font-mono">
                            <div className="text-white font-semibold mb-1">How does attendance crediting function?</div>
                            <div className="text-zinc-400">Admins gain attendance when delegating issues. Engineers earn verifiable attendance points immediately upon transitioning tasks to Resolved.</div>
                        </div>
                        <div className="border border-zinc-800 bg-[#121212] p-4 rounded text-xs font-mono">
                            <div className="text-white font-semibold mb-1">Can roles be promoted?</div>
                            <div className="text-zinc-400">Yes. Admins can promote any viewer or team member to admin directly inside the Access Governance panel.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
