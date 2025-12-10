'use client';

import LandingHeader from '@/components/LandingHeader';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <span className="text-xs font-mono font-bold tracking-wider mb-6 block text-[#666]">CONTACT</span>
                        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-12">
                            GET IN<br />TOUCH
                        </h1>
                        <p className="text-lg font-mono text-[#333] mb-12 max-w-md">
                            Have questions about enterprise integration or partnership opportunities? Reach out directly.
                        </p>

                        <div className="space-y-8 font-mono text-sm">
                            <div>
                                <h3 className="font-bold uppercase mb-1">General Inquiries</h3>
                                <a href="mailto:hello@solanasub.com" className="hover:underline">hello@solanasub.com</a>
                            </div>
                            <div>
                                <h3 className="font-bold uppercase mb-1">Support</h3>
                                <a href="mailto:support@solanasub.com" className="hover:underline">support@solanasub.com</a>
                            </div>
                            <div>
                                <h3 className="font-bold uppercase mb-1">Office</h3>
                                <p className="text-[#666]">
                                    123 Decentralized Way<br />
                                    New York, NY 10012
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold tracking-wider uppercase text-[#666]">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full bg-transparent border-b border-[#a3a3a3] px-0 py-3 text-[#1a1a1a] outline-none focus:border-black transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold tracking-wider uppercase text-[#666]">Subject</label>
                                <select className="w-full bg-transparent border-b border-[#a3a3a3] px-0 py-3 text-[#1a1a1a] outline-none focus:border-black transition-colors rounded-none appearance-none">
                                    <option>Enterprise Inquiry</option>
                                    <option>Technical Support</option>
                                    <option>Partnership</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold tracking-wider uppercase text-[#666]">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-transparent border-b border-[#a3a3a3] px-0 py-3 text-[#1a1a1a] outline-none focus:border-black transition-colors resize-none"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <button className="w-full bg-black text-white py-4 font-bold uppercase hover:bg-[#333] transition-colors mt-4">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
