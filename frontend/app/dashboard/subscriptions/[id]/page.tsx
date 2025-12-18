'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, CreditCard, Activity, Check, AlertTriangle, Pause } from 'lucide-react';
import Link from 'next/link';
import { useSubscriptionUsage } from '@/hooks/useUsage';
// We might need to fetch subscription details too if we want more than just usage
// But useUsage requires subscriptionId (db ID, not PDA?).
// Wait, the lists usually have IDs.
// For now, let's assume we pass the ID in the URL.

export default function SubscriptionDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    // We ideally need a useSubscription(id) hook, but we only have useSubscriptions() list.
    // For MVP, handling just usage or fetching from list if cached.
    // Let's rely on useUsage for the usage part.
    const { data: usageData, isLoading, error } = useSubscriptionUsage(id);

    return (
        <div className="max-w-5xl mx-auto pb-12">
            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
                <Link href="/dashboard/subscriptions" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#666] hover:text-black hover:bg-[#F5F5F5] transition-colors shadow-sm">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-black">Subscription Details</h1>
                    <p className="text-[#666] mt-1 text-sm">View usage and billing history.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    {/* Usage Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-[#EAEAEA] transition-colors"
                    >
                        <h3 className="text-lg font-bold text-black mb-6 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-[#999]" />
                            Current Period Usage
                        </h3>

                        {isLoading ? (
                            <div className="py-12 flex justify-center">
                                <div className="w-6 h-6 border-2 border-black/10 border-t-black rounded-full animate-spin" />
                            </div>
                        ) : error ? (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold">
                                Failed to load usage data.
                            </div>
                        ) : !usageData?.usage || usageData.usage.length === 0 ? (
                            <div className="py-8 text-center text-[#999] text-sm italic">
                                No metered usage recorded for this period.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-12 gap-4 pb-2 border-b border-[#F5F5F5] text-xs font-bold text-[#999] uppercase">
                                    <div className="col-span-5">Event</div>
                                    <div className="col-span-3 text-right">Usage</div>
                                    <div className="col-span-4 text-right">Est. Cost</div>
                                </div>
                                {usageData.usage.map((item: any, i: number) => (
                                    <div key={i} className="grid grid-cols-12 gap-4 items-center text-sm">
                                        <div className="col-span-5 font-bold text-black">{item.eventName}</div>
                                        <div className="col-span-3 text-right tabular-nums text-[#666]">
                                            {item.totalUsage.toLocaleString()}
                                            {item.included > 0 && <span className="text-[10px] ml-1 text-green-600">({item.included} incl)</span>}
                                        </div>
                                        <div className="col-span-4 text-right font-bold text-black tabular-nums">
                                            ${(item.cost / 1000000).toFixed(4)}
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-4 border-t border-black flex justify-between items-center mt-2">
                                    <span className="font-bold text-black">Total Usage Fees</span>
                                    <span className="text-xl font-bold text-black">
                                        ${(usageData.usage.reduce((acc: number, curr: any) => acc + curr.cost, 0) / 1000000).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Sidebar Info (Placeholder for now) */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-transparent">
                        <h3 className="text-sm font-bold text-[#999] uppercase mb-4">Quick Actions</h3>
                        <p className="text-sm text-[#666] mb-4">Manage this subscription's lifecycle.</p>
                        <button className="w-full py-2 bg-[#F5F5F5] text-black font-bold text-sm rounded-lg hover:bg-black hover:text-white transition-colors">
                            Manage Subscription
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
