'use client';

import LandingHeader from '@/components/LandingHeader';
import { ArrowRight } from 'lucide-react';

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-24">
                <div className="max-w-5xl mx-auto">
                    <span className="text-xs font-mono font-bold tracking-wider mb-6 block text-[#666]">CAREERS</span>
                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-12">
                        JOIN THE<br />PROTOCOL
                    </h1>

                    <p className="text-lg font-mono text-[#333] mb-20 max-w-2xl">
                        We are looking for obsesive builders who want to shape the future of internet commerce. Remote-first, async, high-autonomy.
                    </p>

                    <div className="space-y-4">
                        {[
                            { role: 'Senior Rust Engineer', team: 'Protocol', location: 'Remote (Global)' },
                            { role: 'Frontend Engineer', team: 'Product', location: 'Remote (US/EU)' },
                            { role: 'Developer Relations', team: 'Growth', location: 'Remote (Global)' },
                        ].map((job) => (
                            <div key={job.role} className="group bg-white border border-black p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
                                <div>
                                    <h3 className="text-2xl font-bold uppercase mb-2 group-hover:underline decoration-2">{job.role}</h3>
                                    <div className="flex gap-4 text-xs font-mono text-[#666] uppercase">
                                        <span>{job.team}</span>
                                        <span>•</span>
                                        <span>{job.location}</span>
                                    </div>
                                </div>
                                <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
