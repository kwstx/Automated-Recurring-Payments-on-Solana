'use client';

import { motion } from 'framer-motion';

const tools = [
    {
        id: 'access',
        title: 'MONITOR ACTIVE SUBSCRIPTION ACCOUNTS',
        description: 'Scan and filter subscriber accounts with deep precision. Track active statuses and payment history on-chain.',
        metric: '50K Active',
        metricLabel: 'Subscribers'
    },
    {
        id: 'automate',
        title: 'AUTOMATE RECURRING PAYMENT TRIGGERS',
        description: 'Deploy condition-based automation that executes charge instructions. Sync event outputs directly to your treasury logic.',
        metric: '<1s',
        metricLabel: 'Latency'
    },
    {
        id: 'verify',
        title: 'VERIFY ON-CHAIN SETTLEMENT INSTANTLY',
        description: 'Gain proof of payment without trust assumptions. Track confirmation depth and settlement finality automatically.',
        metric: '100%',
        metricLabel: 'Finality'
    }
];

export default function NativeSystemTools() {
    return (
        <section className="sticky top-0 z-0 w-full text-[#1a1a1a] bg-[#EAEAEA] h-screen overflow-hidden flex flex-col">
            {/* Header Section */}
            <div className="w-full py-6 relative shrink-0">
                <div className="px-6 md:px-10 mb-4 md:mb-0 md:absolute md:top-6 md:left-0">
                    <span className="text-xs font-mono font-bold tracking-wider block">[02] SYSTEM TOOLS</span>
                </div>
                <div className="flex justify-center px-6 md:px-10">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none text-left">
                        TOOLS FOR SCALABLE<br />
                        ON-CHAIN<br />
                        BILLING
                    </h2>
                </div>
                {/* Header Animated Separator */}
                <motion.div
                    className="absolute bottom-0 left-0 h-px bg-[#a3a3a3]"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, ease: "easeInOut" }}
                />
            </div>

            {/* List Row Items */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {tools.map((tool, index) => (
                    <div key={tool.id} className="group relative hover:bg-white/40 transition-colors duration-300 flex-1 flex flex-col justify-center min-h-0">
                        {/* Item Animated Separator (Top) - Skip for first item */}
                        {index !== 0 && (
                            <motion.div
                                className="absolute top-0 left-0 h-px bg-[#a3a3a3]"
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.0, ease: "easeInOut", delay: index * 0.2 }}
                            />
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-12 h-full items-center">

                            {/* Column 1: Bullet/Icon */}
                            <div className="hidden md:flex col-span-1 items-center justify-center p-4">
                                <div className="w-3 h-3 bg-black group-hover:scale-110 transition-transform duration-300" />
                            </div>

                            {/* Column 2: Title */}
                            <div className="col-span-12 md:col-span-4 p-4 md:p-8 flex items-center">
                                <h3 className="text-lg md:text-2xl font-bold uppercase leading-tight max-w-sm">
                                    {tool.title}
                                </h3>
                            </div>

                            {/* Column 3: Description */}
                            <div className="col-span-6 md:col-span-5 p-4 md:p-8 flex items-center">
                                <p className="text-sm leading-relaxed text-[#555] max-w-md line-clamp-3">
                                    {tool.description}
                                </p>
                            </div>

                            {/* Column 4: Metric */}
                            <div className="col-span-6 md:col-span-2 p-4 md:p-8 flex flex-col items-end justify-center">
                                <span className="text-[#999] text-[10px] font-mono uppercase mb-1">{tool.metricLabel}</span>
                                <span className="text-xl md:text-2xl font-mono font-medium">{tool.metric}</span>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom spacer line similar to reference - Moved to bottom edge or removed if overflowing */}
            <div className="w-full border-t border-[#a3a3a3] mt-0 shrink-0"></div>
        </section>
    );
}
