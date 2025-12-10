'use client';

import LandingHeader from '@/components/LandingHeader';
import { Terminal, Box, ArrowRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function SDKsPage() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('npm install @w3-infra/solana-billing-sdk');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-12 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Intro */}
                    <div className="lg:col-span-5 space-y-8">
                        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9]">
                            Native<br />
                            Solana<br />
                            SDKs
                        </h1>
                        <div className="h-1 w-24 bg-black"></div>
                        <p className="text-lg leading-relaxed font-mono">
                            Integrate recurring revenue streams directly into your dApp. Our Typescript and Rust SDKs handle PDA derivation, subscription lifecycle, and on-chain verification automatically.
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="p-4 border border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <span className="text-xs font-bold uppercase text-[#666] mb-2 block">Quick Install</span>
                                <div className="flex items-center justify-between font-mono text-sm bg-[#EAEAEA] p-3 border border-[#ccc]">
                                    <code>npm i @w3-infra/sdk</code>
                                    <button onClick={handleCopy} className="hover:text-black text-[#666]">
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Code Window */}
                    <div className="lg:col-span-7">
                        <div className="border border-black bg-[#1a1a1a] text-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                            {/* Window Actions */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500 border border-red-700"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-700"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500 border border-green-700"></div>
                            </div>

                            <h3 className="font-mono text-xs uppercase text-[#666] mb-4 flex items-center gap-2">
                                <Terminal size={14} /> example_usage.ts
                            </h3>

                            <pre className="font-mono text-sm overflow-x-auto">
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

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="p-6 border border-black bg-white hover:translate-x-1 hover:-translate-y-1 transition-transform cursor-pointer">
                                <div className="bg-black text-white w-8 h-8 flex items-center justify-center mb-4">
                                    <span className="font-bold text-xs">TS</span>
                                </div>
                                <h4 className="font-bold uppercase mb-2">TypeScript SDK</h4>
                                <p className="text-xs text-[#666] font-mono mb-4">Full type safety for React & Node.js apps.</p>
                                <span className="text-xs font-bold underline">Read Docs ↗</span>
                            </div>
                            <div className="p-6 border border-black bg-white hover:translate-x-1 hover:-translate-y-1 transition-transform cursor-pointer">
                                <div className="bg-black text-white w-8 h-8 flex items-center justify-center mb-4">
                                    <span className="font-bold text-xs">RS</span>
                                </div>
                                <h4 className="font-bold uppercase mb-2">Rust Crate</h4>
                                <p className="text-xs text-[#666] font-mono mb-4">For CPI calls and on-chain integrations.</p>
                                <span className="text-xs font-bold underline">View Crate ↗</span>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
