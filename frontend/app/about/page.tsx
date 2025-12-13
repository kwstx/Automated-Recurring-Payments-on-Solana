'use client';

import LandingHeader from '@/components/LandingHeader';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-24">
                <div className="max-w-4xl mx-auto">
                    <span className="text-xs font-mono font-bold tracking-wider mb-6 block text-[#666]">COMPANY</span>
                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-12">
                        RETHINKING<br />REVENUE
                    </h1>

                    <div className="prose max-w-none font-mono text-sm leading-8 text-[#333]">
                        <p className="mb-8 text-xl md:text-2xl font-bold font-sans uppercase text-black leading-tight">
                            ZyoPay is building the standard for on-chain recurring payments. We believe subscriptions should be transparent, user-controlled, and seamlessly integrated with the web3 ecosystem.
                        </p>
                        <p className="mb-6">
                            Traditional payment processors are opaque, expensive, and restrictive. We're leveraging Solana's high speed and low costs to create a protocol where merchants and subscribers continually interact in real-time, without intermediaries holding their funds.
                        </p>
                        <p>
                            Founded in 2025, we are a team of engineers and designers obsessed with minimalism, efficiency, and brutalist aesthetics. We build tools that get out of the way and let you focus on your product.
                        </p>
                    </div>

                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-black pt-12">
                        <div>
                            <span className="block text-4xl font-bold mb-2">Live</span>
                            <span className="text-xs font-mono text-[#666] uppercase">Mainnet Status</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-bold mb-2">Pilot</span>
                            <span className="text-xs font-mono text-[#666] uppercase">Program Access</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-bold mb-2">99.9%</span>
                            <span className="text-xs font-mono text-[#666] uppercase">Uptime Target</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-bold mb-2">0%</span>
                            <span className="text-xs font-mono text-[#666] uppercase">Platform Fees</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
