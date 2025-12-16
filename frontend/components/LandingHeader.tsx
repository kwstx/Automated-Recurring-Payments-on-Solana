'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function LandingHeader({ transparent = false }: { transparent?: boolean }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={`w-full ${transparent ? 'bg-transparent border-transparent' : 'bg-[#EAEAEA] border-b border-transparent'} sticky top-0 z-50 transition-colors duration-300`}>
            {/* Added generous padding to match Hero spacing */}
            <div className="w-full px-4 md:px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Brand */}
                    <Link href="/" className="flex items-center">
                        <h1 className="font-bold text-2xl tracking-tight text-black">ZyoPay</h1>
                    </Link>

                    {/* Desktop Navigation & Actions */}
                    <div className="flex items-center gap-8">
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1a1a1a]">
                            <Link href="/sdks" className="hover:text-black transition-colors">SDKs</Link>
                            <Link href="/webhooks" className="hover:text-black transition-colors">Webhooks</Link>
                            <Link href="/resources" className="hover:text-black transition-colors">Resources</Link>
                            <Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link>
                            <Link href="/docs" className="hover:text-black transition-colors">Docs</Link>
                            <Link href="/portal" className="hover:text-black transition-colors">Portal</Link>
                        </nav>

                        {/* Launch App Button - Desktop */}
                        <div className="hidden md:block">
                            <Link
                                href="/login"
                                className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-black/90 transition-all shadow-sm block"
                            >
                                Launch App
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden z-50 relative p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
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
                        className="absolute top-0 left-0 right-0 bg-[#EAEAEA] border-b border-black/10 shadow-lg md:hidden min-h-screen pt-24 px-6 flex flex-col gap-8 z-40"
                    >
                        <nav className="flex flex-col gap-6 text-xl font-bold text-[#1a1a1a]">
                            <Link href="/sdks" onClick={() => setIsMenuOpen(false)}>SDKs</Link>
                            <Link href="/webhooks" onClick={() => setIsMenuOpen(false)}>Webhooks</Link>
                            <Link href="/resources" onClick={() => setIsMenuOpen(false)}>Resources</Link>
                            <Link href="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
                            <Link href="/docs" onClick={() => setIsMenuOpen(false)}>Docs</Link>
                            <Link href="/portal" onClick={() => setIsMenuOpen(false)}>Portal</Link>
                        </nav>

                        <div className="mt-4">
                            <Link
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="bg-black text-white px-5 py-3 rounded-lg text-lg font-bold hover:bg-black/90 transition-all shadow-sm block text-center"
                            >
                                Launch App
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
