import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-24 border-t border-border bg-[#0d0d0d]">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="font-mono text-lg font-bold text-white tracking-tight inline-block mb-3">
                            issue<span className="text-pink-500">flow</span>
                        </Link>
                        <p className="text-muted-foreground mb-4 max-w-md text-xs leading-relaxed font-mono">
                            Opinionated sprint & issue tracking for engineers. High-contrast, minimal overhead, clear role governance.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Product</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} Issueflow. All rights reserved.
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by the <a href="https://github.com/NexinLabs" >NexinLabs</a> Team
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
