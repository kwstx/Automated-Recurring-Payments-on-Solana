
'use client';

import { useState } from 'react';
import { useProgram } from '@/hooks/useProgram';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import * as anchor from '@coral-xyz/anchor';
import { Loader2 } from 'lucide-react';

interface SubscribeButtonProps {
    planId?: string; // Optional if planAddress is provided
    planAddress?: string; // Direct address override
    planName: string;
    amount: number;
    tokenMint?: string; // Default to USDC if missing
    merchantPubkey: string;
    onSuccess?: (txSignature: string) => void;
}

export default function SubscribeButton({ planId, planAddress, planName, amount, tokenMint, merchantPubkey, onSuccess }: SubscribeButtonProps) {
    const { program } = useProgram();
    const { publicKey, connected } = useWallet();
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const handleSubscribe = async () => {
        if (!program || !publicKey) return;

        setIsLoading(true);
        setStatus('Initializing...');

        try {
            // Determine Plan PDA
            let finalPlanPda: PublicKey;
            if (planAddress) {
                finalPlanPda = new PublicKey(planAddress);
            } else if (planId) {
                const [derived] = PublicKey.findProgramAddressSync(
                    [Buffer.from('plan'), new PublicKey(merchantPubkey).toBuffer(), Buffer.from(planId)],
                    program.programId
                );
                finalPlanPda = derived;
            } else {
                throw new Error("Missing plan identifier");
            }

            const [subscriptionPda] = PublicKey.findProgramAddressSync(
                [Buffer.from('sub'), publicKey.toBuffer(), finalPlanPda.toBuffer()],
                program.programId
            );

            const tokenMintString = tokenMint || 'So11111111111111111111111111111111111111112'; // Fallback to SOL/Mock
            const tokenMintKey = new PublicKey(tokenMintString);
            const userTokenAccount = await getAssociatedTokenAddress(tokenMintKey, publicKey);
            const merchantTokenAccount = await getAssociatedTokenAddress(tokenMintKey, new PublicKey(merchantPubkey));

            setStatus('Signing transaction...');

            // Call Smart Contract
            const tx = await program.methods
                .subscribe()
                .accounts({
                    subscription: subscriptionPda,
                    plan: finalPlanPda,
                    subscriber: publicKey,
                    subscriberTokenAccount: userTokenAccount,
                    merchantTokenAccount: merchantTokenAccount,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                })
                .rpc();

            console.log('Subscription successful, tx:', tx);
            setStatus('Success!');

            if (onSuccess) onSuccess(tx);

            // TODO: Call Backend to sync status (optional if backend listens to webhooks/chain)

        } catch (error: any) {
            console.error('Subscription error:', error);
            setStatus('Failed: ' + (error.message || 'Unknown error'));
        } finally {
            setIsLoading(false);
        }
    };

    if (!connected) {
        return <WalletMultiButton />;
    }

    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="w-full py-3 bg-black text-white font-bold hover:bg-[#1a1a1a] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isLoading ? status : `Subscribe to ${planName}`}
            </button>
            {status && !isLoading && (
                <p className={`text-xs text-center font-mono ${status.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
                    {status}
                </p>
            )}
        </div>
    );
}
