'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Copy, Check, Globe, Plus, AlertCircle, RefreshCw, Trash2, Eye, EyeOff, Building, Palette, Bell, Mail, Upload, Crown } from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('billing');

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white font-serif">Settings</h1>
                    <p className="text-gray-400 mt-1">Manage your account, integrations, and preferences.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Settings Navigation */}
                <div className="space-y-2">
                    {[
                        { id: 'billing', label: 'Company & Billing', icon: Building },
                        { id: 'developer', label: 'Developer', icon: Key },
                        { id: 'branding', label: 'Branding', icon: Palette, isPro: true },
                        { id: 'notifications', label: 'Notifications', icon: Bell },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <tab.icon className="w-4 h-4" />
                                <span className="font-medium text-sm">{tab.label}</span>
                            </div>
                            {tab.isPro && <Crown className="w-3 h-3 text-yellow-500" />}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-6">
                    {activeTab === 'billing' && <BillingSettings />}
                    {activeTab === 'developer' && <DeveloperSettings />}
                    {activeTab === 'branding' && <BrandingSettings />}
                    {activeTab === 'notifications' && <NotificationSettings />}
                </div>
            </div>
        </div>
    );
}

// --- Sub-Components ---

function BillingSettings() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                        <Building className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Company Details</h2>
                        <p className="text-sm text-gray-400">This information will appear on invoices.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Company Name</label>
                        <input type="text" placeholder="Acme Corp" className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500/50 transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Website</label>
                        <input type="url" placeholder="https://acme.com" className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500/50 transition-colors" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-gray-400">Support Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input type="email" placeholder="support@acme.com" className="w-full bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-white outline-none focus:border-purple-500/50 transition-colors" />
                        </div>
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                        <button className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function DeveloperSettings() {
    const [apiKey, setApiKey] = useState('sk_test_51Nx...Ky92');
    const [showKey, setShowKey] = useState(false);
    const [copied, setCopied] = useState(false);

    // Mock Webhooks from state in previous step, simplified here for layout
    const webhooks = [
        { id: 1, url: 'https://api.mysaas.com/webhooks/stellar', events: ['payment_success'], status: 'active' }
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* API Keys */}
            <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                        <Key className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">API Keys</h2>
                        <p className="text-sm text-gray-400">Secret keys for backend integration.</p>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-4">
                    <div className="flex-1 font-mono text-sm text-gray-300 truncate">
                        {showKey ? apiKey : 'sk_test_••••••••••••••••••••••••'}
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setShowKey(!showKey)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors relative group">
                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                            {copied && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded">Copied!</span>}
                        </button>
                    </div>
                </div>
                <div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-lg font-medium text-sm hover:bg-white/10 transition-colors border border-white/5">
                        <RefreshCw className="w-4 h-4" />
                        Roll Key
                    </button>
                </div>
            </div>

            {/* Webhooks */}
            <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 space-y-6">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                            <Globe className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Webhooks</h2>
                            <p className="text-sm text-gray-400">Receive real-time event notifications.</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-lg font-medium text-sm hover:bg-white/10 transition-colors border border-white/5">
                        <Plus className="w-4 h-4" />
                        Add Endpoint
                    </button>
                </div>

                <div className="space-y-3">
                    {webhooks.map((hook) => (
                        <div key={hook.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors flex items-center justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-sm text-purple-300">{hook.url}</span>
                                    <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold uppercase">Active</span>
                                </div>
                                <div className="flex gap-2">
                                    {hook.events.map(e => <span key={e} className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">{e}</span>)}
                                </div>
                            </div>
                            <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function BrandingSettings() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-1 rounded-3xl bg-gradient-to-br from-yellow-500/20 to-purple-600/20">
                <div className="p-8 rounded-[22px] bg-[#0A0A0A] border border-white/5 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center gap-2">
                            <Crown className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs font-bold text-yellow-500 uppercase tracking-wide">Pro Feature</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400">
                            <Palette className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Brand Customization</h2>
                            <p className="text-sm text-gray-400">Customize the checkout experience.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="text-sm font-medium text-gray-400 mb-3 block">Brand Color</label>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#6366F1] border-2 border-white shadow-lg cursor-pointer" />
                                <input type="text" value="#6366F1" readOnly className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-2 text-white font-mono text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-400 mb-3 block">Logo</label>
                            <div className="w-full h-32 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-purple-500/30 hover:bg-white/[0.02] transition-colors">
                                <Upload className="w-6 h-6 text-gray-500" />
                                <span className="text-xs text-gray-500">Click to upload SVG or PNG</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function NotificationSettings() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
                        <Bell className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Email Notifications</h2>
                        <p className="text-sm text-gray-400">Choose what updates you want to receive.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {[
                        { label: 'New Subscription', desc: 'Get notified when a new user subscribes.' },
                        { label: 'Payment Failed', desc: 'Alerts when a payment fails or is declined.' },
                        { label: 'Weekly Summary', desc: 'A weekly report of your revenue and churn.' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                            <div>
                                <h4 className="text-white font-medium">{item.label}</h4>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
