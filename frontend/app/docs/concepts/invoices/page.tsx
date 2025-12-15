'use client';

import LandingHeader from '@/components/LandingHeader';
import DocsSidebar from '@/components/DocsSidebar';
import Image from 'next/image';

export default function InvoicesConceptPage() {
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

            <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <DocsSidebar />

                    <div className="lg:col-span-3">
                        <div className="mb-12">
                            <span className="text-xs font-mono font-bold mb-4 block text-[#666]">CORE CONCEPTS</span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Invoices</h1>
                            <p className="text-lg leading-relaxed font-mono text-[#333]">
                                While on-chain payments are atomic, we generate off-chain invoice records for accounting and tax compliance.
                            </p>
                        </div>

                        <div className="prose max-w-none font-mono text-sm leading-7">
                            <h3 className="text-xl font-bold mb-4 font-sans">Record Keeping</h3>
                            <p className="mb-4">
                                Every successful charge event emitted by the smart contract is indexed and converted into a downloadable PDF invoice available in the Merchant Dashboard and Subscriber Portal.
                            </p>

                            <div className="p-6 bg-[#EAEAEA] border-l-4 border-black mb-8 rounded-xl">
                                <p className="font-bold mb-2">Note</p>
                                <p>Invoices are generated using the exchange rate at the time of transaction for tax purposes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
