
'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ChurnChartProps {
    data: { month: string; churn_count: number }[];
}

export default function ChurnChart({ data }: ChurnChartProps) {
    if (!data || data.length === 0) {
        return <div className="h-full flex items-center justify-center text-[#999] font-mono lowercase">no data available</div>;
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid vertical={false} stroke="#EAEAEA" />
                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 10, fontFamily: 'monospace' }}
                    dy={10}
                />
                <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 10, fontFamily: 'monospace' }}
                />
                <Tooltip
                    contentStyle={{ border: '1px solid black', borderRadius: '0px', padding: '8px' }}
                    labelStyle={{ fontFamily: 'monospace', fontSize: '10px', color: '#666', marginBottom: '4px' }}
                    itemStyle={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '12px', color: '#dc2626' }}
                    formatter={(value: number) => [value, 'Churned Users']}
                />
                <Line
                    type="monotone"
                    dataKey="churn_count"
                    stroke="#dc2626"
                    strokeWidth={2}
                    dot={{ fill: 'white', stroke: '#dc2626', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#dc2626' }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
