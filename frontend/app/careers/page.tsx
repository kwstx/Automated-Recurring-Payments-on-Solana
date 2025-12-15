'use client';

import LandingHeader from '@/components/LandingHeader';
import { ArrowRight } from 'lucide-react';

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-24">
                <div className="max-w-5xl mx-auto">
                    <span className="text-xs font-mono font-bold mb-6 block text-[#666]">CAREERS</span>
                    <h1 className="text-4xl md:text-6xl font-bold leading-[0.9] mb-12">
                        JOIN THE<br />PROTOCOL
                    </h1>

                    <p className="text-lg font-mono text-[#333] mb-20 max-w-2xl">
                        We are looking for obsesive builders who want to shape the future of internet commerce. Remote-first, async, high-autonomy.
                    </p>

                    <div className="border border-black bg-white p-12 md:p-24 text-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">No Open Positions</h3>
                        <p className="font-mono text-[#666] max-w-md mx-auto">
                            We are currently not hiring for any roles. Please check back later for updates.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
