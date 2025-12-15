'use client';

import { Bell, Search, Menu } from 'lucide-react';

interface HeaderProps {
    title: string;
    onMenuClick: () => void;
}

export default function Header({ title, onMenuClick }: HeaderProps) {
    return (
        <header className="fixed top-0 right-0 left-0 md:left-[280px] h-20 bg-[#F8F9FA]/80 backdrop-blur-md z-30 px-6 md:px-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">{title}</h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Search Bar (Hidden on mobile) */}
                <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-[#EAEAEA] w-[300px] focus-within:border-black/20 focus-within:ring-2 focus-within:ring-black/5 transition-all">
                    <Search className="w-4 h-4 text-[#999]" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#999]"
                    />
                </div>

                {/* Notifications */}
                <button className="relative w-10 h-10 bg-white border border-[#EAEAEA] rounded-xl flex items-center justify-center hover:bg-[#fafafa] hover:border-black/20 transition-all">
                    <Bell className="w-5 h-5 text-black" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </div>
        </header>
    );
}
