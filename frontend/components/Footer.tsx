'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -5,
        filter: 'blur(3px)'
    },
    visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 1.2,
            ease: "easeOut" as const
        }
    }
};

export default function Footer() {
    return (
        <footer className="relative bg-[#EAEAEA] text-[#1a1a1a] pt-20 pb-20 border-t border-[#a3a3a3]">
            <div className="max-w-[1920px] mx-auto px-4 md:px-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-0">

                    {/* Left Column: Brand & Newsletter */}
                    <div className="flex flex-col justify-between h-full lg:pr-20">
                        <div className="mb-20">
                            <motion.h2
                                initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-xl font-bold tracking-tight mb-20"
                            >
                                SOLANASUB.
                            </motion.h2>

                            <motion.h3
                                initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-3xl md:text-4xl font-bold uppercase leading-tight max-w-md"
                            >
                                POWERING THE NEXT GENERATION OF RECURRING ON-CHAIN REVENUE.
                            </motion.h3>
                        </div>

                        <div className="w-full max-w-md">
                            <form className="flex items-end gap-4 border-b border-[#a3a3a3] pb-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    suppressHydrationWarning
                                    className="flex-1 bg-transparent outline-none text-[#1a1a1a] placeholder:text-[#888] pb-1"
                                />
                                <button type="submit" className="font-bold text-sm uppercase tracking-wide hover:opacity-70 transition-opacity pb-1">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Link Directory */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:pl-10 lg:border-l border-[#a3a3a3]">

                        {/* Column 1 */}
                        <motion.div
                            className="space-y-6"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.h4 variants={itemVariants} className="text-sm text-[#666] mb-6">Tools & Infrastructure:</motion.h4>
                            <motion.ul variants={containerVariants} className="space-y-3 text-sm font-medium">
                                <motion.li variants={itemVariants}><Link href="/sdks" className="hover:text-[#666]">SDK Reference</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/resources/api-reference" className="hover:text-[#666]">API Docs</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/webhooks" className="hover:text-[#666]">Webhooks</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/pricing" className="hover:text-[#666]">Pricing</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/status" className="hover:text-[#666]">Status</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/resources/open-source" className="hover:text-[#666]">Github</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/audit" className="hover:text-[#666]">Audit</Link></motion.li>
                            </motion.ul>
                        </motion.div>

                        {/* Column 2 */}
                        <motion.div
                            className="space-y-6"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.h4 variants={itemVariants} className="text-sm text-[#666] mb-6">Build</motion.h4>
                            <motion.ul variants={containerVariants} className="space-y-3 text-sm font-medium">
                                <motion.li variants={itemVariants}><Link href="/docs/quick-start" className="hover:text-[#666]">Quickstart</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/resources" className="hover:text-[#666]">Integration Guides</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/examples" className="hover:text-[#666]">Examples</Link></motion.li>
                            </motion.ul>

                            <motion.h4 variants={itemVariants} className="text-sm text-[#666] mb-6 mt-12">Company</motion.h4>
                            <motion.ul variants={containerVariants} className="space-y-3 text-sm font-medium">
                                <motion.li variants={itemVariants}><Link href="/about" className="hover:text-[#666]">About</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/careers" className="hover:text-[#666]">Careers</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/contact" className="hover:text-[#666]">Contact</Link></motion.li>
                            </motion.ul>
                        </motion.div>

                        {/* Column 3 */}
                        <motion.div
                            className="space-y-6"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.h4 variants={itemVariants} className="text-sm text-[#666] mb-6">Community</motion.h4>
                            <motion.ul variants={containerVariants} className="space-y-3 text-sm font-medium">
                                <motion.li variants={itemVariants}><Link href="https://twitter.com" target="_blank" className="hover:text-[#666]">Twitter</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="https://discord.com" target="_blank" className="hover:text-[#666]">Discord</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/blog" className="hover:text-[#666]">Blog</Link></motion.li>
                            </motion.ul>
                        </motion.div>

                        {/* Column 4 - Empty */}
                        <div className="space-y-6">
                        </div>

                    </div>
                </div>

            </div>
        </footer>
    );
}
