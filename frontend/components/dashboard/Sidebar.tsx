'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CreditCard, Layers, Settings, LogOut, Activity, FileText, Webhook, X } from 'lucide-react';

const menuItems = [
    { icon: Home, label: 'Overview', href: '/dashboard' },
    { icon: Layers, label: 'Plans', href: '/dashboard/plans' },
    { icon: CreditCard, label: 'Subscriptions', href: '/dashboard/subscriptions' },
    { icon: FileText, label: 'Invoices', href: '/dashboard/invoices' },
    { icon: Webhook, label: 'Webhooks', href: '/dashboard/webhooks' },
    { icon: Activity, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    // Default desktop classes vs Mobile overlay classes - without cn for safety
    const isMobile = isOpen !== undefined;
    const baseClasses = "fixed w-[280px] bg-[#EAEAEA] border-r border-[#a3a3a3] flex flex-col z-50 transition-transform duration-300 ease-in-out";

    // If mobile, handle translate. If desktop (isOpen undefined), always show (hidden md:flex)
    const mobileClasses = `inset-y-0 left-0 ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`;
    const desktopClasses = "left-0 top-0 bottom-0 hidden md:flex z-40";

    const containerClasses = `${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`;

    return (
        <>
            {/* Mobile Overlay Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={containerClasses}>
                {/* Logo Area */}
                <div className="h-24 px-8 flex items-center justify-between border-b border-[#a3a3a3]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black flex items-center justify-center">
                            <div className="w-4 h-2 bg-white" />
                        </div>
                        <span className="text-lg font-bold text-black uppercase tracking-wider">Stellar</span>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="md:hidden text-[#666]">
                            <X className="w-6 h-6" />
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-6 py-8 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} onClick={onClose}>
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
        </>
    );
}
