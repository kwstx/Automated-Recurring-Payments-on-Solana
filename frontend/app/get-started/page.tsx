'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Store, User } from 'lucide-react';

export default function GetStartedPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-[#050505] text-white font-sans selection:bg-purple-500/30">

            {/* Background Blobs - Consistent with Login Page */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Green Blob - Left */}
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[120px] mix-blend-screen opacity-60 animate-pulse-slow"></div>
                {/* Purple Blob - Right */}
                <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen opacity-60 animate-pulse-slow delay-700"></div>
            </div>

            {/* Content Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-4xl relative z-10"
            >
                {/* Back Link */}
                <Link href="/" className="absolute -top-16 left-0 inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-medium tracking-wide">
                    <ArrowLeft className="w-3 h-3" />
                    Back
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Choose Your Path</h1>
                    <p className="text-white/60 text-lg">Select how you want to use the platform.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* Merchant Option */}
                    <Link href="/login?role=merchant" className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-[#0A0A0A]/80 backdrop-blur-3xl rounded-[32px] p-8 md:p-12 border border-white/5 hover:border-purple-500/30 transition-all duration-300 h-full flex flex-col items-center text-center group-hover:scale-[1.02]">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                                <Store className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">Merchant</h2>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Create plans, manage subscriptions, and automate your recurring billing on Solana.
                            </p>
                            <div className="mt-8 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 group-hover:bg-purple-500 group-hover:border-purple-500 group-hover:text-white transition-all">
                                Merchant Dashboard
                            </div>
                        </div>
                    </Link>

                    {/* Subscriber Option */}
                    <Link href="/login?role=subscriber" className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-[#0A0A0A]/80 backdrop-blur-3xl rounded-[32px] p-8 md:p-12 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 h-full flex flex-col items-center text-center group-hover:scale-[1.02]">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                                <User className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">Subscriber</h2>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Manage your active subscriptions, view payment history, and control your spending.
                            </p>
                            <div className="mt-8 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white transition-all">
                                Subscriber Portal
                            </div>
                        </div>
                    </Link>

                </div>

            </motion.div>
        </div>
    );
}
