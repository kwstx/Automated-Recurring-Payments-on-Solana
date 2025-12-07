'use client';

import { motion } from 'framer-motion';

// --- Visual Helpers (Fluid Blobs & Filaments) ---

const FluidBlob = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
    <motion.div
        animate={{
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, 10, -10, 0],
        }}
        transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
        }}
        className={`absolute rounded-full blur-[80px] opacity-60 mix-blend-screen ${className}`}
        style={{
            background: 'radial-gradient(circle at center, rgba(168,85,247,0.3) 0%, rgba(236,72,153,0.1) 60%, transparent 100%)',
            boxShadow: 'inset 0 0 40px rgba(168,85,247,0.2)'
        }}
    />
);

const GlowingFilament = ({ className }: { className?: string }) => (
    <div className={`relative ${className}`}>
        {/* Core filament - Purple */}
        <div className="w-[2px] h-full bg-purple-100/80 shadow-[0_0_15px_rgba(168,85,247,0.8)] mx-auto rounded-full" />
        {/* Outer glow - Pink */}
        <div className="absolute inset-x-0 top-0 bottom-0 bg-pink-500/20 blur-md w-[4px] mx-auto opacity-50" />
    </div>
);

// --- Data ---
const steps = [
    {
        id: 1,
        title: 'Create Plan',
        description: 'Define your subscription model with ease. Set prices, intervals, and usage limits.',
        align: 'left'
    },
    {
        id: 2,
        title: 'Integration',
        description: 'Seamlessly integrate with your Solana dApp. Just a few lines of code.',
        align: 'right'
    },
    {
        id: 3,
        title: 'Monetize',
        description: 'Watch your revenue stream in real-time with automated billing cycles.',
        align: 'center'
    },
];

export default function HowItWorks() {
    return (
        <section className="relative bg-[#050505] text-white py-20 overflow-hidden">
            {/* GLOBAL BACKGROUND ELEMENTS */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col gap-32">
                {steps.map((step, index) => {
                    const isLeft = step.align === 'left';
                    const isRight = step.align === 'right';
                    const isCenter = step.align === 'center';

                    return (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-20%" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 min-h-[60vh] ${isRight ? 'md:flex-row-reverse' : ''} ${isCenter ? 'md:flex-col md:text-center' : ''}`}
                        >
                            {/* Text Content */}
                            <div className={`flex-1 space-y-6 ${isCenter ? 'max-w-2xl mx-auto' : ''}`}>
                                <div className="inline-block">
                                    <span className="text-purple-400 font-mono text-sm tracking-wider uppercase mb-2 block">Step 0{step.id}</span>
                                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none mb-4">
                                        {step.title}
                                    </h2>
                                </div>
                                <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Visual / Interactive Element */}
                            <div className={`flex-1 w-full flex items-center justify-center`}>
                                <div className="relative w-full max-w-lg aspect-square bg-[#0A0A0A] border border-purple-500/10 rounded-3xl overflow-hidden backdrop-blur-sm group shadow-2xl hover:border-purple-500/30 transition-colors duration-500">

                                    {/* Inner Content based on step */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {index === 0 && (
                                            // Step 1: Filament / Vertical Light
                                            <div className="h-[60%] flex flex-col items-center relative z-10">
                                                <FluidBlob className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/10" />
                                                <GlowingFilament className="h-full w-1" />
                                                <div className="w-16 h-1 bg-purple-400 blur-md rounded-full mt-4" />
                                            </div>
                                        )}
                                        {index === 1 && (
                                            // Step 2: Fluid Orb
                                            <div className="relative z-10">
                                                <FluidBlob className="w-64 h-64 bg-pink-500/30" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-32 h-32 rounded-full border border-white/10 backdrop-blur-md bg-white/5 flex items-center justify-center">
                                                        <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {index === 2 && (
                                            // Step 3: Monetize Graph
                                            <div className="w-[80%] h-[60%] border-l border-b border-purple-500/30 relative z-10">
                                                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-purple-500/10 to-transparent" />
                                                {/* Animated Bars */}
                                                <motion.div
                                                    initial={{ height: "0%" }} whileInView={{ height: "40%" }} transition={{ delay: 0.2, duration: 1 }}
                                                    className="absolute bottom-0 left-[10%] w-[10%] bg-purple-500/40 rounded-t-sm"
                                                />
                                                <motion.div
                                                    initial={{ height: "0%" }} whileInView={{ height: "70%" }} transition={{ delay: 0.4, duration: 1 }}
                                                    className="absolute bottom-0 left-[30%] w-[10%] bg-pink-400/60 rounded-t-sm"
                                                />
                                                <motion.div
                                                    initial={{ height: "0%" }} whileInView={{ height: "50%" }} transition={{ delay: 0.6, duration: 1 }}
                                                    className="absolute bottom-0 left-[50%] w-[10%] bg-purple-600/40 rounded-t-sm"
                                                />
                                                <motion.div
                                                    initial={{ height: "0%" }} whileInView={{ height: "90%" }} transition={{ delay: 0.8, duration: 1 }}
                                                    className="absolute bottom-0 left-[70%] w-[10%] bg-white/80 rounded-t-sm shadow-[0_0_20px_white]"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Card Highlight */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
