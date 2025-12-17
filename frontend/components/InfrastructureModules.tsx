'use client';

import { motion } from 'framer-motion';
import { RefreshCw, Ticket, FileText, BarChart3, Lock, Users } from 'lucide-react';

const modules = [
    {
        id: 'recurring',
        title: 'RECURRING FLOWS: AUTO-SWEEPS',
        description: 'Automate periodic payouts with on-chain precision. Non-custodial, high-frequency settlement layers for modern SaaS.',
        icon: RefreshCw,
        color: 'bg-[#C1F0DC]', // Lively Mint
        isTall: false
    },
    {
        id: 'token-gate',
        title: 'TOKEN GATING: ASSET ACCESS',
        description: 'Permissionless access control based on wallet holdings. Gate services by SPL token or NFT ownership verification.',
        icon: Ticket,
        color: 'bg-[#F2D7EE]', // Lively Pink
        isTall: true,
        height: 'min-h-[300px]'
    },
    {
        id: 'invoicing',
        title: 'SMART INVOICING: SETTLEMENT',
        description: 'On-chain invoice generation with instant liquidity settlement. Immutable audit trails for transparent accounting.',
        icon: FileText,
        color: 'bg-[#EBF5C6]', // Lively Lime
        isTall: false
    },
    {
        id: 'analytics',
        title: 'DATA ANALYTICS: METRICS',
        description: 'Overview of deep protocol metrics. Track MMR, Churn, and LTV with sub-second latency across all subscribers.',
        icon: BarChart3,
        color: 'bg-[#F2D7EE]', // Lively Pink
        isTall: false
    },
    {
        id: 'vaults',
        title: 'TREASURY VAULTS: MULTI-SIG',
        description: 'Secure recurring revenue with on-chain multi-signature vaults. Require multiple key approvals for withdrawals and protocol updates.',
        icon: Lock,
        color: 'bg-[#EBF5C6]', // Lively Lime
        isTall: false
    },
    {
        id: 'affiliate',
        title: 'AFFILIATE LAYERS: REVENUE SHARE',
        description: 'Native on-chain referral protocols. Automatically split revenue with promoters and partners via smart contract instructions.',
        icon: Users,
        color: 'bg-[#C1F0DC]', // Lively Mint
        isTall: false
    }
];

export default function InfrastructureModules() {
    return (
        <section className="relative z-10 w-full py-24 px-4 md:px-8 bg-white text-[#1a1a1a]">
            {/* Centered Header */}
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-black leading-[0.9]">
                    One platform for different<br />
                    crypto operations
                </h2>
            </div>

            {/* Grid Layout - 3 Columns */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

                {/* Column 1 */}
                <div className="flex flex-col gap-6">
                    <ModuleCard module={modules[0]} />
                    <ModuleCard module={modules[3]} />
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-6">
                    <ModuleCard module={modules[1]} />
                    <ModuleCard module={modules[4]} />
                </div>

                {/* Column 3 */}
                <div className="flex flex-col gap-6">
                    <ModuleCard module={modules[2]} />
                    <ModuleCard module={modules[5]} />
                </div>

            </div>
        </section>
    );
}

function ModuleCard({ module }: { module: any }) {
    const Icon = module.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`${module.color} p-8 flex flex-col items-start gap-4 hover:brightness-95 transition-all cursor-default border border-black rounded-none shadow-sm ${module.height || 'min-h-[220px]'}`}
        >
            {/* Icon */}
            <div className="mb-2">
                <Icon strokeWidth={1.5} className="w-8 h-8 text-black opacity-70" />
            </div>

            {/* Content */}
            <div>
                <h3 className="text-xl font-bold leading-tight text-black mb-3">
                    {module.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-[#1a1a1a]/70">
                    {module.description}
                </p>
            </div>
        </motion.div>
    );
}
