'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Zap, RefreshCw } from 'lucide-react';

export default function NativeSystemTools() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
        setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2; // Scroll-fast
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    return (
        <section className="relative z-10 w-full py-24 px-4 md:px-8 bg-white text-[#1a1a1a]">
            {/* Centered Container */}
            <div className="max-w-7xl mx-auto">

                {/* Headline */}
                <div className="max-w-6xl mb-20 text-center md:text-left mx-auto md:mx-0">
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] text-black">
                        Native on-chain logic, instant settlement, and powerful{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E699D9] to-[#80E0B0] font-black">
                            SDKs make ZyoPay
                        </span>{" "}
                        the ultimate infrastructure for recurring revenue.
                    </h2>
                </div>

                {/* 3-Column Grid */}
                <div
                    ref={scrollContainerRef}
                    className={`flex overflow-x-auto gap-6 pb-6 md:grid md:grid-cols-3 md:pb-0 md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar cursor-grab active:cursor-grabbing ${isDragging ? '' : 'snap-x snap-mandatory'}`}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >

                    {/* Card 1: Developer SDKs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-50 rounded-2xl p-10 flex flex-col justify-between min-h-[300px] min-w-[85vw] md:min-w-0 snap-center select-none"
                    >
                        <div className="flex-1 flex items-center justify-center">
                            <Terminal strokeWidth={1} size={80} className="text-black" />
                        </div>
                        <div className="mt-8">
                            <h3 className="text-lg font-bold mb-2 text-black">Developer-First SDKs</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Integrate recurring payments with just a few lines of code. Type-safe and built for speed.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 2: Instant Settlement */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-gray-50 rounded-2xl p-10 flex flex-col justify-between min-h-[300px] min-w-[85vw] md:min-w-0 snap-center select-none"
                    >
                        <div className="flex-1 flex items-center justify-center">
                            <Zap strokeWidth={1} size={80} className="text-black" />
                        </div>
                        <div className="mt-8">
                            <h3 className="text-lg font-bold mb-2 text-black">Instant Settlement</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Zero intermediates. Payments flow directly from subscribers to your wallet in seconds.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 3: Automated Recurring */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gray-50 rounded-2xl p-10 flex flex-col justify-between min-h-[300px] min-w-[85vw] md:min-w-0 snap-center select-none"
                    >
                        <div className="flex-1 flex items-center justify-center">
                            <RefreshCw strokeWidth={1} size={80} className="text-black" />
                        </div>
                        <div className="mt-8">
                            <h3 className="text-lg font-bold mb-2 text-black">Automated Recurring</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Smart contracts handle billing cycles, retries, and expirations automatically.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

