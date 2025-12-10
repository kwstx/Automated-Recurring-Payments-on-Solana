'use client';

import LandingHeader from '@/components/LandingHeader';
import { Terminal, Copy, Check, ArrowLeft, Box } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function RustSDKPage() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('cargo add w3-billing-client');
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
                            Rust<br />Crate
                        </h1>
                        <div className="h-1 w-24 bg-black mb-12"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-bold uppercase mb-6">Installation</h3>
                                <div className="p-4 border border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-12">
                                    <div className="flex items-center justify-between font-mono text-sm bg-[#EAEAEA] p-3 border border-[#ccc]">
                                        <code>cargo add w3-billing-client</code>
                                        <button onClick={handleCopy} className="hover:text-black text-[#666]">
                                            {copied ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold uppercase mb-6">Overview</h3>
                                <p className="font-mono text-sm text-[#666] mb-6 leading-relaxed">
                                    The Rust crate is designed for On-Chain Program (CPI) integrations and high-performance off-chain bots.
                                    It includes strict type definitions for all instruction arguments and account structures.
                                </p>
                            </div>

                            <div className="border border-black bg-[#1a1a1a] text-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                <h3 className="font-mono text-xs uppercase text-[#666] mb-4 flex items-center gap-2">
                                    <Box size={14} /> lib.rs
                                </h3>
                                <pre className="font-mono text-sm overflow-x-auto">
                                    <code className="text-[#a3a3a3]">
                                        <span className="text-purple-400">use</span> w3_billing_client::instructions::CreatePlan;<br />
                                        <span className="text-purple-400">use</span> anchor_lang::prelude::*;<br /><br />

                                        <span className="text-[#666]">// CPI Call Example</span><br />
                                        <span className="text-purple-400">pub fn</span> <span className="text-blue-400">create_plan_cpi</span>(ctx: Context&lt;CreatePlanCPI&gt;) -&gt; Result&lt;()&gt; {'{'}<br />
                                        {'    '}w3_billing_client::cpi::create_plan(<br />
                                        {'        '}ctx.accounts.into_create_plan_context(),<br />
                                        {'        '}<span className="text-green-400">"Basic Plan"</span>.to_string(),<br />
                                        {'        '}<span className="text-orange-400">10_000_000</span>,<br />
                                        {'        '}<span className="text-green-400">"monthly"</span>.to_string(),<br />
                                        {'    '})?;<br />
                                        {'    '}Ok(())<br />
                                        {'}'}
                                    </code>
                                </pre>
                            </div>
                        </div>

                        <div className="mt-24">
                            <h3 className="text-2xl font-bold uppercase mb-8">Modules</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 border border-[#ccc] bg-white hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group">
                                    <h4 className="font-mono font-bold text-lg mb-2 group-hover:underline">w3_billing_client::instructions</h4>
                                    <p className="text-sm text-[#666]">Builders for all program instructions (CreatePlan, Subscribe, etc).</p>
                                </div>
                                <div className="p-6 border border-[#ccc] bg-white hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group">
                                    <h4 className="font-mono font-bold text-lg mb-2 group-hover:underline">w3_billing_client::accounts</h4>
                                    <p className="text-sm text-[#666]">Deserializable structs for Plan and Subscription accounts.</p>
                                </div>
                                <div className="p-6 border border-[#ccc] bg-white hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group">
                                    <h4 className="font-mono font-bold text-lg mb-2 group-hover:underline">w3_billing_client::cpi</h4>
                                    <p className="text-sm text-[#666]">Helper functions for Cross-Program Invocations.</p>
                                </div>
                                <div className="p-6 border border-[#ccc] bg-white hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group">
                                    <h4 className="font-mono font-bold text-lg mb-2 group-hover:underline">w3_billing_client::errors</h4>
                                    <p className="text-sm text-[#666]">Custom error types mapped from the Anchor program.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
