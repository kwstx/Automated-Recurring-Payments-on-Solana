
'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface MRRChartProps {
    data: { month: string; mrr: number }[];
}

export default function MRRChart({ data }: MRRChartProps) {
    if (!data || data.length === 0) {
        return <div className="h-full flex items-center justify-center text-[#999] font-mono lowercase">no data available</div>;
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid vertical={false} stroke="#EAEAEA" />
                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 10, fontFamily: 'monospace' }}
                    dy={10}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 10, fontFamily: 'monospace' }}
                    tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                    cursor={{ fill: '#F5F5F5' }}
                    contentStyle={{ border: '1px solid black', borderRadius: '0px', padding: '8px' }}
                    labelStyle={{ fontFamily: 'monospace', fontSize: '10px', color: '#666', marginBottom: '4px' }}
                    itemStyle={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '12px', color: 'black' }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'MRR']}
                />
                <Bar dataKey="mrr" fill="black" radius={[2, 2, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
