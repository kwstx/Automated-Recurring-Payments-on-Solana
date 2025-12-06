'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureGraphicProps {
    index: number;
    Icon: LucideIcon;
}

export default function FeatureGraphic({ index, Icon }: FeatureGraphicProps) {
    // Map index to a specific "Art Style"
    // Style 1: Blob World (Abstract, colorful) - Indices 0, 1, 3
    // Style 2: Privacy UI (Sleek, dark, functional) - Indices 2, 7
    // Style 3: Interface Card (UI elements, glassmorphism) - Indices 4, 5, 6

    const getStyle = (i: number) => {
        if ([0, 1, 3].includes(i)) return 'blobs';
        if ([2, 7].includes(i)) return 'privacy';
        return 'interface';
    };

    const style = getStyle(index);

    if (style === 'blobs') return <BlobWorld index={index} Icon={Icon} />;
    if (style === 'privacy') return <PrivacyUI index={index} Icon={Icon} />;
    return <InterfaceCard index={index} Icon={Icon} />;
}

function BlobWorld({ index, Icon }: { index: number; Icon: LucideIcon }) {
    // Unique color palettes for variation
    const palettes = [
        ['bg-blue-500', 'bg-purple-500', 'bg-orange-500', 'bg-green-400'], // Default
        ['bg-purple-600', 'bg-pink-500', 'bg-blue-400', 'bg-teal-400'],    // Solana
        [],
        ['bg-cyan-500', 'bg-blue-600', 'bg-indigo-500', 'bg-white'],       // USDC
    ];
    const colors = palettes[index] || palettes[0];

    return (
        <div className="relative w-full h-full overflow-hidden rounded-xl bg-[#1E1E1E] flex items-center justify-center isolate">
            {/* Animated Blobs */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className={`absolute top-[-20%] left-[-20%] w-32 h-32 rounded-full blur-xl opacity-60 ${colors[0]}`}
            />
            <motion.div
                animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute bottom-[10%] right-[-10%] w-40 h-40 rounded-full blur-2xl opacity-50 ${colors[1]}`}
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-[40%] right-[20%] w-24 h-24 rounded-full blur-lg opacity-70 ${colors[2]}`}
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className={`absolute bottom-[-10%] left-[20%] w-28 h-28 rounded-full blur-xl opacity-60 ${colors[3]}`}
            />

            {/* Center Icon Bubble */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                <Icon className="w-10 h-10 text-white drop-shadow-md" />
            </div>
        </div>
    );
}

function PrivacyUI({ index, Icon }: { index: number; Icon: LucideIcon }) {
    return (
        <div className="relative w-full h-full overflow-hidden rounded-xl bg-[#2D1B2E] flex flex-col items-center justify-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

            {/* Floating Shield/Lock Element */}
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 bg-black/40 border border-white/10 rounded-2xl p-4 w-[70%] backdrop-blur-sm flex items-center justify-between gap-3 shadow-2xl"
            >
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="w-2 h-2 rounded-full bg-white/50" />
                    ))}
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-purple-300" />
                </div>
            </motion.div>

            {/* Second floating element for depth */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 0.5 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-8 z-0 bg-white/5 rounded-xl w-[50%] h-8 blur-[1px]"
            />
        </div>
    );
}

function InterfaceCard({ index, Icon }: { index: number; Icon: LucideIcon }) {
    // "Phantom Pink/Peach" vibe or Blue variant
    const bg = index === 6 ? 'bg-gradient-to-br from-purple-900 to-indigo-900' : 'bg-gradient-to-br from-[#FFB8B8] to-[#FFDDD8]';
    const isDark = index === 6; // Analytics is dark

    return (
        <div className={`relative w-full h-full overflow-hidden rounded-xl ${bg} flex items-center justify-center`}>
            {/* Mobile UI Mockup */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className={`relative w-[65%] h-[80%] ${isDark ? 'bg-black/80 border-white/10' : 'bg-white border-white/50'} rounded-2xl border shadow-2xl flex flex-col p-3 overflow-hidden`}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-2 rounded-full ${isDark ? 'bg-white/20' : 'bg-gray-200'}`} />
                    <div className={`w-4 h-4 rounded-full ${isDark ? 'bg-purple-500' : 'bg-red-400'}`} />
                </div>

                {/* Main Content Area */}
                <div className={`flex-1 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'} flex items-center justify-center mb-2`}>
                    <Icon className={`w-8 h-8 ${isDark ? 'text-white' : 'text-gray-400'}`} />
                </div>

                {/* Floating Notification */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`absolute bottom-6 right-[-10px] ${isDark ? 'bg-purple-600' : 'bg-black'} text-white text-[10px] px-3 py-1 rounded-l-full shadow-lg`}
                >
                    {isDark ? 'Analytics' : 'Verified'}
                </motion.div>

                {/* Bar Lines (for analytics or list) */}
                <div className="space-y-1">
                    <div className={`w-[80%] h-1.5 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-100'}`} />
                    <div className={`w-[60%] h-1.5 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-100'}`} />
                </div>
            </motion.div>
        </div>
    );
}
