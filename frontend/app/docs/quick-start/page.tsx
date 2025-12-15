'use client';

import LandingHeader from '@/components/LandingHeader';
import DocsSidebar from '@/components/DocsSidebar';
import { Terminal } from 'lucide-react';
import Image from 'next/image';

export default function QuickStartPage() {
    return (
        <div className="min-h-screen text-black font-sans relative overflow-x-hidden">

            {/* Background Image Gradient */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="relative w-full h-full">
                    <Image
                        src="/resources-bg-v2.png"
                        alt="Background Gradient"
                        fill
                        className="object-cover opacity-100 object-top"
                        priority
                    />
                </div>
            </div>

            <LandingHeader transparent={true} />

            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <DocsSidebar />

                    <div className="lg:col-span-3">
                        <div className="mb-12">
                            <span className="text-xs font-mono font-bold mb-4 block text-[#666]">GETTING STARTED</span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Quick Start</h1>
                            <p className="text-lg leading-relaxed font-mono text-[#333]">
                                Deploy your first subscription plan and start accepting recurring payments in under 5 minutes.
                            </p>
                        </div>

                        <div className="prose max-w-none font-mono text-sm leading-7">
                            <h3 className="text-xl font-bold mb-4 font-sans">1. Install the CLI</h3>
                            <div className="bg-[#1a1a1a] text-white p-4 mb-8 border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl">
                                <code className="block mb-2 text-[#ccc]">// Install via Cargo</code>
                                <code>cargo install w3-infra-cli</code>
                            </div>

                            <h3 className="text-xl font-bold mb-4 font-sans">2. Configure Your Wallet</h3>
                            <p className="mb-4">
                                Ensure you have a Solana wallet configured locally at `~/.config/solana/id.json` and that it is funded with Devnet SOL.
                            </p>
                            <div className="bg-[#1a1a1a] text-white p-4 mb-8 border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl">
                                <code>solana config set --url devnet</code>
                            </div>

                            <h3 className="text-xl font-bold mb-4 font-sans">3. Create a Plan</h3>
                            <p className="mb-4">
                                Use the CLI to initialize a new plan. This will create a Plan Account on-chain.
                            </p>
                            <div className="bg-[#1a1a1a] text-white p-4 mb-8 border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl">
                                <code>w3 plan create --name "Pro Tier" --amount 20000000 --interval monthly</code>
                            </div>

                            <div className="p-6 bg-white border border-[#a3a3a3] mt-12 rounded-xl">
                                <h4 className="font-bold text-sm mb-2">Next Steps</h4>
                                <ul className="list-disc pl-4 space-y-2">
                                    <li>Integration: Install the TypeScript SDK to create subscriptions from your frontend.</li>
                                    <li>Verification: Use the dashboard to view your newly created plan.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
