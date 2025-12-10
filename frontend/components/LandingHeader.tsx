'use client';

import Link from 'next/link';

export default function LandingHeader() {
    return (
        <div className="w-full border-b border-black bg-[#EAEAEA] sticky top-0 z-50">
            <div className="max-w-[1600px] mx-auto px-4 md:px-6">
                <div className="h-16 flex items-center justify-between">
                    {/* Brand */}
                    <Link href="/" className="font-bold text-2xl tracking-tight text-black flex items-center gap-2">
                        W3. <span className="text-xs px-2 py-0.5 border border-black rounded-full font-mono uppercase">Infra</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
                        <Link href="/sdks" className="hover:underline decoration-2 underline-offset-4">SDKs</Link>
                        <Link href="/webhooks" className="hover:underline decoration-2 underline-offset-4">Webhooks</Link>
                        <Link href="/resources" className="hover:underline decoration-2 underline-offset-4">Resources</Link>
                        <Link href="/pricing" className="hover:underline decoration-2 underline-offset-4">Pricing</Link>
                        <Link href="/docs" className="hover:underline decoration-2 underline-offset-4">Docs</Link>
                        <Link href="/portal" className="px-4 py-2 bg-black text-white hover:bg-transparent hover:text-black border border-black transition-all">Portal</Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
