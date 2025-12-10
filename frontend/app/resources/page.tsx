'use client';

import LandingHeader from '@/components/LandingHeader';
import { BookOpen, FileCode, Github, Youtube, ArrowRight } from 'lucide-react';

export default function ResourcesPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-12 lg:py-24">
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9] mb-16">
                    Developer<br />
                    Resources
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Documentation Card */}
                    <div className="group border border-black bg-white p-8 relative overflow-hidden cursor-pointer">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight size={24} />
                        </div>
                        <BookOpen className="w-8 h-8 mb-6" strokeWidth={1.5} />
                        <h3 className="text-2xl font-bold uppercase mb-2">Documentation</h3>
                        <p className="font-mono text-sm text-[#666] mb-8">
                            Comprehensive guides, API references, and integration tutorials for all stacks.
                        </p>
                        <span className="text-xs font-bold uppercase underline">Start Reading</span>
                    </div>

                    {/* API Reference Card */}
                    <div className="group border border-black bg-white p-8 relative overflow-hidden cursor-pointer">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight size={24} />
                        </div>
                        <FileCode className="w-8 h-8 mb-6" strokeWidth={1.5} />
                        <h3 className="text-2xl font-bold uppercase mb-2">API Reference</h3>
                        <p className="font-mono text-sm text-[#666] mb-8">
                            OpenAPI 3.0 specification for our REST API. Interactive playground available.
                        </p>
                        <span className="text-xs font-bold uppercase underline">Explore API</span>
                    </div>

                    {/* GitHub Card */}
                    <div className="group border border-black bg-white p-8 relative overflow-hidden cursor-pointer">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight size={24} />
                        </div>
                        <Github className="w-8 h-8 mb-6" strokeWidth={1.5} />
                        <h3 className="text-2xl font-bold uppercase mb-2">Open Source</h3>
                        <p className="font-mono text-sm text-[#666] mb-8">
                            Explore our public repositories, SDKs, and example implementations.
                        </p>
                        <span className="text-xs font-bold uppercase underline">View on GitHub</span>
                    </div>
                </div>

                <div className="mt-24 border-t border-black pt-16">
                    <h2 className="text-3xl font-bold uppercase mb-8">Latest Guides</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="border border-[#a3a3a3] bg-white p-6 hover:border-black transition-colors cursor-pointer">
                            <span className="text-xs font-mono text-[#666] mb-2 block">GUIDE • 5 MIN READ</span>
                            <h4 className="text-xl font-bold uppercase mb-2">Implementing Token Gating</h4>
                            <p className="text-sm text-[#666]">Learn how to restrict access to your content based on NFT ownership.</p>
                        </div>
                        <div className="border border-[#a3a3a3] bg-white p-6 hover:border-black transition-colors cursor-pointer">
                            <span className="text-xs font-mono text-[#666] mb-2 block">TUTORIAL • 10 MIN READ</span>
                            <h4 className="text-xl font-bold uppercase mb-2">Handling Subscription Cancellations</h4>
                            <p className="text-sm text-[#666]">Best practices for managing user churn and off-boarding flows.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
