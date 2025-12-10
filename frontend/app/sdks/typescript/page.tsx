'use client';

import LandingHeader from '@/components/LandingHeader';
import { Terminal, Copy, Check, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function TypeScriptSDKPage() {
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
                <Link href="/sdks" className="inline-flex items-center gap-2 font-mono text-xs uppercase mb-8 hover:underline">
                    <ArrowLeft size={14} /> Back to SDKs
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Documentation */}
                    <div className="lg:col-span-12">
                        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9] mb-8">
                            TypeScript<br />SDK
                        </h1>
                        <div className="h-1 w-24 bg-black mb-12"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-bold uppercase mb-6">Installation</h3>
                                <div className="p-4 border border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-12">
                                    <div className="flex items-center justify-between font-mono text-sm bg-[#EAEAEA] p-3 border border-[#ccc]">
                                        <code>npm i @w3-infra/solana-billing-sdk</code>
                                        <button onClick={handleCopy} className="hover:text-black text-[#666]">
                                            {copied ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold uppercase mb-6">Quick Start</h3>
                                <p className="font-mono text-sm text-[#666] mb-6 leading-relaxed">
                                    The SDK provides a `SubscriptionClient` that wraps all interaction with the on-chain Anchor program.
                                    It handles PDA derivation, transaction building, and error parsing.
                                </p>
                            </div>

                            <div className="border border-black bg-[#1a1a1a] text-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                <h3 className="font-mono text-xs uppercase text-[#666] mb-4 flex items-center gap-2">
                                    <Terminal size={14} /> client_setup.ts
                                </h3>
                                <pre className="font-mono text-sm overflow-x-auto">
                                    <code className="text-[#a3a3a3]">
                                        <span className="text-purple-400">import</span> {'{'} SubscriptionClient {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'@w3-infra/solana-billing-sdk'</span>;<br /><br />

                                        <span className="text-[#666]">// 1. Initialize with connection & wallet</span><br />
                                        <span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> SubscriptionClient(connection, wallet);<br /><br />

                                        <span className="text-[#666]">// 2. Create a Plan</span><br />
                                        <span className="text-purple-400">const</span> {'{'} tx {'}'} = <span className="text-purple-400">await</span> client.createPlan({'{'}<br />
                                        {'  '}name: <span className="text-green-400">"Pro Plan"</span>,<br />
                                        {'  '}amount: <span className="text-orange-400">50_000_000</span>,<br />
                                        {'  '}interval: <span className="text-green-400">"monthly"</span><br />
                                        {'}'});<br /><br />

                                        <span className="text-[#666]">// 3. Confirm Transaction</span><br />
                                        <span className="text-purple-400">await</span> connection.confirmTransaction(tx);
                                    </code>
                                </pre>
                            </div>
                        </div>

                        <div className="mt-24">
                            <h3 className="text-2xl font-bold uppercase mb-8">API Reference</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { title: 'createPlan', desc: 'Initialize a new recurring payment plan.' },
                                    { title: 'subscribe', desc: 'Create a subscription PDA for a user.' },
                                    { title: 'cancelSubscription', desc: 'Close the subscription account.' },
                                    { title: 'collectPayment', desc: 'Trigger a scheduled payment.' },
                                    { title: 'updatePlan', desc: 'Modify an existing plan definition.' },
                                    { title: 'getSubscription', desc: 'Fetch on-chain subscription state.' }
                                ].map((item) => (
                                    <div key={item.title} className="p-6 border border-[#ccc] bg-white hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group">
                                        <h4 className="font-mono font-bold text-lg mb-2 group-hover:underline">{item.title}</h4>
                                        <p className="text-sm text-[#666]">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
