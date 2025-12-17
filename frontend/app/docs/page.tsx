'use client';

import { motion } from 'framer-motion';
import { Book, Code, Terminal, ArrowRight, Zap, Globe, Lock, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import LandingHeader from '@/components/LandingHeader';

export default function DocsPage() {
    const [copied, setCopied] = useState('');

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(''), 2000);
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-black font-sans selection:bg-black selection:text-white">
            <LandingHeader />

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Sidebar Navigation */}
                <div className="hidden lg:block space-y-8 sticky top-32 h-fit">
                    <div>
                        <a href="#introduction" className="block hover:opacity-70 transition-opacity">
                            <h4 className="font-bold text-sm tracking-wider text-black mb-4">GETTING STARTED</h4>
                        </a>
                        <ul className="space-y-3 text-sm font-medium text-[#666]">
                            <li><Link href="#introduction" className="hover:text-black transition-colors block">Introduction</Link></li>
                            <li><Link href="#quick-start" className="hover:text-black transition-colors block">Quick Start</Link></li>
                            <li><Link href="#authentication" className="hover:text-black transition-colors block">Authentication</Link></li>
                        </ul>
                    </div>
                    <div>
                        <a href="#plans-api" className="block hover:opacity-70 transition-opacity">
                            <h4 className="font-bold text-sm tracking-wider text-black mb-4">RESOURCES</h4>
                        </a>
                        <ul className="space-y-3 text-sm font-medium text-[#666]">
                            <li><Link href="#plans-api" className="hover:text-black transition-colors block">Plans API</Link></li>
                            <li><Link href="#webhooks" className="hover:text-black transition-colors block">Webhooks</Link></li>
                            <li><Link href="#sdk" className="hover:text-black transition-colors block">React SDK</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-16">
                    {/* Hero Section */}
                    <div id="introduction">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-xs font-bold text-black border border-black/10">
                                <Terminal className="w-3 h-3" />
                                Developer API v1.0
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-black">
                                Build <span className="text-[#999]">recurring revenue</span> on Solana.
                            </h1>
                            <p className="text-xl text-[#666] leading-relaxed max-w-2xl">
                                ZyoPay provides a powerful API and smart contract infrastructure to handle subscriptions, invoicing, and recurring payments in USDC.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/dashboard/settings">
                                    <button className="px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-[#1a1a1a] transition-all flex items-center gap-2">
                                        <Key className="w-4 h-4" />
                                        Get API Keys
                                    </button>
                                </Link>
                                <button className="px-6 py-3 bg-white border border-[#EAEAEA] text-black font-bold rounded-xl hover:bg-[#F8F9FA] transition-all flex items-center gap-2">
                                    <Globe className="w-4 h-4" />
                                    View on GitHub
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Quick Start */}
                    <section id="quick-start" className="space-y-6">
                        <h2 className="text-2xl font-bold text-black flex items-center gap-3">
                            <Zap className="w-6 h-6" />
                            Quick Start
                        </h2>
                        <p className="text-[#666] leading-relaxed">
                            Install the ZyoPay React SDK to easily integrate subscription buttons and management portals into your application.
                        </p>

                        <div className="bg-[#111] rounded-2xl p-6 shadow-2xl relative group">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold text-[#444] uppercase tracking-wider">Terminal</span>
                                <button
                                    onClick={() => copyToClipboard('npm install @zyopay/react @solana/web3.js')}
                                    className="text-[#666] hover:text-white transition-colors"
                                >
                                    {copied.includes('npm') ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <code className="font-mono text-sm text-white">
                                <span className="text-green-400">$</span> npm install @zyopay/react @solana/web3.js
                            </code>
                        </div>
                    </section>

                    {/* Authentication */}
                    <section id="authentication" className="space-y-6">
                        <h2 className="text-2xl font-bold text-black flex items-center gap-3">
                            <Lock className="w-6 h-6" />
                            Authentication
                        </h2>
                        <p className="text-[#666] leading-relaxed">
                            Authenticate your API requests by including your secret key in the <code className="bg-[#F5F5F5] px-1.5 py-0.5 rounded text-black font-bold text-xs">Authorization</code> header.
                        </p>

                        <div className="bg-[#F8F9FA] border border-[#EAEAEA] rounded-2xl p-6 overflow-hidden">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-[#666] uppercase tracking-wider">Example Request</span>
                                <button
                                    onClick={() => copyToClipboard('curl -H "Authorization: Bearer sk_test_..."')}
                                    className="text-[#999] hover:text-black transition-colors"
                                >
                                    {copied.includes('curl') ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <pre className="font-mono text-sm text-black overflow-x-auto whitespace-pre-wrap">
                                {`curl https://api.zyopay.com/v1/plans \\
  -H "Authorization: Bearer sk_test_51Mz..." \\
  -H "Content-Type: application/json"`}
                            </pre>
                        </div>
                    </section>

                    {/* Plans API */}
                    <section id="plans-api" className="space-y-6">
                        <h2 className="text-2xl font-bold text-black flex items-center gap-3">
                            <Book className="w-6 h-6" />
                            Plans API
                        </h2>
                        <p className="text-[#666] leading-relaxed">
                            Create and manage subscription plans programmatically. Define billing intervals, pricing, and trial periods directly on-chain.
                        </p>
                        <div className="bg-[#F8F9FA] border border-[#EAEAEA] rounded-2xl p-6 overflow-hidden">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-[#666] uppercase tracking-wider">Create Plan</span>
                            </div>
                            <pre className="font-mono text-sm text-black overflow-x-auto whitespace-pre-wrap">
                                {`POST /v1/plans
{
  "name": "Pro Plan",
  "amount": 2900,
  "currency": "USDC",
  "interval": "month"
}`}
                            </pre>
                        </div>
                    </section>

                    {/* Webhooks */}
                    <section id="webhooks" className="space-y-6">
                        <h2 className="text-2xl font-bold text-black flex items-center gap-3">
                            <Zap className="w-6 h-6" />
                            Webhooks
                        </h2>
                        <p className="text-[#666] leading-relaxed">
                            Receive real-time notifications for subscription events. Listen for payment success, cancellations, and renewals to update your database.
                        </p>
                        <div className="bg-[#F8F9FA] border border-[#EAEAEA] rounded-2xl p-6 overflow-hidden">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-[#666] uppercase tracking-wider">Event Types</span>
                            </div>
                            <ul className="list-disc list-inside text-sm text-black font-mono space-y-1">
                                <li>subscription.created</li>
                                <li>payment.succeeded</li>
                                <li>invoice.paid</li>
                            </ul>
                        </div>
                    </section>

                    {/* React SDK */}
                    <section id="sdk" className="space-y-6">
                        <h2 className="text-2xl font-bold text-black flex items-center gap-3">
                            <Code className="w-6 h-6" />
                            React SDK
                        </h2>
                        <p className="text-[#666] leading-relaxed">
                            Our React SDK provides pre-built components for checkout flows and customer portals. Drop them into your Next.js or React app.
                        </p>
                        <div className="bg-[#111] rounded-2xl p-6 shadow-2xl relative group">
                            <code className="font-mono text-sm text-white">
                                <span className="text-pink-400">import</span> {'{ SubscribeButton }'} <span className="text-pink-400">from</span> <span className="text-yellow-300">'@zyopay/react'</span>;
                                <br /><br />
                                <span className="text-blue-400">{'<SubscribeButton'}</span>
                                <br />
                                &nbsp;&nbsp;<span className="text-green-400">planId</span>=<span className="text-yellow-300">"plan_123"</span>
                                <br />
                                &nbsp;&nbsp;<span className="text-green-400">onSuccess</span>={'{() => console.log("Subscribed!")}'}
                                <br />
                                <span className="text-blue-400">{'/>'}</span>
                            </code>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function Key({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>
    )
}
