'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, AlertTriangle, Check, Pause, Zap, User, CreditCard } from 'lucide-react';
import { useSubscriptions, useCancelSubscription, useChargeSubscription } from '@/hooks/useSubscriptions';

export default function SubscriptionsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: subscribers = [], isLoading, error } = useSubscriptions();
    const cancelSubscription = useCancelSubscription();
    const chargeSubscription = useChargeSubscription();

    const filteredSubs = subscribers.filter((sub: any) =>
        sub.wallet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.plan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCharge = async (pda: string) => {
        try {
            await chargeSubscription.mutateAsync(pda);
            alert('Charge triggered successfully');
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.error || 'Failed to charge subscription');
        }
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
        <div className="space-y-8 pb-12">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-black">Subscribers</h1>
                    <p className="text-[#666] mt-1 text-sm">Monitor active subscriptions and recurring billing.</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="group flex items-center px-4 py-2.5 bg-white border border-[#EAEAEA] rounded-xl w-full md:w-64 focus-within:border-black/20 focus-within:shadow-sm transition-all duration-200">
                        <Search className="w-4 h-4 text-[#999] group-focus-within:text-black transition-colors mr-3" />
                        <input
                            type="text"
                            placeholder="Search by wallet..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm font-medium text-black placeholder:text-[#999] w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Subscribers Table */}
            <div className="bg-white rounded-2xl border border-transparent hover:border-[#EAEAEA] shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#F8F9FA] border-b border-[#EAEAEA]">
                    <div className="col-span-3 text-xs font-bold text-[#666]">Wallet Address</div>
                    <div className="col-span-3 text-xs font-bold text-[#666]">Plan</div>
                    <div className="col-span-2 text-xs font-bold text-[#666]">Status</div>
                    <div className="col-span-2 text-xs font-bold text-[#666]">Next Billing</div>
                    <div className="col-span-2 text-xs font-bold text-[#666] text-right">Actions</div>
                </div>

                {isLoading ? (
                    <div className="p-24 text-center items-center justify-center flex">
                        <div className="w-8 h-8 border-2 border-black/10 border-t-black rounded-full animate-spin" />
                    </div>
                ) : filteredSubs.length === 0 ? (
                    <div className="p-24 text-center text-[#666] flex flex-col items-center gap-4">
                        <div className="w-12 h-12 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-[#999]" />
                        </div>
                        <p className="text-sm font-medium">No subscribers found.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-[#F5F5F5]">
                        {filteredSubs.map((sub: any, index: number) => (
                            <motion.div
                                key={sub.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-[#F8F9FA] transition-colors group"
                            >
                                <div className="col-span-3 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-[#F0F1F2] rounded-full flex items-center justify-center text-[#666]">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div className="text-sm font-medium text-black font-mono bg-[#F5F5F5] px-2 py-0.5 rounded text-[11px] truncate max-w-[140px] text-center border border-[#EAEAEA]">
                                        {sub.wallet.slice(0, 4)}...{sub.wallet.slice(-4)}
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    <div className="font-bold text-black text-sm">{sub.plan}</div>
                                </div>

                                <div className="col-span-2">
                                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border border-transparent ${sub.status === 'active'
                                        ? 'bg-green-50 text-green-600'
                                        : sub.status === 'paused'
                                            ? 'bg-amber-50 text-amber-600'
                                            : 'bg-red-50 text-red-600'
                                        }`}>
                                        {sub.status === 'active' ? <Check className="w-3 h-3" /> : sub.status === 'paused' ? <Pause className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                                        <span className="capitalize">{sub.status}</span>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <div className="flex items-center gap-2 text-[#666] text-sm">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(sub.nextBilling * 1000).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="col-span-2 text-right">
                                    {sub.status === 'active' && (
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleCharge(sub.subscriptionPda)}
                                                disabled={chargeSubscription.isPending}
                                                className="p-2 text-black hover:bg-black hover:text-white rounded-lg transition-all"
                                                title="Charge Subscription"
                                            >
                                                {chargeSubscription.isPending && chargeSubscription.variables === sub.subscriptionPda ? (
                                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Zap className="w-4 h-4" />
                                                )}
                                            </button>

                                            <button
                                                onClick={() => handleCancel(sub.subscriptionPda)}
                                                disabled={cancelSubscription.isPending}
                                                className="p-2 text-[#666] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                title="Cancel Subscription"
                                            >
                                                <AlertTriangle className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                    <div className="text-xs font-bold text-[#999] mt-1">
                                        ${(sub.amount / 1000000).toFixed(2)}
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
