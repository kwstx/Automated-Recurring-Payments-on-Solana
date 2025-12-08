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
        <section className="relative w-full text-[#1a1a1a] bg-[#EAEAEA] pb-20">
            {/* Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#a3a3a3]">
                <div className="p-6 md:p-10 border-r-0 md:border-r border-[#a3a3a3]">
                    <span className="text-xs font-mono font-bold tracking-wider mb-2 block">[03] BLOG</span>
                </div>
                <div className="p-6 md:p-10 flex items-end">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none max-w-lg">
                        FRESH INSIGHTS &<br />
                        CHAIN-LEVEL<br />
                        WALKTHROUGHS
                    </h2>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#a3a3a3]">
                {insights.map((insight, index) => (
                    <div
                        key={insight.id}
                        className={`group border-r border-[#a3a3a3] last:border-r-0 flex flex-col`}
                    >
                        {/* Image Placeholder */}
                        <div className="p-6 md:p-8 pb-0">
                            <div className={`w-full aspect-square ${insight.imageColor} relative overflow-hidden group-hover:opacity-90 transition-opacity duration-300`}>
                                {/* Placeholder Content */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white/20 font-mono text-sm">
                                        IMG
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 flex flex-col flex-1">
                            <span className="text-xs text-[#666] mb-4 block font-mono">{insight.date}</span>

                            <h3 className="text-lg md:text-xl font-bold leading-tight mb-4 group-hover:underline decoration-1 underline-offset-4">
                                {insight.title}
                            </h3>

                            <p className="text-sm leading-relaxed text-[#444] mb-8 flex-1">
                                {insight.description}
                            </p>

                            <Link href="#" className="flex items-center gap-1 font-bold text-sm uppercase tracking-wide hover:gap-2 transition-all">
                                [Read more]
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom spacer line */}
            <div className="w-full border-t border-[#a3a3a3] mt-20"></div>
        </section>
    );
}
