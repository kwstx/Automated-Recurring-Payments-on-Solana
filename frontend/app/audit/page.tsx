'use client';

import LandingHeader from '@/components/LandingHeader';
import { ShieldCheck, Download, FileText, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuditPage() {
    return (
        <div className="min-h-screen bg-[#fdfdfd] text-[#1a1a1a] font-sans flex flex-col">
            <LandingHeader />

            <main className="flex-1 max-w-[1920px] mx-auto px-4 md:px-6 py-12 md:py-24 w-full">
                <div className="max-w-5xl mx-auto">

                    {/* Header Section */}
                    <div className="mb-20 text-center md:text-left">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs font-bold tracking-widest uppercase text-neutral-500 mb-4 block"
                        >
                            Infrastructure Safety
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black tracking-tighter text-black leading-[1.1] md:leading-[0.9] mb-8"
                        >
                            Security &<br />
                            Architecture.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-base md:text-lg leading-relaxed text-[#666] font-medium max-w-2xl"
                        >
                            ZyoPay is built on a non-custodial architecture using standard Solana Program Library (SPL) tokens. We prioritize transparency and verifiable code.
                        </motion.p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Non-Custodial Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-gray-50 rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[320px] hover:bg-gray-100 transition-colors group"
                        >
                            <div>
                                <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-8 shadow-sm">
                                    <ShieldCheck className="w-7 h-7 text-black" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-black mb-2">Non-Custodial</h3>
                                <p className="text-sm font-medium text-neutral-500 leading-relaxed">
                                    Funds flow directly between subscriber wallets and merchant wallets. The protocol never holds user funds.
                                </p>
                            </div>
                        </motion.div>

                        {/* Open Source Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-gray-50 rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[320px] hover:bg-gray-100 transition-colors group"
                        >
                            <div>
                                <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-8 shadow-sm">
                                    <FileText className="w-7 h-7 text-black" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-black mb-2">Verified Source</h3>
                                <p className="text-sm font-medium text-neutral-500 leading-relaxed">
                                    Our smart contracts are open-source and verifiable on the Solana blockchain explorer.
                                </p>
                            </div>

                            <div className="mt-8 pt-8 border-t border-black/5">
                                <a href="https://github.com/kwstx/Automated-Recurring-Payments-on-Solana" target="_blank" className="flex items-center gap-2 font-bold text-sm text-black group-hover:text-black/70 transition-colors">
                                    <Download size={16} />
                                    View on GitHub
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>


        </div>
    );
}
