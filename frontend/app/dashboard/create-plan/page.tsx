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
        { symbol: 'USDC', mint: '', decimals: 6, icon: DollarSign }, // Mint handled by backend default or hardcoded
        { symbol: 'SOL', mint: 'So11111111111111111111111111111111111111112', decimals: 9, icon: Globe },
        { symbol: 'BONK', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', decimals: 5, icon: Globe },
    ];

    const createPlan = useCreatePlan();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Generate a random Keypair for the Plan PDA (Mocking on-chain derivation for now)
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
                verifyOnChain: false // value is false because we are mocking it
            });

            // Redirect to plans list
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
            <div className="mb-8 flex items-center gap-4 border-b border-[#a3a3a3] pb-6">
                <Link href="/dashboard/plans" className="w-10 h-10 border border-[#a3a3a3] bg-white flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors group">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-tight text-black">Create Plan</h1>
                    <p className="text-[#666] mt-1 text-sm font-mono uppercase">Define new subscription terms.</p>
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
                <div className="lg:col-span-2 space-y-8">
                    {/* Plan Name */}
                    <div className="border border-[#a3a3a3] bg-white p-8">
                        <label className="block text-xs font-mono font-bold text-black uppercase mb-2 group-focus-within:text-black">Plan Name</label>
                        <div className="flex items-center gap-3">
                            <div className="p-2 border border-black bg-black text-white">
                                <FileText className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="E.G. PRO MEMBERSHIP"
                                className="bg-transparent border-b-2 border-[#a3a3a3] outline-none text-xl font-bold text-black placeholder-[#ccc] w-full focus:border-black transition-colors uppercase py-2"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Currency Selection */}
                    <div className="border border-[#a3a3a3] bg-white p-8">
                        <label className="block text-xs font-mono font-bold text-black uppercase mb-4">Currency</label>
                        <div className="flex flex-wrap gap-2">
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
                                    className={`px-4 py-2 border-2 text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 ${formData.currency === curr.symbol
                                        ? 'bg-black border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]'
                                        : 'bg-white border-[#e5e5e5] text-[#999] hover:border-black hover:text-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]'
                                        }`}
                                >
                                    {curr.symbol}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price & Interval Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price */}
                        <div className="border border-[#a3a3a3] bg-white p-8">
                            <label className="block text-xs font-mono font-bold text-black uppercase mb-2">Price ({formData.currency})</label>
                            <div className="flex items-center gap-3">
                                <div className="p-2 border border-black bg-white text-black">
                                    <DollarSign className="w-5 h-5" />
                                </div>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="bg-transparent border-b-2 border-[#a3a3a3] outline-none text-2xl font-bold text-black placeholder-[#ccc] w-full focus:border-black transition-colors py-2"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Interval */}
                        <div className="border border-[#a3a3a3] bg-white p-8">
                            <label className="block text-xs font-mono font-bold text-black uppercase mb-4">Billing Interval</label>
                            <div className="flex flex-wrap gap-2">
                                {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((int) => (
                                    <button
                                        key={int}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, interval: int.toLowerCase() })}
                                        className={`px-3 py-1.5 border-2 text-xs font-mono font-bold uppercase transition-all transform hover:-translate-y-1 ${formData.interval === int.toLowerCase()
                                            ? 'bg-black border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]'
                                            : 'bg-white border-[#e5e5e5] text-[#999] hover:border-black hover:text-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]'
                                            }`}
                                    >
                                        {int}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="border border-[#a3a3a3] bg-white p-8">
                        <label className="block text-xs font-mono font-bold text-black uppercase mb-2">Description</label>
                        <textarea
                            placeholder="WHAT DOES THIS PLAN INCLUDE?"
                            rows={4}
                            className="bg-[#f9f9f9] border border-[#a3a3a3] p-4 outline-none text-sm text-black placeholder-[#999] w-full resize-none focus:border-black focus:bg-white transition-colors"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>

                {/* Right Column: Settings & Preview */}
                <div className="space-y-6">
                    {/* Visibility Settings */}
                    <div className="border border-[#a3a3a3] bg-white p-6">
                        <h3 className="text-black font-bold uppercase tracking-tight mb-4 flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Visibility
                        </h3>

                        <div className="flex items-center justify-between p-4 border border-[#a3a3a3] bg-[#f9f9f9]">
                            <div className="flex items-center gap-3">
                                {formData.isPublic ? <Globe className="w-5 h-5 text-black" /> : <Lock className="w-5 h-5 text-[#666]" />}
                                <div>
                                    <p className="text-sm font-bold text-black uppercase">{formData.isPublic ? 'Public Plan' : 'Private Plan'}</p>
                                    <p className="text-[10px] font-mono text-[#666] uppercase">{formData.isPublic ? 'Visible to everyone' : 'Invitation only'}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
                                className={`w-12 h-6 border-2 border-black relative transition-colors duration-200 ${formData.isPublic ? 'bg-black' : 'bg-white'
                                    }`}
                            >
                                <div className={`w-4 h-4 border-2 border-black absolute top-0.5 transition-transform duration-200 ${formData.isPublic ? 'bg-white left-[calc(100%-1.25rem)]' : 'bg-white left-0.5'
                                    }`} />
                            </button>
                        </div>
                    </div>

                    {/* Summary / Create Action */}
                    <div className="p-6 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h3 className="text-black font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-sm border-b-2 border-black pb-2">
                            <Layers className="w-4 h-4" />
                            Summary
                        </h3>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-xs font-mono font-bold uppercase py-2 border-b border-[#EAEAEA]">
                                <span className="text-[#666]">Plan Type</span>
                                <span className="text-black">{formData.interval}</span>
                            </div>
                            <div className="flex justify-between text-xs font-mono font-bold uppercase py-2 border-b border-[#EAEAEA]">
                                <span className="text-[#666]">Price</span>
                                <span className="text-black text-lg tracking-tight">{formData.price ? `${formData.price}` : '-'} <span className="text-xs text-[#999]">{formData.currency}</span></span>
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            className="w-full py-4 bg-black text-white font-mono font-bold text-sm uppercase hover:bg-[#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 flex items-center justify-center gap-2 border-2 border-transparent hover:border-black hover:bg-white hover:text-black"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Plan
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                        <p className="text-center text-[10px] font-mono text-[#999] uppercase mt-3">Creates on-chain PDA account</p>
                    </div>
                </div>
            </motion.form >
        </div >
    );
}
