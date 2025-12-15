'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, TrendingUp, TrendingDown, DollarSign, Users, Clock, PieChart, Activity, Loader2, ArrowUpRight, ChevronDown } from 'lucide-react';
import { useMRR, useChurnRate, useRevenueByPlan } from '@/hooks/useAnalytics';
import { analyticsAPI } from '@/lib/api-client';
import MRRChart from '@/components/charts/MRRChart';
import ChurnChart from '@/components/charts/ChurnChart';

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
        <div className="space-y-8 pb-12">
            {/* Detailed Report Modal */}
            <AnimatePresence>
                {showDetailedReport && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowDetailedReport(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white p-8 max-w-2xl w-full rounded-2xl shadow-xl relative"
                        >
                            <button
                                onClick={() => setShowDetailedReport(false)}
                                className="absolute top-6 right-6 text-[#999] hover:text-black p-2 bg-[#F8F9FA] rounded-full transition-colors"
                            >
                                <ArrowUpRight className="w-5 h-5 rotate-180" />
                            </button>

                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-black">
                                <Activity className="w-6 h-6 text-[#999]" />
                                Detailed Performance Report
                            </h2>

                            <div className="space-y-4">
                                <div className="p-5 bg-[#F8F9FA] rounded-xl border border-[#EAEAEA]">
                                    <h3 className="font-bold text-sm text-black mb-2">Revenue Breakdown</h3>
                                    <p className="text-[#666] text-sm leading-relaxed">Detailed revenue streams show a <span className="font-bold text-green-600">15% increase</span> in "Pro Plan" adoptions.</p>
                                </div>
                                <div className="p-5 bg-[#F8F9FA] rounded-xl border border-[#EAEAEA]">
                                    <h3 className="font-bold text-sm text-black mb-2">Churn Analysis</h3>
                                    <p className="text-[#666] text-sm leading-relaxed">Most cancellations occur after the 3rd month. Consider adding a <span className="font-bold text-black">3-month loyalty discount</span>.</p>
                                </div>
                                <div className="p-5 bg-[#F8F9FA] rounded-xl border border-[#EAEAEA]">
                                    <h3 className="font-bold text-sm text-black mb-2">Customer Acquisition</h3>
                                    <p className="text-[#666] text-sm leading-relaxed">Direct traffic is your top source. Social referrals have dropped by <span className="font-bold text-red-500">5%</span>.</p>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={() => setShowDetailedReport(false)}
                                    className="px-6 py-2.5 bg-black text-white font-bold text-sm rounded-xl hover:bg-[#1a1a1a] shadow-lg shadow-black/10 transition-all"
                                >
                                    Close Report
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-black">Analytics</h1>
                    <p className="text-[#666] mt-1 text-sm">Real-time insights and performance metrics.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <select className="appearance-none bg-white border border-[#EAEAEA] pl-4 pr-10 py-2.5 rounded-xl text-sm font-bold text-black outline-none focus:border-black/20 focus:shadow-sm transition-all cursor-pointer hover:border-[#d4d4d4]">
                            <option>Last 30 Days</option>
                            <option>Last 3 Months</option>
                            <option>Last Year</option>
                            <option>All Time</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999] pointer-events-none" />
                    </div>

                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#EAEAEA] text-black font-bold text-sm rounded-xl hover:bg-[#F8F9FA] hover:border-[#d4d4d4] transition-all shadow-sm"
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
                        className="bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-[#EAEAEA] transition-all"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-2.5 rounded-xl ${metric.bg} ${metric.color}`}>
                                {metric.loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <metric.icon className="w-5 h-5" />}
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${metric.isPositive
                                ? 'bg-green-50 text-green-700'
                                : 'bg-red-50 text-red-700'
                                }`}>
                                {metric.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {metric.change}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-black mb-1">{metric.value}</h3>
                            <p className="text-xs text-[#999] font-medium tracking-wider">{metric.title}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* MRR Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-sm border border-transparent p-6 h-[340px] flex flex-col"
                >
                    <div className="mb-6 flex justify-between items-center">
                        <h3 className="font-bold text-black flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-[#999]" />
                            Revenue Trend
                        </h3>
                    </div>
                    <div className="flex-1 w-full h-full">
                        <MRRChart data={mrrData?.history || []} />
                    </div>
                </motion.div>

                {/* Churn Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-sm border border-transparent p-6 h-[340px] flex flex-col"
                >
                    <div className="mb-6 flex justify-between items-center">
                        <h3 className="font-bold text-black flex items-center gap-2">
                            <Users className="w-5 h-5 text-[#999]" />
                            Churn Trend
                        </h3>
                    </div>
                    <div className="flex-1 w-full h-full">
                        <ChurnChart data={churnData?.history || []} />
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue by Plan Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-transparent overflow-hidden flex flex-col"
                >
                    <div className="flex justify-between items-center p-6 border-b border-[#F5F5F5]">
                        <div>
                            <h2 className="text-lg font-bold text-black">Revenue by Plan</h2>
                            <p className="text-sm text-[#999] mt-0.5">Distribution across subscription tiers</p>
                        </div>
                        <div className="p-2 bg-[#F8F9FA] rounded-lg text-black">
                            <PieChart className="w-5 h-5" />
                        </div>
                    </div>

                    {revenueLoading ? (
                        <div className="flex-1 flex items-center justify-center min-h-[300px]">
                            <Loader2 className="w-8 h-8 text-[#EAEAEA] animate-spin" />
                        </div>
                    ) : revenueByPlan.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-[#999] font-medium text-sm min-h-[300px]">
                            No revenue data available
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col justify-center gap-6 p-8">
                            {revenueByPlan.map((item: any, idx: number) => {
                                const totalRevenue = revenueByPlan.reduce((sum: number, p: any) => sum + parseFloat(p.revenue), 0);
                                const percentage = totalRevenue > 0 ? ((parseFloat(item.revenue) / totalRevenue) * 100).toFixed(1) : 0;
                                const colors = ['bg-black', 'bg-gray-600', 'bg-gray-400', 'bg-gray-200'];

                                return (
                                    <div key={item.name} className="space-y-2 group">
                                        <div className="flex justify-between text-sm font-bold">
                                            <span className="text-black flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`} />
                                                {item.name}
                                            </span>
                                            <div className="text-right">
                                                <span className="text-black">${item.revenue}</span>
                                            </div>
                                        </div>
                                        <div className="h-2.5 w-full bg-[#F5F5F5] rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1, delay: 0.5 + (idx * 0.2), ease: "easeOut" }}
                                                className={`h-full ${colors[idx % colors.length]} rounded-full`}
                                            />
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-medium text-[#999]">{percentage}% Share</span>
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
                    className="bg-white rounded-2xl shadow-sm border border-transparent overflow-hidden flex flex-col h-full"
                >
                    <div className="p-6 border-b border-[#F5F5F5] bg-gradient-to-r from-white to-[#F8F9FA]">
                        <h2 className="text-lg font-bold text-black flex items-center gap-2">
                            <Activity className="w-5 h-5 text-black" />
                            AI Insights
                        </h2>
                    </div>

                    <div className="space-y-4 flex-1 p-6">
                        <div className="p-4 rounded-xl border border-green-100 bg-green-50/50 hover:bg-green-50 transition-colors">
                            <h4 className="text-green-800 font-bold text-xs tracking-wider mb-2 flex items-center justify-between">
                                Growth Trend
                                <TrendingUp className="w-4 h-4" />
                            </h4>
                            <p className="text-black text-sm leading-relaxed font-medium">
                                Your MRR has increased by <span className="font-bold text-green-600">12.5%</span> this month. Great job!
                            </p>
                        </div>
                        <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-50 transition-colors">
                            <h4 className="text-blue-800 font-bold text-xs tracking-wider mb-2 flex items-center justify-between">
                                Retention
                                <Users className="w-4 h-4" />
                            </h4>
                            <p className="text-black text-sm leading-relaxed font-medium">
                                Churn rate is at <span className="font-bold text-black">{churnData?.churnRate || '0'}%</span>. Keep monitoring for trends.
                            </p>
                        </div>
                    </div>

                    <div className="p-6 pt-0">
                        <button
                            onClick={() => setShowDetailedReport(true)}
                            className="w-full py-3.5 border border-[#EAEAEA] rounded-xl bg-white hover:border-black hover:bg-black hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group shadow-sm"
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
