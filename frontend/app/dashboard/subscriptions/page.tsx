'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CreditCard, Calendar, AlertCircle, CheckCircle, PauseCircle, Zap } from 'lucide-react';

// Mock Data
const initialSubscribers = [
    { id: 1, wallet: '8xzt...jLk2', plan: 'Pro Membership', status: 'active', nextBilling: 'Dec 12, 2025', revenue: '59.98' },
    { id: 2, wallet: '3mPa...9Kq1', plan: 'Basic Tier', status: 'active', nextBilling: 'Dec 08, 2025', revenue: '19.98' },
    { id: 3, wallet: 'Hz2k...Lp09', plan: 'Enterprise', status: 'paused', nextBilling: '-', revenue: '299.00' },
    { id: 4, wallet: '9qWe...Mn45', plan: 'Pro Membership', status: 'canceled', nextBilling: '-', revenue: '89.97' },
    { id: 5, wallet: '2bRt...Xy78', plan: 'Basic Tier', status: 'active', nextBilling: 'Jan 02, 2026', revenue: '9.99' },
];

export default function SubscriptionsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isCharging, setIsCharging] = useState<number | null>(null);

    const filteredSubs = initialSubscribers.filter(sub =>
        sub.wallet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.plan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCharge = async (id: number) => {
        setIsCharging(id);
        // Mock Charge
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsCharging(null);
    };

    return (
        <div className="space-y-8">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white font-serif">Subscribers</h1>
                    <p className="text-gray-400 mt-1">Manage active subscriptions and monitor billing cycles.</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search wallet or plan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-[#0A0A0A] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 outline-none w-full md:w-64 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Subscribers Table */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Wallet Address</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Plan</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Next Billing</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Revenue</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredSubs.map((sub, index) => (
                                <motion.tr
                                    key={sub.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-mono text-sm text-purple-300 bg-purple-500/10 px-2 py-1 rounded-md inline-block border border-purple-500/20">
                                            {sub.wallet}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white text-sm">{sub.plan}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${sub.status === 'active'
                                                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                                : sub.status === 'paused'
                                                    ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                                                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                                            }`}>
                                            {sub.status === 'active' ? <CheckCircle className="w-3 h-3" /> : sub.status === 'paused' ? <PauseCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                            <span className="capitalize">{sub.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <Calendar className="w-3 h-3" />
                                            {sub.nextBilling}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-white font-medium text-sm">${sub.revenue} <span className="text-gray-600 text-xs">USDC</span></div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {sub.status === 'active' && (
                                            <button
                                                onClick={() => handleCharge(sub.id)}
                                                disabled={isCharging === sub.id}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 hover:text-white transition-all border border-white/5 hover:border-white/10"
                                            >
                                                {isCharging === sub.id ? (
                                                    <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Zap className="w-3 h-3 text-yellow-500" />
                                                )}
                                                <span className="hidden xl:inline">Charge Now</span>
                                            </button>
                                        )}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredSubs.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        No subscribers found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
}
