'use client';

import LandingHeader from '@/components/LandingHeader';
import { ArrowLeft, Server, Database, Lock } from 'lucide-react';
import Link from 'next/link';

export default function ApiReferencePage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-12 lg:py-24">
                <Link href="/resources" className="inline-flex items-center gap-2 font-mono text-xs uppercase mb-8 hover:underline">
                    <ArrowLeft size={14} /> Back to Resources
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-12">
                        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9] mb-8">
                            API<br />Reference
                        </h1>
                        <div className="h-1 w-24 bg-black mb-12"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <p className="font-mono text-sm text-[#666] mb-8 leading-relaxed">
                                    Our REST API adheres to the OpenAPI 3.0 specification. It provides a standard interface for managing plans, subscriptions, and webhooks off-chain, while syncing with on-chain state.
                                </p>

                                <div className="space-y-6">
                                    <div className="border border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Server size={20} />
                                            <h3 className="font-bold uppercase">Base URL</h3>
                                        </div>
                                        <code className="block bg-[#EAEAEA] p-3 text-sm font-mono border border-[#ccc]">
                                            https://api.w3infra.com/v1
                                        </code>
                                    </div>

                                    <div className="border border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Lock size={20} />
                                            <h3 className="font-bold uppercase">Authentication</h3>
                                        </div>
                                        <p className="text-sm text-[#666] mb-3">
                                            Authenticate requests via Bearer Token header.
                                        </p>
                                        <code className="block bg-[#EAEAEA] p-3 text-sm font-mono border border-[#ccc]">
                                            Authorization: Bearer &lt;YOUR_API_KEY&gt;
                                        </code>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-black bg-[#1a1a1a] text-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                <h3 className="font-mono text-xs uppercase text-[#666] mb-6 border-b border-white/20 pb-2">Endpoints</h3>

                                <div className="space-y-4 font-mono text-sm">
                                    <div className="flex gap-4 items-center">
                                        <span className="text-green-400 font-bold w-16">GET</span>
                                        <span className="text-[#a3a3a3]">/plans</span>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <span className="text-blue-400 font-bold w-16">POST</span>
                                        <span className="text-[#a3a3a3]">/plans</span>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <span className="text-green-400 font-bold w-16">GET</span>
                                        <span className="text-[#a3a3a3]">/subscriptions/:id</span>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <span className="text-yellow-400 font-bold w-16">PUT</span>
                                        <span className="text-[#a3a3a3]">/subscriptions/:id/cancel</span>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <span className="text-red-400 font-bold w-16">DELETE</span>
                                        <span className="text-[#a3a3a3]">/webhooks/:id</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
