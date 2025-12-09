'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const insights = [
    {
        id: 1,
        date: 'May 19, 2025',
        title: 'Things to Know Before Dropping Into a Solana Dev Sprint',
        description: 'Tips from builders who don\'t wait for mainnet to get ready.',
        imageColor: 'bg-[#1a1a1a]' // Placeholder color
    },
    {
        id: 2,
        date: 'May 28, 2025',
        title: 'Solana, Rules, and What Economists Get Wrong',
        description: 'Professor Baetjer on crypto, policy, and where Web3 diverges.',
        imageColor: 'bg-[#333333]' // Placeholder color
    },
    {
        id: 3,
        date: 'May 30, 2025',
        title: 'Running Your Workflow Locally — No Cloud, No Friction',
        description: 'Sync your code with the chain without leaving your editor.',
        imageColor: 'bg-[#555555]' // Placeholder color
    }
];

export default function InsightsSection() {
    return (
        <section className="relative w-full text-[#1a1a1a] bg-[#C0C0C0] min-h-screen flex flex-col pb-32">
            {/* Vertical Line absolute - Preserved */}
            <div className="absolute top-0 bottom-0 left-[70%] w-px bg-[#a3a3a3] hidden md:block pointer-events-none z-0"></div>

            {/* Grid Layout Container */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 relative z-10">

                {/* Header Section (Row 1, Cols 1-2) */}
                <div className="md:col-span-2 p-6 md:p-10 flex flex-col justify-center">
                    <span className="text-xs font-mono font-bold tracking-wider mb-4 block">[03] BLOG</span>
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none max-w-lg mb-0 text-black">
                        FRESH INSIGHTS &<br />
                        CHAIN-LEVEL<br />
                        WALKTHROUGHS
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
                            <div className="px-6 md:px-8 pb-0 shrink-0">
                                <div className={`w-full aspect-square ${insight.imageColor} relative overflow-hidden group-hover:opacity-90 transition-opacity duration-300`}>
                                    {/* Placeholder Content */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white/20 font-mono text-xs">
                                            IMG
                                        </div>
                                    </div>
                                </div>
                            </div>

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

                                <Link href="#" className="flex items-center gap-1 font-bold text-xs uppercase tracking-wide hover:gap-2 transition-all mt-auto shrink-0">
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
