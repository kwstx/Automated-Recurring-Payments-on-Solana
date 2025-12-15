'use client';

import LandingHeader from '@/components/LandingHeader';
import { ArrowLeft, Github, Star, GitFork, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function OpenSourcePage() {
    const repos = [
        {
            name: 'solana-subscription-protocol',
            desc: 'The core Anchor program for recurring payments on Solana.',
            stars: '1.2k',
            forks: '234'
        },
        {
            name: 'w3-infra-sdk',
            desc: 'TypeScript and Rust client libraries for interacting with the protocol.',
            stars: '856',
            forks: '120'
        },
        {
            name: 'keeper-bot-reference',
            desc: 'Reference implementation for a decentralized keeper bot.',
            stars: '430',
            forks: '89'
        }
    ];

    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-12 lg:py-24">
                <Link href="/resources" className="inline-flex items-center gap-2 font-mono text-xs mb-8 hover:underline">
                    <ArrowLeft size={14} /> Back to Resources
                </Link>

                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] mb-8">
                        Open<br />Source
                    </h1>
                    <div className="h-1 w-24 bg-black mb-12"></div>

                    <p className="font-mono text-lg text-[#333] mb-16 leading-relaxed border-l-4 border-black pl-6 py-2">
                        Built by ZyoPay Infra is committed to decentralization. Our core protocol and tooling are fully open source and community-governed.
                    </p>

                    <div className="grid gap-6">
                        {repos.map((repo) => (
                            <div key={repo.name} className="border border-black bg-white p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <Github size={24} />
                                        <h3 className="text-xl font-bold font-mono group-hover:underline">{repo.name}</h3>
                                    </div>
                                    <ExternalLink size={18} className="text-[#999] group-hover:text-black" />
                                </div>

                                <p className="text-[#666] mb-6 font-mono text-sm">{repo.desc}</p>

                                <div className="flex gap-6 text-xs font-bold">
                                    <div className="flex items-center gap-1">
                                        <Star size={14} /> {repo.stars} Stars
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <GitFork size={14} /> {repo.forks} Forks
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-[#1a1a1a] text-white p-8 border border-black text-center">
                        <h3 className="text-2xl font-bold mb-4">Contribute</h3>
                        <p className="font-mono text-sm text-[#a3a3a3] mb-8 max-w-lg mx-auto">
                            We welcome contributions from the community. Check out our contribution guidelines and good first issues on GitHub.
                        </p>
                        <button className="bg-white text-black px-8 py-3 font-bold hover:bg-[#ccc] transition-colors">
                            Read Guidelines
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
