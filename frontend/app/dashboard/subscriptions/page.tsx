'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, AlertTriangle, Check, Pause, Zap, User } from 'lucide-react';
import { useSubscriptions, useCancelSubscription } from '@/hooks/useSubscriptions';

// Mock Data Removed

export default function SubscriptionsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isCharging, setIsCharging] = useState<number | null>(null);

    // Query & Mutation
    const { data: subscribers = [], isLoading, error } = useSubscriptions();
    const cancelSubscription = useCancelSubscription();

    const filteredSubs = subscribers.filter((sub: any) =>
        sub.wallet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.plan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCharge = async (id: number) => {
        setIsCharging(id);
        // Mock Charge - We simulate an on-chain action
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsCharging(null);
        alert('Charge triggered successfully (Simulated)');
    };

    const handleCancel = async (pda: string) => {
        if (confirm('Are you sure you want to cancel this subscription?')) {
            try {
                await cancelSubscription.mutateAsync(pda);
            } catch (err: any) {
                alert(err.response?.data?.error || 'Failed to cancel subscription');
            }
        }
    };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#a3a3a3] pb-6">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-tight text-black">Subscribers</h1>
                    <p className="text-[#666] mt-1 text-sm font-mono uppercase">Manage active subscriptions & billing.</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="group flex items-center px-4 py-2.5 bg-transparent border border-[#a3a3a3] w-full md:w-64 focus-within:border-black focus-within:bg-white transition-all duration-200">
                        <Search className="w-4 h-4 text-[#666] group-focus-within:text-black transition-colors mr-3" />
                        <input
                            type="text"
                            placeholder="SEARCH WALLET..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-xs font-mono font-bold text-black placeholder:text-[#999] w-full uppercase"
                        />
                    </div>
                </div>
            </div>

            {/* Subscribers Table */}
            <div className="border border-[#a3a3a3] bg-white relative">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#a3a3a3] bg-[#f5f5f5]">
                    <div className="col-span-3 text-xs font-mono font-bold text-black uppercase tracking-wider">Wallet Address</div>
                    <div className="col-span-3 text-xs font-mono font-bold text-black uppercase tracking-wider">Plan</div>
                    <div className="col-span-2 text-xs font-mono font-bold text-black uppercase tracking-wider">Status</div>
                    <div className="col-span-2 text-xs font-mono font-bold text-black uppercase tracking-wider">Next Billing</div>
                    <div className="col-span-2 text-xs font-mono font-bold text-black uppercase tracking-wider text-right">Actions</div>
                </div>

                {isLoading ? (
                    <div className="p-24 text-center items-center justify-center flex">
                        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filteredSubs.length === 0 ? (
                    <div className="p-24 text-center text-[#666] flex flex-col items-center gap-4">
                        <Search className="w-12 h-12 text-[#999]" />
                        <p className="font-mono text-sm uppercase">No subscribers found.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-[#EAEAEA]">
                        {filteredSubs.map((sub: any, index: number) => (
                            <motion.div
                                key={sub.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-[#fafafa] transition-colors group"
                            >
                                <div className="col-span-3 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-[#EAEAEA] flex items-center justify-center border border-[#d4d4d4]">
                                        <User className="w-4 h-4 text-[#666]" />
                                    </div>
                                    <div className="font-mono text-sm font-bold text-black bg-[#f5f5f5] px-2 py-1 border border-[#e5e5e5] truncate max-w-[120px]">
                                        {sub.wallet.slice(0, 4)}...{sub.wallet.slice(-4)}
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    <div className="font-bold text-black text-sm uppercase tracking-tight">{sub.plan}</div>
                                </div>

                                <div className="col-span-2">
                                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono font-bold border ${sub.status === 'active'
                                        ? 'bg-green-50 border-green-200 text-green-700'
                                        : sub.status === 'paused'
                                            ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
                                            : 'bg-red-50 border-red-200 text-red-700'
                                        }`}>
                                        {sub.status === 'active' ? <Check className="w-3 h-3" /> : sub.status === 'paused' ? <Pause className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                                        <span className="uppercase">{sub.status}</span>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <div className="flex items-center gap-2 text-[#666] text-sm font-mono">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(sub.nextBilling * 1000).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="col-span-2 text-right">
                                    {sub.status === 'active' && (
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleCharge(sub.id)}
                                                disabled={isCharging === sub.id}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#a3a3a3] hover:border-black hover:bg-black hover:text-white transition-all text-xs font-mono font-bold text-black uppercase"
                                                title="Charge Subscription"
                                            >
                                                {isCharging === sub.id ? (
                                                    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Zap className="w-3 h-3" />
                                                )}
                                                <span className="hidden xl:inline">Charge</span>
                                            </button>

                                            <button
                                                onClick={() => handleCancel(sub.subscriptionPda)}
                                                disabled={cancelSubscription.isPending}
                                                className="inline-flex items-center px-3 py-1.5 bg-white border border-red-200 text-red-700 hover:bg-red-600 hover:text-white transition-all text-xs font-mono font-bold uppercase"
                                                title="Cancel Subscription"
                                            >
                                                <AlertTriangle className="w-3 h-3" />
                                            </button>
                                        </div>
                                    )}
                                    <div className="text-[10px] font-mono font-bold text-[#999] mt-1 uppercase">
                                        Val: ${(sub.amount / 1000000).toFixed(2)}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
