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
        <footer className="relative z-10 bg-neutral-100 text-neutral-900 pt-24 pb-24 border-t border-neutral-200">
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
                                className="text-xl font-bold tracking-tight mb-8 text-neutral-900"
                            >
                                ZYOPAY.
                            </motion.h2>

                            <motion.h3
                                initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-3xl md:text-4xl font-bold leading-tight max-w-md text-neutral-900"
                            >
                                Powering the next generation of recurring on-chain revenue.
                            </motion.h3>
                        </div>


                    </div>

                    {/* Right Column: Link Directory */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:pl-10 lg:border-l border-neutral-200">

                        {/* Column 1 */}
                        <motion.div
                            className="space-y-6"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.h4 variants={itemVariants} className="text-sm text-neutral-900 mb-6 font-semibold uppercase tracking-wider">Tools</motion.h4>
                            <motion.ul variants={containerVariants} className="space-y-4 text-sm font-medium text-neutral-600">
                                <motion.li variants={itemVariants}><Link href="/sdks" className="hover:text-neutral-900 transition-colors">SDK Reference</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/resources/api-reference" className="hover:text-neutral-900 transition-colors">API Docs</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/webhooks" className="hover:text-neutral-900 transition-colors">Webhooks</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/pricing" className="hover:text-neutral-900 transition-colors">Pricing</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/status" className="hover:text-neutral-900 transition-colors">Status</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/resources/open-source" className="hover:text-neutral-900 transition-colors">Github</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/audit" className="hover:text-neutral-900 transition-colors">Audit</Link></motion.li>
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
                            <motion.h4 variants={itemVariants} className="text-sm text-neutral-900 mb-6 font-semibold uppercase tracking-wider">Build</motion.h4>
                            <motion.ul variants={containerVariants} className="space-y-4 text-sm font-medium text-neutral-600">
                                <motion.li variants={itemVariants}><Link href="/docs/quick-start" className="hover:text-neutral-900 transition-colors">Quickstart</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/resources" className="hover:text-neutral-900 transition-colors">Integration Guides</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="/examples" className="hover:text-neutral-900 transition-colors">Examples</Link></motion.li>
                            </motion.ul>

                            <motion.h4 variants={itemVariants} className="text-sm text-neutral-900 mb-6 mt-12 font-semibold uppercase tracking-wider">Project</motion.h4>
                            <motion.ul variants={containerVariants} className="space-y-4 text-sm font-medium text-neutral-600">
                                <motion.li variants={itemVariants}><Link href="/about" className="hover:text-neutral-900 transition-colors">About</Link></motion.li>

                                <motion.li variants={itemVariants}><Link href="/contact" className="hover:text-neutral-900 transition-colors">Contact</Link></motion.li>
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
                            <motion.h4 variants={itemVariants} className="text-sm text-neutral-900 mb-6 font-semibold uppercase tracking-wider">Community</motion.h4>
                            <motion.ul variants={containerVariants} className="space-y-4 text-sm font-medium text-neutral-600">
                                <motion.li variants={itemVariants}><Link href="https://twitter.com" target="_blank" className="hover:text-neutral-900 transition-colors">Twitter</Link></motion.li>
                                <motion.li variants={itemVariants}><Link href="https://discord.com" target="_blank" className="hover:text-neutral-900 transition-colors">Discord</Link></motion.li>

                            </motion.ul>
                        </motion.div>

                        {/* Column 4 - Empty for spacing/balance */}
                        <div className="space-y-6">
                        </div>

                    </div>
                </div>

            </div>
        </footer>
    );
}
