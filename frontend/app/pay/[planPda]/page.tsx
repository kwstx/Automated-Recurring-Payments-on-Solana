'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { plansAPI } from '@/lib/api-client';
import SubscribeButton from '@/components/SubscribeButton';
import LandingHeader from '@/components/LandingHeader';
import { Loader2, ShieldCheck, Check } from 'lucide-react';

export default function CheckoutPage() {
    const params = useParams();
    const planPda = params.planPda as string;
    const [plan, setPlan] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!planPda) return;

        const fetchPlan = async () => {
            try {
                const { data } = await plansAPI.getPublic(planPda);
                setPlan(data);
            } catch (err: any) {
                console.error(err);
                setError(err.response?.data?.error || 'Failed to load plan');
            } finally {
                setLoading(false);
            }
        };

        fetchPlan();
    }, [planPda]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-black" />
            </div>
        );
    }

    if (error || !plan) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Checkout Error</h1>
                    <p className="text-gray-600">{error || 'Plan not found'}</p>
                </div>
            </div>
        );
    }

    const brandColor = plan.brand_color || '#000000';

    return (
        <div className="min-h-screen bg-[#F5F5F5] font-sans text-black">
            <LandingHeader />

            <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

                    {/* Left: Branding & Info */}
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            {plan.logo_url && (
                                <img src={plan.logo_url} alt="Logo" className="w-16 h-16 rounded-full border border-gray-200 bg-white object-contain" />
                            )}
                            <div>
                                <h2 className="text-xl font-bold">{plan.company_name || 'Merchant'}</h2>
                                <p className="text-sm text-gray-500 font-mono">SECURE CHECKOUT</p>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-[0.9]">
                            Subscribe to <br />{plan.name}
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            {plan.description || `Get access to premium features with the ${plan.name} plan.`}
                        </p>

                        <div className="flex items-center gap-2 text-sm text-gray-500 font-mono bg-white inline-flex px-3 py-1.5 border border-gray-200 rounded-full">
                            <ShieldCheck size={16} className="text-green-600" />
                            Powered by ZyoPay & Solana
                        </div>
                    </div>

                    {/* Right: Payment Card */}
                    <div className="bg-white border border-black p-8 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="absolute top-0 left-0 w-full h-1.5" style={{ backgroundColor: brandColor }}></div>

                        <div className="flex justify-between items-baseline mb-8 pb-8 border-b border-gray-100">
                            <div>
                                <span className="text-5xl font-bold tracking-tighter">${plan.amount}</span>
                                <span className="text-gray-500 ml-1 font-mono text-sm">{plan.currency}</span>
                            </div>
                            <span className="text-sm font-bold bg-gray-100 px-3 py-1 rounded-full uppercase text-xs tracking-wider">
                                /{plan.interval}
                            </span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3 text-sm">
                                <div className="mt-0.5 min-w-[1.25rem] h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <Check size={12} className="text-green-700" />
                                </div>
                                <span className="text-gray-700">Immediate access to features</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm">
                                <div className="mt-0.5 min-w-[1.25rem] h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <Check size={12} className="text-green-700" />
                                </div>
                                <span className="text-gray-700">Cancel anytime via Portal</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm">
                                <div className="mt-0.5 min-w-[1.25rem] h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <Check size={12} className="text-green-700" />
                                </div>
                                <span className="text-gray-700">Secure on-chain payments</span>
                            </li>
                        </ul>

                        <SubscribeButton
                            planAddress={plan.plan_pda}
                            planName={plan.name}
                            amount={plan.amount}
                            tokenMint={plan.token_mint}
                            merchantPubkey={plan.merchant_wallet}
                            onSuccess={(tx) => alert(`Subscription successful! Transaction: ${tx}`)}
                        />

                        <p className="text-center text-xs text-gray-400 mt-4">
                            Payments processed on Solana Network
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
