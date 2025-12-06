'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { User } from 'lucide-react';

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#050505]">
            {/* Simple Portal Header */}
            <header className="fixed top-0 left-0 right-0 h-20 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 z-40 px-6 md:px-12 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center">
                        <div className="w-4 h-2 bg-white rounded-full" />
                    </div>
                    <span className="text-xl font-bold text-white font-serif tracking-wide">Stellar Portal</span>
                </div>

                <div className="flex items-center gap-6">
                    <WalletMultiButton style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '0.5rem',
                        padding: '0 1.25rem',
                        height: '40px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: 'white',
                        fontFamily: 'inherit',
                    }} />

                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white">
                        <User className="w-5 h-5" />
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
}
