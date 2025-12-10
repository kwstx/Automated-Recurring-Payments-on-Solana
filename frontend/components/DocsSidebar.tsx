'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DocsSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="hidden lg:block space-y-8 sticky top-32 h-fit">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                <input
                    type="text"
                    placeholder="Search docs..."
                    className="w-full pl-10 pr-4 py-2 bg-white border border-[#ccc] font-mono text-sm focus:border-black outline-none transition-colors"
                />
            </div>

            <div className="space-y-1">
                <h4 className="font-bold uppercase text-xs tracking-wider mb-4 text-[#666]">Getting Started</h4>
                <Link
                    href="/docs"
                    className={`block py-1 transition-all pl-3 ${isActive('/docs') ? 'font-bold text-black border-l-2 border-black' : 'text-[#666] hover:text-black hover:border-l-2 hover:border-[#ccc]'}`}
                >
                    Introduction
                </Link>
                <Link
                    href="/docs/quick-start"
                    className={`block py-1 transition-all pl-3 ${isActive('/docs/quick-start') ? 'font-bold text-black border-l-2 border-black' : 'text-[#666] hover:text-black hover:border-l-2 hover:border-[#ccc]'}`}
                >
                    Quick Start
                </Link>
                <Link
                    href="/docs/installation"
                    className={`block py-1 transition-all pl-3 ${isActive('/docs/installation') ? 'font-bold text-black border-l-2 border-black' : 'text-[#666] hover:text-black hover:border-l-2 hover:border-[#ccc]'}`}
                >
                    Installation
                </Link>
            </div>

            <div className="space-y-1">
                <h4 className="font-bold uppercase text-xs tracking-wider mb-4 mt-8 text-[#666]">Core Concepts</h4>
                <Link
                    href="/docs/concepts/plans"
                    className={`block py-1 transition-all pl-3 ${isActive('/docs/concepts/plans') ? 'font-bold text-black border-l-2 border-black' : 'text-[#666] hover:text-black hover:border-l-2 hover:border-[#ccc]'}`}
                >
                    Plans
                </Link>
                <Link
                    href="/docs/concepts/subscriptions"
                    className={`block py-1 transition-all pl-3 ${isActive('/docs/concepts/subscriptions') ? 'font-bold text-black border-l-2 border-black' : 'text-[#666] hover:text-black hover:border-l-2 hover:border-[#ccc]'}`}
                >
                    Subscriptions
                </Link>
                <Link
                    href="/docs/concepts/invoices"
                    className={`block py-1 transition-all pl-3 ${isActive('/docs/concepts/invoices') ? 'font-bold text-black border-l-2 border-black' : 'text-[#666] hover:text-black hover:border-l-2 hover:border-[#ccc]'}`}
                >
                    Invoices
                </Link>
            </div>
        </aside>
    );
}
