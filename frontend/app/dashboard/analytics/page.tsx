'use client';

import { motion } from 'framer-motion';
import { Download, TrendingUp, TrendingDown, DollarSign, Users, Clock, PieChart, Activity, Loader2 } from 'lucide-react';
import { useMRR, useChurnRate, useRevenueByPlan } from '@/hooks/useAnalytics';
import { analyticsAPI } from '@/lib/api-client';

export default function AnalyticsPage() {
    const { data: mrrData, isLoading: mrrLoading } = useMRR();
    const { data: churnData, isLoading: churnLoading } = useChurnRate();
    const { data: revenueByPlan = [], isLoading: revenueLoading } = useRevenueByPlan();

    const handleExportCSV = async () => {
        try {
            const response = await analyticsAPI.exportCSV();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `analytics-${Date.now()}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            alert('Failed to export CSV');
        }
    };

    const metrics = [
        {
            title: 'Monthly Recurring Revenue',
            value: mrrLoading ? '...' : `$${mrrData?.mrr || '0.00'}`,
            change: '+12.5%',
            isPositive: true,
            icon: DollarSign,
            color: 'text-green-400',
            loading: mrrLoading
        },
        {
            title: 'Churn Rate',
            value: churnLoading ? '...' : `${churnData?.churnRate || '0.00'}%`,
            change: '-0.8%',
            isPositive: true,
            icon: Activity,
            color: 'text-red-400',
            loading: churnLoading
        },
        {
            title: 'Avg. Subscription Length',
            value: '8.2 Months',
            change: '+1.1 Mo',
            isPositive: true,
            icon: Clock,
            color: 'text-blue-400',
            loading: false
        },
        {
            title: 'Lifetime Value (LTV)',
            value: '$485.00',
            change: '+5.3%',
            isPositive: true,
            icon: TrendingUp,
            color: 'text-purple-400',
            loading: false
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white font-serif">Analytics</h1>
                    <p className="text-gray-400 mt-1">Deep insights into your subscription business performance.</p>
                </div>

                <div className="flex items-center gap-4">
                    <select className="bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-400 outline-none focus:border-purple-500/50 transition-colors">
                        <option>Last 30 Days</option>
                        <option>Last 3 Months</option>
                        <option>Last Year</option>
                        <option>All Time</option>
                    </select>

                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white/5 text-white rounded-xl font-medium text-sm border border-white/10 hover:bg-white/10 transition-all group"
                    >
                        <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                    <motion.div
                        key={metric.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-purple-500/20 transition-colors group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-32 bg-white/[0.02] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className={`p-3 rounded-xl bg-white/5 ${metric.color}`}>
                                {metric.loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <metric.icon className="w-5 h-5" />}
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${metric.isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                                }`}>
                                {metric.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {metric.change}
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-white mb-1">{metric.value}</h3>
                            <p className="text-sm text-gray-400">{metric.title}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue by Plan Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 flex flex-col"
                >
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-white">Revenue by Plan</h2>
                            <p className="text-sm text-gray-400">Distribution of revenue across active tiers</p>
                        </div>
                        <PieChart className="w-5 h-5 text-gray-500" />
                    </div>

                    {revenueLoading ? (
                        <div className="flex-1 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                        </div>
                    ) : revenueByPlan.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            No revenue data available
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col justify-center gap-6">
                            {revenueByPlan.map((item: any, idx: number) => {
                                const totalRevenue = revenueByPlan.reduce((sum: number, p: any) => sum + parseFloat(p.revenue), 0);
                                const percentage = totalRevenue > 0 ? ((parseFloat(item.revenue) / totalRevenue) * 100).toFixed(1) : 0;
                                const colors = ['bg-purple-500', 'bg-blue-500', 'bg-pink-500', 'bg-green-500'];

                                return (
                                    <div key={item.name} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white font-medium flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`} />
                                                {item.name}
                                            </span>
                                            <span className="text-gray-400">${item.revenue} ({percentage}%)</span>
                                        </div>
                                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1, delay: 0.5 + (idx * 0.2) }}
                                                className={`h-full ${colors[idx % colors.length]} rounded-full`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>

                {/* Quick Insights */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-8 rounded-3xl bg-gradient-to-b from-[#0A0A0A] to-purple-900/10 border border-white/5"
                >
                    <h2 className="text-xl font-bold text-white mb-6">Insights</h2>
                    <div className="space-y-6">
                        <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                            <h4 className="text-green-400 font-bold text-sm mb-1">Growth Trend</h4>
                            <p className="text-gray-300 text-xs leading-relaxed">
                                Your MRR has increased by <span className="text-white font-bold">12.5%</span> this month. Great job!
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                            <h4 className="text-blue-400 font-bold text-sm mb-1">Retention</h4>
                            <p className="text-gray-300 text-xs leading-relaxed">
                                Churn rate is at <span className="text-white font-bold">{churnData?.churnRate || '0'}%</span>. Keep monitoring for trends.
                            </p>
                        </div>
                        <div className="pt-4 border-t border-white/5">
                            <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors">
                                View Detailed Report
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
