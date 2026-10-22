import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Check,
    Crown,
    Sparkles,
    Users,
    Shield,
    KanbanSquare,
    PenTool,
    Award
} from 'lucide-react';

const Pricing = () => {
    const plans = [
        {
            name: 'Free / Others',
            price: 'Free',
            priceAmount: 0,
            description: 'Pure creative whiteboard access for individuals & guests',
            icon: PenTool,
            gradient: 'from-blue-400 to-cyan-400',
            features: [
                'Unlimited collaborative whiteboards',
                'Real-time multi-user drawing & canvas sync',
                'Full shape & sticky note library',
                'Instant PNG & SVG canvas export',
                'View & join shared public boards',
                'Community support'
            ],
            cta: 'Get Started Free',
            popular: false
        },
        {
            name: 'Pro Workspace',
            price: '₹79',
            priceAmount: 79,
            description: 'Complete IssueFlow, Role Governance & Attendance Tracking suite',
            icon: Crown,
            gradient: 'from-purple-400 to-pink-500',
            features: [
                'Everything in Free Whiteboard',
                'Full IssueFlow Task Management suite',
                'Role Governance (Admin & Team Member permissions)',
                'Automated Attendance & Performance credit ledger',
                'Admin Control Panel: Assign tasks & grant permissions',
                'Team Member issue workflow (In Progress & Resolved)',
                'Priority sprints & live KPI project health metrics',
                'Resolution duration & on-time delivery analytics',
                'Priority email & developer support'
            ],
            cta: 'Upgrade to Pro Workspace',
            popular: true
        }
    ];

    const additionalFeatures = [
        {
            icon: KanbanSquare,
            title: 'IssueFlow Engine',
            description: 'Transform whiteboard brainstorming directly into trackable sprint issues and bug tickets.'
        },
        {
            icon: Award,
            title: 'Verified Attendance Ledger',
            description: 'Automated attendance points granted upon resolving tickets and delegating deliverables.'
        },
        {
            icon: Users,
            title: 'Multi-Role Team Permissions',
            description: 'Structured workflows ensuring Admins govern and Team Members execute with clarity.'
        },
        {
            icon: Shield,
            title: 'Enterprise-Grade Security',
            description: 'Secure JWT role tokens and cloud data backups on MongoDB Atlas.'
        }
    ];

    return (
        <div className="min-h-screen bg-background py-16 px-4">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 container mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-border bg-secondary/50 backdrop-blur-sm text-xs sm:text-sm text-muted-foreground mb-6">
                        <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                        Transparent, predictable pricing
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Choose Your{' '}
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                            Uniboard Plan
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Enjoy free collaborative whiteboards forever, or unlock the full IssueFlow task management and attendance tracking engine for just ₹79/month.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between ${
                                plan.popular
                                    ? 'bg-gradient-to-br from-purple-500/10 via-card to-pink-500/10 border-purple-500/50 shadow-xl shadow-purple-500/15'
                                    : 'bg-card border-border hover:border-primary/50'
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-md">
                                    Full Team Power
                                </div>
                            )}

                            <div>
                                <div className="mb-6">
                                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${plan.gradient} mb-4`}>
                                        <plan.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-1.5">{plan.name}</h3>
                                    <p className="text-muted-foreground text-xs sm:text-sm">{plan.description}</p>
                                </div>

                                <div className="mb-6 pb-6 border-b border-border">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl sm:text-5xl font-extrabold">{plan.price}</span>
                                        {plan.priceAmount > 0 && (
                                            <span className="text-muted-foreground text-sm font-medium">/month</span>
                                        )}
                                    </div>
                                    <span className="text-xs text-muted-foreground block mt-1">
                                        {plan.priceAmount === 0 ? 'No credit card required' : 'Billed monthly • Cancel anytime'}
                                    </span>
                                </div>

                                <div className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className={`p-1 rounded-full bg-gradient-to-br ${plan.gradient} mt-0.5 flex-shrink-0`}>
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-xs sm:text-sm text-foreground/90">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Link
                                to="/register"
                                className={`block w-full py-3.5 px-6 rounded-2xl font-semibold text-center text-sm transition-all shadow-sm ${
                                    plan.popular
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-95 shadow-purple-500/30'
                                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                                }`}
                            >
                                {plan.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Features Showcase */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-20"
                >
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-12">
                        Everything Built Into The{' '}
                        <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                            Pro Workspace
                        </span>
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {additionalFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm"
                            >
                                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold text-base mb-1.5">{feature.title}</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: 'What is included in the Free tier?',
                                a: 'The Free tier gives you full access to create, edit, draw on, and export collaborative whiteboards without any cost.'
                            },
                            {
                                q: 'What do I get with the ₹79/month Pro Workspace?',
                                a: 'Pro unlocks the full IssueFlow management pipeline, admin and team member role permissions, task assignments, and the automated attendance/performance ledger.'
                            },
                            {
                                q: 'Can I change my role from Others to Team Member or Admin?',
                                a: 'Yes! Admins can promote users directly from the Admin Settings Panel in their dashboard.'
                            },
                            {
                                q: 'How does attendance auto-credit work?',
                                a: 'Admins receive verified attendance credits whenever they delegate and assign tasks. Team members earn attendance credits when they mark an assigned issue as Resolved.'
                            }
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl bg-card border border-border"
                            >
                                <h3 className="font-semibold text-sm sm:text-base mb-2">{faq.q}</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-border text-center shadow-lg"
                >
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
                        Empower Your Team Today
                    </h2>
                    <p className="text-xs sm:text-base text-muted-foreground mb-6 max-w-xl mx-auto">
                        Get started with infinite whiteboards for free, or power up with IssueFlow & Attendance for ₹79/month.
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-95 transition-opacity text-sm shadow-md"
                    >
                        Sign Up Now
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Pricing;
