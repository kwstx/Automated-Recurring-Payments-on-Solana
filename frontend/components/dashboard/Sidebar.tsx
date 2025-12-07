'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CreditCard, Layers, Settings, LogOut, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <aside className="fixed left-6 top-6 bottom-6 w-64 glass-panel rounded-3xl flex flex-col z-40 hidden md:flex overflow-hidden">
            {/* Logo Area */}
            <div className="p-8 pb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <div className="w-5 h-2.5 bg-white/90 rounded-full" />
                </div>
                <span className="text-xl font-bold text-white tracking-wide">Stellar</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-white/10"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    >
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-500 rounded-r-full shadow-[0_0_12px_rgba(168,85,247,0.5)]" />
                                    </motion.div>
                                )}
                                <item.icon className={`w-5 h-5 relative z-10 transition-colors duration-300 ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'group-hover:text-purple-300'}`} />
                                <span className="relative z-10 font-medium tracking-wide text-sm">{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 mx-4 mb-4 border-t border-white/[0.05]">
                <button className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all duration-300 group">
                    <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors" />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </aside>
    );
}
