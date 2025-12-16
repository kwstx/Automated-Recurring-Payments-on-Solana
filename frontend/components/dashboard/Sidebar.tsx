'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CreditCard, Receipt, Settings, Radio, ExternalLink, Activity, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompanyDetails } from '@/hooks/useSettings';
import { useWallet } from '@solana/wallet-adapter-react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: CreditCard, label: 'Plans', href: '/dashboard/plans' },
    { icon: Users, label: 'Subscriptions', href: '/dashboard/subscriptions' },
    { icon: Receipt, label: 'Invoices', href: '/dashboard/invoices' },
    { icon: Code, label: 'Developer Docs', href: '/docs' },
    { icon: Radio, label: 'Webhooks', href: '/dashboard/webhooks' },
    { icon: Activity, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar({ isOpen = true, onClose }: { isOpen?: boolean; onClose?: () => void }) {
    const pathname = usePathname();
    const { data: companyData } = useCompanyDetails();
    const { publicKey, connected } = useWallet();

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && onClose && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <aside
                className={`fixed top-0 left-0 h-full w-[280px] bg-white border-r border-[#EAEAEA] z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Brand */}
                    <div className="mb-10 px-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="font-bold text-2xl tracking-tighter">ZyoPay.</div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link key={item.href} href={item.href}>
                                    <div
                                        className={`group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200 ${isActive
                                            ? 'bg-black text-white shadow-md'
                                            : 'text-[#666] hover:bg-[#F5F5F5] hover:text-black'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#999] group-hover:text-black'}`} />
                                        <span>{item.label}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer / User Profile Stub */}
                    <div className="mt-auto px-2">
                        <div className="p-4 bg-[#F8F9FA] rounded-2xl flex items-center gap-3 cursor-pointer hover:bg-[#F0F1F2] transition-colors">
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                                {(companyData?.name?.[0] || 'M').toUpperCase()}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-bold truncate">
                                    {companyData?.name || (connected && publicKey ? `${publicKey.toString().slice(0, 4)}..${publicKey.toString().slice(-4)}` : 'Guest')}
                                </p>
                                <p className="text-xs text-[#666] truncate">
                                    {companyData?.email || (connected ? 'Connected' : 'Not Connected')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
