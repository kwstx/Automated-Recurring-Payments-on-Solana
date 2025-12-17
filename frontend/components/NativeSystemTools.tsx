'use client';

import { motion } from 'framer-motion';
import { Terminal, Zap, RefreshCw } from 'lucide-react';

export default function NativeSystemTools() {
    return (
        <section className="relative z-10 w-full py-24 px-4 md:px-8 bg-white text-[#1a1a1a]">
            {/* Centered Container */}
            <div className="max-w-7xl mx-auto">

                {/* Headline */}
                <div className="max-w-6xl mb-20 text-center md:text-left mx-auto md:mx-0">
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] text-black">
                        Native on-chain logic, instant settlement, and powerful{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E699D9] to-[#80E0B0] font-black">
                            SDKs make ZyoPay
                        </span>{" "}
                        the ultimate infrastructure for recurring revenue.
                    </h2>
                </div>

                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Card 1: Developer SDKs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-50 rounded-2xl p-10 flex flex-col justify-between min-h-[300px]"
                    >
                        <div className="flex-1 flex items-center justify-center">
                            <Terminal strokeWidth={1} size={80} className="text-black" />
                        </div>
                        <div className="mt-8">
                            <h3 className="text-lg font-bold mb-2 text-black">Developer-First SDKs</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Integrate recurring payments with just a few lines of code. Type-safe and built for speed.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 2: Instant Settlement */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-gray-50 rounded-2xl p-10 flex flex-col justify-between min-h-[300px]"
                    >
                        <div className="flex-1 flex items-center justify-center">
                            <Zap strokeWidth={1} size={80} className="text-black" />
                        </div>
                        <div className="mt-8">
                            <h3 className="text-lg font-bold mb-2 text-black">Instant Settlement</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Zero intermediates. Payments flow directly from subscribers to your wallet in seconds.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 3: Automated Recurring */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gray-50 rounded-2xl p-10 flex flex-col justify-between min-h-[300px]"
                    >
                        <div className="flex-1 flex items-center justify-center">
                            <RefreshCw strokeWidth={1} size={80} className="text-black" />
                        </div>
                        <div className="mt-8">
                            <h3 className="text-lg font-bold mb-2 text-black">Automated Recurring</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Smart contracts handle billing cycles, retries, and expirations automatically.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

