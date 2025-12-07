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
            className="glass-card p-6 rounded-2xl hover:bg-white/[0.08] transition-all duration-300 group relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-purple-500/30 group-hover:bg-purple-500/20 transition-all duration-300">
                        <Icon className="w-5 h-5 text-gray-400 group-hover:text-purple-300 transition-colors" />
                    </div>
                    {change && (
                        <div className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${isPositive
                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                : 'bg-red-500/10 text-red-400 border-red-500/20'
                            } flex items-center gap-1`}>
                            {isPositive ? '+' : ''}{change}
                        </div>
                    )}
                </div>

                <div className="space-y-1">
                    <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
                    <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
                </div>
            </div>
        </motion.div>
    );
}
