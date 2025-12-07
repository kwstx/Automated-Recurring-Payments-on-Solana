'use client';

import { Users, CreditCard, Activity, DollarSign, Plus, TrendingUp } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import { motion } from 'framer-motion';
import Link from 'next/link';

const stats = [
    { title: 'Total Revenue', value: '$12,450.00', change: '12.5%', isPositive: true, icon: DollarSign },
    { title: 'Active Subscriptions', value: '482', change: '8.2%', isPositive: true, icon: Users },
    { title: 'Monthly Recurring Revenue', value: '$3,840.00', change: '5.1%', isPositive: true, icon: CreditCard },
    { title: 'Churn Rate', value: '2.4%', change: '0.8%', isPositive: false, icon: Activity },
];

const ChartMock = () => (
    <div className="relative w-full h-full flex items-end px-4 pb-0 pt-12 overflow-hidden">
        {/* Grid Lines */}
        <div className="absolute inset-0 z-0 flex flex-col justify-between px-6 py-6 opacity-20">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-px border-t border-dashed border-white/20" />
            ))}
        </div>

        {/* Graph Line */}
        <svg className="w-full h-2/3 z-10 overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path
                d="M0,35 Q10,32 20,25 T40,20 T60,15 T80,10 T100,5 L100,40 L0,40 Z"
                fill="url(#areaGradient)"
            />
            <path
                d="M0,35 Q10,32 20,25 T40,20 T60,15 T80,10 T100,5"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="0.8"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
            />
        </svg>

        {/* Hover Ball Example */}
        <div className="absolute top-[30%] left-[60%] w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20">
            <div className="absolute top-0 left-0 w-full h-full animate-ping rounded-full bg-white opacity-75" />

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg text-xs text-white whitespace-nowrap">
                $24,235
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white/20" />
            </div>
        </div>
    </div>
);

export default function DashboardPage() {
    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    {/* Breadcrumb / Intro could go here */}
                </div>
                <Link href="/dashboard/create-plan">
                    <button className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-medium text-sm text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all duration-300">
                        <span className="relative z-10 flex items-center gap-2">
                            <Plus className="w-4 h-4 bg-white/20 rounded p-0.5" />
                            Create Subscription Plan
                        </span>
                    </button>
                </Link>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard key={stat.title} {...stat} delay={index * 0.1} />
                ))}
            </div>

            {/* Recent Activity / Chart Group */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="lg:col-span-2 p-8 rounded-3xl glass-panel relative overflow-hidden group min-h-[400px] flex flex-col"
                >
                    {/* Glow effect */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/15 transition-colors duration-500" />

                    <div className="flex justify-between items-center mb-8 relative z-10">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1">Revenue Overview</h2>
                            <div className="flex items-center gap-2 text-sm text-green-400">
                                <TrendingUp className="w-4 h-4" />
                                <span>+12.5% vs last month</span>
                            </div>
                        </div>
                        <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 outline-none focus:border-purple-500/50 transition-colors cursor-pointer">
                            <option className="bg-[#0A0A0A]">This Year</option>
                            <option className="bg-[#0A0A0A]">Last 6 Months</option>
                            <option className="bg-[#0A0A0A]">Last 30 Days</option>
                        </select>
                    </div>

                    <div className="flex-1 w-full bg-gradient-to-b from-white/[0.02] to-transparent rounded-2xl border border-white/5 relative">
                        <ChartMock />
                    </div>
                </motion.div>

                {/* Recent Transactions */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="p-8 rounded-3xl glass-panel relative overflow-hidden"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                        <button className="text-xs text-purple-400 hover:text-purple-300 font-medium px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">See All</button>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-200 cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${i % 2 === 0 ? 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20' : 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20'}`}>
                                        {i % 2 === 0 ? <Users className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white group-hover:text-purple-200 transition-colors">Orbit Studio Pro</p>
                                        <p className="text-xs text-gray-500">2 minutes ago</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-sm font-bold text-white">$250.00</span>
                                    <span className="text-xs text-gray-500 flex items-center justify-end gap-1">
                                        Subscribed
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom gradient fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none opacity-50" />
                </motion.div>
            </div>
        </div>
    );
}
