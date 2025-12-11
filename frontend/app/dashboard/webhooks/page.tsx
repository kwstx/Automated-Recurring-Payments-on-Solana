'use client';

import { useState } from 'react';
import { Plus, Trash2, Key, RefreshKw, Activity, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useWebhooks, useCreateWebhook, useDeleteWebhook, useWebhookLogs, useUpdateWebhook } from '@/hooks/useWebhooks';
import { motion, AnimatePresence } from 'framer-motion';

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
        <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#a3a3a3] pb-6">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-tight text-black">Webhooks</h1>
                    <p className="text-[#666] mt-1 text-sm font-mono uppercase">Manage event subscriptions & integrations.</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-black text-white font-mono font-bold text-xs uppercase hover:bg-[#1a1a1a] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Add Endpoint
                </button>
            </div>

            {/* Webhooks List */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="text-center text-[#999] font-mono py-12 uppercase">Loading...</div>
                ) : webhooks.length === 0 ? (
                    <div className="p-12 border border-dashed border-[#a3a3a3] text-center bg-[#f5f5f5]">
                        <Activity className="w-8 h-8 mx-auto text-[#999] mb-4" />
                        <p className="text-[#666] font-mono uppercase text-sm">No webhook endpoints configured.</p>
                    </div>
                ) : (
                    webhooks.map((webhook: any) => (
                        <div key={webhook.id} className="border border-[#a3a3a3] bg-white p-6 hover:border-black transition-colors group">
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${webhook.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
                                        <h3 className="font-bold text-black font-mono break-all">{webhook.url}</h3>
                                        <span className="text-xs bg-[#f5f5f5] px-2 py-0.5 border border-[#e5e5e5] text-[#666] font-mono">
                                            ID: {webhook.id}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {webhook.events.split(',').map((event: string) => (
                                            <span key={event} className="text-xs font-mono font-bold uppercase bg-black text-white px-2 py-1">
                                                {event}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 text-xs font-mono text-[#666]">
                                        <Key className="w-3 h-3" />
                                        Secret: <span className="blur-sm hover:blur-none transition-all cursor-text select-all">whsec_************************</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateWebhook.mutate({ id: webhook.id, data: { isActive: !webhook.is_active } })}
                                        className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border transition-colors ${webhook.is_active ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100' : 'border-green-200 bg-green-50 text-green-600 hover:bg-green-100'}`}
                                    >
                                        {webhook.is_active ? 'Disable' : 'Enable'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(webhook.id)}
                                        className="p-2 border border-transparent hover:border-red-600 hover:bg-red-600 hover:text-white text-[#666] transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
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
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowCreateModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white p-8 max-w-lg w-full border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <h2 className="text-xl font-bold uppercase mb-6">Add Webhook Endpoint</h2>
                            <form onSubmit={handleCreate} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase mb-2">Endpoint URL</label>
                                    <input
                                        required
                                        type="url"
                                        placeholder="https://api.your-app.com/webhooks"
                                        className="w-full bg-[#f5f5f5] border border-[#a3a3a3] p-3 text-sm outline-none focus:border-black transition-colors"
                                        value={newWebhook.url}
                                        onChange={e => setNewWebhook({ ...newWebhook, url: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase mb-3">Events to Subscribe</label>
                                    <div className="space-y-2">
                                        {availableEvents.map(event => (
                                            <label key={event} className="flex items-center gap-3 cursor-pointer group">
                                                <div className={`w-4 h-4 border border-[#a3a3a3] flex items-center justify-center transition-colors ${newWebhook.events.includes(event) ? 'bg-black border-black' : 'bg-white group-hover:border-black'}`}>
                                                    {newWebhook.events.includes(event) && <CheckCircle className="w-3 h-3 text-white" />}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    onChange={() => toggleEvent(event)}
                                                    checked={newWebhook.events.includes(event)}
                                                />
                                                <span className="text-sm font-mono">{event}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="px-6 py-2.5 border border-transparent text-xs font-mono font-bold uppercase hover:bg-[#f5f5f5]"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={createWebhook.isPending || newWebhook.events.length === 0}
                                        className="px-6 py-2.5 bg-black text-white text-xs font-mono font-bold uppercase hover:bg-[#1a1a1a] disabled:opacity-50"
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
