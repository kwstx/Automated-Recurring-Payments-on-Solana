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
    const updatePlan = useUpdatePlan();

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
        <div className="space-y-8 pb-12">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-black">Subscription Plans</h1>
                    <p className="text-[#666] mt-1 text-sm">Manage your billing tiers and pricing models.</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="group flex items-center px-4 py-2.5 bg-white border border-[#EAEAEA] rounded-xl w-full md:w-64 focus-within:border-black/20 focus-within:shadow-sm transition-all duration-200">
                        <Search className="w-4 h-4 text-[#999] group-focus-within:text-black transition-colors mr-3" />
                        <input
                            type="text"
                            placeholder="Search plans..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm font-medium text-black placeholder:text-[#999] w-full"
                        />
                    </div>

                    <Link href="/dashboard/create-plan">
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-bold rounded-xl hover:bg-[#1a1a1a] shadow-lg shadow-black/20 transition-all">
                            <Plus className="w-4 h-4" />
                            Create Plan
                        </button>
                    </Link>
                </div>
            </div>

            {/* Plans List Table */}
            <div className="bg-white rounded-2xl border border-transparent hover:border-[#EAEAEA] shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#F8F9FA] border-b border-[#EAEAEA]">
                    <div className="col-span-4 text-xs font-bold text-[#666]">Plan Details</div>
                    <div className="col-span-2 text-xs font-bold text-[#666]">Price</div>
                    <div className="col-span-2 text-xs font-bold text-[#666]">Interval</div>
                    <div className="col-span-2 text-xs font-bold text-[#666]">Status</div>
                    <div className="col-span-2 text-xs font-bold text-[#666] text-right">Actions</div>
                </div>

                {isLoading ? (
                    <div className="p-24 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-black/20 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="p-12 text-center text-red-600 bg-red-50 text-sm font-medium">
                        Failed to load plans. Please try again.
                    </div>
                ) : (
                    <div className="divide-y divide-[#F5F5F5]">
                        {filteredPlans.map((plan: any, index: number) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-[#F8F9FA] transition-colors group"
                            >
                                <div className="col-span-4 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#F5F5F5] rounded-xl flex items-center justify-center text-black group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                                        <Package className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-black text-sm">{plan.name}</div>
                                        {plan.description && (
                                            <div className="text-xs text-[#666] mt-0.5 line-clamp-1">{plan.description}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <div className="text-black font-bold text-sm">
                                        ${(plan.amount / 1000000).toFixed(2)} <span className="text-[#999] text-xs font-normal">{plan.currency}</span>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <div className="text-black text-xs font-medium bg-[#F5F5F5] px-2.5 py-1 rounded-md w-fit capitalize">{plan.interval}</div>
                                </div>

                                <div className="col-span-2">
                                    <button
                                        onClick={() => handleToggleStatus(plan)}
                                        disabled={updatePlan.isPending}
                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full transition-all hover:opacity-80 ${plan.is_active
                                            ? 'bg-green-50 text-green-600'
                                            : 'bg-amber-50 text-amber-600'
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
                                        <span>{plan.is_active ? 'Active' : 'Inactive'}</span>
                                    </button>
                                </div>

                                <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-[#666] hover:text-black hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Edit Plan">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-[#666] hover:text-black hover:bg-white hover:shadow-sm rounded-lg transition-all" title="View Subscribers">
                                        <Users className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(plan.id, plan.name)}
                                        disabled={deletePlan.isPending}
                                        className="p-2 text-[#666] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
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
                        <div className="w-12 h-12 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                            <Search className="w-6 h-6 text-[#999]" />
                        </div>
                        <p className="text-sm font-medium">No plans found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
