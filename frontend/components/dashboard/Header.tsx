'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Bell, Search } from 'lucide-react';

export default function Header({ title }: { title: string }) {
    return (
        <header className="fixed top-0 right-0 left-0 md:left-64 h-20 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 z-30 px-8 flex items-center justify-between">
            {/* Page Title / Breadcrumbs */}
            <div>
                <h1 className="text-2xl font-bold text-white font-serif">{title}</h1>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                {/* Search */}
                <div className="hidden md:flex items-center px-4 py-2 bg-white/5 rounded-lg border border-white/5 focus-within:border-purple-500/50 transition-colors w-64">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-full"
                    />
                </div>

                {/* Notifications */}
                <button className="relative w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full" />
                </button>

                {/* Wallet Button */}
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
            </div>
        </header>
    );
}
