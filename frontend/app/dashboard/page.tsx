'use client';

import { useState } from 'react';

import { Users, CreditCard, Activity, DollarSign, Plus, TrendingUp, ArrowRight, MoreHorizontal } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAnalyticsOverview, useMRR, useChurnRate } from '@/hooks/useAnalytics';

export default function DashboardPage() {
    const [revenuePeriod, setRevenuePeriod] = useState('Weekly');
    const { data: analyticsData, isLoading: overviewLoading } = useAnalyticsOverview();
    const { data: mrrData, isLoading: mrrLoading } = useMRR();
    const { data: churnData } = useChurnRate();

    const stats = [
        {
            title: 'Total Revenue',
            value: analyticsData?.revenue?.total ? `$${(analyticsData.revenue.total / 1000000).toFixed(2)}` : '$0.00',
            change: '+12.5%',
            isPositive: true,
            icon: DollarSign,
            loading: overviewLoading
        },
        {
            title: 'Active Subscriptions',
            value: analyticsData?.subscriptions?.active?.toString() || '0',
            change: '+8.2%',
            isPositive: true,
            icon: Users,
            loading: overviewLoading
        },
        {
            title: 'Monthly Recurring',
            value: mrrData?.mrr ? `$${mrrData.mrr}` : '$0.00',
            change: '+5.1%',
            isPositive: true,
            icon: CreditCard,
            loading: overviewLoading
        },
        {
            title: 'Churn Rate',
            value: churnData?.churnRate ? `${churnData.churnRate}%` : '0.00%',
            change: '-0.8%',
            isPositive: true, // Lower churn is positive
            icon: Activity,
            loading: overviewLoading
        },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header Actions Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-black">Overview</h2>
                    <p className="text-sm text-[#666]">Welcome back to your dashboard.</p>
                </div>
                <Link href="/dashboard/create-plan">
                    <button className="px-6 py-2.5 bg-black text-white hover:bg-[#1a1a1a] transition-all rounded-xl shadow-lg shadow-black/20 flex items-center gap-2 text-sm font-medium">
                        <Plus className="w-4 h-4" />
                        <span>Create New Plan</span>
                    </button>
                </Link>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard key={stat.title} {...stat} delay={index * 0.1} />
                ))}
            </div>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-transparent hover:border-[#EAEAEA] transition-colors p-6 min-h-[400px] flex flex-col"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-black">Revenue Analytics</h3>
                            <div className="flex items-center gap-2 text-xs font-medium text-green-600 mt-1">
                                <TrendingUp className="w-3 h-3" />
                                <span>+2.4% vs last month</span>
                            </div>
                        </div>
                        <div className="flex bg-[#F5F5F5] rounded-lg p-1">
                            {['Daily', 'Weekly', 'Monthly'].map((period) => (
                                <button
                                    key={period}
                                    onClick={() => setRevenuePeriod(period)}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${revenuePeriod === period
                                        ? 'bg-white shadow-sm text-black'
                                        : 'text-[#666] hover:text-black'
                                        }`}
                                >
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 w-full relative">
                        <RevenueChart data={mrrData?.history} isLoading={mrrLoading} />
                    </div>
                </motion.div>

                {/* Recent Activity / Transactions */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-white rounded-2xl shadow-sm border border-transparent hover:border-[#EAEAEA] transition-colors flex flex-col h-full"
                >
                    <div className="p-6 border-b border-[#F5F5F5] flex justify-between items-center">
                        <h3 className="text-lg font-bold text-black">Recent Activity</h3>
                        <button className="p-1 hover:bg-[#F5F5F5] rounded-lg transition-colors">
                            <MoreHorizontal className="w-5 h-5 text-[#999]" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto max-h-[400px] p-2">
                        {analyticsData?.recentActivity?.length > 0 ? (
                            analyticsData.recentActivity.map((activity: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-3 hover:bg-[#F8F9FA] rounded-xl transition-colors cursor-pointer group mb-1">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${i % 2 === 0 ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                                            }`}>
                                            {i % 2 === 0 ? <Users className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-black group-hover:text-blue-600 transition-colors">
                                                {activity.subscriber_pubkey.slice(0, 4)}...{activity.subscriber_pubkey.slice(-4)}
                                            </p>
                                            <p className="text-[11px] text-[#999]">
                                                {new Date(activity.created_at * 1000).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-sm font-bold text-black">{activity.plan_name}</span>
                                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${activity.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'
                                            }`}>
                                            {activity.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-48 text-center px-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                    <Activity className="w-6 h-6 text-gray-300" />
                                </div>
                                <p className="text-sm font-medium text-gray-900">No recent activity</p>
                                <p className="text-xs text-gray-500 mt-1">Transactions will appear here once you start receiving payments.</p>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-[#F5F5F5]">
                        <Link href="/dashboard/subscriptions" className="block">
                            <button className="w-full py-2.5 bg-[#F8F9FA] hover:bg-[#F0F1F2] text-black font-medium text-sm rounded-xl transition-all flex items-center justify-center gap-2">
                                <span>View All Transactions</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
