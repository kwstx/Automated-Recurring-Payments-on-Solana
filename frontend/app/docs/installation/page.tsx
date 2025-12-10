'use client';

import LandingHeader from '@/components/LandingHeader';
import DocsSidebar from '@/components/DocsSidebar';

export default function InstallationPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <DocsSidebar />

                    <div className="lg:col-span-3">
                        <div className="mb-12">
                            <span className="text-xs font-mono font-bold tracking-wider mb-4 block text-[#666]">GETTING STARTED</span>
                            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6">Installation</h1>
                            <p className="text-lg leading-relaxed font-mono text-[#333]">
                                Everything you need to start building.
                            </p>
                        </div>

                        <div className="prose max-w-none font-mono text-sm leading-7">
                            <h3 className="text-xl font-bold uppercase mb-4 font-sans">Prerequisites</h3>
                            <ul className="list-disc pl-4 space-y-2 mb-8">
                                <li>Node.js 18+ installed on your machine.</li>
                                <li>Rust and Cargo (for CLI and Rust SDK usage).</li>
                                <li>A Solana wallet (Phantom, Solflare, or CLI wallet).</li>
                            </ul>

                            <h3 className="text-xl font-bold uppercase mb-4 font-sans">Frontend SDK</h3>
                            <p className="mb-4">
                                Install the TypeScript SDK in your Next.js or React project.
                            </p>
                            <div className="bg-[#1a1a1a] text-white p-4 mb-8 border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <code>npm install @w3-infra/solana-billing-sdk @solana/web3.js</code>
                            </div>

                            <h3 className="text-xl font-bold uppercase mb-4 font-sans">Backend / Bot SDK</h3>
                            <p className="mb-4">
                                Use the Rust crate for high-performance bots or CPI integrations.
                            </p>
                            <div className="bg-[#1a1a1a] text-white p-4 mb-8 border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <code>cargo add w3-billing-client</code>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
