'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const insights = [
    {
        id: 1,
        slug: 'optimizing-payment-streams',
        date: 'Dec 02, 2024',
        title: 'Optimizing High-Frequency Payment Streams on Mainnet',
        description: 'Best practices for reducing latency in high-volume recurring transaction loops.',
        image: '/blog-1.jpg'
    },
    {
        id: 2,
        slug: 'token-gating',
        date: 'Dec 08, 2024',
        title: 'Token Gating: Designing Permissionless Access Tiers',
        description: 'Strategies for implementing tier-based access control using SPL tokens.',
        image: '/blog-2.png'
    },
    {
        id: 3,
        slug: 'scaling-infrastructure',
        date: 'Dec 12, 2024',
        title: 'Designing Scalable Subscription Infrastructure',
        description: 'How we architected our subscription infrastructure to handle high throughput.',
        image: '/blog-3.png'
    }
];

export default function InsightsSection() {
    return (
        <section className="relative z-10 w-full text-[#1a1a1a] bg-[#C0C0C0] min-h-screen flex flex-col pb-32">
            {/* Vertical Line absolute - Preserved */}
            <div className="absolute top-0 bottom-0 left-[70%] w-px bg-[#a3a3a3] hidden md:block pointer-events-none z-0"></div>

            {/* Grid Layout Container */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 relative z-10">

                {/* Header Section (Row 1, Cols 1-2) */}
                <div className="md:col-span-2 p-6 md:p-10 flex flex-col justify-center">
                    <span className="text-xs font-mono font-bold tracking-wider mb-4 block">[03] BLOG</span>
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none max-w-lg mb-0 text-black">
                        LATEST UPDATES &<br />
                        PROTOCOL<br />
                        UPGRADES
                    </h2>
                </div>

                {/* Empty Spacer (Row 1, Col 3) */}
                <div className="hidden md:block md:col-span-1"></div>

                {/* Blog Posts (Row 2, Cols 1-3) */}
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3">
                    {insights.map((insight, index) => (
                        <div
                            key={insight.id}
                            className="group flex flex-col h-full"
                        >
                            {/* Image Placeholder - Full width within column padding */}
                            <motion.div
                                className="px-6 md:px-8 pb-0 shrink-0"
                                initial={{ y: -50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                            >
                                <div className="w-full aspect-square relative overflow-hidden group-hover:opacity-90 transition-opacity duration-300 bg-gray-200">
                                    <Image
                                        src={insight.image}
                                        alt={insight.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>

                            {/* Content */}
                            <div className="px-6 md:px-8 pt-6 pb-6 flex flex-col flex-1 justify-between">
                                <div>
                                    <span className="text-xs text-[#666] mb-2 block font-mono uppercase">{insight.date}</span>

                                    <h3 className="text-sm md:text-base font-bold leading-tight mb-2 group-hover:underline decoration-1 underline-offset-4 line-clamp-2">
                                        {insight.title}
                                    </h3>

                                    <p className="text-xs leading-relaxed text-[#444] mb-4">
                                        {insight.description}
                                    </p>
                                </div>

                                <Link href={`/blog/${insight.slug}`} className="flex items-center gap-1 font-bold text-xs uppercase tracking-wide hover:gap-2 transition-all mt-auto shrink-0">
                                    [Read more]
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Spacing to ensure descriptions are clearly visible if at bottom */}
            <div className="h-10 w-full md:hidden"></div>
        </section>
    );
}
