import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function LandingHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="w-full border-b border-black bg-[#EAEAEA] sticky top-0 z-50">
            <div className="max-w-[1600px] mx-auto px-4 md:px-6">
                <div className="h-16 flex items-center justify-between">
                    {/* Brand */}
                    <Link href="/" className="font-bold text-2xl tracking-tight text-black flex items-center gap-2 z-50 relative">
                        W3. <span className="text-xs px-2 py-0.5 border border-black rounded-full font-mono uppercase">Infra</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
                        <Link href="/sdks" className="hover:underline decoration-2 underline-offset-4">SDKs</Link>
                        <Link href="/webhooks" className="hover:underline decoration-2 underline-offset-4">Webhooks</Link>
                        <Link href="/resources" className="hover:underline decoration-2 underline-offset-4">Resources</Link>
                        <Link href="/pricing" className="hover:underline decoration-2 underline-offset-4">Pricing</Link>
                        <Link href="/docs" className="hover:underline decoration-2 underline-offset-4">Docs</Link>
                        <Link href="/portal" className="px-4 py-2 bg-black text-white hover:bg-transparent hover:text-black border border-black transition-all">Portal</Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden z-50 relative p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-0 left-0 right-0 bg-[#EAEAEA] border-b border-black md:hidden min-h-screen pt-20 px-4 flex flex-col gap-6 z-40"
                    >
                        <nav className="flex flex-col gap-6 text-xl font-bold uppercase tracking-tight">
                            <Link href="/sdks" onClick={() => setIsMenuOpen(false)}>SDKs</Link>
                            <Link href="/webhooks" onClick={() => setIsMenuOpen(false)}>Webhooks</Link>
                            <Link href="/resources" onClick={() => setIsMenuOpen(false)}>Resources</Link>
                            <Link href="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
                            <Link href="/docs" onClick={() => setIsMenuOpen(false)}>Docs</Link>
                            <Link href="/portal" onClick={() => setIsMenuOpen(false)} className="bg-black text-white px-4 py-3 text-center border border-black">Portal</Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
