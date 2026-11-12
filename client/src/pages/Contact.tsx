import { useState } from 'react';
import {
    Mail,
    Send,
    Loader2,
    CheckCircle2,
    Clock
} from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        setLoading(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => setSubmitted(false), 4000);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'EMAIL',
            content: 'support@issueflow.dev',
            link: 'mailto:support@issueflow.dev'
        },
        {
            icon: Clock,
            title: 'HOURS',
            content: 'Mon-Fri: 9AM - 7PM IST',
            link: null
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 py-16 px-4 font-sans">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-12 pb-6 border-b border-zinc-800">
                    <span className="text-xs font-mono uppercase tracking-widest text-pink-500 mb-2 block">// Inquiries</span>
                    <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white mb-2">
                        Contact Team
                    </h1>
                    <p className="text-xs sm:text-sm font-mono text-zinc-400">
                        Technical questions, bug reports, or feature requests
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Contact Info Sidebar */}
                    <div className="space-y-3 md:col-span-1">
                        {contactInfo.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 rounded border border-zinc-800 bg-[#121212]"
                            >
                                <div className="flex items-center gap-2 mb-2 text-pink-500">
                                    <item.icon className="w-4 h-4" />
                                    <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-400">{item.title}</span>
                                </div>
                                {item.link ? (
                                    <a
                                        href={item.link}
                                        className="text-xs font-mono text-white hover:text-pink-400 transition-colors"
                                    >
                                        {item.content}
                                    </a>
                                ) : (
                                    <div className="text-xs font-mono text-white">{item.content}</div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="md:col-span-2 border border-zinc-800 bg-[#121212] rounded p-6 shadow-xl">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-zinc-400 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-white outline-none focus:border-pink-500"
                                    placeholder="Jane Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-zinc-400 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-white outline-none focus:border-pink-500"
                                    placeholder="jane@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-zinc-400 mb-1">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-white outline-none focus:border-pink-500"
                                    placeholder="Issue tracker inquiry"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-zinc-400 mb-1">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-zinc-800 rounded text-xs font-mono text-white outline-none focus:border-pink-500"
                                    placeholder="Describe your question or issue..."
                                />
                            </div>

                            {submitted && (
                                <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    Message received. We will respond via email shortly.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="px-5 py-2.5 bg-pink-500 hover:bg-pink-400 text-black font-semibold text-xs font-mono rounded transition-colors flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        Transmitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-3.5 h-3.5" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
