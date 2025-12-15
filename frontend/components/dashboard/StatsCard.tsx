'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: LucideIcon;
    delay?: number;
    loading?: boolean;
}

export default function StatsCard({ title, value, change, isPositive, icon: Icon, delay = 0, loading = false }: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-transparent hover:border-[#EAEAEA] group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors duration-300`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                    {change}
                </div>
            </div>

            <div className="space-y-1">
                <h3 className="text-sm font-medium text-[#666]">{title}</h3>
                {loading ? (
                    <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-md" />
                ) : (
                    <p className="text-2xl font-bold text-black tracking-tight">{value}</p>
                )}
            </div>
        </motion.div>
    );
}
