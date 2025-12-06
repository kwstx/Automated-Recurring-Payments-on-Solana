'use client';

import { motion } from 'framer-motion';
import { Repeat, Zap, Wallet, DollarSign, LayoutDashboard, UserCircle, BarChart3, Webhook } from 'lucide-react';
import { useRef, useState } from 'react';
import FeatureGraphic from './FeatureGraphics';

const features = [
    {
        title: 'Automated recurring payments',
        description: 'Set up flexible billing cycles and let our system handle the rest automatically.',
        icon: Repeat,
        color: 'bg-[#1E1B2E]', // Dark purple-ish grey
        highlight: 'bg-purple-500/10',
        delay: 0,
    },
    {
        title: 'Built on Solana (fast, cheap, secure)',
        description: 'Leverage the speed and low cost of Solana for seamless transactions.',
        icon: Zap,
        color: 'bg-[#2D1B2E]', // Darker reddish-purple
        highlight: 'bg-pink-500/10',
        delay: 0.1,
    },
    {
        title: 'Wallet-based authentication',
        description: 'No passwords needed. Users authenticate securely with their crypto wallets.',
        icon: Wallet,
        color: 'bg-[#1B292E]', // Dark teal-ish
        highlight: 'bg-cyan-500/10',
        delay: 0.2,
    },
    {
        title: 'USDC support',
        description: 'Accept stablecoin payments globally without volatility concerns.',
        icon: DollarSign,
        color: 'bg-[#1B202E]', // Dark blue-ish
        highlight: 'bg-blue-500/10',
        delay: 0.3,
    },
    {
        title: 'Merchant dashboard',
        description: 'Track subscribers, revenue, and churn in real-time from one place.',
        icon: LayoutDashboard,
        color: 'bg-[#2E281B]', // Dark brownish-gold
        highlight: 'bg-orange-500/10',
        delay: 0.4,
    },
    {
        title: 'Subscriber portal',
        description: 'Give users control to manage their own subscriptions easily.',
        icon: UserCircle,
        color: 'bg-[#1E1E1E]', // Neutral dark
        highlight: 'bg-gray-500/10',
        delay: 0.5,
    },
    {
        title: 'Analytics & revenue insights',
        description: 'Deep dive into your business performance with advanced analytics.',
        icon: BarChart3,
        color: 'bg-[#241B2E]', // Deep violet
        highlight: 'bg-violet-500/10',
        delay: 0.6,
    },
    {
        title: 'Webhooks & API for developers',
        description: 'Integrate seamlessly with your existing stack using our robust API.',
        icon: Webhook,
        color: 'bg-[#1B2E24]', // Dark green-ish
        highlight: 'bg-green-500/10',
        delay: 0.7,
    },
];

export default function FeaturesGrid() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!sliderRef.current) return;
        setIsDown(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDown(false);
    };

    const handleMouseUp = () => {
        setIsDown(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };
    return (
        <section className="relative py-32">
            {/* Inline style for hiding scrollbar to ensure it works across all browsers */}


            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-serif mb-6">
                        Everything you need
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Powerful tools built for the modern crypto economy.
                    </p>
                </motion.div>

                <div
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className={`flex overflow-x-auto gap-6 pb-12 -mx-6 px-6 no-scrollbar cursor-grab ${isDown ? 'cursor-grabbing active:scale-[0.99] transition-transform' : ''}`}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex-shrink-0 w-[85vw] md:w-[400px] snap-center group relative p-8 rounded-2xl bg-[#0B0B0B] border border-white/[0.08] hover:border-purple-500/30 transition-all duration-300 h-[380px] flex flex-col select-none"
                        >
                            {/* Top Purple Glow - Exact Match */}
                            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Inner Highlight (Bevel Effect) */}
                            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] pointer-events-none" />

                            <div className="relative z-10 flex-1">
                                {/* Title */}
                                <h3 className="text-2xl font-bold text-white leading-tight font-serif pr-4 mb-4 group-hover:text-purple-100 transition-colors">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 text-sm leading-relaxed mt-2">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Icon / Graphics Area - Expanded and Redesigned */}
                            <div className="w-full h-48 mt-auto rounded-xl overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500">
                                <FeatureGraphic index={index} Icon={feature.icon} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
