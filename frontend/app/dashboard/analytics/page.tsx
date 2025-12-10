'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
            color: 'text-green-600',
            bg: 'bg-green-50',
            loading: mrrLoading
        },
        {
            title: 'Churn Rate',
            value: churnLoading ? '...' : `${churnData?.churnRate || '0.00'}%`,
            change: '-0.8%',
            isPositive: true,
            icon: Activity,
            color: 'text-red-600',
            bg: 'bg-red-50',
            loading: churnLoading
        },
        {
            title: 'Avg. Subscription Length',
            value: '8.2 Months',
            change: '+1.1 Mo',
            isPositive: true,
            icon: Clock,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            loading: false
        },
        {
            title: 'Lifetime Value (LTV)',
            value: '$485.00',
            change: '+5.3%',
            isPositive: true,
            icon: TrendingUp,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            loading: false
        },
    ];

    const [showDetailedReport, setShowDetailedReport] = useState(false);

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
            {/* Detailed Report Modal */}
            <AnimatePresence>
                {showDetailedReport && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowDetailedReport(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white p-8 max-w-2xl w-full border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative"
                        >
                            <button
                                onClick={() => setShowDetailedReport(false)}
                                className="absolute top-4 right-4 text-black hover:bg-black hover:text-white p-1 border border-transparent hover:border-black transition-all"
                            >
                                <ArrowUpRight className="w-5 h-5 rotate-180" />
                            </button>

                            <h2 className="text-2xl font-bold uppercase mb-4 flex items-center gap-2">
                                <Activity className="w-6 h-6" />
                                Detailed Performance Report
                            </h2>

                            <div className="space-y-6 font-mono text-sm">
                                <div className="p-4 bg-[#f5f5f5] border border-[#a3a3a3]">
                                    <h3 className="font-bold uppercase mb-2">Revenue Breakdown</h3>
                                    <p className="text-[#666]">Detailed revenue streams show a 15% increase in "Pro Plan" adoptions.</p>
                                </div>
                                <div className="p-4 bg-[#f5f5f5] border border-[#a3a3a3]">
                                    <h3 className="font-bold uppercase mb-2">Churn Analysis</h3>
                                    <p className="text-[#666]">Most cancellations occur after the 3rd month. Consider adding a 3-month loyalty discount.</p>
                                </div>
                                <div className="p-4 bg-[#f5f5f5] border border-[#a3a3a3]">
                                    <h3 className="font-bold uppercase mb-2">Customer Acquisition</h3>
                                    <p className="text-[#666]">Direct traffic is your top source. Social referrals have dropped by 5%.</p>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={() => setShowDetailedReport(false)}
                                    className="px-6 py-2 bg-black text-white font-mono font-bold uppercase hover:bg-[#1a1a1a]"
                                >
                                    Close Report
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#a3a3a3] pb-6">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-tight text-black">Analytics</h1>
                    <p className="text-[#666] mt-1 text-sm font-mono uppercase">Insights & business performance.</p>
                </div>

                <div className="flex items-center gap-4">
                    <select className="bg-white border border-[#a3a3a3] px-4 py-2.5 text-xs font-mono font-bold text-black outline-none focus:border-black transition-colors uppercase cursor-pointer">
                        <option>Last 30 Days</option>
                        <option>Last 3 Months</option>
                        <option>Last Year</option>
                        <option>All Time</option>
                    </select>

                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 px-6 py-2.5 bg-white border border-[#a3a3a3] text-black font-mono font-bold text-xs uppercase hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
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
                        className="bg-white border border-[#a3a3a3] p-6 hover:border-black transition-colors duration-200"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-2 border border-[#EAEAEA] ${metric.bg} ${metric.color}`}>
                                {metric.loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <metric.icon className="w-5 h-5" />}
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-mono font-bold px-2 py-1 border ${metric.isPositive
                                ? 'bg-green-50 border-green-200 text-green-700'
                                : 'bg-red-50 border-red-200 text-red-700'
                                }`}>
                                {metric.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {metric.change}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-black mb-1 tracking-tight">{metric.value}</h3>
                            <p className="text-xs text-[#666] font-mono font-bold uppercase tracking-wider">{metric.title}</p>
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
                    className="lg:col-span-2 p-0 border border-[#a3a3a3] bg-white flex flex-col relative overflow-hidden"
                >
                    <div className="flex justify-between items-center p-8 border-b border-[#a3a3a3] bg-[#f5f5f5]">
                        <div>
                            <h2 className="text-lg font-bold text-black uppercase tracking-tight">Revenue by Plan</h2>
                            <p className="text-xs text-[#666] font-mono mt-1">Distribution across tiers</p>
                        </div>
                        <div className="p-2 border border-[#a3a3a3] bg-white text-black">
                            <PieChart className="w-5 h-5" />
                        </div>
                    </div>

                    {revenueLoading ? (
                        <div className="flex-1 flex items-center justify-center min-h-[300px]">
                            <Loader2 className="w-8 h-8 text-black animate-spin" />
                        </div>
                    ) : revenueByPlan.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-[#999] font-mono uppercase text-sm min-h-[300px]">
                            No revenue data available
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col justify-center gap-8 p-8">
                            {revenueByPlan.map((item: any, idx: number) => {
                                const totalRevenue = revenueByPlan.reduce((sum: number, p: any) => sum + parseFloat(p.revenue), 0);
                                const percentage = totalRevenue > 0 ? ((parseFloat(item.revenue) / totalRevenue) * 100).toFixed(1) : 0;
                                const colors = ['bg-black', 'bg-[#666]', 'bg-[#999]', 'bg-[#ccc]'];

                                return (
                                    <div key={item.name} className="space-y-2 group">
                                        <div className="flex justify-between text-xs font-mono font-bold uppercase">
                                            <span className="text-black flex items-center gap-3">
                                                <div className={`w-3 h-3 ${colors[idx % colors.length]} border border-black`} />
                                                {item.name}
                                            </span>
                                            <div className="text-right">
                                                <span className="text-black block">${item.revenue}</span>
                                            </div>
                                        </div>
                                        <div className="h-4 w-full bg-[#EAEAEA] border border-[#a3a3a3] relative">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1, delay: 0.5 + (idx * 0.2), ease: "easeOut" }}
                                                className={`h-full ${colors[idx % colors.length]} absolute left-0 top-0`}
                                            />
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-mono text-[#666]">{percentage}%</span>
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
                    className="p-0 border border-[#a3a3a3] bg-white relative overflow-hidden flex flex-col"
                >
                    <div className="p-8 border-b border-[#a3a3a3] bg-[#f5f5f5]">
                        <h2 className="text-lg font-bold text-black uppercase tracking-tight flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            AI Insights
                        </h2>
                    </div>

                    <div className="space-y-4 flex-1 p-8">
                        <div className="p-5 border border-green-200 bg-green-50 hover:border-green-400 transition-colors group">
                            <h4 className="text-green-800 font-bold text-xs uppercase tracking-wider mb-2 flex items-center justify-between">
                                Growth Trend
                                <TrendingUp className="w-4 h-4" />
                            </h4>
                            <p className="text-black text-sm leading-relaxed font-medium">
                                Your MRR has increased by <span className="font-bold underlinedecoration-green-500">12.5%</span> this month. Great job!
                            </p>
                        </div>
                        <div className="p-5 border border-blue-200 bg-blue-50 hover:border-blue-400 transition-colors group">
                            <h4 className="text-blue-800 font-bold text-xs uppercase tracking-wider mb-2 flex items-center justify-between">
                                Retention
                                <Users className="w-4 h-4" />
                            </h4>
                            <p className="text-black text-sm leading-relaxed font-medium">
                                Churn rate is at <span className="font-bold">{churnData?.churnRate || '0'}%</span>. Keep monitoring for trends.
                            </p>
                        </div>
                    </div>

                    <div className="p-6 border-t border-[#a3a3a3] bg-[#f5f5f5]">
                        <button
                            onClick={() => setShowDetailedReport(true)}
                            className="w-full py-3.5 border border-black bg-white hover:bg-black hover:text-white text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-2 group"
                        >
                            View Detailed Report
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
