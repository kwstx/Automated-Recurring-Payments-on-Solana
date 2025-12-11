
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, CheckCircle, AlertTriangle, Clock, ChevronRight, Terminal } from 'lucide-react';
import { useWebhookLogs, useWebhookDelivery, useRetryWebhook } from '@/hooks/useWebhooks';

interface WebhookDebuggerProps {
    webhookId: number;
    url: string;
    onClose: () => void;
}

export default function WebhookDebugger({ webhookId, url, onClose }: WebhookDebuggerProps) {
    const { data: logs = [], isLoading } = useWebhookLogs(webhookId);
    const [selectedLogId, setSelectedLogId] = useState<number | null>(null);

    // Detail View State
    const { data: deliveryDetail, isLoading: isLoadingDetail } = useWebhookDelivery(selectedLogId);
    const retryMutation = useRetryWebhook();

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-[-8px_0px_0px_0px_rgba(0,0,0,0.1)] border-l border-black z-50 flex flex-col"
        >
            {/* Header */}
            <div className="p-6 border-b border-[#EAEAEA] flex items-center justify-between bg-black text-white">
                <div>
                    <h2 className="font-bold uppercase tracking-tight flex items-center gap-2">
                        <Terminal className="w-5 h-5" />
                        Webhook Debugger
                    </h2>
                    <p className="text-xs font-mono text-[#999] mt-1 break-all">{url}</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-[#333] transition-colors rounded-full">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* List Column */}
                <div className={`${selectedLogId ? 'hidden md:flex w-1/3' : 'w-full'} flex-col border-r border-[#EAEAEA] bg-[#f9f9f9] overflow-y-auto duration-200`}>
                    {isLoading ? (
                        <div className="p-8 text-center text-[#999] font-mono text-xs uppercase">Loading Logs...</div>
                    ) : logs.length === 0 ? (
                        <div className="p-8 text-center text-[#999] font-mono text-xs uppercase">No deliveries yet.</div>
                    ) : (
                        logs.map((log: any) => (
                            <button
                                key={log.id}
                                onClick={() => setSelectedLogId(log.id)}
                                className={`p-4 border-b border-[#EAEAEA] text-left hover:bg-white transition-colors group ${selectedLogId === log.id ? 'bg-white border-l-4 border-l-black' : 'border-l-4 border-l-transparent'}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 border ${log.status === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                        {log.status === 'success' ? '200 OK' : log.response_status_code || 'ERR'}
                                    </span>
                                    <span className="text-[10px] text-[#999] font-mono">
                                        {new Date(log.created_at * 1000).toLocaleTimeString()}
                                    </span>
                                </div>
                                <div className="font-mono text-xs font-bold truncate mb-1">{log.event_type}</div>
                                <div className="text-[10px] text-[#666] truncate">{log.id}</div>
                            </button>
                        ))
                    )}
                </div>

                {/* Detail Column */}
                <div className={`${selectedLogId ? 'w-full md:w-2/3' : 'hidden'} flex flex-col bg-white overflow-y-auto`}>
                    {selectedLogId ? (
                        isLoadingDetail ? (
                            <div className="p-8 text-center text-[#999] font-mono text-xs uppercase">Loading Details...</div>
                        ) : deliveryDetail ? (
                            <div className="p-6 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold uppercase mb-1">
                                            {deliveryDetail.event_type}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs text-[#666] font-mono">
                                            <Clock className="w-3 h-3" />
                                            {new Date(deliveryDetail.created_at * 1000).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => retryMutation.mutate(deliveryDetail.id)}
                                            disabled={retryMutation.isPending}
                                            className="px-3 py-1.5 border border-black text-xs font-mono font-bold uppercase hover:bg-black hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            <RefreshCw className={`w-3 h-3 ${retryMutation.isPending ? 'animate-spin' : ''}`} />
                                            Retry
                                        </button>
                                        <button onClick={() => setSelectedLogId(null)} className="md:hidden p-1.5 border border-[#ccc]">
                                            Close
                                        </button>
                                    </div>
                                </div>

                                {/* Status Box */}
                                <div className={`p-4 border ${deliveryDetail.status === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                    <div className="flex items-center gap-2 font-bold uppercase text-sm mb-1">
                                        {deliveryDetail.status === 'success' ? <CheckCircle className="w-4 h-4 text-green-600" /> : <AlertTriangle className="w-4 h-4 text-red-600" />}
                                        {deliveryDetail.status}
                                    </div>
                                    {deliveryDetail.error_message && (
                                        <p className="text-xs font-mono text-red-600 mt-2">{deliveryDetail.error_message}</p>
                                    )}
                                </div>

                                {/* Payload */}
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-[#666] mb-2">Request Payload</h4>
                                    <pre className="bg-[#f5f5f5] p-4 text-[10px] font-mono overflow-x-auto border border-[#EAEAEA]">
                                        {JSON.stringify(JSON.parse(deliveryDetail.payload || '{}'), null, 2)}
                                    </pre>
                                </div>

                                {/* Response */}
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-[#666] mb-2">Response Body</h4>
                                    <pre className="bg-[#f5f5f5] p-4 text-[10px] font-mono overflow-x-auto border border-[#EAEAEA]">
                                        {deliveryDetail.response_body || '(No response body)'}
                                    </pre>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 text-center text-[#999]">Log not found</div>
                        )
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-[#999] font-mono text-xs uppercase">
                            Select a log to view details
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
