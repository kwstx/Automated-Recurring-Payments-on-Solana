'use client';

import LandingHeader from '@/components/LandingHeader';
import { Check } from 'lucide-react';
import SubscribeButton from '@/components/SubscribeButton';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-12 lg:py-24">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9] mb-6">
                        Transparent<br />
                        Pricing
                    </h1>
                    <p className="text-lg font-mono text-[#666]">
                        Pay only for what you use. No hidden fees. No surprises.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black bg-white">
                    {/* Starter */}
                    <div className="p-8 border-b md:border-b-0 md:border-r border-black relative group hover:bg-[#fafafa] transition-colors">
                        <h3 className="text-2xl font-bold uppercase mb-2">Starter</h3>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-4xl font-bold">0%</span>
                            <span className="font-mono text-sm text-[#666]"> / transaction</span>
                        </div>
                        <p className="font-mono text-xs text-[#666] mb-8 h-10">
                            Perfect for hackathons and early-stage prototypes.
                        </p>

                        <ul className="space-y-4 mb-8 font-mono text-sm">
                            <li className="flex items-center gap-2"><Check size={16} /> Up to 100 subscribers</li>
                            <li className="flex items-center gap-2"><Check size={16} /> Standard Analytics</li>
                            <li className="flex items-center gap-2"><Check size={16} /> Email Support</li>
                        </ul>

                        <SubscribeButton
                            planId="StarterXX11111111111111111111111111"
                            planName="Starter"
                            amount={0}
                            tokenMint="7XSjE8CZaabDrkP3MxKqL5zJwJtiK1CSuJbHHx9dgv9k"
                            merchantPubkey="5F2mgGWf8jsJVrNYyvHx8qSTVTK9DdCd5YY77C7kK5H6"
                        />
                    </div>

                    {/* Pro */}
                    <div className="p-8 border-b md:border-b-0 md:border-r border-black relative bg-[#1a1a1a] text-white transform md:-translate-y-4 md:shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="absolute top-0 right-0 bg-white text-black text-[10px] font-bold uppercase px-2 py-1 border-l border-b border-black">
                            Most Popular
                        </div>
                        <h3 className="text-2xl font-bold uppercase mb-2">Growth</h3>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-4xl font-bold">0.5%</span>
                            <span className="font-mono text-sm text-[#999]"> / transaction</span>
                        </div>
                        <p className="font-mono text-xs text-[#999] mb-8 h-10">
                            For scaling dApps with active revenue streams.
                        </p>

                        <ul className="space-y-4 mb-8 font-mono text-sm">
                            <li className="flex items-center gap-2"><Check size={16} /> Unlimited subscribers</li>
                            <li className="flex items-center gap-2"><Check size={16} /> Advanced Analytics</li>
                            <li className="flex items-center gap-2"><Check size={16} /> Priority Support</li>
                            <li className="flex items-center gap-2"><Check size={16} /> Custom Domain</li>
                        </ul>

                        <SubscribeButton
                            planId="GrowthXXX22222222222222222222222222"
                            planName="Growth"
                            amount={0.5}
                            tokenMint="7XSjE8CZaabDrkP3MxKqL5zJwJtiK1CSuJbHHx9dgv9k"
                            merchantPubkey="5F2mgGWf8jsJVrNYyvHx8qSTVTK9DdCd5YY77C7kK5H6"
                        />
                    </div>

                    {/* Enterprise */}
                    <div className="p-8 relative group hover:bg-[#fafafa] transition-colors">
                        <h3 className="text-2xl font-bold uppercase mb-2">Enterprise</h3>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-4xl font-bold">Custom</span>
                        </div>
                        <p className="font-mono text-xs text-[#666] mb-8 h-10">
                            Volume discounts and dedicated infrastructure.
                        </p>

                        <ul className="space-y-4 mb-8 font-mono text-sm">
                            <li className="flex items-center gap-2"><Check size={16} /> Dedicated Nodes</li>
                            <li className="flex items-center gap-2"><Check size={16} /> SLA Guarantees</li>
                            <li className="flex items-center gap-2"><Check size={16} /> 24/7 Phone Support</li>
                            <li className="flex items-center gap-2"><Check size={16} /> On-chain Governance</li>
                        </ul>

                        <button className="w-full py-3 bg-white border border-black text-black font-bold uppercase hover:bg-black hover:text-white transition-all">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
