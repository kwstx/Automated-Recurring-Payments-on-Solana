'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ChevronDown, Calendar, DollarSign, FileText, Lock, Globe, ArrowRight, Layers } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Keypair } from '@solana/web3.js';
import { useCreatePlan } from '@/hooks/usePlans';

export default function CreatePlanPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        interval: 'monthly',
        customInterval: '',
        description: '',
        isPublic: true,
        currency: 'USDC', // Default
        currencyMint: '',
        decimals: 6
    });

    const CURRENCIES = [
        { symbol: 'USDC', mint: '', decimals: 6, icon: DollarSign },
        { symbol: 'SOL', mint: 'So11111111111111111111111111111111111111112', decimals: 9, icon: Globe },
        { symbol: 'BONK', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', decimals: 5, icon: Globe },
    ];

    const createPlan = useCreatePlan();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const mockPlanPda = Keypair.generate().publicKey.toBase58();

            await createPlan.mutateAsync({
                planPda: mockPlanPda,
                name: formData.name,
                description: formData.description,
                amount: parseFloat(formData.price) * Math.pow(10, formData.decimals),
                currency: formData.currency,
                currencyMint: formData.currencyMint,
                decimals: formData.decimals,
                interval: formData.interval,
                verifyOnChain: false
            });

            router.push('/dashboard/plans');
        } catch (error: any) {
            console.error('Failed to create plan:', error);
            alert(error.response?.data?.error || 'Failed to create plan');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-12">
            {/* Header / Back */}
            <div className="mb-8 flex items-center gap-4">
                <Link href="/dashboard/plans" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#666] hover:text-black hover:bg-[#F5F5F5] transition-colors shadow-sm">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-black">Create Plan</h1>
                    <p className="text-[#666] mt-1 text-sm">Define new subscription terms and pricing.</p>
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
                    {/* General Details Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-[#EAEAEA] transition-colors">
                        <h3 className="text-lg font-bold text-black mb-6 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#999]" />
                            Plan Details
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-[#666] mb-2">Plan Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Pro Membership"
                                    className="w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl px-4 py-3 outline-none text-black placeholder:text-[#999] focus:border-black/20 focus:bg-white transition-all font-medium"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#666] mb-2">Description</label>
                                <textarea
                                    placeholder="What does this plan include?"
                                    rows={4}
                                    className="w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl px-4 py-3 outline-none text-sm text-black placeholder:text-[#999] resize-none focus:border-black/20 focus:bg-white transition-all font-medium"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-[#EAEAEA] transition-colors">
                        <h3 className="text-lg font-bold text-black mb-6 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-[#999]" />
                            Pricing Logic
                        </h3>

                        <div className="space-y-6">
                            {/* Currency Choice */}
                            <div>
                                <label className="block text-xs font-bold text-[#666] mb-3">Currency</label>
                                <div className="flex flex-wrap gap-3">
                                    {CURRENCIES.map((curr) => (
                                        <button
                                            key={curr.symbol}
                                            type="button"
                                            onClick={() => setFormData({
                                                ...formData,
                                                currency: curr.symbol,
                                                currencyMint: curr.mint,
                                                decimals: curr.decimals
                                            })}
                                            className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${formData.currency === curr.symbol
                                                ? 'bg-black text-white shadow-md'
                                                : 'bg-[#F8F9FA] text-[#666] hover:bg-[#F0F1F2] hover:text-black'
                                                }`}
                                        >
                                            {curr.symbol}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-[#666] mb-2">Price Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] text-sm font-bold">$</span>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl pl-8 pr-4 py-3 outline-none text-lg font-bold text-black placeholder:text-[#ccc] focus:border-black/20 focus:bg-white transition-all"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#666] mb-2">Billing Interval</label>
                                    <div className="relative">
                                        <select
                                            value={formData.interval}
                                            onChange={(e) => setFormData({ ...formData, interval: e.target.value })}
                                            className="w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl px-4 py-3 outline-none text-black font-bold appearance-none cursor-pointer focus:border-black/20 focus:bg-white transition-all"
                                        >
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="yearly">Yearly</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Settings & Preview */}
                <div className="space-y-6">
                    {/* Visibility Settings */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-[#EAEAEA] transition-colors">
                        <h3 className="text-black font-bold mb-4 flex items-center gap-2 text-sm">
                            <Globe className="w-4 h-4 text-[#999]" />
                            Visibility
                        </h3>

                        <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-xl mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formData.isPublic ? 'bg-black text-white' : 'bg-[#EAEAEA] text-[#999]'}`}>
                                    {formData.isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-black">{formData.isPublic ? 'Public Plan' : 'Private Plan'}</p>
                                    <p className="text-xs text-[#666]">{formData.isPublic ? 'Visible to everyone' : 'Invitation only'}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
                                className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${formData.isPublic ? 'bg-black' : 'bg-[#EAEAEA]'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 shadow-sm ${formData.isPublic ? 'left-[calc(100%-1.25rem)]' : 'left-1'}`} />
                            </button>
                        </div>
                        <p className="text-xs text-[#999] leading-relaxed">
                            Public plans are displayed on your portal. Private plans can only be accessed via direct link.
                        </p>
                    </div>

                    {/* Summary / Create Action */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-[#EAEAEA] transition-colors relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-black/5" />
                        <h3 className="text-black font-bold mb-4 flex items-center gap-2 text-sm">
                            <Layers className="w-4 h-4 text-[#999]" />
                            Summary
                        </h3>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center text-sm py-2 border-b border-[#F5F5F5]">
                                <span className="text-[#666]">Plan Type</span>
                                <span className="font-bold text-black capitalize">{formData.interval}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm py-2 border-b border-[#F5F5F5]">
                                <span className="text-[#666]">Price</span>
                                <span className="font-bold text-black text-lg">{formData.price ? `${formData.price}` : '0.00'} <span className="text-xs text-[#999] font-normal">{formData.currency}</span></span>
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            className="w-full py-3.5 bg-black text-white font-bold text-sm rounded-xl hover:bg-[#1a1a1a] shadow-lg shadow-black/10 hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Plan
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </motion.form>
        </div>
    );
}
