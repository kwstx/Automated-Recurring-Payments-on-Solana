'use client';

import LandingHeader from '@/components/LandingHeader';
import { Check, Zap, TrendingUp, Building2, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCompanyDetails, useUpdateTier } from '@/hooks/useSettings';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
    const { data: company, isLoading } = useCompanyDetails();
    const updateTier = useUpdateTier();
    const router = useRouter();

    const currentTier = company?.tier || 'starter';

    const handleTierChange = async (tier: string) => {
        if (!company) {
            router.push('/login');
            return;
        }
        try {
            await updateTier.mutateAsync(tier);
        } catch (error) {
            alert('Failed to update tier');
        }
    };

    const PlanAction = ({ tier, label }: { tier: string, label: string }) => {
        if (isLoading) return <div className="h-12 w-full bg-gray-100 rounded animate-pulse" />;

        if (!company) {
            return (
                <Link href="/login" className="block w-full py-4 bg-black text-white font-bold text-center text-lg hover:opacity-80 transition-all">
                    Get Started
                </Link>
            );
        }

        const isCurrent = currentTier === tier;

        if (isCurrent) {
            return (
                <button disabled className="w-full py-4 bg-gray-100 text-gray-400 font-bold text-lg cursor-not-allowed">
                    Current Plan
                </button>
            );
        }

        return (
            <button
                onClick={() => handleTierChange(tier)}
                disabled={updateTier.isPending}
                className="w-full py-4 bg-black text-white font-bold text-lg hover:opacity-80 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {updateTier.isPending ? <Loader2 className="animate-spin" /> : label}
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-[#F2D7EE]">
            <LandingHeader />

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 lg:py-20">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 text-black">
                        Pricing
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-[#666] max-w-2xl mx-auto leading-relaxed">
                        Simple, transparent pricing for every stage of your growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Starter Plan */}
                    <div className="border border-black flex flex-col h-full bg-white relative group rounded-2xl overflow-hidden">
                        <div className="bg-[#C1F0DC] p-6 border-b border-black">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-black text-white rounded-none inline-flex">
                                    <Zap size={24} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold tracking-tight">Starter</h3>
                            <p className="font-mono text-xs mt-2 text-black/80">PERFECT FOR PROTOTYPING</p>
                        </div>

                        <div className="p-8 flex-1 flex flex-col">
                            <div className="mb-8">
                                <span className="text-5xl font-bold tracking-tighter">0%</span>
                                <span className="text-lg font-medium text-black/60 ml-2">transaction fee</span>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-start gap-3 text-sm font-medium">
                                    <Check className="w-5 h-5 shrink-0" />
                                    <span>Up to 100 subscribers</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm font-medium">
                                    <Check className="w-5 h-5 shrink-0" />
                                    <span>Standard Analytics</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm font-medium">
                                    <Check className="w-5 h-5 shrink-0" />
                                    <span>Community Support</span>
                                </li>
                            </ul>

                            <PlanAction tier="starter" label="Downgrade to Starter" />
                        </div>
                    </div>

                    {/* Growth Plan */}
                    <div className="border border-black flex flex-col h-full bg-white relative group md:-mt-8 md:mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden">
                        <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-3 py-1.5 border-l border-b border-black">
                            MOST POPULAR
                        </div>
                        <div className="bg-[#F2D7EE] p-6 border-b border-black">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-black text-white rounded-none inline-flex">
                                    <TrendingUp size={24} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold tracking-tight">Growth</h3>
                            <p className="font-mono text-xs mt-2 text-black/80">FOR SCALING DAPPS</p>
                        </div>

                        <div className="p-8 flex-1 flex flex-col">
                            <div className="mb-8">
                                <span className="text-5xl font-bold tracking-tighter">5%</span>
                                <span className="text-lg font-medium text-black/60 ml-2">transaction fee</span>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-start gap-3 text-sm font-medium">
                                    <Check className="w-5 h-5 shrink-0" />
                                    <span>Unlimited subscribers</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm font-medium">
                                    <Check className="w-5 h-5 shrink-0" />
                                    <span>Advanced Analytics</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm font-medium">
                                    <Check className="w-5 h-5 shrink-0" />
                                    <span>Priority Support</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm font-medium">
                                    <Check className="w-5 h-5 shrink-0" />
                                    <span>Custom Domain</span>
                                </li>
                            </ul>

                            <PlanAction tier="growth" label="Upgrade to Growth" />
                        </div>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="border border-black flex flex-col h-full bg-white relative group rounded-2xl overflow-hidden">
                        <div className="bg-[#EBF5C6] p-6 border-b border-black">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-black text-white rounded-none inline-flex">
                                    <Building2 size={24} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold tracking-tight">Enterprise</h3>
                            <p className="font-mono text-xs mt-2 text-black/80">MAXIMUM SCALE</p>
                        </div>

                        <div className="p-8 flex-1 flex flex-col">
                            <div className="mb-8">
                                <span className="text-4xl font-bold tracking-tighter">Custom</span>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-start gap-3 text-sm font-medium">
                                    <Check className="w-5 h-5 shrink-0" />
                                    <span>Dedicated Infrastructure</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm font-medium">
                                    <Check className="w-5 h-5 shrink-0" />
                                    <span>SLA Guarantees</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm font-medium">
                                    <Check className="w-5 h-5 shrink-0" />
                                    <span>24/7 Phone Support</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm font-medium">
                                    <Check className="w-5 h-5 shrink-0" />
                                    <span>On-chain Governance</span>
                                </li>
                            </ul>

                            <Link href="mailto:sales@zyopay.com">
                                <button className="w-full py-4 bg-transparent border-2 border-black text-black font-bold text-lg hover:bg-black hover:text-white transition-all">
                                    Contact Sales
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
