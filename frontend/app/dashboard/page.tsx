'use client';

import { Users, CreditCard, Activity, DollarSign, Plus, TrendingUp, ArrowRight } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAnalyticsOverview, useMRR, useChurnRate } from '@/hooks/useAnalytics';

const stats = [
    { title: 'Total Revenue', value: '$12,450.00', change: '12.5%', isPositive: true, icon: DollarSign },
    { title: 'Active Subscriptions', value: '482', change: '8.2%', isPositive: true, icon: Users },
    { title: 'Monthly Recurring Revenue', value: '$3,840.00', change: '5.1%', isPositive: true, icon: CreditCard },
    { title: 'Churn Rate', value: '2.4%', change: '0.8%', isPositive: false, icon: Activity },
];

const ChartMock = () => (
    <div className="relative w-full h-full flex items-end px-4 pb-0 pt-12 overflow-hidden border-t border-[#a3a3a3] bg-white">
        {/* Grid Lines */}
        <div className="absolute inset-0 z-0 flex flex-col justify-between px-6 py-6 opacity-30">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-px border-t border-[#d4d4d4]" />
            ))}
        </div>

        {/* Graph Line */}
        <svg className="w-full h-2/3 z-10 overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path
                d="M0,35 Q10,32 20,25 T40,20 T60,15 T80,10 T100,5 L100,40 L0,40 Z"
                fill="url(#areaGradient)"
            />
            <path
                d="M0,35 Q10,32 20,25 T40,20 T60,15 T80,10 T100,5"
                fill="none"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="square"
                vectorEffect="non-scaling-stroke"
            />
        </svg>

        {/* Hover Ball Example */}
        <div className="absolute top-[30%] left-[60%] w-2 h-2 bg-black z-20">
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-black text-white px-2 py-1 text-xs font-mono font-bold whitespace-nowrap">
                $24,235
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[4px] border-b-black" />
            </div>
        </div>
    </div>
);

export default function DashboardPage() {
    const { data: analyticsData, isLoading: overviewLoading } = useAnalyticsOverview();
    const { data: mrrData } = useMRR();
    const { data: churnData } = useChurnRate();

    const stats = [
        {
            title: 'Total Revenue',
            value: analyticsData?.revenue?.total ? `$${(analyticsData.revenue.total / 1000000).toFixed(2)}` : '$0.00',
            change: '+0.0%', // Placeholder until historical data logic is added
            isPositive: true,
            icon: DollarSign,
            loading: overviewLoading
        },
        {
            title: 'Active Subscriptions',
            value: analyticsData?.subscriptions?.active?.toString() || '0',
            change: '+0.0%',
            isPositive: true,
            icon: Users,
            loading: overviewLoading
        },
        {
            title: 'Monthly Recurring Revenue',
            value: mrrData?.mrr ? `$${mrrData.mrr}` : '$0.00',
            change: '+0.0%',
            isPositive: true,
            icon: CreditCard,
            loading: overviewLoading
        },
        {
            title: 'Churn Rate',
            value: churnData?.churnRate ? `${churnData.churnRate}%` : '0.00%',
            change: '0.0%',
            isPositive: false,
            icon: Activity,
            loading: overviewLoading
        },
    ];

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#a3a3a3] pb-8">
                <div>
                    <h2 className="text-3xl font-bold uppercase tracking-tight text-black">Overview</h2>
                </div>
                <Link href="/dashboard/create-plan">
                    <button className="group relative px-6 py-3 bg-black text-white hover:bg-[#1a1a1a] transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px]">
                        <span className="relative z-10 flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-wider">
                            <Plus className="w-4 h-4" />
                            Create Plan
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
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="lg:col-span-2 border border-[#a3a3a3] bg-transparent relative overflow-hidden group min-h-[400px] flex flex-col hover:border-black transition-colors duration-300"
                >
                    <div className="flex justify-between items-center p-8 bg-white/40">
                        <div>
                            <h2 className="text-lg font-bold text-black uppercase tracking-tight mb-1">Revenue Overview</h2>
                            <div className="flex items-center gap-2 text-xs font-mono font-bold text-green-600">
                                <TrendingUp className="w-3 h-3" />
                                <span>Real-time Data</span>
                            </div>
                        </div>
                        <select className="bg-transparent border border-[#a3a3a3] px-4 py-2 text-xs font-mono font-bold text-black outline-none focus:border-black transition-colors cursor-pointer uppercase">
                            <option>This Year</option>
                            <option>Last 6 Months</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>

                    <div className="flex-1 w-full bg-[#f5f5f5]">
                        <ChartMock />
                    </div>
                </motion.div>

                {/* Recent Transactions */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="border border-[#a3a3a3] bg-white p-0 relative overflow-hidden"
                >
                    <div className="flex justify-between items-center p-6 border-b border-[#a3a3a3] bg-[#f5f5f5]">
                        <h2 className="text-lg font-bold text-black uppercase tracking-tight">Recent Activity</h2>
                        <button className="text-xs font-mono font-bold text-black hover:underline uppercase">See All</button>
                    </div>

                    <div className="divide-y divide-[#EAEAEA]">
                        {analyticsData?.recentActivity?.length > 0 ? (
                            analyticsData.recentActivity.map((activity: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-4 hover:bg-[#fafafa] transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 border border-[#a3a3a3] flex items-center justify-center transition-colors ${i % 2 === 0 ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                            {i % 2 === 0 ? <Users className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-black uppercase tracking-tight group-hover:underline">
                                                {activity.subscriber_pubkey.slice(0, 4)}...{activity.subscriber_pubkey.slice(-4)}
                                            </p>
                                            <p className="text-xs text-[#999] font-mono">
                                                {new Date(activity.created_at * 1000).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-sm font-bold text-black">{activity.plan_name}</span>
                                        <span className={`text-[10px] font-mono font-bold uppercase ${activity.status === 'active' ? 'text-green-600' : 'text-[#999]'}`}>
                                            {activity.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-[#999] font-mono text-sm uppercase">
                                No recent activity
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-[#a3a3a3] bg-[#f5f5f5]">
                        <Link href="/dashboard/subscriptions">
                            <button className="w-full py-3 border border-black text-black font-mono font-bold text-xs uppercase hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2">
                                View All Transactions <ArrowRight className="w-3 h-3" />
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
