'use client';

import LandingHeader from '@/components/LandingHeader';
import { Search, ChevronRight, FileText, Code, Settings } from 'lucide-react';

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* Sidebar */}
                    <aside className="hidden lg:block space-y-8 sticky top-32 h-fit">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                            <input
                                type="text"
                                placeholder="Search docs..."
                                className="w-full pl-10 pr-4 py-2 bg-white border border-[#ccc] font-mono text-sm focus:border-black outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-1">
                            <h4 className="font-bold uppercase text-xs tracking-wider mb-4 text-[#666]">Getting Started</h4>
                            <a href="#" className="block py-1 font-bold text-black border-l-2 border-black pl-3">Introduction</a>
                            <a href="#" className="block py-1 text-[#666] hover:text-black hover:border-l-2 hover:border-[#ccc] pl-3 transition-all">Quick Start</a>
                            <a href="#" className="block py-1 text-[#666] hover:text-black hover:border-l-2 hover:border-[#ccc] pl-3 transition-all">Installation</a>
                        </div>

                        <div className="space-y-1">
                            <h4 className="font-bold uppercase text-xs tracking-wider mb-4 mt-8 text-[#666]">Core Concepts</h4>
                            <a href="#" className="block py-1 text-[#666] hover:text-black hover:border-l-2 hover:border-[#ccc] pl-3 transition-all">Plans</a>
                            <a href="#" className="block py-1 text-[#666] hover:text-black hover:border-l-2 hover:border-[#ccc] pl-3 transition-all">Subscriptions</a>
                            <a href="#" className="block py-1 text-[#666] hover:text-black hover:border-l-2 hover:border-[#ccc] pl-3 transition-all">Invoices</a>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6">Introduction</h1>
                            <p className="text-lg leading-relaxed font-mono text-[#333]">
                                W3 Infra provides the primitives for building recurring revenue businesses on Solana.
                                Our protocol handles the complexities of on-chain scheduling, token gating, and automated settlement.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                            <div className="p-6 border border-[#a3a3a3] bg-white hover:border-black transition-colors group cursor-pointer">
                                <FileText className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold uppercase mb-2 flex items-center gap-2">
                                    Quick Start <ChevronRight size={16} />
                                </h3>
                                <p className="text-sm font-mono text-[#666]">
                                    Deploy your first subscription plan in under 5 minutes using our CLI.
                                </p>
                            </div>
                            <div className="p-6 border border-[#a3a3a3] bg-white hover:border-black transition-colors group cursor-pointer">
                                <Code className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold uppercase mb-2 flex items-center gap-2">
                                    SDK Reference <ChevronRight size={16} />
                                </h3>
                                <p className="text-sm font-mono text-[#666]">
                                    Detailed documentation for our TypeScript and Rust client libraries.
                                </p>
                            </div>
                        </div>

                        <div className="prose max-w-none font-mono text-sm leading-7">
                            <h2 className="text-2xl font-bold uppercase tracking-tight mb-4 font-sans">Architecture</h2>
                            <p className="mb-4">
                                The protocol consists of three main components:
                            </p>
                            <ul className="list-disc pl-4 space-y-2 mb-8">
                                <li><strong>The Anchor Program:</strong> Manages state (Plans, Subscriptions) and validates transactions.</li>
                                <li><strong>The Keeper Network:</strong> Decentralized bots that trigger scheduled payments.</li>
                                <li><strong>The Indexer:</strong> A high-performance API for querying on-chain data.</li>
                            </ul>

                            <div className="bg-[#1a1a1a] text-white p-4 border-l-4 border-yellow-500 my-8">
                                <p className="font-bold uppercase text-xs text-yellow-500 mb-1">Important</p>
                                <p>All program interaction requires a funded Solana wallet connected to Devnet (for testing).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
