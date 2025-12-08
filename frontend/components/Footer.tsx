'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative bg-[#EAEAEA] text-[#1a1a1a] pt-20 pb-20 border-t border-[#a3a3a3]">
            <div className="max-w-[1920px] mx-auto px-4 md:px-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-0">

                    {/* Left Column: Brand & Newsletter */}
                    <div className="flex flex-col justify-between h-full lg:pr-20">
                        <div className="mb-20">
                            <h2 className="text-xl font-bold tracking-tight mb-20">SOLANASUB.</h2>

                            <h3 className="text-3xl md:text-4xl font-bold uppercase leading-tight max-w-md">
                                GET EARLY ACCESS TO CHAIN-UPDATES, PROTOCOL RESEARCH & ENGINEERING BRIEFS.
                            </h3>
                        </div>

                        <div className="w-full max-w-md">
                            <form className="flex items-end gap-4 border-b border-[#a3a3a3] pb-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 bg-transparent outline-none text-[#1a1a1a] placeholder:text-[#888] pb-1"
                                />
                                <button type="submit" className="font-bold text-sm uppercase tracking-wide hover:opacity-70 transition-opacity pb-1">
                                    Join Feed
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Link Directory */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:pl-10 lg:border-l border-[#a3a3a3]">

                        {/* Column 1 */}
                        <div className="space-y-6">
                            <h4 className="text-sm text-[#666] mb-6">Tools & Infrastructure:</h4>
                            <ul className="space-y-3 text-sm font-medium">
                                <li><Link href="#" className="hover:text-[#666]">ChainFrame</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">Ordinal Matrix</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">PulseView</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">IndexNode</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">HookSync</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">LogicField</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">CodeBridge</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">DepthScan</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">SideLayers</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">stack.lib</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">core.rpc</Link></li>
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-6">
                            <h4 className="text-sm text-[#666] mb-6">Build</h4>
                            <ul className="space-y-3 text-sm font-medium">
                                <li><Link href="#" className="hover:text-[#666]">Tech Manual</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">Starter Projects</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">Hands-on Patterns</Link></li>
                            </ul>

                            <h4 className="text-sm text-[#666] mb-6 mt-12">Company</h4>
                            <ul className="space-y-3 text-sm font-medium">
                                <li><Link href="#" className="hover:text-[#666]">Open Roles</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">Team Story</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">Pressroom</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">Exploit Reward Program</Link></li>
                            </ul>
                        </div>

                        {/* Column 3 (Using Community for referencing reference) */}
                        <div className="space-y-6">
                            <h4 className="text-sm text-[#666] mb-6">Community</h4>
                            <ul className="space-y-3 text-sm font-medium">
                                <li><Link href="#" className="hover:text-[#666]">Twitter</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">Dev Chat</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">Repo Vault</Link></li>
                                <li><Link href="#" className="hover:text-[#666]">WorkGraph</Link></li>
                            </ul>
                        </div>

                        {/* Column 4 - Empty or extra links? Reference shows 3 main cols text but 4 visual columns layout roughly */}
                        <div className="space-y-6">
                            {/* Empty for spacing or future links to match spacing of reference */}
                        </div>

                    </div>
                </div>

            </div>
        </footer>
    );
}
