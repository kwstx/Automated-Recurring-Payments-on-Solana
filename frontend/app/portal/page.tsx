'use client';

import LandingHeader from '@/components/LandingHeader';
import { motion } from 'framer-motion';
import { Wallet, Loader2, ExternalLink, Pause, Play, AlertTriangle } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
import { usePortalSubscriptions, usePortalActions } from '@/hooks/usePortal';
import UnsubscribeButton from '@/components/UnsubscribeButton';

export default function PortalPage() {
    const { connected, publicKey } = useWallet();
    const [mounted, setMounted] = useState(false);

    // Hooks
    const walletAddress = publicKey ? publicKey.toBase58() : null;
    const { data: subscriptions = [], isLoading, error } = usePortalSubscriptions(walletAddress);
    const { pause, resume, cancel } = usePortalActions(walletAddress || '');

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAction = async (action: 'pause' | 'resume' | 'cancel', id: number) => {
        try {
            if (action === 'pause') await pause.mutateAsync(id);
            if (action === 'resume') await resume.mutateAsync(id);
            if (action === 'cancel') {
                if (confirm('Are you sure you want to cancel this subscription? This cannot be undone.')) {
                    await cancel.mutateAsync(id);
                }
            }
        } catch (err: any) {
            alert(err.response?.data?.error || `Failed to ${action} subscription`);
        }
    };

    // Prevent hydration mismatch by not rendering wallet logic until mounted
    if (!mounted) return null;

    if (!connected) {
        return (
            <div className="min-h-screen bg-[#F2D7EE] text-black font-sans flex flex-col selection:bg-[#C1F0DC]">
                <LandingHeader />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md w-full bg-white border border-black rounded-2xl p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>
                        <span className="text-xs font-bold mb-6 block text-black tracking-widest uppercase">Subscriber Portal</span>
                        <h1 className="text-4xl font-bold leading-tight mb-6 tracking-tighter">
                            Connect<br />Wallet
                        </h1>
                        <p className="text-base font-medium text-[#666] mb-8 leading-relaxed">
                            Access your active subscriptions, manage payments, and view billing history.
                        </p>

                        <div className="flex justify-center w-full mb-8">
                            <div className="w-full bg-black rounded-xl overflow-hidden hover:opacity-90 transition-opacity">
                                <WalletMultiButton style={{
                                    backgroundColor: 'transparent',
                                    color: '#ffffff',
                                    fontFamily: 'inherit',
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    padding: '20px 0',
                                    borderRadius: '0px',
                                    width: '100%',
                                    justifyContent: 'center',
                                    fontSize: '16px'
                                }} />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-[#F5F5F5]">
                            <p className="text-xs text-[#999] font-medium">
                                By connecting, you agree to our Terms of Service.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-[#F2D7EE]">
            <LandingHeader />

            <div className="relative pt-12 pb-24 px-4 md:px-6 max-w-7xl mx-auto">
                <main className="relative z-10 flex flex-col items-center">

                    {/* Header Section */}
                    <div className="text-center mb-16 max-w-3xl">
                        <span className="text-xs font-bold mb-4 block text-black tracking-widest uppercase bg-[#C1F0DC] px-3 py-1 rounded-full w-fit mx-auto border border-black">Subscriber Portal</span>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
                            My Subscriptions
                        </h1>
                        <p className="text-lg font-medium text-[#666] mb-8 max-w-lg mx-auto leading-relaxed">
                            Manage your active plans, pause payments, or cancel service directly on-chain.
                        </p>

                        <div className="flex justify-center gap-6 items-center">
                            <div className="flex items-center justify-center p-1 bg-[#F5F5F5] rounded-xl border border-[#EAEAEA]">
                                <WalletMultiButton style={{
                                    backgroundColor: '#000000',
                                    height: '40px',
                                    borderRadius: '8px',
                                    fontFamily: 'inherit',
                                    fontSize: '14px',
                                    padding: '0 24px'
                                }} />
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="w-full">
                        {isLoading ? (
                            <div className="text-center py-20 bg-[#F9F9F9] rounded-2xl border border-[#EAEAEA]">
                                <Loader2 className="w-8 h-8 animate-spin mx-auto text-black/20" />
                                <p className="mt-4 font-bold text-sm text-[#999]">Loading subscriptions...</p>
                            </div>
                        ) : subscriptions.length === 0 ? (
                            <div className="text-center py-24 bg-[#F9F9F9] rounded-2xl border border-dashed border-[#ccc]">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-[#EAEAEA]">
                                    <Wallet className="w-6 h-6 text-[#999]" />
                                </div>
                                <h3 className="text-xl font-bold text-black mb-2">No active subscriptions</h3>
                                <p className="font-medium text-sm text-[#666]">Subscriptions linked to this wallet will appear here.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {subscriptions.map((sub: any, index: number) => (
                                    <motion.div
                                        key={sub.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white border border-black rounded-2xl overflow-hidden relative group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col"
                                    >
                                        {/* Status Header */}
                                        <div className={`px-6 py-4 border-b border-black flex justify-between items-center ${sub.status === 'active' ? 'bg-[#C1F0DC]' :
                                            sub.status === 'paused' ? 'bg-[#F2D7EE]' : 'bg-[#EAEAEA]'
                                            }`}>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full border border-black ${sub.status === 'active' ? 'bg-green-500' :
                                                    sub.status === 'paused' ? 'bg-orange-400' : 'bg-gray-400'
                                                    }`} />
                                                <span className="text-xs font-bold uppercase tracking-wider text-black">
                                                    {sub.status}
                                                </span>
                                            </div>
                                            <a
                                                href={`https://explorer.solana.com/address/${sub.subscriptionPda}?cluster=devnet`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-black/60 hover:text-black transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>

                                        <div className="p-6 md:p-8 flex-1 flex flex-col">
                                            <div className="mb-6">
                                                <div className="flex items-center gap-3 mb-3">
                                                    {sub.logoUrl && (
                                                        <img src={sub.logoUrl} alt={sub.merchant} className="w-10 h-10 object-contain rounded-lg border border-[#EAEAEA]" />
                                                    )}
                                                    <h3 className="text-2xl font-bold leading-tight">{sub.merchant}</h3>
                                                </div>
                                                <div className="inline-block bg-black text-white text-[10px] font-bold px-2 py-1 rounded">
                                                    {sub.plan} Plan
                                                </div>
                                            </div>

                                            <div className="space-y-4 mb-8 flex-1">
                                                <div className="flex justify-between items-center py-3 border-b border-[#F5F5F5]">
                                                    <span className="text-sm font-medium text-[#666]">Amount</span>
                                                    <span className="font-bold text-lg">${sub.price} <span className="text-xs font-normal text-[#999]">{sub.currency}</span></span>
                                                </div>
                                                <div className="flex justify-between items-center py-3 border-b border-[#F5F5F5]">
                                                    <span className="text-sm font-medium text-[#666]">Next Billing</span>
                                                    <span className="font-bold text-sm">{sub.nextBilling ? new Date(sub.nextBilling * 1000).toLocaleDateString() : '-'}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-3 border-b border-[#F5F5F5]">
                                                    <span className="text-sm font-medium text-[#666]">Frequency</span>
                                                    <span className="font-bold text-sm capitalize">{sub.interval}</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                {sub.status === 'active' ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleAction('pause', sub.id)}
                                                            disabled={pause.isPending}
                                                            className="flex items-center justify-center gap-2 py-3 border-2 border-black bg-white text-black text-xs font-bold rounded-xl hover:bg-[#F5F5F5] transition-colors disabled:opacity-50"
                                                        >
                                                            {pause.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Pause className="w-3 h-3" />}
                                                            Pause
                                                        </button>
                                                        <UnsubscribeButton
                                                            subscriptionPda={sub.subscriptionPda}
                                                            subscriptionId={sub.id}
                                                            className="w-full"
                                                        />
                                                    </>
                                                ) : sub.status === 'paused' ? (
                                                    <button
                                                        onClick={() => handleAction('resume', sub.id)}
                                                        disabled={resume.isPending}
                                                        className="col-span-2 flex items-center justify-center gap-2 py-3 bg-black text-white text-xs font-bold rounded-xl hover:bg-[#333] transition-colors disabled:opacity-50 shadow-md"
                                                    >
                                                        {resume.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                                                        Resume Subscription
                                                    </button>
                                                ) : (
                                                    <div className="col-span-2 text-center py-3 text-xs font-bold text-[#999] bg-[#F5F5F5] rounded-xl border border-transparent">
                                                        Subscription Cancelled
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
