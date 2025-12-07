'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Helper for the fluid background blobs
const FooterBlob = ({ className }: { className?: string }) => (
    <motion.div
        animate={{
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, 5, -5, 0],
        }}
        transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        className={`absolute rounded-full blur-[80px] opacity-40 mix-blend-screen pointer-events-none ${className}`}
    />
);

export default function Footer() {
    return (
        <footer className="relative bg-[#050505] text-white pt-32 pb-12 overflow-hidden">

            {/* --- FLUID BACKGROUND ELEMENTS --- */}
            <div className="absolute inset-0 z-0">
                {/* Large fluid shape on the right (similar to reference) */}
                <FooterBlob className="top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-blue-900/20 to-purple-900/20 translate-x-1/3 -translate-y-1/3" />

                {/* Smaller shape on bottom left */}
                <FooterBlob className="bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-purple-900/10 to-pink-900/10 -translate-x-1/3 translate-y-1/3" />

                {/* Noise texture overlay */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-between min-h-[60vh]">

                {/* TOP ROW: LOGO & LINKS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                    {/* Brand / Logo Area (Left) */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Logo Mark */}
                        <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links (Center/Right) */}
                    <div className="lg:col-span-8 flex flex-wrap gap-16 lg:justify-end">
                        {/* Column 1 */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                Explore
                            </h4>
                            <ul className="space-y-4 text-lg">
                                <li><Link href="/" className="hover:text-purple-300 transition-colors">Services</Link></li>
                                <li><Link href="/" className="hover:text-purple-300 transition-colors">About us</Link></li>
                                <li><Link href="/" className="hover:text-purple-300 transition-colors">Insight</Link></li>
                                <li><Link href="/" className="hover:text-purple-300 transition-colors">Career</Link></li>
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                Social
                            </h4>
                            <ul className="space-y-4 text-lg">
                                <li><a href="#" className="hover:text-blue-300 transition-colors">Instagram</a></li>
                                <li><a href="#" className="hover:text-blue-300 transition-colors">X | Twitter</a></li>
                                <li><a href="#" className="hover:text-blue-300 transition-colors">LinkedIn</a></li>
                                <li><a href="#" className="hover:text-blue-300 transition-colors">Discord</a></li>
                            </ul>
                        </div>

                        {/* CTA Button (Far Right) */}
                        <div className="lg:ml-12">
                            <Link href="/login" className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                Contact us
                            </Link>
                        </div>
                    </div>
                </div>

                {/* MIDDLE ROW: GIANT TYPOGRAPHY */}
                <div className="mb-24 flex justify-end">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-[12vw] leading-[0.8] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 text-right"
                    >
                        SolanaSub
                    </motion.h1>
                </div>

                {/* BOTTOM ROW: EMAIL & COPYRIGHT */}
                <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-8 border-t border-white/5 pt-8">
                    <div className="text-gray-500 text-sm">
                        © 2025 Solana Subscription Billing
                    </div>

                    <div className="flex flex-col md:flex-row items-end md:items-center gap-8">
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms & conditions</a>
                        <a href="mailto:hello@solanasub.com" className="text-2xl font-medium text-white hover:text-purple-300 transition-colors block mt-4 md:mt-0">
                            hello@solanasub.com
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
