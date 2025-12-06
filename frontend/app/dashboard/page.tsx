'use client';

import { Users, CreditCard, Activity, DollarSign, Plus } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import { motion } from 'framer-motion';
import Link from 'next/link';

const stats = [
    { title: 'Total Revenue', value: '$12,450.00', change: '12.5%', isPositive: true, icon: DollarSign },
    { title: 'Active Subscriptions', value: '482', change: '8.2%', isPositive: true, icon: Users },
    { title: 'Monthly Recurring Revenue', value: '$3,840.00', change: '5.1%', isPositive: true, icon: CreditCard },
    { title: 'Churn Rate', value: '2.4%', change: '0.8%', isPositive: false, icon: Activity },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Actions Bar */}
            <div className="flex justify-end">
                <Link href="/dashboard/create-plan">
                    <button className="group relative px-6 py-3 bg-white rounded-xl font-medium text-sm text-black shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300">
                        <span className="relative z-10 flex items-center gap-2">
                            Create Subscription Plan
                            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-black/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </Link>
            </div>
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard key={stat.title} {...stat} delay={index * 0.1} />
                ))}
            </div>

            {/* Recent Activity / Chart Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="lg:col-span-2 p-6 rounded-3xl bg-[#0A0A0A] border border-white/5 min-h-[400px]"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white font-serif">Revenue Over Time</h2>
                        <select className="bg-white/5 border border-white/5 rounded-lg px-3 py-1 text-sm text-gray-400 outline-none">
                            <option>Last 30 Days</option>
                            <option>Last 3 Months</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="w-full h-[300px] flex items-center justify-center border-2 border-dashed border-white/5 rounded-xl">
                        <span className="text-gray-500">Chart Visualization Placeholder</span>
                    </div>
                </motion.div>

                {/* Recent Transactions */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/5"
                >
                    <h2 className="text-xl font-bold text-white font-serif mb-6">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">New Subscriber</p>
                                        <p className="text-xs text-gray-500">2 minutes ago</p>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-green-400">+$25.00</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
