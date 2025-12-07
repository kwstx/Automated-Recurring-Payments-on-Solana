'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ChevronDown, Calendar, DollarSign, FileText, Lock, Globe, ArrowRight, Layers } from 'lucide-react';
import Link from 'next/link';

export default function CreatePlanPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        interval: 'monthly',
        customInterval: '',
        description: '',
        isPublic: true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // TODO: Integrate with Solana/Anchor to create Plan PDA
        await new Promise(resolve => setTimeout(resolve, 2000)); // Mock delay
        setIsLoading(false);
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header / Back */}
            <div className="mb-8 flex items-center gap-4">
                <Link href="/dashboard/plans" className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center hover:bg-white/[0.1] transition-colors border border-white/[0.05] group">
                    <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Create Subscription Plan</h1>
                    <p className="text-gray-400 mt-1">Define the terms for your new on-chain subscription service.</p>
                </div>
            </div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
                {/* Left Column: Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Plan Name */}
                    <div className="glass-card p-1 rounded-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 bg-[#050505]/50 p-6 rounded-xl h-full backdrop-blur-sm">
                            <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-purple-400 transition-colors">Plan Name</label>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-focus-within:text-purple-400 group-focus-within:bg-purple-500/10 transition-colors">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="e.g. Pro Membership"
                                    className="bg-transparent border-none outline-none text-lg text-white placeholder-gray-600 w-full"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Price & Interval Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price */}
                        <div className="glass-card p-1 rounded-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 bg-[#050505]/50 p-6 rounded-xl h-full backdrop-blur-sm">
                                <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-green-400 transition-colors">Price (USDC)</label>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-focus-within:text-green-400 group-focus-within:bg-green-500/10 transition-colors">
                                        <DollarSign className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="bg-transparent border-none outline-none text-2xl font-bold text-white placeholder-gray-700 w-full"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Interval */}
                        <div className="glass-card p-1 rounded-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 bg-[#050505]/50 p-6 rounded-xl h-full backdrop-blur-sm flex flex-col justify-center">
                                <label className="block text-sm font-medium text-gray-400 mb-3">Billing Interval</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((int) => (
                                        <button
                                            key={int}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, interval: int.toLowerCase() })}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${formData.interval === int.toLowerCase()
                                                ? 'bg-purple-500 border-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                                                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                                }`}
                                        >
                                            {int}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="glass-card p-1 rounded-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 bg-[#050505]/50 p-6 rounded-xl h-full backdrop-blur-sm">
                            <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-white transition-colors">Description</label>
                            <textarea
                                placeholder="What does this plan include?"
                                rows={4}
                                className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-600 w-full resize-none"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Settings & Preview */}
                <div className="space-y-6">
                    {/* Visibility Settings */}
                    <div className="glass-panel p-6 rounded-3xl">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-purple-400" />
                            Visibility
                        </h3>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                            <div className="flex items-center gap-3">
                                {formData.isPublic ? <Globe className="w-5 h-5 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" /> : <Lock className="w-5 h-5 text-red-400" />}
                                <div>
                                    <p className="text-sm font-medium text-white">{formData.isPublic ? 'Public Plan' : 'Private Plan'}</p>
                                    <p className="text-xs text-gray-500">{formData.isPublic ? 'Visible to everyone' : 'Invitation only'}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
                                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${formData.isPublic ? 'bg-purple-600' : 'bg-white/10'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${formData.isPublic ? 'translate-x-6' : 'translate-x-0'
                                    }`} />
                            </button>
                        </div>
                    </div>

                    {/* Summary / Create Action */}
                    <div className="p-6 rounded-3xl bg-gradient-to-b from-purple-900/20 to-blue-900/10 border border-white/10 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[50px] pointer-events-none" />

                        <h3 className="text-white font-bold mb-4 relative z-10 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-purple-400" />
                            Summary
                        </h3>
                        <div className="space-y-3 mb-6 relative z-10">
                            <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                <span className="text-gray-400">Plan Type</span>
                                <span className="text-white font-medium capitalize">{formData.interval}</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                <span className="text-gray-400">Price</span>
                                <span className="text-white font-medium text-lg tracking-tight">{formData.price ? `$${formData.price} USDC` : '-'}</span>
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            className="relative z-10 w-full py-4 rounded-xl bg-gradient-to-r from-white to-gray-200 text-black font-bold text-lg hover:to-white hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Plan
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-3 relative z-10">Creates an on-chain PDA account</p>
                    </div>
                </div>
            </motion.form>
        </div>
    );
}
