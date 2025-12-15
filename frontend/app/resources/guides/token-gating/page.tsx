'use client';

import LandingHeader from '@/components/LandingHeader';
import { ArrowLeft, Lock, Key, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function TokenGatingGuide() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-12 lg:py-24">
                <Link href="/resources" className="inline-flex items-center gap-2 font-mono text-xs mb-8 hover:underline">
                    <ArrowLeft size={14} /> Back to Resources
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <span className="text-xs font-mono font-bold mb-4 block text-[#666]">GUIDE • 5 MIN READ</span>
                        <h1 className="text-4xl md:text-6xl font-bold leading-[0.9] mb-8">
                            Implementing<br />Token Gating
                        </h1>
                        <div className="h-1 w-24 bg-black mb-12"></div>

                        <div className="prose prose-lg max-w-none font-mono">
                            <p className="lead text-xl">
                                Learn how to restrict access to your dApp features or content based on a user's active subscription status using our SDK.
                            </p>

                            <hr className="border-black my-12" />

                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Lock className="w-6 h-6" /> 1. Verify On-Chain Status
                            </h3>
                            <p className="mb-6 text-sm text-[#333]">
                                The core of token gating is verifying that a user holds a valid subscription PDA for your specific plan.
                                This verification happens directly on-chain, ensuring trustless access control.
                            </p>

                            <div className="bg-[#1a1a1a] text-white p-6 border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
                                <pre className="font-mono text-sm overflow-x-auto">
                                    <code>
                                        {`// Check if user has an active subscription
const subscription = await client.getSubscription(
    userPublicKey, 
    planPublicKey
);

if (subscription.isActive && !subscription.isExpired) {
    grantAccess();
} else {
    redirectToPayment();
}`}
                                    </code>
                                </pre>
                            </div>

                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Key className="w-6 h-6" /> 2. Generate Access Token
                            </h3>
                            <p className="mb-6 text-sm text-[#333]">
                                detailed explanation of how to issue a JWT or session token after on-chain verification for subsequent off-chain requests.
                            </p>

                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6" /> 3. Handle Expiration
                            </h3>
                            <p className="mb-6 text-sm text-[#333]">
                                Strategies for handling subscription expiration mid-session and prompting users to renew.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-24 border border-black p-6 bg-white">
                            <h4 className="font-bold mb-4">In this guide</h4>
                            <ul className="space-y-3 font-mono text-sm text-[#666]">
                                <li className="hover:text-black cursor-pointer">1. On-Chain Verification</li>
                                <li className="hover:text-black cursor-pointer">2. Access Tokens</li>
                                <li className="hover:text-black cursor-pointer">3. Expiration Handling</li>
                                <li className="hover:text-black cursor-pointer">4. Frontend Integration</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
