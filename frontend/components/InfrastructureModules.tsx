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
    const [activeModule, setActiveModule] = useState(modules[0].id);

    return (
        <section className="relative w-full border-b border-[#a3a3a3] text-[#1a1a1a] bg-[#EAEAEA]">
            <div className="grid grid-cols-1 md:grid-cols-2">

                {/* Left Column: Fixed Header & Info */}
                <div className="p-6 md:p-10 border-r-0 md:border-r border-[#a3a3a3] flex flex-col justify-between min-h-[50vh] md:min-h-screen sticky top-0 md:relative">

                    <div>
                        <span className="text-xs font-mono font-bold tracking-wider mb-4 block">[01] INFRA MODULES</span>
                        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[0.9] text-black mb-12">
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
                <div className="flex flex-col">
                    <div className="border-b border-[#a3a3a3] h-px w-full md:hidden"></div>

                    {modules.map((module) => (
                        <div
                            key={module.id}
                            className={`border-b border-[#a3a3a3] last:border-b-0 transition-colors duration-300 ${activeModule === module.id ? 'bg-[#EAEAEA]' : 'hover:bg-white/50'}`}
                        >
                            <button
                                onClick={() => setActiveModule(module.id)}
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
                                        <div className="px-6 md:px-8 pb-8 pt-0">
                                            <p className="text-sm md:text-base leading-relaxed text-[#555] mb-8 max-w-md">
                                                {module.description}
                                            </p>

                                            {/* Visual Placeholder for Module */}
                                            <div className="w-full aspect-square md:aspect-[4/3] bg-[#151515] rounded-none mb-6 relative overflow-hidden flex items-center justify-center group cursor-pointer">
                                                {/* Placeholder 3D Cube / Abstract */}
                                                <div className="relative w-32 h-32 md:w-48 md:h-48 transform-style-3d animate-float-slow">
                                                    {/* This is a simple CSS representation of a cube or object */}
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-500 opacity-80 mix-blend-screen blur-xl md:blur-2xl"></div>
                                                    <Box size={80} strokeWidth={1} className="text-white opacity-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150" />
                                                </div>

                                                <div className="absolute bottom-4 right-4">
                                                    <ArrowUpRight className="text-white" size={24} />
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex gap-2">
                                                {module.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] font-mono border border-[#a3a3a3] px-2 py-1 uppercase tracking-wider">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
