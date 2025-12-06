'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ChevronDown, Calendar, DollarSign, FileText, Lock, Globe, ArrowRight } from 'lucide-react';
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
        <div className="max-w-4xl mx-auto">
            {/* Header / Back */}
            <div className="mb-8 flex items-center gap-4">
                <Link href="/dashboard" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5 group">
                    <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white font-serif">Create Subscription Plan</h1>
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
                    <div className="p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent">
                        <div className="bg-[#0A0A0A] p-6 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors group focus-within:border-purple-500/50">
                            <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-purple-400 transition-colors">Plan Name</label>
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-gray-600 group-focus-within:text-white transition-colors" />
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
                        <div className="p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent">
                            <div className="bg-[#0A0A0A] p-6 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors group focus-within:border-purple-500/50 h-full">
                                <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-purple-400 transition-colors">Price (USDC)</label>
                                <div className="flex items-center gap-3">
                                    <DollarSign className="w-5 h-5 text-gray-600 group-focus-within:text-white transition-colors" />
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
                        <div className="p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent">
                            <div className="bg-[#0A0A0A] p-6 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors h-full flex flex-col justify-center">
                                <label className="block text-sm font-medium text-gray-400 mb-3">Billing Interval</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((int) => (
                                        <button
                                            key={int}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, interval: int.toLowerCase() })}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${formData.interval === int.toLowerCase()
                                                ? 'bg-purple-500 border-purple-500 text-white'
                                                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
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
                    <div className="p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent">
                        <div className="bg-[#0A0A0A] p-6 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors group focus-within:border-purple-500/50">
                            <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-purple-400 transition-colors">Description</label>
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
                    <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/10">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-purple-400" />
                            Visibility
                        </h3>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-3">
                                {formData.isPublic ? <Globe className="w-5 h-5 text-green-400" /> : <Lock className="w-5 h-5 text-red-400" />}
                                <div>
                                    <p className="text-sm font-medium text-white">{formData.isPublic ? 'Public Plan' : 'Private Plan'}</p>
                                    <p className="text-xs text-gray-500">{formData.isPublic ? 'Visible to everyone' : 'Invitation only'}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
                                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${formData.isPublic ? 'bg-purple-600' : 'bg-gray-700'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${formData.isPublic ? 'translate-x-6' : 'translate-x-0'
                                    }`} />
                            </button>
                        </div>
                    </div>

                    {/* Summary / Create Action */}
                    <div className="p-6 rounded-3xl bg-gradient-to-b from-purple-900/20 to-[#0A0A0A] border border-purple-500/20">
                        <h3 className="text-white font-bold mb-4">Summary</h3>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Plan Type</span>
                                <span className="text-white font-medium capitalize">{formData.interval}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Price</span>
                                <span className="text-white font-medium">{formData.price ? `$${formData.price} USDC` : '-'}</span>
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
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
                        <p className="text-center text-xs text-gray-500 mt-3">Creates an on-chain PDA account</p>
                    </div>
                </div>
            </motion.form>
        </div>
    );
}
