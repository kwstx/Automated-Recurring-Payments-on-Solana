'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Users, Trash2, CheckCircle, PauseCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { usePlans, useDeletePlan } from '@/hooks/usePlans';

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

    return (
        <div className="space-y-8">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white font-serif">Subscription Plans</h1>
                    <p className="text-gray-400 mt-1">Manage your active billing tiers and pricings.</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search plans..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-[#0A0A0A] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-purple-500/50 outline-none w-full md:w-64 transition-all"
                        />
                    </div>

                    <Link href="/dashboard/create-plan">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-105 transition-all">
                            <Plus className="w-4 h-4" />
                            Create Plan
                        </button>
                    </Link>
                </div>
            </div>

            {/* Plans List Table */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden">
                {isLoading ? (
                    <div className="p-12 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="p-12 text-center text-red-400">
                        Failed to load plans. Please try again.
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Plan Name</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Interval</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredPlans.map((plan: any, index: number) => (
                                        <motion.tr
                                            key={plan.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="group hover:bg-white/[0.02] transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-white text-base">{plan.name}</div>
                                                {plan.description && (
                                                    <div className="text-xs text-gray-500 mt-1">{plan.description}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-gray-300 font-mono">
                                                    ${(plan.amount / 1000000).toFixed(2)} <span className="text-gray-600 text-xs">{plan.currency}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-gray-400 capitalize">{plan.interval}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${plan.is_active
                                                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                                    : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                    {plan.is_active ? <CheckCircle className="w-3 h-3" /> : <PauseCircle className="w-3 h-3" />}
                                                    <span className="capitalize">{plan.is_active ? 'Active' : 'Inactive'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Edit Plan">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="View Subscribers">
                                                        <Users className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(plan.id, plan.name)}
                                                        disabled={deletePlan.isPending}
                                                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                                                        title="Delete Plan"
                                                    >
                                                        {deletePlan.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredPlans.length === 0 && (
                            <div className="p-12 text-center text-gray-500">
                                {searchTerm ? 'No plans found matching your search.' : 'No plans created yet. Create your first plan to get started.'}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
