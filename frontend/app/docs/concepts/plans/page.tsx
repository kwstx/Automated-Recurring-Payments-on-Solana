'use client';

import LandingHeader from '@/components/LandingHeader';
import DocsSidebar from '@/components/DocsSidebar';
import Image from 'next/image';

export default function PlansConceptPage() {
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
                            <span className="text-xs font-mono font-bold mb-4 block text-[#666]">CORE CONCEPTS</span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Plans</h1>
                            <p className="text-lg leading-relaxed font-mono text-[#333]">
                                A Plan is the blueprint for a recurring payment model. It defines what users pay and how often.
                            </p>
                        </div>

                        <div className="prose max-w-none font-mono text-sm leading-7">
                            <h3 className="text-xl font-bold mb-4 font-sans">Anatomy of a Plan</h3>
                            <p className="mb-4">
                                Plans are stored on-chain as PDAs (Program Derived Addresses). They are immutable once created, ensuring price stability for subscribers.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div className="border border-black p-4 bg-white rounded-xl">
                                    <h4 className="font-bold font-sans mb-2">Merchant</h4>
                                    <p className="text-[#666]">The wallet address that will receive the funds.</p>
                                </div>
                                <div className="border border-black p-4 bg-white rounded-xl">
                                    <h4 className="font-bold font-sans mb-2">Amount</h4>
                                    <p className="text-[#666]">The cost per interval in USDC (decimals: 6).</p>
                                </div>
                                <div className="border border-black p-4 bg-white rounded-xl">
                                    <h4 className="font-bold font-sans mb-2">Interval</h4>
                                    <p className="text-[#666]">Frequency of charge (e.g., Monthly, Yearly).</p>
                                </div>
                                <div className="border border-black p-4 bg-white rounded-xl">
                                    <h4 className="font-bold font-sans mb-2">Token Mint</h4>
                                    <p className="text-[#666]">The accepted currency (currently defaults to USDC).</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
