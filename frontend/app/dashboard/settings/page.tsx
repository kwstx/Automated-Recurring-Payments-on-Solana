'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Bell, Shield, Key, Building2, CreditCard, Palette, Globe, Mail, Webhook, Check, Copy, DollarSign, AlertTriangle, Plus, Trash2 } from 'lucide-react';
import { useCompanyDetails, useUpdateCompany, useAPIKeys, useGenerateAPIKey, useRevokeAPIKey, useNotificationPreferences, useUpdateNotifications } from '@/hooks/useSettings';
import AuditLogTable from '@/components/dashboard/AuditLogTable';

export default function SettingsPage() {
    const { data: company } = useCompanyDetails();
    const [activeTab, setActiveTab] = useState('company');

    const tabs = [
        { id: 'company', label: 'Company', icon: Building2 },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'developer', label: 'Security & API', icon: Shield },
        { id: 'branding', label: 'Branding', icon: Palette },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
            {/* Header */}
            <div className="pb-6">
                <h1 className="text-2xl font-bold tracking-tight text-black">Settings</h1>
                <p className="text-[#666] mt-1 text-sm">Manage account preferences and integrations.</p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all duration-200 flex items-center gap-2 ${activeTab === tab.id
                            ? 'bg-black text-white shadow-md'
                            : 'bg-white text-[#666] hover:bg-[#F5F5F5] hover:text-black border border-transparent shadow-sm'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
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
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* Main Form Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {activeTab === 'company' && <CompanySettings />}
                        {activeTab === 'billing' && <BillingSettings />}
                        {activeTab === 'developer' && <DeveloperSettings />}
                        {activeTab === 'branding' && <BrandingSettings />}
                        {activeTab === 'notifications' && <NotificationSettings />}
                    </div>

                    {/* Side Info / Quick Links */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-transparent">
                            <h3 className="text-sm font-bold text-black tracking-wider mb-4 flex items-center gap-2 border-b border-[#F5F5F5] pb-3">
                                <Shield className="w-4 h-4 text-[#999]" />
                                Security Status
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 p-3 rounded-xl border border-green-100 bg-green-50/50">
                                    <div className="p-1.5 bg-green-100 rounded-full border border-green-200">
                                        <Check className="w-3.5 h-3.5 text-green-700" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="text-green-800 font-bold text-xs">2FA Enabled</p>
                                        <p className="text-green-700 text-xs font-medium">Account secure.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-xl border border-[#EAEAEA] bg-[#F8F9FA]">
                                    <div className="p-1.5 bg-white rounded-full border border-[#EAEAEA] shadow-sm">
                                        <Mail className="w-3.5 h-3.5 text-[#666]" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="text-black font-bold text-xs">Email Verified</p>
                                        <p className="text-[#666] text-xs font-medium">{company?.supportEmail || 'admin@example.com'}</p>
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
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-[#EAEAEA] transition-all">
            <div className="mb-8 border-b border-[#F5F5F5] pb-4">
                <h2 className="text-lg font-bold text-black mb-1">{title}</h2>
                <p className="text-[#666] text-sm">{description}</p>
            </div>
            <div className="space-y-6">
                {children}
            </div>
        </div>
    );
}

function InputGroup({ label, type = "text", placeholder, defaultValue, icon: Icon }: any) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold text-[#666] tracking-wide">{label}</label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] group-focus-within:text-black transition-colors">
                    {Icon && <Icon className="w-4 h-4" />}
                </div>
                <input
                    type={type}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    className={`w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl py-3 ${Icon ? 'pl-11' : 'pl-4'} pr-4 text-black text-sm font-medium placeholder-[#999] focus:border-black/20 focus:bg-white outline-none transition-all`}
                />
            </div>
        </div>
    );
}

function CompanySettings() {
    const { data: company, isLoading } = useCompanyDetails();
    const updateCompany = useUpdateCompany();
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (company) {
            setFormData({
                companyName: company.companyName,
                companyWebsite: company.companyWebsite,
                supportEmail: company.supportEmail,
                address: company.address
            });
        }
    }, [company]);

    const handleSave = async () => {
        try {
            await updateCompany.mutateAsync(formData);
            alert('Company details updated successfully');
        } catch (error) {
            console.error('Failed to update company:', error);
            alert('Failed to update company details');
        }
    };

    if (isLoading) return <div className="p-8 text-center text-sm text-[#999]">Loading company details...</div>;

    return (
        <SettingsSection title="Company Profile" description="Update your company information.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#666] tracking-wide">Company Name</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] group-focus-within:text-black transition-colors">
                            <Building2 className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={formData.companyName || ''}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            placeholder="Acme Corp"
                            className="w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl py-3 pl-11 pr-4 text-black text-sm font-medium placeholder-[#999] focus:border-black/20 focus:bg-white outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#666] tracking-wide">Website</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] group-focus-within:text-black transition-colors">
                            <Globe className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={formData.companyWebsite || ''}
                            onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                            placeholder="https://example.com"
                            className="w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl py-3 pl-11 pr-4 text-black text-sm font-medium placeholder-[#999] focus:border-black/20 focus:bg-white outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-[#666] tracking-wide">Contact Email</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] group-focus-within:text-black transition-colors">
                            <Mail className="w-4 h-4" />
                        </div>
                        <input
                            type="email"
                            value={formData.supportEmail || ''}
                            onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                            placeholder="support@example.com"
                            className="w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl py-3 pl-11 pr-4 text-black text-sm font-medium placeholder-[#999] focus:border-black/20 focus:bg-white outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="text-xs font-bold text-[#666] tracking-wide mb-2 block">Company Address</label>
                    <textarea
                        rows={3}
                        value={formData.address || ''}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl p-4 text-black text-sm font-medium placeholder-[#999] focus:border-black/20 focus:bg-white outline-none transition-all resize-none"
                        placeholder="123 Market St, San Francisco, CA 94105"
                    />
                </div>

                <div className="md:col-span-2 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={updateCompany.isPending}
                        className="px-6 py-2.5 bg-black text-white font-bold text-sm rounded-xl hover:bg-[#1a1a1a] shadow-lg shadow-black/10 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {updateCompany.isPending ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {updateCompany.isPending ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </SettingsSection>
    );
}

function BillingSettings() {
    const { data: company, isLoading } = useCompanyDetails();
    const [autoWithdraw, setAutoWithdraw] = useState(true);

    const handleChangeWallet = () => {
        alert("To change your payout wallet, please connect a new wallet via the Connect Wallet button in the header.");
    };

    const handleToggleAutoWithdraw = () => {
        setAutoWithdraw(!autoWithdraw);
    };

    if (isLoading) return <div className="p-8 text-center text-sm text-[#999]">Loading billing details...</div>;

    return (
        <SettingsSection title="Billing Preferences" description="Manage payouts and platform fees.">
            <div className="p-5 border border-[#EAEAEA] rounded-xl bg-[#F8F9FA] mb-6 flex items-start gap-4">
                <div className="p-2.5 bg-white rounded-lg shadow-sm text-black">
                    <CreditCard className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-black font-bold text-sm mb-1">Connected Wallet</h4>
                    <p className="text-[#666] text-xs font-medium mb-2">Payouts are deposited here automatically.</p>
                    <code className="text-xs font-mono bg-white border border-[#EAEAEA] px-2 py-1 rounded text-black font-bold">
                        {company?.walletAddress ? `${company.walletAddress.substring(0, 6)}...${company.walletAddress.substring(company.walletAddress.length - 4)}` : 'No wallet connected'}
                    </code>
                </div>
                <button
                    onClick={handleChangeWallet}
                    className="ml-auto text-xs font-bold text-black hover:text-[#666] underline hover:no-underline transition-colors"
                >
                    Change
                </button>
            </div>

            <div className="space-y-6">
                <h3 className="text-black font-bold text-sm tracking-wide">Withdrawal Settings</h3>
                <div
                    className="flex items-center justify-between p-4 border border-[#EAEAEA] rounded-xl bg-white cursor-pointer hover:border-black/20 transition-all"
                    onClick={handleToggleAutoWithdraw}
                >
                    <div>
                        <p className="text-black font-bold text-sm">Auto-Withdraw</p>
                        <p className="text-[#666] text-xs">Automatically withdraw when balance exceeds threshold.</p>
                    </div>
                    <div className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${autoWithdraw ? 'bg-black' : 'bg-[#EAEAEA]'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200 ${autoWithdraw ? 'right-1' : 'left-1'}`} />
                    </div>
                </div>
                <InputGroup label="Minimum Withdrawal Amount (USDC)" type="number" defaultValue="100.00" icon={DollarSign} />
            </div>
        </SettingsSection>
    );
}

function DeveloperSettings() {
    const { data: apiKeys = [], isLoading } = useAPIKeys();
    const generateKey = useGenerateAPIKey();
    const revokeKey = useRevokeAPIKey();

    const handleGenerate = async () => {
        const name = prompt("Enter a name for this key (optional):");
        if (name !== null) {
            try {
                await generateKey.mutateAsync(name || undefined);
            } catch (error) {
                alert('Failed to generate key');
            }
        }
    };

    const handleRevoke = async (id: number) => {
        if (confirm("Are you sure you want to revoke this key? This cannot be undone.")) {
            try {
                await revokeKey.mutateAsync(id);
            } catch (error) {
                alert('Failed to revoke key');
            }
        }
    };

    return (
        <SettingsSection title="API Keys & Webhooks" description="Manage your integration credentials.">
            <div className="space-y-6">
                <div className="flex justify-end">
                    <button
                        onClick={handleGenerate}
                        disabled={generateKey.isPending}
                        className="px-4 py-2 bg-black text-white font-bold text-xs rounded-lg hover:bg-[#1a1a1a] transition-colors flex items-center gap-2"
                    >
                        {generateKey.isPending ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Plus className="w-3 h-3" />}
                        Generate New Key
                    </button>
                </div>

                <div className="space-y-3">
                    {apiKeys.length === 0 ? (
                        <p className="text-sm text-[#999] text-center py-8">No API keys generated yet.</p>
                    ) : (
                        apiKeys.map((key: any) => (
                            <div key={key.id} className="p-4 border border-[#EAEAEA] rounded-xl bg-[#F8F9FA] flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-black mb-1">{key.name || 'Unnamed Key'}</p>
                                    <code className="text-xs font-mono text-[#666] bg-white px-2 py-1 rounded border border-[#EAEAEA]">{key.key}</code>
                                </div>
                                <button
                                    onClick={() => handleRevoke(key.id)}
                                    disabled={revokeKey.isPending}
                                    className="text-red-600 hover:text-red-700 p-2 transition-colors"
                                    title="Revoke Key"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </SettingsSection>
    );
}

function BrandingSettings() {
    const { data: company, isLoading } = useCompanyDetails();
    const updateCompany = useUpdateCompany();
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (company) {
            setFormData({
                brandColor: company.brandColor || '#000000',
                logoUrl: company.logoUrl,
                companyName: company.companyName
            });
        }
    }, [company]);

    const handleUpload = () => {
        document.getElementById('logo-upload')?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            alert(`File "${file.name}" selected. (File upload to storage bucket is coming soon)`);
        }
    };

    const handleSave = async () => {
        try {
            await updateCompany.mutateAsync(formData);
            alert('Branding updated successfully');
        } catch (error) {
            console.error('Failed to update branding:', error);
            alert('Failed to update branding');
        }
    };

    if (isLoading) return <div className="p-8 text-center text-sm text-[#999]">Loading branding details...</div>;

    return (
        <SettingsSection title="Branding" description="Customize your checkout page appearance.">
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="text-xs font-bold text-[#666] tracking-wide mb-2 block">Brand Color</label>
                    <div className="flex items-center gap-3 p-2 bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl">
                        <div className="w-8 h-8 rounded-lg shadow-sm border border-black/10" style={{ backgroundColor: formData.brandColor }} />
                        <input
                            type="text"
                            value={formData.brandColor || ''}
                            onChange={(e) => setFormData({ ...formData, brandColor: e.target.value })}
                            className="bg-transparent text-sm text-black font-mono font-medium w-full outline-none"
                            placeholder="#000000"
                        />
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-[#666] tracking-wide mb-2 block">Logo</label>
                    <div
                        className="flex items-center gap-3 p-2 bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl cursor-pointer hover:border-black/20 transition-all"
                        onClick={handleUpload}
                    >
                        {formData.logoUrl ? (
                            <img src={formData.logoUrl} alt="Logo" className="w-8 h-8 object-contain rounded bg-white shadow-sm p-1" />
                        ) : (
                            <div className="w-8 h-8 bg-black rounded flex items-center justify-center shadow-sm">
                                <span className="text-xs font-bold text-white">S</span>
                            </div>
                        )}
                        <span className="text-xs text-[#666] font-medium truncate flex-1">{formData.logoUrl ? 'Change Logo' : 'Upload Logo'}</span>
                        <input
                            id="logo-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                {/* Logo URL Manual Entry */}
                <div className="col-span-2">
                    <label className="text-xs font-bold text-[#666] tracking-wide mb-2 block">Logo URL</label>
                    <div className="relative">
                        <input
                            type="url"
                            value={formData.logoUrl || ''}
                            onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                            placeholder="https://example.com/logo.png"
                            className="w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl py-3 pl-4 pr-10 text-black text-xs font-mono placeholder-[#999] focus:border-black/20 focus:bg-white outline-none transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {formData.logoUrl && (
                                <img src={formData.logoUrl} alt="Preview" className="w-6 h-6 object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-[#666] tracking-wide">Checkout Headline (Preview)</label>
                <input
                    type="text"
                    defaultValue="Subscribe to Premium"
                    className="w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl py-3 px-4 text-black text-sm font-medium placeholder-[#999] focus:border-black/20 focus:bg-white outline-none transition-all"
                />
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={updateCompany.isPending}
                    className="px-6 py-2.5 bg-black text-white font-bold text-sm rounded-xl hover:bg-[#1a1a1a] shadow-lg shadow-black/10 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                    {updateCompany.isPending ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    {updateCompany.isPending ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </SettingsSection>
    );
}

function NotificationSettings() {
    const { data: preferences, isLoading } = useNotificationPreferences();
    const updatePreferences = useUpdateNotifications();

    const [toggles, setToggles] = useState<any>({
        'New Subscription': true,
        'Payment Failed': true,
        'Plan Cancelled': true,
        'Payout Processed': true
    });

    const [emailConfig, setEmailConfig] = useState({
        resendApiKey: '',
        emailSender: ''
    });

    useEffect(() => {
        if (preferences) {
            setToggles({
                'New Subscription': preferences.notificationNewSub,
                'Payment Failed': preferences.notificationPaymentFailed,
                'Plan Cancelled': preferences.planCancelled || true, // Default
                'Payout Processed': preferences.notificationWeeklySummary // Mapped
            });
            setEmailConfig({
                resendApiKey: preferences.resendApiKey || '',
                emailSender: preferences.emailSender || ''
            });
        }
    }, [preferences]);

    const handleToggle = (key: string) => {
        const newState = { ...toggles, [key]: !toggles[key] };
        setToggles(newState);
    };

    const handleSave = async () => {
        try {
            await updatePreferences.mutateAsync({
                notificationNewSub: toggles['New Subscription'],
                notificationPaymentFailed: toggles['Payment Failed'],
                notificationWeeklySummary: toggles['Payout Processed'],
                resendApiKey: emailConfig.resendApiKey,
                emailSender: emailConfig.emailSender
            });
            alert('Notification settings updated successfully');
        } catch (error) {
            console.error('Failed to update notifications:', error);
            alert('Failed to update notification settings');
        }
    };

    if (isLoading) return <div className="p-8 text-center text-sm text-[#999]">Loading preferences...</div>;

    return (
        <SettingsSection title="Email Notifications" description="Configure email alerts and receipts.">
            <div className="space-y-6">
                {/* Email Provider Config */}
                <div className="p-5 bg-[#F8F9FA] rounded-xl border border-[#EAEAEA]">
                    <h3 className="text-black font-bold text-sm mb-4 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Provider (Resend)
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-[#666] mb-2">Resend API Key</label>
                            <input
                                type="password"
                                placeholder="re_123..."
                                className="w-full bg-white border border-[#EAEAEA] rounded-xl px-4 py-2.5 outline-none text-sm font-medium focus:border-black/20 transition-all"
                                value={emailConfig.resendApiKey}
                                onChange={e => setEmailConfig({ ...emailConfig, resendApiKey: e.target.value })}
                            />
                            <p className="text-[10px] text-[#999] mt-1">Leave empty to use ZyoPay's default sender (limited).</p>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#666] mb-2">From Email</label>
                            <input
                                type="email"
                                placeholder="billing@yourcompany.com"
                                className="w-full bg-white border border-[#EAEAEA] rounded-xl px-4 py-2.5 outline-none text-sm font-medium focus:border-black/20 transition-all"
                                value={emailConfig.emailSender}
                                onChange={e => setEmailConfig({ ...emailConfig, emailSender: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Toggles */}
                <h3 className="text-black font-bold text-sm">Alert Preferences</h3>
                <div className="space-y-3">
                    {Object.keys(toggles).map((item) => (
                        <div
                            key={item}
                            className="flex items-center justify-between p-4 border border-[#EAEAEA] rounded-xl hover:border-black/20 transition-all cursor-pointer bg-white"
                            onClick={() => handleToggle(item)}
                        >
                            <span className="text-black font-bold text-sm">{item}</span>
                            <div className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${toggles[item] ? 'bg-black' : 'bg-[#EAEAEA]'}`}>
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200 ${toggles[item] ? 'right-1' : 'left-1'}`} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        disabled={updatePreferences.isPending}
                        className="px-6 py-2.5 bg-black text-white font-bold text-sm rounded-xl hover:bg-[#1a1a1a] shadow-lg shadow-black/10 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {updatePreferences.isPending ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </div>
        </SettingsSection>
    )
}
