'use client';

import { useQuery } from '@tanstack/react-query';
import { auditAPI } from '@/lib/api-client';
import { format } from 'date-fns';
import { Loader2, ShieldAlert } from 'lucide-react';

interface AuditLog {
    id: number;
    action: string;
    target_type: string;
    target_id: string;
    details: string;
    timestamp: number;
    ip_address?: string;
}

export default function AuditLogTable() {
    const { data: logs, isLoading } = useQuery({
        queryKey: ['audit-logs'],
        queryFn: auditAPI.getLogs
    });

    if (isLoading) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!logs || logs.length === 0) {
        return (
            <div className="text-center py-12 border border-dashed border-[#a3a3a3] rounded-lg">
                <ShieldAlert className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No Security Activity</h3>
                <p className="text-gray-500 text-sm">No audit logs have been recorded yet.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto border border-[#a3a3a3] rounded-lg">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-[#a3a3a3]">
                    <tr>
                        <th className="px-6 py-3">Action</th>
                        <th className="px-6 py-3">Target</th>
                        <th className="px-6 py-3">Details</th>
                        <th className="px-6 py-3">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log: AuditLog) => (
                        <tr key={log.id} className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-mono font-medium text-blue-600">
                                {log.action}
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                    {log.target_type}
                                </span>
                                <span className="ml-2 text-xs text-gray-400 font-mono">
                                    #{log.target_id.substring(0, 8)}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-600 max-w-[300px] truncate">
                                {log.details}
                            </td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                {format(new Date(log.timestamp * 1000), 'MMM d, h:mm a')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
