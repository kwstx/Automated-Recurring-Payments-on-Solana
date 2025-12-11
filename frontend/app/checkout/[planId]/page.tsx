'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { apiClient } from '@/lib/api-client';
import SubscribeButton from '@/components/SubscribeButton';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
    const params = useParams();
    const planPda = params.planId as string;

    const [plan, setPlan] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!planPda) return;

        const fetchPlan = async () => {
            try {
                // Determine API URL (hack for now due to localhost vs public)
                const { data } = await apiClient.get(`/plan/public/${planPda}`);
                setPlan(data);
            } catch (err: any) {
                console.error(err);
                setError(err.response?.data?.error || 'Failed to load plan');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlan();
    }, [planPda]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (error || !plan) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white border border-red-200 p-8 text-center shadow-lg">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h1 className="text-xl font-bold text-red-700 mb-2">Checkout Unavailable</h1>
                    <p className="text-gray-600">{error || 'Plan not found'}</p>
                </div>
            </div>
        );
    }

    // Dynamic Branding
    const brandColor = plan.brand_color || '#000000';
    const logoUrl = plan.logo_url;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white shadow-[0px_4px_16px_rgba(0,0,0,0.1)] overflow-hidden"
                style={{ borderTop: `6px solid ${brandColor}` }}
            >
                {/* Header */}
                <div className="p-8 text-center border-b border-gray-100">
                    {logoUrl && (
                        <img src={logoUrl} alt="Logo" className="h-12 mx-auto mb-6 object-contain" />
                    )}
                    <h2 className="text-lg uppercase text-gray-500 font-mono tracking-widest mb-2">{plan.company_name || 'Merchant'}</h2>
                    <h1 className="text-3xl font-bold text-black mb-2">{plan.name}</h1>
                    <div className="text-4xl font-bold text-black my-6">
                        ${plan.amount} <span className="text-lg text-gray-400 font-medium">{plan.currency}</span>
                        <span className="text-sm text-gray-400 font-normal ml-1">/{plan.interval}</span>
                    </div>
                    {plan.description && (
                        <p className="text-gray-600 italic text-sm border-t border-gray-100 pt-4 mt-2">"{plan.description}"</p>
                    )}
                </div>

                {/* Action */}
                <div className="p-8 bg-gray-50">
                    <SubscribeButton
                        planAddress={plan.plan_pda}
                        planName={plan.name}
                        amount={plan.amount}
                        merchantPubkey={plan.merchant_wallet || '11111111111111111111111111111111'} // Fallback if missing
                        tokenMint={plan.currency_mint || 'So11111111111111111111111111111111111111112'} // Default or based on currency
                    // Note: If currency is USDC, we should use USDC mint. If missing, we might default to Mock or Sol.
                    // Ideally backend returns correct mint.
                    />

                    <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-1">
                        Powered by <span className="font-bold text-black">SOL BILLING</span>
                    </p>
                </div>
            </motion.div>

        </div>
    );
}
