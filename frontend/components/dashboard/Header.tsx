'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Bell, Search } from 'lucide-react';

export default function Header({ title }: { title: string }) {
    return (
        <header className="fixed top-0 right-0 left-0 md:left-[280px] h-24 z-30 px-8 flex items-center justify-between">
            {/* Page Title / Breadcrumbs */}
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
                <p className="text-gray-400 text-sm mt-1">Welcome back to your dashboard</p>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="hidden md:flex items-center px-4 py-2.5 bg-white/[0.03] rounded-xl border border-white/[0.05] focus-within:border-purple-500/30 focus-within:bg-white/[0.05] transition-all duration-300 w-72 group">
                    <Search className="w-4 h-4 text-gray-400 group-focus-within:text-purple-400 transition-colors mr-3" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-full"
                    />
                </div>

                {/* Notifications */}
                <button className="relative w-11 h-11 rounded-xl bg-white/[0.03] flex items-center justify-center hover:bg-white/[0.08] transition-all duration-300 border border-white/[0.05] hover:border-white/[0.1]">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                </button>

                {/* Wallet Button */}
                <div className="glass-button rounded-xl overflow-hidden hover:scale-105 active:scale-95 transition-all duration-200">
                    <WalletMultiButton style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '0',
                        padding: '0 1.5rem',
                        height: '44px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'white',
                        fontFamily: 'inherit',
                    }} />
                </div>
            </div>
        </header>
    );
}
