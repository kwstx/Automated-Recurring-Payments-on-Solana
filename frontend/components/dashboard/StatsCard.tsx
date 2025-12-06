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
            className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-purple-500/20 transition-all duration-300 group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-purple-500/10 transition-colors">
                    <Icon className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </div>
                {change && (
                    <span className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
                        {isPositive ? '+' : ''}{change}
                    </span>
                )}
            </div>

            <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
            <p className="text-2xl font-bold text-white font-serif">{value}</p>
        </motion.div>
    );
}
