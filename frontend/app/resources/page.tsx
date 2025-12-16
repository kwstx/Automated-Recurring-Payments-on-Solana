'use client';

import LandingHeader from '@/components/LandingHeader';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ResourcesPage() {
    return (
        <div className="min-h-screen text-black font-sans relative overflow-x-hidden">

            {/* Background Image Gradient */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="relative w-full h-full">
                    <Image
                        src="/resources-bg-v2.png"
                        alt="Background Gradient"
                        fill
                        className="object-cover opacity-100 object-top"
                        priority
                    />
                </div>
            </div>

            <LandingHeader transparent={true} />

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 lg:py-16">

                {/* Centered Hero-Style Header */}
                <div className="text-center mb-16 relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-black">
                        What are Solana<br />
                        Subscriptions?
                    </h1>
                    <p className="text-[#666] text-sm md:text-base font-medium tracking-normal max-w-2xl mx-auto leading-relaxed">
                        ZyoPay enables automated, on-chain recurring revenue for the modern Web3 economy. Understand the core infrastructure that powers decentralized subscription models.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-left relative z-10">

                    {/* Left Content Column (Main) */}
                    <div className="md:col-span-8 lg:col-span-9">

                        <hr className="border-black/10 mb-12" />

                        {/* Section 1 */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">1. On-Chain Automation</h2>
                            <div className="space-y-4">
                                <p className="leading-relaxed text-[#1a1a1a]/80">
                                    ZyoPay leverages Solana's high throughput to execute non-custodial recurring transactions. Our smart contracts handle the complexities of scheduling, retries, and failure management, ensuring your subscribers are billed accurately and on time without centralized intermediaries.
                                </p>
                            </div>
                        </div>

                        {/* Section 2 (Web3 Revenue) */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">2. Web3 Revenue Infrastructure</h2>
                            <div className="space-y-4">
                                <p className="leading-relaxed text-[#1a1a1a]/80">
                                    Beyond simple transfers, ZyoPay provides a full-stack revenue platform. From easy-to-integrate SDKs to comprehensive analytics dashboards, we provide the tooling necessary to scale your SaaS or content platform on Solana.
                                </p>
                                <p className="leading-relaxed text-[#1a1a1a]/80">
                                    <span className="font-bold text-black">Sovereignty & Scale:</span> Compete with Web2 efficiency while retaining Web3 sovereignty. Our infrastructure modules are designed to be composable, allowing you to build custom billing flows that fit your protocol's needs.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right Sidebar */}
                    <aside className="md:col-span-4 lg:col-span-3 hidden md:flex flex-col gap-8 text-right">
                        <div className="flex flex-col gap-2 font-medium text-sm text-gray-500 underline underline-offset-4 decoration-gray-300">
                            <Link href="/docs" className="hover:text-black">Documentation</Link>
                            <Link href="/docs" className="hover:text-black">API Reference</Link>
                            <Link href="/sdks" className="hover:text-black">SDKs</Link>
                            <a href="https://github.com/kwstx/Automated-Recurring-Payments-on-Solana" target="_blank" rel="noopener noreferrer" className="hover:text-black">Github</a>
                            <Link href="/community" className="hover:text-black">Community</Link>
                            <Link href="/contact" className="hover:text-black">Support</Link>
                        </div>

                        {/* Floating Card Mimic */}
                        <div className="mt-8 bg-white border border-black rounded-lg p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-left relative overflow-hidden">

                            <div className="absolute -right-4 -top-4 w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-xl opacity-50" />

                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-gray-100 rounded-full"><User size={16} /></div>
                                    <span className="font-bold text-sm leading-tight">Ready to start building?</span>
                                </div>
                            </div>

                            <div className="text-sm">
                                <p className="font-bold mb-2 text-pink-500">Developer Access</p>
                                <p className="text-gray-600 mb-6 font-medium">Get your API keys and start integrating ZyoPay into your dApp today.</p>

                                <Link href="/dashboard" className="block w-full">
                                    <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold w-full hover:bg-gray-800 transition-colors">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
