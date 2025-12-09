'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Check, Box } from 'lucide-react';

const modules = [
    {
        id: 'recurring',
        title: 'RECURRING ENGINE: AUTOMATED BILLING',
        description: 'Monitor and execute recurring payment streams with on-chain precision. Perfect for SaaS and subscription models on Solana.',
        tags: ['Automation', 'Cron', 'Payments']
    },
    {
        id: 'token-gate',
        title: 'TOKEN GATE: ACCESS CONTROL',
        description: 'Grant access to exclusive content or services based on NFT or Token ownership. Native verified integration.',
        tags: ['NFT', 'SPL Tokens', 'Access']
    },
    {
        id: 'invoicing',
        title: 'CODEDOCK: SMART INVOICING',
        description: 'Generate and settle on-chain invoices instantly. Immutable records for auditing and reconciliation.',
        tags: ['Invoices', 'Settlement', 'Audit']
    },
    {
        id: 'analytics',
        title: 'METAINDEX: REVENUE ANALYTICS',
        description: 'Real-time dashboard for tracking Churn, MMR, and active subscriber bases across all your plans.',
        tags: ['Data', 'Insights', 'Growth']
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
                    <div className="absolute right-[8px] top-[-3000px] bottom-0 w-px bg-[#d4d4d4] hidden md:block"></div>

                    <div className="w-full shrink-0">
                        <span className="text-xs font-mono font-bold tracking-wider mb-4 block">[01] INFRA MODULES</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-center pb-4 min-h-0">
                        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-[0.9] text-black mb-12">
                            INFRASTRUCTURE<br />
                            MODULES<br />
                            FOR SOLANA<br />
                            SUBSCRIPTION<br />
                            NETWORKS
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

                        {modules.map((module) => (
                            <div
                                key={module.id}
                                className={`border-b border-[#a3a3a3] last:border-b-0 transition-colors duration-300 ${activeModule === module.id ? 'bg-[#EAEAEA] flex-[2]' : 'hover:bg-white/50 flex-none'}`}
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
                                                <div className="hidden lg:flex w-48 h-48 bg-[#151515] rounded-none relative overflow-hidden items-center justify-center shrink-0">
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-500 opacity-80 mix-blend-screen blur-xl md:blur-2xl"></div>
                                                    <Box size={80} strokeWidth={1} className="text-white opacity-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
