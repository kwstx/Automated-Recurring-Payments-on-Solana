'use client';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ScriptableContext
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler // Register Filler plugin
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            backgroundColor: '#1a1a1a',
            titleColor: '#fff',
            bodyColor: '#fff',
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            titleFont: {
                family: 'var(--font-geist-sans)',
                size: 13
            },
            bodyFont: {
                family: 'var(--font-geist-sans)',
                size: 13,
                weight: 'bold'
            },
            callbacks: {
                label: function (context: any) {
                    return '$' + context.parsed.y.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                }
            }
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
                drawBorder: false,
            },
            ticks: {
                color: '#999',
                font: {
                    family: 'var(--font-geist-sans)',
                    size: 11
                },
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 8
            },
            border: {
                display: false
            }
        },
        y: {
            grid: {
                color: '#f0f0f0',
                drawBorder: false,
            },
            ticks: {
                color: '#999',
                font: {
                    family: 'var(--font-geist-sans)',
                    size: 11
                },
                callback: function (value: any) {
                    return '$' + value;
                },
                maxTicksLimit: 5
            },
            border: {
                display: false
            }
        },
    },
    elements: {
        line: {
            tension: 0.4, // Smooth curve
        },
        point: {
            radius: 0,
            hitRadius: 20,
            hoverRadius: 6,
            hoverBorderWidth: 4,
            hoverBorderColor: '#fff'
        }
    },
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
};

interface RevenueChartProps {
    data: { date: string; amount: number }[];
    isLoading?: boolean;
}

export default function RevenueChart({ data, isLoading }: RevenueChartProps) {
    if (isLoading) {
        return (
            <div className="w-full h-[350px] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-black/10 border-t-black rounded-full animate-spin" />
            </div>
        );
    }

    // Default empty data structure matching the loop below
    const chartData = {
        labels: data?.map(d => {
            const date = new Date(d.date);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }) || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Revenue',
                data: data?.map(d => d.amount) || [0, 0, 0, 0, 0, 0, 0],
                borderColor: '#000000',
                backgroundColor: (context: ScriptableContext<'line'>) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
                    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    return gradient;
                },
                borderWidth: 2,
                fill: true,
            },
        ],
    };

    return (
        <div className="w-full h-full min-h-[300px] p-2">
            <Line options={options as any} data={chartData} />
        </div>
    );
}
