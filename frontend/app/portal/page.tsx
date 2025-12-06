'use client';

import { motion } from 'framer-motion';
import { CreditCard, Calendar, AlertCircle, CheckCircle, PauseCircle, RefreshCw, XCircle, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

// Mock Data for User Subscriptions
const initialSubscriptions = [
    {
        id: 1,
        merchant: 'Netflix',
        logo: 'bg-red-600',
        plan: 'Premium 4K',
        price: '22.99',
        interval: 'monthly',
        nextCharge: 'Dec 15, 2025',
        status: 'active'
    },
    {
        id: 2,
        merchant: 'Spotify',
        logo: 'bg-green-500',
        plan: 'Duo Premium',
        price: '14.99',
        interval: 'monthly',
        nextCharge: 'Dec 03, 2025',
        status: 'active'
    },
    {
        id: 3,
        merchant: 'Midjourney',
        logo: 'bg-white text-black',
        plan: 'Standard Plan',
        price: '30.00',
        interval: 'monthly',
        nextCharge: '-',
        status: 'paused'
    },
];

export default function PortalPage() {
    return (
        <div className="space-y-12">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-white font-serif mb-2">My Subscriptions</h1>
                    <p className="text-gray-400">Manage your active payments and billing history across Solana.</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                        <span className="text-gray-400 text-xs uppercase tracking-wider font-bold block mb-1">Total Monthly Spend</span>
                        <span className="text-2xl font-bold text-white">$67.98</span>
                    </div>
                </div>
            </div>

            {/* Subscriptions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialSubscriptions.map((sub, index) => (
                    <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
                    >
                        {/* Status Badge */}
                        <div className="absolute top-6 right-6">
                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${sub.status === 'active'
                                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                    : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                                }`}>
                                {sub.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <PauseCircle className="w-3 h-3" />}
                                {sub.status}
                            </div>
                        </div>

                        {/* Merchant Info */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg ${sub.logo}`}>
                                {sub.merchant[0]}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{sub.merchant}</h3>
                                <p className="text-sm text-gray-400">{sub.plan}</p>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                                <span className="text-sm text-gray-400 flex items-center gap-2">
                                    <CreditCard className="w-4 h-4" /> Price
                                </span>
                                <span className="text-white font-medium">${sub.price}<span className="text-gray-500 text-xs">/{sub.interval.slice(0, 3)}</span></span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                                <span className="text-sm text-gray-400 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> Next Charge
                                </span>
                                <span className="text-white font-medium">{sub.nextCharge}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-3">
                            {sub.status === 'active' ? (
                                <>
                                    <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-yellow-500/20 text-gray-300 hover:text-yellow-400 font-medium text-sm transition-colors border border-white/5 hover:border-yellow-500/30">
                                        <PauseCircle className="w-4 h-4" />
                                        Pause
                                    </button>
                                    <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 font-medium text-sm transition-colors border border-white/5 hover:border-red-500/30">
                                        <XCircle className="w-4 h-4" />
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button className="col-span-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 font-bold text-sm transition-colors">
                                    <RefreshCw className="w-4 h-4" />
                                    Resume Subscription
                                </button>
                            )}
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 text-center">
                            <button className="text-xs text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto group-hover:underline">
                                <Clock className="w-3 h-3" />
                                View Payment History
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
