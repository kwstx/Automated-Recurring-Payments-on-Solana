'use client';

import { motion } from 'framer-motion';
import { Settings, UserCheck, RefreshCw } from 'lucide-react';

const steps = [
    {
        icon: Settings,
        title: 'Create a Plan',
        description: 'Merchant defines price, interval, and currency for the subscription service.',
    },
    {
        icon: UserCheck,
        title: 'User Subscribes',
        description: 'User signs just one transaction in Phantom to authorize recurring payments.',
    },
    {
        icon: RefreshCw,
        title: 'System Auto-Bills',
        description: 'Off-chain scheduler automatically processes payments at the defined intervals.',
    },
];

export default function HowItWorks() {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-purple-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
                        How It Works
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Simple, transparent, and automated. Get started in three easy steps.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group relative p-8 rounded-2xl bg-[#0B0B0B] border border-white/[0.08] hover:border-purple-500/30 transition-all duration-300"
                        >
                            {/* Top Purple Glow - Exact Match */}
                            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Inner Highlight (Bevel Effect) */}
                            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] pointer-events-none" />

                            <div className="relative z-10 flex flex-col items-start text-left">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/5">
                                    <step.icon className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                                </div>

                                <h3 className="text-lg font-bold text-white mb-3 font-serif tracking-wide group-hover:text-purple-100 transition-colors">
                                    {step.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed text-sm font-light">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
