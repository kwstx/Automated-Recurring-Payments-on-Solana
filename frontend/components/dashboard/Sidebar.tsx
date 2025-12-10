'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CreditCard, Layers, Settings, LogOut, Activity } from 'lucide-react';

const menuItems = [
    { icon: Home, label: 'Overview', href: '/dashboard' },
    { icon: Layers, label: 'Plans', href: '/dashboard/plans' },
    { icon: CreditCard, label: 'Subscriptions', href: '/dashboard/subscriptions' },
    { icon: Activity, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-[280px] bg-[#EAEAEA] border-r border-[#a3a3a3] flex flex-col z-40 hidden md:flex">
            {/* Logo Area */}
            <div className="h-24 px-8 flex items-center border-b border-[#a3a3a3]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black flex items-center justify-center">
                        <div className="w-4 h-2 bg-white" />
                    </div>
                    <span className="text-lg font-bold text-black uppercase tracking-wider">Stellar</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-6 py-8 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={`group flex items-center gap-3 px-4 py-3 transition-all duration-200 border ${isActive
                                    ? 'bg-black text-white border-black'
                                    : 'text-[#666] border-transparent hover:bg-black/5 hover:text-black hover:border-black/5'
                                    }`}
                            >
                                <item.icon className={`w-4 h-4 transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#666] group-hover:text-black'}`} />
                                <span className="font-mono font-bold text-xs uppercase tracking-wider">{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="p-6 border-t border-[#a3a3a3]">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-[#666] hover:text-black hover:bg-red-500/5 hover:text-red-600 transition-all duration-200 group border border-transparent hover:border-transparent">
                    <LogOut className="w-4 h-4 group-hover:text-red-600 transition-colors" />
                    <span className="font-mono font-bold text-xs uppercase tracking-wider">Logout</span>
                </button>
            </div>
        </aside>
    );
}
