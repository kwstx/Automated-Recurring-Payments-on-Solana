'use client';

import LandingHeader from '@/components/LandingHeader';
import { ArrowLeft, XCircle, RotateCcw, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function CancellationsGuide() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-12 lg:py-24">
                <Link href="/resources" className="inline-flex items-center gap-2 font-mono text-xs mb-8 hover:underline">
                    <ArrowLeft size={14} /> Back to Resources
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <span className="text-xs font-mono font-bold mb-4 block text-[#666]">TUTORIAL • 10 MIN READ</span>
                        <h1 className="text-4xl md:text-6xl font-bold leading-[0.9] mb-8">
                            Handling<br />Cancellations
                        </h1>
                        <div className="h-1 w-24 bg-black mb-12"></div>

                        <div className="prose prose-lg max-w-none font-mono">
                            <p className="lead text-xl">
                                Best practices for managing user churn, off-boarding flows, and handling cancellation events on-chain.
                            </p>

                            <hr className="border-black my-12" />

                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <XCircle className="w-6 h-6" /> 1. The Cancel Instruction
                            </h3>
                            <p className="mb-6 text-sm text-[#333]">
                                When a user cancels, you must execute the `cancel_subscription` instruction. This marks the subscription account as inactive but keeps the data for history.
                            </p>

                            <div className="bg-[#1a1a1a] text-white p-6 border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
                                <pre className="font-mono text-sm overflow-x-auto">
                                    <code>
                                        {`await client.cancelSubscription({
    subscriptionAddress: userSubscriptionPda,
    reason: "User requested cancellation"
});`}
                                    </code>
                                </pre>
                            </div>

                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <MessageSquare className="w-6 h-6" /> 2. Exit Surveys
                            </h3>
                            <p className="mb-6 text-sm text-[#333]">
                                How to integrate a feedback form before the on-chain transaction is signed to understand churn reasons.
                            </p>

                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <RotateCcw className="w-6 h-6" /> 3. Win-Back Strategies
                            </h3>
                            <p className="mb-6 text-sm text-[#333]">
                                Techniques for offering discounts or pausing subscriptions instead of full cancellation.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-24 border border-black p-6 bg-white">
                            <h4 className="font-bold mb-4">In this tutorial</h4>
                            <ul className="space-y-3 font-mono text-sm text-[#666]">
                                <li className="hover:text-black cursor-pointer">1. The Cancel Instruction</li>
                                <li className="hover:text-black cursor-pointer">2. Exit Surveys</li>
                                <li className="hover:text-black cursor-pointer">3. Win-Back Strategies</li>
                                <li className="hover:text-black cursor-pointer">4. Webhook Events</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
