'use client';

import { useState } from 'react';
import { Plus, Trash2, Key, RefreshCw, Activity, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useWebhooks, useCreateWebhook, useDeleteWebhook, useWebhookLogs, useUpdateWebhook } from '@/hooks/useWebhooks';
import { motion, AnimatePresence } from 'framer-motion';
import WebhookDebugger from '@/components/WebhookDebugger';

export default function WebhooksPage() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { data: webhooks = [], isLoading } = useWebhooks();
    const createWebhook = useCreateWebhook();
    const deleteWebhook = useDeleteWebhook();
    const updateWebhook = useUpdateWebhook();

    const [newWebhook, setNewWebhook] = useState({
        url: '',
        events: [] as string[]
    });

    const availableEvents = ['payment.success', 'payment.failure', 'subscription.renewal'];

    const [debugWebhook, setDebugWebhook] = useState<{ id: number; url: string } | null>(null);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createWebhook.mutateAsync(newWebhook);
            setShowCreateModal(false);
            setNewWebhook({ url: '', events: [] });
        } catch (error) {
            alert('Failed to register webhook');
        }
    };

    const toggleEvent = (event: string) => {
        setNewWebhook(prev => ({
            ...prev,
            events: prev.events.includes(event)
                ? prev.events.filter(e => e !== event)
                : [...prev.events, event]
        }));
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this webhook?')) {
            await deleteWebhook.mutateAsync(id);
        }
    };

    return (
        <div className="space-y-8 pb-12 relative">
            <AnimatePresence>
                {debugWebhook && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                            onClick={() => setDebugWebhook(null)}
                        />
                        <WebhookDebugger
                            webhookId={debugWebhook.id}
                            url={debugWebhook.url}
                            onClose={() => setDebugWebhook(null)}
                        />
                    </>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-black">Webhooks</h1>
                    <p className="text-[#666] mt-1 text-sm">Manage event subscriptions and integration endpoints.</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-bold rounded-xl hover:bg-[#1a1a1a] shadow-lg shadow-black/20 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Add Endpoint
                </button>
            </div>

            {/* Webhooks List */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="text-center text-[#999] text-sm py-12 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-black/10 border-t-black rounded-full animate-spin mr-3" />
                        Loading endpoints...
                    </div>
                ) : webhooks.length === 0 ? (
                    <div className="p-12 border border-dashed border-[#EAEAEA] rounded-2xl text-center bg-[#F8F9FA]">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Activity className="w-6 h-6 text-[#999]" />
                        </div>
                        <p className="text-[#666] text-sm font-medium">No webhook endpoints configured.</p>
                    </div>
                ) : (
                    webhooks.map((webhook: any) => (
                        <motion.div
                            key={webhook.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-transparent hover:border-[#EAEAEA] shadow-sm p-6 group transition-all duration-200"
                        >
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2.5 h-2.5 rounded-full ring-4 ring-opacity-20 ${webhook.is_active ? 'bg-green-500 ring-green-500' : 'bg-red-500 ring-red-500'}`} />
                                        <h3 className="font-bold text-black font-mono text-sm break-all bg-[#F8F9FA] px-3 py-1.5 rounded-lg border border-[#EAEAEA]">
                                            {webhook.url}
                                        </h3>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {webhook.events.split(',').map((event: string) => (
                                            <span key={event} className="text-xs font-bold px-2.5 py-1 rounded-md bg-black text-white">
                                                {event}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 text-xs font-medium text-[#666]">
                                        <Key className="w-3 h-3" />
                                        Secret: <span className="font-mono bg-[#F5F5F5] px-2 py-0.5 rounded text-black select-all cursor-text">whsec_************************</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setDebugWebhook({ id: webhook.id, url: webhook.url })}
                                        className="px-3 py-2 text-xs font-bold rounded-lg border border-[#EAEAEA] hover:border-black hover:bg-black hover:text-white transition-all flex items-center gap-2"
                                    >
                                        <Activity className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Logs</span>
                                    </button>
                                    <button
                                        onClick={() => updateWebhook.mutate({ id: webhook.id, data: { isActive: !webhook.is_active } })}
                                        className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors border ${webhook.is_active
                                            ? 'border-red-100 bg-red-50 text-red-600 hover:bg-red-100'
                                            : 'border-green-100 bg-green-50 text-green-600 hover:bg-green-100'}`}
                                    >
                                        {webhook.is_active ? 'Disable' : 'Enable'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(webhook.id)}
                                        className="p-2 text-[#999] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Create Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowCreateModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white p-8 max-w-lg w-full rounded-2xl shadow-xl border border-[#EAEAEA]"
                        >
                            <h2 className="text-xl font-bold mb-6 text-black">Add Webhook Endpoint</h2>
                            <form onSubmit={handleCreate} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-[#666] mb-2">Endpoint URL</label>
                                    <input
                                        required
                                        type="url"
                                        placeholder="https://api.your-app.com/webhooks"
                                        className="w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl px-4 py-3 outline-none text-sm font-medium focus:border-black/20 focus:bg-white transition-all placeholder:text-[#999]"
                                        value={newWebhook.url}
                                        onChange={e => setNewWebhook({ ...newWebhook, url: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#666] mb-3">Events to Subscribe</label>
                                    <div className="space-y-2">
                                        {availableEvents.map(event => (
                                            <label key={event} className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl border border-[#EAEAEA] hover:border-black/20 hover:bg-[#F8F9FA] transition-all">
                                                <div className={`w-5 h-5 rounded-full border border-[#d4d4d4] flex items-center justify-center transition-all ${newWebhook.events.includes(event) ? 'bg-black border-black' : 'bg-white'}`}>
                                                    {newWebhook.events.includes(event) && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    onChange={() => toggleEvent(event)}
                                                    checked={newWebhook.events.includes(event)}
                                                />
                                                <span className="text-sm font-medium text-black">{event}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-[#666] hover:bg-[#F5F5F5] transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={createWebhook.isPending || newWebhook.events.length === 0}
                                        className="px-6 py-2.5 bg-black text-white text-sm font-bold rounded-xl hover:bg-[#1a1a1a] shadow-lg shadow-black/10 transition-all disabled:opacity-50 disabled:shadow-none"
                                    >
                                        {createWebhook.isPending ? 'Registering...' : 'Register Endpoint'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
