'use client';

import { useState, useEffect } from 'react';
import { Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface HealthStatus {
    api: 'operational' | 'outage' | 'unknown';
    database: 'operational' | 'outage' | 'unknown';
    solana: 'operational' | 'outage' | 'unknown';
    timestamp: string;
    db_error?: string;
    solana_error?: string;
}

export default function StatusPage() {
    const [status, setStatus] = useState<HealthStatus | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/health`);
                const data = await res.json();
                setStatus(data);
            } catch (error) {
                setStatus({
                    api: 'outage',
                    database: 'unknown',
                    solana: 'unknown',
                    timestamp: new Date().toISOString()
                });
            } finally {
                setIsLoading(false);
            }
        };

        checkHealth();
    }, []);

    const StatusBadge = ({ state }: { state: string }) => {
        if (state === 'operational') {
            return (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-bold">Operational</span>
                </div>
            );
        }
        if (state === 'outage') {
            return (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                    <XCircle className="w-4 h-4" />
                    <span className="text-xs font-bold">Outage</span>
                </div>
            );
        }
        return (
            <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-bold">Unknown</span>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#EAEAEA] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    const overallStatus = (status?.api === 'operational' && status?.database === 'operational' && status?.solana === 'operational')
        ? 'All Systems Operational'
        : 'System Issues Detected';

    return (
        <div className="min-h-screen bg-[#EAEAEA] font-sans text-black p-4 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">System Status</h1>
                    <p className="text-[#666] font-mono text-sm">Real-time platform monitoring</p>
                </div>

                <div className="bg-white border border-[#a3a3a3] shadow-lg overflow-hidden">
                    {/* Header Status */}
                    <div className={`p-8 text-center border-b border-[#a3a3a3] ${overallStatus === 'All Systems Operational' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        <h2 className="text-2xl font-bold">{overallStatus}</h2>
                        <p className="opacity-90 mt-2 font-mono text-xs">
                            Last Updated: {new Date(status?.timestamp || Date.now()).toLocaleTimeString()}
                        </p>
                    </div>

                    {/* Components */}
                    <div className="divide-y divide-[#a3a3a3]">
                        <div className="flex items-center justify-between p-6">
                            <div>
                                <h3 className="font-bold">API Gateway</h3>
                                <p className="text-xs text-[#666] font-mono mt-1">Core backend services</p>
                            </div>
                            <StatusBadge state={status?.api || 'unknown'} />
                        </div>

                        <div className="flex items-center justify-between p-6">
                            <div>
                                <h3 className="font-bold">Database</h3>
                                <p className="text-xs text-[#666] font-mono mt-1">Merchant data storage</p>
                            </div>
                            <StatusBadge state={status?.database || 'unknown'} />
                        </div>

                        <div className="flex items-center justify-between p-6">
                            <div>
                                <h3 className="font-bold">Solana Network</h3>
                                <p className="text-xs text-[#666] font-mono mt-1">RPC Connection & Transaction processing</p>
                            </div>
                            <StatusBadge state={status?.solana || 'unknown'} />
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <a href="/" className="text-xs font-bold text-[#666] hover:text-black underline decoration-dashed underline-offset-4">
                        &larr; Return to Homepage
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
