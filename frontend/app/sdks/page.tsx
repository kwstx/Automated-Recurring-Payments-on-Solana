'use client';

import { Terminal, Copy, Check, ArrowRight, Code, Box } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import LandingHeader from '@/components/LandingHeader';

export default function SDKsPage() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('npm install @w3-infra/sdk');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans relative overflow-x-hidden">
            <LandingHeader transparent={false} />

            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-12 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Intro & Quick Install */}
                    <div className="lg:col-span-5 flex flex-col gap-12">
                        {/* Title & Description */}
                        <div className="space-y-8">
                            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                                Native<br />
                                Solana<br />
                                SDKs
                            </h1>
                            <div className="h-1.5 w-32 bg-black"></div>
                            <p className="text-xl leading-relaxed font-mono max-w-lg">
                                Integrate recurring revenue streams directly into your dApp. Our Typescript and Rust SDKs handle PDA derivation, subscription lifecycle, and on-chain verification automatically.
                            </p>
                        </div>

                        {/* Quick Install Card */}
                        <div className="p-6 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl">
                            <span className="text-xs font-bold text-[#666] mb-4 block uppercase tracking-wider">Quick Install</span>
                            <div className="flex items-center justify-between font-mono text-sm bg-[#F5F5F5] p-4 border border-[#e5e5e5] rounded-lg">
                                <code>npm i @w3-infra/sdk</code>
                                <button onClick={handleCopy} className="hover:text-black text-[#666] transition-colors">
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Code Window & SDK Cards */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        {/* Code Window */}
                        <div className="border border-black bg-[#111] text-white p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative rounded-2xl h-fit">
                            {/* Window Actions */}
                            <div className="absolute top-6 right-6 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                            </div>

                            <h3 className="font-mono text-xs text-[#666] mb-8 flex items-center gap-2">
                                <Terminal size={14} /> example_usage.ts
                            </h3>

                            <pre className="font-mono text-sm overflow-x-auto leading-relaxed">
                                <code className="text-[#a3a3a3]">
                                    <span className="text-purple-400">import</span> {'{'} SubscriptionClient {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'@w3-infra/sdk'</span>;<br /><br />
                                    <span className="text-[#666]">// Initialize Client</span><br />
                                    <span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> SubscriptionClient(connection, wallet);<br /><br />
                                    <span className="text-[#666]">// Create a Subscription Plan</span><br />
                                    <span className="text-purple-400">const</span> {'{'} planPda {'}'} = <span className="text-purple-400">await</span> client.createPlan({'{'}<br />
                                    {'  '}name: <span className="text-green-400">"Premium Tier"</span>,<br />
                                    {'  '}amount: <span className="text-orange-400">25_000_000</span>, <span className="text-[#666]">// 25 USDC</span><br />
                                    {'  '}interval: <span className="text-green-400">"monthly"</span><br />
                                    {'}'});<br /><br />
                                    console.log(<span className="text-green-400">`Plan created at: ${'{'}planPda.toBase58(){'}'}`</span>);
                                </code>
                            </pre>
                        </div>

                        {/* SDK Cards Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* TypeScript SDK */}
                            <Link href="/sdks/typescript" className="block group h-full">
                                <div className="p-8 border border-[#E5E5E5] bg-white rounded-2xl shadow-sm hover:border-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all h-full flex flex-col">
                                    <div className="bg-black text-white w-10 h-10 flex items-center justify-center mb-6 rounded-lg">
                                        <span className="font-bold text-xs">TS</span>
                                    </div>
                                    <h4 className="font-bold text-xl mb-3">TypeScript SDK</h4>
                                    <p className="text-sm text-[#666] font-medium leading-relaxed mb-6 flex-1">
                                        Full type safety for React & Node.js apps.
                                    </p>
                                    <span className="text-sm font-bold underline flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                                        Read Docs <ArrowRight size={16} className="text-black" />
                                    </span>
                                </div>
                            </Link>

                            {/* Rust Crate */}
                            <Link href="/sdks/rust" className="block group h-full">
                                <div className="p-8 border border-[#E5E5E5] bg-white rounded-2xl shadow-sm hover:border-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all h-full flex flex-col">
                                    <div className="bg-black text-white w-10 h-10 flex items-center justify-center mb-6 rounded-lg">
                                        <span className="font-bold text-xs">RS</span>
                                    </div>
                                    <h4 className="font-bold text-xl mb-3">Rust Crate</h4>
                                    <p className="text-sm text-[#666] font-medium leading-relaxed mb-6 flex-1">
                                        For CPI calls and on-chain integrations.
                                    </p>
                                    <span className="text-sm font-bold underline flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                                        View Crate <ArrowRight size={16} className="text-black" />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
