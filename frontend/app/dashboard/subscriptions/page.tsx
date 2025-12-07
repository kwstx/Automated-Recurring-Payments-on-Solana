'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CreditCard, Calendar, AlertCircle, CheckCircle, PauseCircle, Zap, User } from 'lucide-react';

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
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Subscribers</h1>
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
                            className="bg-white/[0.03] border border-white/[0.05] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 outline-none w-full md:w-64 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Subscribers Table */}
            <div className="glass-panel rounded-3xl overflow-hidden relative">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-8 py-4 border-b border-white/[0.05] bg-white/[0.02]">
                    <div className="col-span-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Wallet Address</div>
                    <div className="col-span-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Plan</div>
                    <div className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</div>
                    <div className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Next Billing</div>
                    <div className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</div>
                </div>

                <div className="divide-y divide-white/[0.05]">
                    {filteredSubs.map((sub, index) => (
                        <motion.div
                            key={sub.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-white/[0.02] transition-colors group"
                        >
                            <div className="col-span-3 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10">
                                    <User className="w-4 h-4 text-purple-300" />
                                </div>
                                <div className="font-mono text-sm text-purple-300 bg-purple-500/10 px-2 py-1 rounded-md border border-purple-500/20">
                                    {sub.wallet}
                                </div>
                            </div>

                            <div className="col-span-3">
                                <div className="font-medium text-white text-sm">{sub.plan}</div>
                            </div>

                            <div className="col-span-2">
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${sub.status === 'active'
                                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                    : sub.status === 'paused'
                                        ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                                    }`}>
                                    {sub.status === 'active' ? <CheckCircle className="w-3 h-3" /> : sub.status === 'paused' ? <PauseCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                    <span className="capitalize">{sub.status}</span>
                                </div>
                            </div>

                            <div className="col-span-2">
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <Calendar className="w-3 h-3" />
                                    {sub.nextBilling}
                                </div>
                            </div>

                            <div className="col-span-2 text-right">
                                {sub.status === 'active' && (
                                    <button
                                        onClick={() => handleCharge(sub.id)}
                                        disabled={isCharging === sub.id}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-gray-300 hover:text-white transition-all border border-transparent hover:border-white/[0.1]"
                                    >
                                        {isCharging === sub.id ? (
                                            <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <Zap className="w-3 h-3 text-yellow-500" />
                                        )}
                                        <span className="hidden xl:inline">Charge Now</span>
                                    </button>
                                )}
                                <div className="text-xs text-gray-500 mt-1">LTV: ${sub.revenue}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredSubs.length === 0 && (
                    <div className="p-24 text-center text-gray-500 flex flex-col items-center gap-4">
                        <Search className="w-12 h-12 text-gray-700" />
                        <p>No subscribers found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
