'use client';

import LandingHeader from '@/components/LandingHeader';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-24">
                <div className="max-w-6xl mx-auto">
                    <span className="text-xs font-mono font-bold tracking-wider mb-6 block text-[#666]">COMMUNITY</span>
                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-12">
                        Global<br />Network
                    </h1>

                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        <Link href="#" className="group bg-[#5865F2] text-white border border-black p-8 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                            <h3 className="text-3xl font-bold uppercase mb-4">Discord</h3>
                            <p className="font-mono text-sm opacity-80 mb-8">Join the growing community of developers building on ZyoPay.</p>
                            <span className="flex items-center gap-2 font-bold uppercase text-xs">Join Server <ArrowUpRight size={14} /></span>
                        </Link>

                        <Link href="#" className="group bg-[#1DA1F2] text-white border border-black p-8 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                            <h3 className="text-3xl font-bold uppercase mb-4">Twitter</h3>
                            <p className="font-mono text-sm opacity-80 mb-8">Follow for latest updates and ecosystem news.</p>
                            <span className="flex items-center gap-2 font-bold uppercase text-xs">Follow Us <ArrowUpRight size={14} /></span>
                        </Link>

                        <Link href="#" className="group bg-black text-white border border-black p-8 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all">
                            <h3 className="text-3xl font-bold uppercase mb-4">Github</h3>
                            <p className="font-mono text-sm opacity-80 mb-8">Contribute to our open-source repositories.</p>
                            <span className="flex items-center gap-2 font-bold uppercase text-xs">View Code <ArrowUpRight size={14} /></span>
                        </Link>
                    </div>

                    <div className="border-t border-black pt-20">
                        <h2 className="text-2xl font-bold uppercase mb-8">Upcoming Events</h2>
                        <div className="space-y-4">
                            {[
                                { event: 'Solana Breakpoint', date: 'Sep 2025', location: 'Singapore' },
                                { event: 'Hackathon: Build Station', date: 'Nov 2025', location: 'New York / Online' },
                            ].map((evt) => (
                                <div key={evt.event} className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#a3a3a3] pb-4">
                                    <h3 className="text-xl font-bold uppercase">{evt.event}</h3>
                                    <div className="flex gap-6 font-mono text-sm text-[#666] mt-2 md:mt-0">
                                        <span>{evt.date}</span>
                                        <span>{evt.location}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
