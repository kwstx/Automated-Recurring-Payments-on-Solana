'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string;
    change?: string;
    isPositive?: boolean;
    icon: LucideIcon;
    delay?: number;
}

export default function StatsCard({ title, value, change, isPositive, icon: Icon, delay = 0 }: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="bg-transparent border border-[#a3a3a3] p-6 hover:bg-white transition-all duration-300 group relative overflow-hidden"
        >
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="p-2 border border-[#a3a3a3] bg-transparent group-hover:bg-black group-hover:border-black transition-all duration-300">
                        <Icon className="w-5 h-5 text-[#666] group-hover:text-white transition-colors" />
                    </div>
                    {change && (
                        <div className={`px-2 py-0.5 text-xs font-mono font-bold border ${isPositive
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-red-100 text-red-700 border-red-200'
                            } flex items-center gap-1`}>
                            {isPositive ? '+' : ''}{change}
                        </div>
                    )}
                </div>

                <div className="space-y-1">
                    <h3 className="text-[#666] text-xs font-mono font-bold uppercase tracking-wider">{title}</h3>
                    <p className="text-3xl font-bold text-black tracking-tight">{value}</p>
                </div>
            </div>
        </motion.div>
    );
}
