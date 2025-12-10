'use client';

import LandingHeader from '@/components/LandingHeader';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

// Mock Data for User Subscriptions
const initialSubscriptions = [
    {
        id: 1,
        merchant: 'Netflix',
        plan: 'Premium 4K',
        price: '22.99',
        interval: 'monthly',
        nextCharge: 'Dec 15, 2025',
        status: 'active'
    },
    {
        id: 2,
        merchant: 'Spotify',
        plan: 'Duo Premium',
        price: '14.99',
        interval: 'monthly',
        nextCharge: 'Dec 03, 2025',
        status: 'active'
    },
    {
        id: 3,
        merchant: 'Midjourney',
        plan: 'Standard Plan',
        price: '30.00',
        interval: 'monthly',
        nextCharge: '-',
        status: 'paused'
    },
];

export default function PortalPage() {
    return (
        <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
            <LandingHeader />

            <div className="relative pt-12 pb-24 px-4 md:px-6 max-w-[1600px] mx-auto">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pointer-events-none z-0 px-4 md:px-6">
                    <div className="hidden md:block md:col-span-4 lg:col-span-3 border-r border-[#EAEAEA] h-full"></div>
                    <div className="hidden md:block md:col-span-8 lg:col-span-9 relative h-full">
                        {/* Second Vertical Line */}
                        <div className="absolute left-[6.25rem] md:left-[8.5rem] lg:left-[11rem] top-0 bottom-0 w-px bg-[#EAEAEA]"></div>
                    </div>
                </div>

                <main className="relative z-10 flex flex-col items-center">

                    {/* Header Section: Centered */}
                    <div className="text-center mb-16 max-w-3xl">
                        <span className="text-xs font-mono font-bold tracking-wider mb-4 block text-[#666]">[06] SUBSCRIBER PORTAL</span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.9] mb-8">
                            MY ACTIVE SUBS
                        </h1>
                        <p className="text-sm font-mono text-[#666] mb-8 max-w-xs mx-auto leading-relaxed">
                            Manage payments, view history, and cancel subscriptions directly on-chain.
                        </p>

                        <div className="flex justify-center gap-6 items-center">
                            <div className="bg-white border border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left min-w-[200px]">
                                <span className="text-[10px] font-bold uppercase text-[#666] block mb-1">Total Monthly Spend</span>
                                <span className="text-2xl font-bold font-mono">$67.98</span>
                            </div>
                            <button className="bg-black text-white px-6 py-4 font-bold uppercase hover:bg-[#333] transition-colors flex items-center gap-2 h-[82px]">
                                <Wallet size={18} /> Connect Wallet
                            </button>
                        </div>
                    </div>

                    {/* Content Grid: 3 Columns Next to Each Other */}
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {initialSubscriptions.map((sub, index) => (
                                <div
                                    key={sub.id}
                                    className="bg-white border border-black relative group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
                                >
                                    {/* Status Bar */}
                                    <div className={`w-full h-1 ${sub.status === 'active' ? 'bg-black' : 'bg-[#ccc]'}`}></div>

                                    <div className="p-6 md:p-8">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className="text-2xl font-bold uppercase leading-none mb-2">{sub.merchant}</h3>
                                                <span className="font-mono text-xs text-black border border-black px-1 uppercase">{sub.plan}</span>
                                            </div>
                                            <div className={`px-2 py-0.5 text-[10px] font-bold uppercase border border-black ${sub.status === 'active' ? 'bg-[#EAEAEA] text-black' : 'bg-black text-white'}`}>
                                                {sub.status}
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-8 font-mono text-sm">
                                            <div className="flex justify-between items-center border-b border-[#EAEAEA] pb-2">
                                                <span className="text-[#666]">Amount</span>
                                                <span className="font-bold">${sub.price}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-[#EAEAEA] pb-2">
                                                <span className="text-[#666]">Next Charge</span>
                                                <span className="font-bold">{sub.nextCharge}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-[#EAEAEA] pb-2">
                                                <span className="text-[#666]">Interval</span>
                                                <span className="font-bold uppercase">{sub.interval}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            {sub.status === 'active' ? (
                                                <>
                                                    <button className="py-2.5 border border-black text-xs font-bold uppercase hover:bg-[#EAEAEA] transition-colors">
                                                        Pause
                                                    </button>
                                                    <button className="py-2.5 border border-black bg-black text-white text-xs font-bold uppercase hover:bg-[#333] transition-colors">
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <button className="col-span-2 py-2.5 border border-black bg-black text-white text-xs font-bold uppercase hover:bg-[#333] transition-colors">
                                                    Resume Subscription
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
