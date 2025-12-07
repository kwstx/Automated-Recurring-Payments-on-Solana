'use client';

import { motion } from 'framer-motion';
import { Download, TrendingUp, TrendingDown, DollarSign, Users, Clock, PieChart, Activity, Loader2, ArrowUpRight } from 'lucide-react';
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
            bg: 'from-green-500/20 to-emerald-500/5',
            loading: mrrLoading
        },
        {
            title: 'Churn Rate',
            value: churnLoading ? '...' : `${churnData?.churnRate || '0.00'}%`,
            change: '-0.8%',
            isPositive: true,
            icon: Activity,
            color: 'text-red-400',
            bg: 'from-red-500/20 to-orange-500/5',
            loading: churnLoading
        },
        {
            title: 'Avg. Subscription Length',
            value: '8.2 Months',
            change: '+1.1 Mo',
            isPositive: true,
            icon: Clock,
            color: 'text-blue-400',
            bg: 'from-blue-500/20 to-cyan-500/5',
            loading: false
        },
        {
            title: 'Lifetime Value (LTV)',
            value: '$485.00',
            change: '+5.3%',
            isPositive: true,
            icon: TrendingUp,
            color: 'text-purple-400',
            bg: 'from-purple-500/20 to-indigo-500/5',
            loading: false
        },
    ];

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Analytics</h1>
                    <p className="text-gray-400 mt-1">Deep insights into your subscription business performance.</p>
                </div>

                <div className="flex items-center gap-4">
                    <select className="bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-2.5 text-sm text-gray-400 outline-none focus:border-purple-500/50 transition-colors">
                        <option>Last 30 Days</option>
                        <option>Last 3 Months</option>
                        <option>Last Year</option>
                        <option>All Time</option>
                    </select>

                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    >
                        <Download className="w-4 h-4" />
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
                        className="glass-card p-6 rounded-3xl relative overflow-hidden group"
                    >
                        <div className={`absolute top-0 right-0 p-32 bg-gradient-to-br ${metric.bg} rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className={`p-3 rounded-xl bg-white/5 ${metric.color} backdrop-blur-md`}>
                                {metric.loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <metric.icon className="w-5 h-5" />}
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${metric.isPositive
                                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                : 'bg-red-500/10 border-red-500/20 text-red-400'
                                }`}>
                                {metric.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {metric.change}
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">{metric.value}</h3>
                            <p className="text-sm text-gray-400 font-medium">{metric.title}</p>
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
                    className="lg:col-span-2 p-8 rounded-3xl glass-panel flex flex-col relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-50" />

                    <div className="flex justify-between items-center mb-8 relative z-10">
                        <div>
                            <h2 className="text-xl font-bold text-white">Revenue by Plan</h2>
                            <p className="text-sm text-gray-400">Distribution of revenue across active tiers</p>
                        </div>
                        <div className="p-2 rounded-lg bg-white/5">
                            <PieChart className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    {revenueLoading ? (
                        <div className="flex-1 flex items-center justify-center min-h-[300px]">
                            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                        </div>
                    ) : revenueByPlan.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-gray-500 min-h-[300px]">
                            No revenue data available
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col justify-center gap-8 relative z-10">
                            {revenueByPlan.map((item: any, idx: number) => {
                                const totalRevenue = revenueByPlan.reduce((sum: number, p: any) => sum + parseFloat(p.revenue), 0);
                                const percentage = totalRevenue > 0 ? ((parseFloat(item.revenue) / totalRevenue) * 100).toFixed(1) : 0;
                                const colors = ['bg-purple-500', 'bg-blue-500', 'bg-pink-500', 'bg-green-500'];
                                const glowColors = ['shadow-[0_0_15px_rgba(168,85,247,0.5)]', 'shadow-[0_0_15px_rgba(59,130,246,0.5)]', 'shadow-[0_0_15px_rgba(236,72,153,0.5)]', 'shadow-[0_0_15px_rgba(34,197,94,0.5)]'];

                                return (
                                    <div key={item.name} className="space-y-3 group">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white font-medium flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${colors[idx % colors.length]} ${glowColors[idx % colors.length]}`} />
                                                {item.name}
                                            </span>
                                            <div className="text-right">
                                                <span className="text-white font-bold block">${item.revenue}</span>
                                                <span className="text-xs text-gray-500">{percentage}%</span>
                                            </div>
                                        </div>
                                        <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1, delay: 0.5 + (idx * 0.2), ease: "easeOut" }}
                                                className={`h-full ${colors[idx % colors.length]} rounded-full relative`}
                                            >
                                                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
                                            </motion.div>
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
                    className="p-8 rounded-3xl glass-card border-none relative overflow-hidden flex flex-col"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-blue-500/10 opacity-30" />

                    <h2 className="text-xl font-bold text-white mb-6 relative z-10 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-purple-400" />
                        AI Insights
                    </h2>

                    <div className="space-y-4 flex-1 relative z-10">
                        <div className="p-5 rounded-2xl bg-green-500/10 border border-green-500/10 hover:border-green-500/30 transition-colors group">
                            <h4 className="text-green-400 font-bold text-sm mb-2 flex items-center justify-between">
                                Growth Trend
                                <TrendingUp className="w-4 h-4" />
                            </h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Your MRR has increased by <span className="text-white font-bold">12.5%</span> this month. Great job!
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/10 hover:border-blue-500/30 transition-colors group">
                            <h4 className="text-blue-400 font-bold text-sm mb-2 flex items-center justify-between">
                                Retention
                                <Users className="w-4 h-4" />
                            </h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Churn rate is at <span className="text-white font-bold">{churnData?.churnRate || '0'}%</span>. Keep monitoring for trends.
                            </p>
                        </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-white/5 relative z-10">
                        <button className="w-full py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-sm font-bold text-white transition-all flex items-center justify-center gap-2 group">
                            View Detailed Report
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
