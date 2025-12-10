'use client';

import LandingHeader from '@/components/LandingHeader';
import { Webhook, Shield, RefreshCw, Zap } from 'lucide-react';

export default function WebhooksPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-12 lg:py-24">
                <div className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9] mb-8">
                        Real-Time<br />
                        Event Streams
                    </h1>
                    <div className="h-1 w-24 bg-black mb-8"></div>
                    <p className="text-lg leading-relaxed font-mono max-w-2xl">
                        Subscribe to on-chain events with sub-second latency. Our webhook infrastructure ensures you never miss a payment, cancellation, or renewal.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    <div className="p-8 border border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                        <Shield className="w-10 h-10 mb-6" strokeWidth={1.5} />
                        <h3 className="text-xl font-bold uppercase mb-4">Secure Signatures</h3>
                        <p className="text-sm text-[#666] font-mono leading-relaxed">
                            All payloads are signed with HMAC-SHA256 using your secret key. Verify origin authenticity effortlessly.
                        </p>
                    </div>
                    <div className="p-8 border border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                        <RefreshCw className="w-10 h-10 mb-6" strokeWidth={1.5} />
                        <h3 className="text-xl font-bold uppercase mb-4">Auto-Retries</h3>
                        <p className="text-sm text-[#666] font-mono leading-relaxed">
                            Exponential backoff for failed deliveries. We attempt delivery up to 10 times over 24 hours.
                        </p>
                    </div>
                    <div className="p-8 border border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                        <Zap className="w-10 h-10 mb-6" strokeWidth={1.5} />
                        <h3 className="text-xl font-bold uppercase mb-4">Zero Latency</h3>
                        <p className="text-sm text-[#666] font-mono leading-relaxed">
                            Events are emitted immediately after block finalization. Sync your database in real-time.
                        </p>
                    </div>
                </div>

                <div className="border-t border-black pt-16">
                    <h2 className="text-3xl font-bold uppercase mb-8">Event Catalog</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-mono text-sm">
                        <div className="border border-[#a3a3a3] bg-white p-4 flex items-center justify-between">
                            <span className="font-bold">subscription.created</span>
                            <span className="text-[#666]">Triggered when a new user subscribes</span>
                        </div>
                        <div className="border border-[#a3a3a3] bg-white p-4 flex items-center justify-between">
                            <span className="font-bold">payment.succeeded</span>
                            <span className="text-[#666]">Triggered on successful charge</span>
                        </div>
                        <div className="border border-[#a3a3a3] bg-white p-4 flex items-center justify-between">
                            <span className="font-bold">payment.failed</span>
                            <span className="text-[#666]">Triggered on insufficient funds</span>
                        </div>
                        <div className="border border-[#a3a3a3] bg-white p-4 flex items-center justify-between">
                            <span className="font-bold">subscription.cancelled</span>
                            <span className="text-[#666]">Triggered on user cancellation</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
