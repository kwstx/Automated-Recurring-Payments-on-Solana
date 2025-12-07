'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Bell, Shield, Key, Building2, CreditCard, Palette, Globe, Mail, Lock, Webhook, Check, Copy, DollarSign } from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('company');
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        setIsLoading(true);
        // Mock save
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
    };

    const tabs = [
        { id: 'company', label: 'Company', icon: Building2 },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'developer', label: 'Developer', icon: Key },
        { id: 'branding', label: 'Branding', icon: Palette },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
                <p className="text-gray-400 mt-1">Manage your account preferences and integrations.</p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.05] w-fit backdrop-blur-md">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                            }`}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeSettingsTab"
                                className="absolute inset-0 bg-white/[0.1] rounded-xl border border-white/[0.05] shadow-sm"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <tab.icon className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* Main Form Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {activeTab === 'company' && <CompanySettings />}
                        {activeTab === 'billing' && <BillingSettings />}
                        {activeTab === 'developer' && <DeveloperSettings />}
                        {activeTab === 'branding' && <BrandingSettings />}
                        {activeTab === 'notifications' && <NotificationSettings />}

                        {/* Save Bar */}
                        <div className="glass-panel p-4 rounded-2xl flex justify-between items-center">
                            <p className="text-sm text-gray-400 pl-2">Unsaved changes will be lost.</p>
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className="px-6 py-2.5 bg-white text-black rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] disabled:opacity-50 flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Side Info / Quick Links */}
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-purple-400" />
                                Security Status
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/10">
                                    <div className="p-1.5 bg-green-500/20 rounded-full">
                                        <Check className="w-4 h-4 text-green-400" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="text-green-400 font-bold">2FA Enabled</p>
                                        <p className="text-gray-400 text-xs">Your account is secure.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                                    <div className="p-1.5 bg-white/[0.05] rounded-full">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="text-white font-medium">Email Verified</p>
                                        <p className="text-gray-400 text-xs">admin@stellar.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function SettingsSection({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
    return (
        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
            <div className="mb-6 relative z-10">
                <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
                <p className="text-gray-400 text-sm">{description}</p>
            </div>
            <div className="space-y-6 relative z-10">
                {children}
            </div>
        </div>
    );
}

function InputGroup({ label, type = "text", placeholder, defaultValue, icon: Icon }: any) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">{label}</label>
            <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
                    {Icon && <Icon className="w-4 h-4" />}
                </div>
                <input
                    type={type}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    className={`w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-2.5 ${Icon ? 'pl-10' : 'pl-4'} pr-4 text-white text-sm placeholder-gray-600 focus:border-purple-500/50 outline-none transition-all`}
                />
            </div>
        </div>
    );
}

function CompanySettings() {
    return (
        <SettingsSection title="Company Profile" description="Update your company information and public profile.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Company Name" placeholder="Stellar Inc." defaultValue="Stellar Inc." icon={Building2} />
                <InputGroup label="Website" placeholder="https://stellar.com" defaultValue="https://stellar.com" icon={Globe} />
                <div className="md:col-span-2">
                    <InputGroup label="Contact Email" type="email" placeholder="contact@stellar.com" defaultValue="contact@stellar.com" icon={Mail} />
                </div>
                <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Company Address</label>
                    <textarea
                        rows={3}
                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl p-4 text-white text-sm placeholder-gray-600 focus:border-purple-500/50 outline-none transition-all resize-none"
                        defaultValue="123 Solana Way, Crypto Valley, CA 94000"
                    />
                </div>
            </div>
        </SettingsSection>
    );
}

function BillingSettings() {
    return (
        <SettingsSection title="Billing Preferences" description="Manage how you receive payouts and pay platform fees.">
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-6 flex items-start gap-4">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                    <CreditCard className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm mb-1">Connected Wallet</h4>
                    <p className="text-gray-400 text-xs mb-2">Payouts are automatically deposited to this wallet.</p>
                    <code className="text-xs font-mono bg-black/30 px-2 py-1 rounded text-purple-300">8xzt...jLk2</code>
                </div>
                <button className="ml-auto text-xs font-bold text-purple-400 hover:text-purple-300">Change</button>
            </div>

            <div className="space-y-4">
                <h3 className="text-white font-bold text-sm">Withdrawal Settings</h3>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <div>
                        <p className="text-white font-medium text-sm">Auto-Withdraw</p>
                        <p className="text-gray-500 text-xs">Automatically withdraw funds when balance exceeds threshold.</p>
                    </div>
                    <div className="w-10 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                </div>
                <InputGroup label="Minimum Withdrawal Amount (USDC)" type="number" defaultValue="100.00" icon={DollarSign} />
            </div>
        </SettingsSection>
    );
}

function DeveloperSettings() {
    return (
        <SettingsSection title="API Keys & Webhooks" description="Manage your API keys for integration.">
            <div className="space-y-6">
                <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Publishable Key</label>
                    <div className="flex gap-2">
                        <code className="flex-1 bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 text-sm text-gray-300 font-mono truncate">
                            pk_live_51Mxs...2lK9s
                        </code>
                        <button className="p-3 bg-white/[0.05] hover:bg-white/[0.1] rounded-xl text-gray-400 hover:text-white transition-colors">
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Secret Key</label>
                    <div className="flex gap-2">
                        <code className="flex-1 bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 text-sm text-gray-300 font-mono truncate blur-[2px] transition-all hover:blur-none select-all">
                            sk_live_51Mxs...9pL2x
                        </code>
                        <button className="p-3 bg-white/[0.05] hover:bg-white/[0.1] rounded-xl text-gray-400 hover:text-white transition-colors">
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/[0.05]">
                    <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                        <Webhook className="w-4 h-4 text-blue-400" />
                        Webhook Endpoints
                    </h3>
                    <button className="w-full py-2.5 bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.05] border-dashed rounded-xl text-sm font-medium text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2">
                        + Add Endpoint
                    </button>
                </div>
            </div>
        </SettingsSection>
    );
}

function BrandingSettings() {
    return (
        <SettingsSection title="Branding & Appearance" description="Customize how your checkout page looks.">
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Brand Color</label>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <div className="w-8 h-8 rounded-lg bg-[#A855F7] shadow-lg shadow-purple-500/20" />
                        <span className="text-sm text-gray-300 font-mono">#A855F7</span>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Logo</label>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                            <span className="text-xs font-bold text-white">S</span>
                        </div>
                        <span className="text-xs text-gray-400">Upload new</span>
                    </div>
                </div>
            </div>
            <InputGroup label="Checkout Headline" placeholder="Subscribe to Premium" defaultValue="Subscribe to Premium" />
        </SettingsSection>
    );
}

function NotificationSettings() {
    return (
        <SettingsSection title="Email Notifications" description="Choose what update you want to receive.">
            <div className="space-y-4">
                {['New Subscription', 'Payment Failed', 'Plan Cancelled', 'Payout Processed'].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-colors">
                        <span className="text-white font-medium text-sm">{item}</span>
                        <div className="w-10 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                        </div>
                    </div>
                ))}
            </div>
        </SettingsSection>
    )
}
