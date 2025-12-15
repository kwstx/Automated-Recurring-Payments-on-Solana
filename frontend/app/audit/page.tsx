'use client';

import LandingHeader from '@/components/LandingHeader';
import { ShieldCheck, Download } from 'lucide-react';

export default function AuditPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-24">
                <div className="max-w-4xl mx-auto">
                    <span className="text-xs font-mono font-bold mb-6 block text-[#666]">SECURITY</span>
                    <h1 className="text-4xl md:text-6xl font-bold leading-[0.9] mb-12">
                        SMART CONTRACT<br />AUDIT REPORTS
                    </h1>

                    <p className="text-lg leading-relaxed font-mono text-[#333] mb-12">
                        Safety is our top priority. Our on-chain programs are audited by top-tier security firms to ensure fund safety and protocol integrity.
                    </p>

                    <div className="grid gap-6">
                        <div className="bg-white border border-black p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group">
                            <div className="flex items-start gap-4">
                                <div className="bg-black text-white p-3">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-1">OtterSec Audit</h3>
                                    <p className="text-sm font-mono text-[#666]">Completed Oct 2025 • v1.0.0</p>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 font-bold text-sm border border-black px-4 py-2 group-hover:bg-black group-hover:text-white transition-colors">
                                <Download size={16} /> Download PDF
                            </button>
                        </div>

                        <div className="bg-white border border-black p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 opacity-60">
                            <div className="flex items-start gap-4">
                                <div className="bg-[#ccc] text-white p-3">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-1">Halborn Audit</h3>
                                    <p className="text-sm font-mono text-[#666]">In Progress • Scheduled Q1 2026</p>
                                </div>
                            </div>
                            <div className="font-bold text-sm border border-[#ccc] text-[#999] px-4 py-2">
                                Pending
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
