
'use client';

import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { Loader2, AlertCircle } from 'lucide-react';
import { useProgram } from '../hooks/useProgram';
import { usePortalActions } from '../hooks/usePortal';

interface UnsubscribeButtonProps {
    subscriptionPda: string;
    subscriptionId: number; // DB ID for syncing
    className?: string;
    disabled?: boolean;
}

export default function UnsubscribeButton({ subscriptionPda, subscriptionId, className, disabled }: UnsubscribeButtonProps) {
    const { connected, publicKey } = useWallet();
    const { program } = useProgram();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { cancel: syncCancel } = usePortalActions(''); // We mostly need invalidation

    const handleUnsubscribe = async () => {
        if (!process.env.NEXT_PUBLIC_PROGRAM_ID) {
            // If we don't have a real program deployed yet, fallback to API (or just alert)
            // But here we want to demonstrate the code.
        }

        if (!connected || !program || !publicKey) {
            setError("Wallet not connected");
            return;
        }

        if (!confirm('Are you certain? This will cancel your subscription on-chain.')) return;

        setLoading(true);
        setError(null);

        try {
            console.log("Cancelling Subscription:", subscriptionPda);

            // 1. Send Transaction to Solana
            const tx = await program.methods
                .cancelSubscription()
                .accounts({
                    subscription: new PublicKey(subscriptionPda),
                    subscriber: publicKey,
                })
                .rpc();

            console.log("Transaction Signature:", tx);

            // 2. Sync Backend (Optional but recommended for UI speed)
            // Even though chain update happens, we tell backend "Hey, I cancelled, refresh your state"
            await syncCancel.mutateAsync(subscriptionId);

            alert(`Subscription cancelled successfully! TX: ${tx.slice(0, 8)}...`);

        } catch (err: any) {
            console.error(err);
            // Simulate success if mocking
            if (err.message && err.message.includes("Account does not exist") && process.env.NODE_ENV === 'development') {
                // For demo purposes if chain is mock
                await syncCancel.mutateAsync(subscriptionId);
                alert("Mock Cancellation Success (On-chain account not found)");
            } else {
                setError(err.message || 'Transaction failed');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={handleUnsubscribe}
                disabled={loading || disabled || !connected}
                className={className || "py-2.5 border border-black bg-black text-white text-xs font-bold uppercase hover:bg-[#333] transition-colors disabled:opacity-50 flex justify-center items-center gap-2"}
            >
                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                {loading ? 'Cancelling...' : 'Cancel'}
            </button>
            {error && (
                <div className="text-[10px] text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                </div>
            )}
        </div>
    );
}
