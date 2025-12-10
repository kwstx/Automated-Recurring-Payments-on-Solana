'use client';

import LandingHeader from '@/components/LandingHeader';
import DocsSidebar from '@/components/DocsSidebar';

export default function SubscriptionsConceptPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <DocsSidebar />

                    <div className="lg:col-span-3">
                        <div className="mb-12">
                            <span className="text-xs font-mono font-bold tracking-wider mb-4 block text-[#666]">CORE CONCEPTS</span>
                            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6">Subscriptions</h1>
                            <p className="text-lg leading-relaxed font-mono text-[#333]">
                                A Subscription represents a user's active agreement to a Plan. It tracks payment status and validity periods.
                            </p>
                        </div>

                        <div className="prose max-w-none font-mono text-sm leading-7">
                            <h3 className="text-xl font-bold uppercase mb-4 font-sans">Lifecycle</h3>
                            <ul className="list-disc pl-4 space-y-2 mb-8">
                                <li><strong>Active:</strong> Payment is up to date. Access granted.</li>
                                <li><strong>Past Due:</strong> Payment failed or was missed. Grace period active.</li>
                                <li><strong>Cancelled:</strong> User or merchant ended the agreement. No further charges.</li>
                            </ul>

                            <h3 className="text-xl font-bold uppercase mb-4 font-sans">PDA Structure</h3>
                            <p className="mb-4">
                                Subscription addresses are derived deterministically:
                            </p>
                            <div className="bg-[#1a1a1a] text-white p-4 mb-8 border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <code>findProgramAddress([b"subscription", user_key, plan_key])</code>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
