'use client';

import LandingHeader from '@/components/LandingHeader';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function ExamplesPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-24">
                <div className="max-w-6xl mx-auto">
                    <span className="text-xs font-mono font-bold tracking-wider mb-6 block text-[#666]">BUILD</span>
                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-12">
                        Project<br />Examples
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Example 1 */}
                        <div className="bg-white border border-black p-8 flex flex-col h-full hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                            <div className="mb-6 h-48 bg-[#EAEAEA] border border-[#ccc] flex items-center justify-center font-mono text-sm text-[#666]">
                                [PREVIEW IMAGE]
                            </div>
                            <h3 className="text-2xl font-bold uppercase mb-2">SaaS Dashboard</h3>
                            <p className="text-sm font-mono text-[#666] mb-6 flex-1">
                                A complete Next.js dashboard implementation for a SaaS product with tiered pricing.
                            </p>
                            <Link href="#" className="flex items-center gap-2 font-bold uppercase text-sm hover:gap-3 transition-all">
                                View Code <ArrowUpRight size={16} />
                            </Link>
                        </div>

                        {/* Example 2 */}
                        <div className="bg-white border border-black p-8 flex flex-col h-full hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                            <div className="mb-6 h-48 bg-[#EAEAEA] border border-[#ccc] flex items-center justify-center font-mono text-sm text-[#666]">
                                [PREVIEW IMAGE]
                            </div>
                            <h3 className="text-2xl font-bold uppercase mb-2">Token Gated Content</h3>
                            <p className="text-sm font-mono text-[#666] mb-6 flex-1">
                                Restrict access to blog posts or videos based on active on-chain subscription status.
                            </p>
                            <Link href="#" className="flex items-center gap-2 font-bold uppercase text-sm hover:gap-3 transition-all">
                                View Code <ArrowUpRight size={16} />
                            </Link>
                        </div>

                        {/* Example 3 */}
                        <div className="bg-white border border-black p-8 flex flex-col h-full hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                            <div className="mb-6 h-48 bg-[#EAEAEA] border border-[#ccc] flex items-center justify-center font-mono text-sm text-[#666]">
                                [PREVIEW IMAGE]
                            </div>
                            <h3 className="text-2xl font-bold uppercase mb-2">Discord Bot</h3>
                            <p className="text-sm font-mono text-[#666] mb-6 flex-1">
                                Rust-based Discord bot that manages roles based on user subscription payments.
                            </p>
                            <Link href="#" className="flex items-center gap-2 font-bold uppercase text-sm hover:gap-3 transition-all">
                                View Code <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
