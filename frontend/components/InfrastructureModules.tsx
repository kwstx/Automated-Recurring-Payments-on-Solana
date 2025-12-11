'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Check, Box } from 'lucide-react';

const modules = [
    {
        id: 'recurring',
        title: 'RECURRING FLOWS: AUTO-SWEEPS',
        description: 'Automate periodic payouts with on-chain precision. Non-custodial, high-frequency settlement layers for modern SaaS.',
        tags: ['Auto-Sweeps', 'Cron', 'Settlement']
    },
    {
        id: 'token-gate',
        title: 'TOKEN GATING: ASSET ACCESS',
        description: 'Permissionless access control based on wallet holdings. Gate services by SPL token or NFT ownership verification.',
        tags: ['NFT', 'SPL', 'Permissionless']
    },
    {
        id: 'invoicing',
        title: 'SMART INVOICING: SETTLEMENT',
        description: 'On-chain invoice generation with instant liquidity settlement. Immutable audit trails for transparent accounting.',
        tags: ['Invoicing', 'Liquidity', 'Audit']
    },
    {
        id: 'analytics',
        title: 'DATA ANALYTICS: METRICS',
        description: 'Overview of deep protocol metrics. Track MMR, Churn, and LTV with sub-second latency across all subscribers.',
        tags: ['Metrics', 'LTV', 'Real-time']
    }
];

export default function InfrastructureModules() {
    const [activeModule, setActiveModule] = useState<string | null>(null);

    return (
        <section className="relative w-full border-b border-[#a3a3a3] text-[#1a1a1a] bg-[#EAEAEA] h-screen overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[39%_1fr] h-full">

                {/* Left Column: Fixed Header & Info */}
                <div className="relative p-6 md:p-10 flex flex-col h-full md:relative">
                    {/* Vertical Line */}
                    <div className="absolute right-[8px] -top-[150vh] bottom-0 w-px bg-[#d4d4d4] hidden md:block"></div>

                    <div className="w-full shrink-0">
                        <span className="text-xs font-mono font-bold tracking-wider mb-4 block">[01] PAYMENT PRIMITIVES</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-center pb-4 min-h-0">
                        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-[0.9] text-black mb-12">
                            PAYMENT<br />
                            PRIMITIVES<br />
                            FOR MODERN<br />
                            RECURRING<br />
                            ECONOMIES
                        </h2>

                        <div className="grid grid-cols-2 gap-y-2 gap-x-8 max-w-xs font-mono text-xs">
                            <div className="flex items-center gap-2">
                                <Check size={12} strokeWidth={3} /> <span>Core Billing</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="opacity-50">[]</span> <span>Anchor Program</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check size={12} strokeWidth={3} /> <span>Token Gate</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="opacity-50">[]</span> <span>Analytics</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Accordion List */}
                <div className="flex flex-col h-full justify-center pb-4 pl-10 md:pl-20 lg:pl-32 pr-6 md:pr-10 overflow-hidden">

                    <div className="flex flex-col flex-1 justify-center min-h-0">
                        {/* Top Black Line */}
                        <div className="w-full border-t border-black mb-0 shrink-0"></div>

                        {modules.map((module, index) => (
                            <div
                                key={module.id}
                                className={`relative transition-colors duration-300 ${activeModule === module.id ? 'bg-[#EAEAEA] flex-[2]' : 'hover:bg-white/50 flex-none'}`}
                            >
                                <button
                                    onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                                    className="w-full text-left p-6 md:p-8 flex items-start justify-between group outline-none"
                                >
                                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight max-w-[80%] leading-snug">
                                        {module.title}
                                    </h3>
                                    <ArrowDown
                                        className={`transition-transform duration-300 ${activeModule === module.id ? 'rotate-180' : 'rotate-0 opacity-40 group-hover:opacity-100'}`}
                                        size={20}
                                    />
                                </button>

                                <AnimatePresence>
                                    {activeModule === module.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 md:px-8 pb-8 pt-0 flex gap-8">
                                                <div className="flex-1">
                                                    <p className="text-sm md:text-base leading-relaxed text-[#555] mb-8 max-w-md">
                                                        {module.description}
                                                    </p>
                                                    {/* Tags */}
                                                    <div className="flex gap-2">
                                                        {module.tags.map(tag => (
                                                            <span key={tag} className="text-[10px] font-mono border border-[#a3a3a3] px-2 py-1 uppercase tracking-wider">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Visual Placeholder for Module - Restored Original Styles */}
                                                {/* Visual Placeholder for Module - Updated for Auto-Sweeps & Token Gating */}
                                                <div className="hidden lg:flex w-48 h-48 bg-[#151515] rounded-none relative overflow-hidden items-center justify-center shrink-0">
                                                    {module.id === 'recurring' ? (
                                                        <img
                                                            src="/auto-sweeps-feature.png"
                                                            alt="Auto-Sweeps Flow"
                                                            className="object-cover w-full h-full"
                                                        />
                                                    ) : module.id === 'token-gate' ? (
                                                        <img
                                                            src="/token-gating-feature.png"
                                                            alt="Token Gating Access"
                                                            className="object-cover w-full h-full"
                                                        />
                                                    ) : (
                                                        <>
                                                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-500 opacity-80 mix-blend-screen blur-xl md:blur-2xl"></div>
                                                            <Box size={80} strokeWidth={1} className="text-white opacity-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150" />
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Animated Separator - Only if not last item */}
                                {index !== modules.length - 1 && (
                                    <motion.div
                                        className="h-px bg-[#a3a3a3] w-full absolute bottom-0 left-0"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "100%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, ease: "easeInOut", delay: index * 0.2 }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
