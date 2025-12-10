'use client';

import LandingHeader from '@/components/LandingHeader';
import { motion } from 'framer-motion';

export default function StatusPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-24">
                <div className="max-w-4xl mx-auto">
                    <span className="text-xs font-mono font-bold tracking-wider mb-6 block text-[#666]">SYSTEM STATUS</span>
                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-12">
                        ALL SYSTEMS<br />OPERATIONAL
                    </h1>

                    <div className="space-y-4 font-mono text-sm">
                        {['API Gateway', 'Solana Mainnet Listener', 'Solana Devnet Listener', 'Webhook Delivery', 'Notification Service'].map((service, i) => (
                            <motion.div
                                key={service}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex justify-between items-center p-4 bg-white border border-black"
                            >
                                <span className="uppercase font-bold">{service}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#666]">100% Uptime</span>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-[#EAEAEA] border border-[#a3a3a3]">
                        <h3 className="font-bold uppercase mb-2">Past Incidents</h3>
                        <p className="text-sm text-[#666]">No incidents reported in the last 90 days.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
