'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Bell, Search, Menu } from 'lucide-react';

export default function Header({ title, onMenuClick }: { title: string; onMenuClick?: () => void }) {
    return (
        <header className="fixed top-0 right-0 left-0 md:left-[280px] h-24 z-30 px-4 md:px-8 flex items-center justify-between bg-[#EAEAEA] border-b border-[#a3a3a3]">
            {/* Page Title & Mobile Toggle */}
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="md:hidden text-black">
                    <Menu className="w-6 h-6" />
                </button>
                <div>
                    <span className="text-xs font-mono font-bold text-[#666] uppercase tracking-wider block mb-1">Area</span>
                    <h1 className="text-xl md:text-2xl font-bold text-black uppercase tracking-tight leading-none">{title}</h1>
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="hidden md:flex items-center px-4 py-2.5 bg-transparent border border-[#a3a3a3] w-64 focus-within:border-black focus-within:bg-white transition-all duration-200 group">
                    <Search className="w-4 h-4 text-[#666] group-focus-within:text-black transition-colors mr-3" />
                    <input
                        type="text"
                        placeholder="SEARCH..."
                        className="bg-transparent border-none outline-none text-xs font-mono font-bold text-black placeholder:text-[#999] w-full uppercase"
                    />
                </div>

                {/* Notifications */}
                <button className="relative w-10 h-10 flex items-center justify-center border border-[#a3a3a3] hover:bg-black hover:border-black hover:text-white transition-all duration-200 text-[#666]">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-black hover:bg-white rounded-full" />
                </button>

                {/* Wallet Button Wrapper for Brutalist Style */}
                <div className="border border-black bg-black hover:bg-[#1a1a1a] transition-colors">
                    <WalletMultiButton style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '0',
                        padding: '0 1.5rem',
                        height: '40px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'white',
                        fontFamily: 'monospace',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                    }} />
                </div>
            </div>
        </header>
    );
}
