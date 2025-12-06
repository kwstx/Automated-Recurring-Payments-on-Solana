'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FeaturesDropdown() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-4 w-[900px] p-2 rounded-3xl bg-[#0B0B0B] border border-white/10 shadow-2xl backdrop-blur-xl z-50 overflow-hidden"
        >
            <div className="grid grid-cols-5 gap-2 p-2">
                <DropdownCard
                    title="Recurring Billing"
                    description="Automate on-chain subscriptions easily."
                    graphic={<RecurringGraphic />}
                    color="bg-[#60A5FA]"
                />
                <DropdownCard
                    title="Analytics"
                    description="Real-time revenue, churn, and growth tracking."
                    graphic={<AnalyticsGraphic />}
                    color="bg-[#111827]"
                />
                <DropdownCard
                    title="Developer API"
                    description="Webhooks & SDKs for seamless integration."
                    graphic={<ApiGraphic />}
                    color="bg-[#A78BFA]"
                />
                <DropdownCard
                    title="Global Payments"
                    description="Accept USDC & SOL from anywhere."
                    graphic={<PaymentsGraphic />}
                    color="bg-[#34D399]"
                />
                <DropdownCard
                    title="Secure Auth"
                    description="Wallet-based login. No passwords."
                    graphic={<SecurityGraphic />}
                    color="bg-[#5B21B6]"
                />
            </div>
        </motion.div>
    );
}

function DropdownCard({ title, description, graphic, color }: any) {
    return (
        <div className="group relative flex flex-col h-[280px] p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
            <div className={`relative w-full h-32 rounded-lg overflow-hidden mb-4 ${color}`}>
                {graphic}
            </div>
            <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{description}</p>
        </div>
    );
}

// --- Custom Graphics (Reference Mimicry) ---

function RecurringGraphic() {
    // Uses "Holographic Card" Style (Billing = Charge Card)
    return (
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 relative flex items-center justify-center overflow-hidden">
            {/* Holographic Card - Exact Reference Style */}
            <motion.div
                animate={{
                    rotateY: [0, 10, 0],
                    background: ['linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))', 'linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2))', 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))']
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-24 h-16 bg-white/20 backdrop-blur-md rounded-xl border border-white/40 shadow-xl flex flex-col justify-end p-2 relative overflow-hidden"
            >
                {/* Iridescent overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pink-400/20 to-blue-400/20 mix-blend-overlay" />

                <div className="w-5 h-5 rounded-full bg-white/60 mb-auto relative z-10" />
                <div className="w-10 h-1.5 rounded-full bg-white/60 relative z-10" />
                <div className="absolute bottom-2 right-2 text-[6px] text-white font-bold tracking-widest relative z-10">BILL</div>
            </motion.div>

            {/* Sparkles */}
            <div className="absolute top-4 right-8 w-3 h-3 text-yellow-200">✨</div>
            <div className="absolute bottom-6 left-6 w-2 h-2 text-white/80">✦</div>
        </div>
    );
}

function AnalyticsGraphic() {
    return (
        <div className="w-full h-full bg-[#111827] relative flex items-center justify-center overflow-hidden">
            {/* Candlesticks - Exact Reference Style */}
            <div className="flex items-end gap-2 h-16 opacity-90">
                <div className="w-2 h-8 bg-[#10B981] rounded-sm relative"><div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-[1px] h-12 bg-[#10B981]/50" /></div>
                <div className="w-2 h-12 bg-[#EF4444] rounded-sm relative"><div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-[1px] h-16 bg-[#EF4444]/50" /></div>
                <div className="w-2 h-6 bg-[#10B981] rounded-sm" />
                <div className="w-2 h-10 bg-[#10B981] rounded-sm" />
                <div className="w-2 h-14 bg-[#EF4444] rounded-sm" />
                <div className="w-2 h-4 bg-[#10B981] rounded-sm" />
            </div>
            {/* Subtle faded grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px]" />
        </div>
    );
}

function ApiGraphic() {
    // Uses "Get Started" Blob Style (Creation/Building)
    return (
        <div className="w-full h-full bg-[#A78BFA] relative flex items-center justify-center overflow-hidden">
            {/* Abstract Blobs */}
            <div className="absolute top-[-20%] left-[-20%] w-32 h-32 bg-[#C4B5FD] rounded-full blur-xl opacity-60" />
            <div className="absolute bottom-[-20%] right-[-20%] w-32 h-32 bg-white rounded-full blur-xl opacity-30" />

            {/* Row of Icons mimicking the 'connected apps' look but with code context */}
            <div className="flex gap-2">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg transform translate-y-2">
                        {i === 1 && <span className="text-purple-600 font-bold text-xs">{'{'}</span>}
                        {i === 2 && <div className="w-4 h-4 rounded-full bg-blue-400" />}
                        {i === 3 && <div className="w-4 h-4 bg-green-400 rounded-sm" />}
                        {i === 4 && <span className="text-orange-500 font-bold text-xs">{'}'}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}

function PaymentsGraphic() {
    return (
        <div className="w-full h-full bg-[#34D399] relative flex flex-col items-center justify-center overflow-hidden p-4">
            {/* Mimics the 'Trade' Pill UI */}
            <div className="w-full bg-white rounded-lg p-2 shadow-lg mb-2 flex items-center gap-2 transform -rotate-2">
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center overflow-hidden">
                    <div className="w-4 h-4 bg-purple-500 rounded-full" /> {/* Pseudo SOL */}
                </div>
                <div className="text-black text-[10px] font-bold">Solana</div>
            </div>

            {/* Swap Icon */}
            <div className="w-8 h-8 rounded-full bg-gray-100 absolute z-10 flex items-center justify-center shadow-md border border-white">
                <ArrowRight className="w-4 h-4 text-gray-500 rotate-90" />
            </div>

            <div className="w-full bg-white/90 rounded-lg p-2 shadow-lg mt-[-10px] flex items-center gap-2 transform rotate-1">
                <div className="w-6 h-6 rounded-full bg-[#2775CA] flex items-center justify-center text-[8px] text-white font-bold">
                    $
                </div>
                <div className="text-black text-[10px] font-bold">USDC</div>
            </div>
        </div>
    );
}

function SecurityGraphic() {
    return (
        <div className="w-full h-full bg-[#2E1065] relative flex items-center justify-center overflow-hidden">
            {/* Password Field - Exact Reference Style */}
            <div className="relative">
                {/* Background Cloud/Blob */}
                <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-[#4C1D95] rounded-full blur-xl" />

                <div className="bg-white rounded-full px-5 py-3 flex items-center gap-1 shadow-xl relative z-10">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="text-[#2E1065] font-black text-xl leading-none pt-1">*</div>
                    ))}
                </div>

                {/* Swoosh/Accent */}
                <div className="absolute -bottom-2 -right-4 w-12 h-12 rounded-full border-4 border-white/20 blur-[1px]" />
            </div>
        </div>
    );
}
