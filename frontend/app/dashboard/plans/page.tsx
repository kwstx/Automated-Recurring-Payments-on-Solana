'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Users, Trash2, Check, Pause, Loader2, Package } from 'lucide-react';
import Link from 'next/link';
import { usePlans, useDeletePlan, useUpdatePlan } from '@/hooks/usePlans';

export default function PlansPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: plans = [], isLoading, error } = usePlans();
    const deletePlan = useDeletePlan();

    const filteredPlans = plans.filter((plan: any) =>
        plan.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            try {
                await deletePlan.mutateAsync(id);
            } catch (error: any) {
                alert(error.response?.data?.error || 'Failed to delete plan');
            }
        }
    };

    const updatePlan = useUpdatePlan();

    const handleToggleStatus = async (plan: any) => {
        try {
            await updatePlan.mutateAsync({
                planId: plan.id,
                isActive: !plan.is_active
            });
        } catch (error: any) {
            console.error('Failed to update plan:', error);
            alert(error.response?.data?.error || 'Failed to update plan status');
        }
    };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#a3a3a3] pb-6">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-tight text-black">Subscription Plans</h1>
                    <p className="text-[#666] mt-1 text-sm font-mono uppercase">Manage billing tiers and pricings.</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="group flex items-center px-4 py-2.5 bg-transparent border border-[#a3a3a3] w-full md:w-64 focus-within:border-black focus-within:bg-white transition-all duration-200">
                        <Search className="w-4 h-4 text-[#666] group-focus-within:text-black transition-colors mr-3" />
                        <input
                            type="text"
                            placeholder="SEARCH PLANS..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-xs font-mono font-bold text-black placeholder:text-[#999] w-full uppercase"
                        />
                    </div>

                    <Link href="/dashboard/create-plan">
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-black text-white font-mono font-bold text-xs uppercase hover:bg-[#1a1a1a] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] transition-all">
                            <Plus className="w-4 h-4" />
                            Create Plan
                        </button>
                    </Link>
                </div>
            </div>

            {/* Plans List Table */}
            <div className="border border-[#a3a3a3] bg-white relative">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#a3a3a3] bg-[#f5f5f5]">
                    <div className="col-span-4 text-xs font-mono font-bold text-black uppercase tracking-wider">Plan Details</div>
                    <div className="col-span-2 text-xs font-mono font-bold text-black uppercase tracking-wider">Price</div>
                    <div className="col-span-2 text-xs font-mono font-bold text-black uppercase tracking-wider">Interval</div>
                    <div className="col-span-2 text-xs font-mono font-bold text-black uppercase tracking-wider">Status</div>
                    <div className="col-span-2 text-xs font-mono font-bold text-black uppercase tracking-wider text-right">Actions</div>
                </div>

                {isLoading ? (
                    <div className="p-24 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-black animate-spin" />
                    </div>
                ) : error ? (
                    <div className="p-12 text-center text-red-600 font-mono text-sm border-l-4 border-red-600 bg-red-50">
                        Failed to load plans. Please try again.
                    </div>
                ) : (
                    <div className="divide-y divide-[#EAEAEA]">
                        {filteredPlans.map((plan: any, index: number) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-[#fafafa] transition-colors group"
                            >
                                <div className="col-span-4 flex items-center gap-4">
                                    <div className="w-10 h-10 border border-[#a3a3a3] bg-white flex items-center justify-center text-black group-hover:border-black transition-colors">
                                        <Package className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-black text-sm uppercase tracking-tight">{plan.name}</div>
                                        {plan.description && (
                                            <div className="text-xs text-[#666] mt-1 line-clamp-1 font-mono">{plan.description}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <div className="text-black font-bold text-sm">
                                        ${(plan.amount / 1000000).toFixed(2)} <span className="text-[#999] text-xs font-mono">{plan.currency}</span>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <div className="text-black uppercase text-xs font-mono font-bold bg-[#EAEAEA] px-2 py-1 w-fit">{plan.interval}</div>
                                </div>

                                <div className="col-span-2">
                                    <button
                                        onClick={() => handleToggleStatus(plan)}
                                        disabled={updatePlan.isPending}
                                        className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono font-bold border transition-all hover:opacity-80 ${plan.is_active
                                            ? 'bg-green-50 border-green-200 text-green-700'
                                            : 'bg-yellow-50 border-yellow-200 text-yellow-700'
                                            }`}
                                        title={plan.is_active ? 'Click to Deactivate' : 'Click to Activate'}
                                    >
                                        {updatePlan.isPending ? (
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                        ) : plan.is_active ? (
                                            <Check className="w-3 h-3" />
                                        ) : (
                                            <Pause className="w-3 h-3" />
                                        )}
                                        <span className="uppercase">{plan.is_active ? 'Active' : 'Inactive'}</span>
                                    </button>
                                </div>

                                <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 border border-transparent hover:border-black hover:bg-black hover:text-white text-[#666] transition-all" title="Edit Plan">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 border border-transparent hover:border-black hover:bg-black hover:text-white text-[#666] transition-all" title="View Subscribers">
                                        <Users className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(plan.id, plan.name)}
                                        disabled={deletePlan.isPending}
                                        className="p-2 border border-transparent hover:border-red-600 hover:bg-red-600 hover:text-white text-[#666] transition-all disabled:opacity-50"
                                        title="Delete Plan"
                                    >
                                        {deletePlan.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {filteredPlans.length === 0 && !isLoading && !error && (
                    <div className="p-24 text-center text-[#666] flex flex-col items-center gap-4">
                        <Package className="w-12 h-12 text-[#999]" />
                        <p className="font-mono text-sm uppercase">No plans found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
