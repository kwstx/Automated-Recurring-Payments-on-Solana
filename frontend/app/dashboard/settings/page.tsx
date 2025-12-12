'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Bell, Shield, Key, Building2, CreditCard, Palette, Globe, Mail, Webhook, Check, Copy, DollarSign, AlertTriangle } from 'lucide-react';
import { useCompanyDetails, useUpdateCompany, useAPIKeys, useGenerateAPIKey, useRevokeAPIKey, useNotificationPreferences, useUpdateNotifications } from '@/hooks/useSettings';
import AuditLogTable from '@/components/dashboard/AuditLogTable';

export default function SettingsPage() {
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
            <div className="border-b border-[#a3a3a3] pb-6">
                <h1 className="text-3xl font-bold uppercase tracking-tight text-black">Settings</h1>
                <p className="text-[#666] mt-1 text-sm font-mono uppercase">Manage account preferences & integrations.</p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-[-1px] border-b border-[#a3a3a3]">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 border-t border-r border-l border-[#a3a3a3] -mb-[1px] ${activeTab === tab.id ? 'bg-black text-white border-black z-10' : 'bg-white text-[#666] hover:bg-[#f5f5f5]'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </div>
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
                        <div className="border border-[#a3a3a3] bg-white p-6 relative">
                            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-[#a3a3a3] pb-2">
                                <Shield className="w-4 h-4" />
                                Security Status
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 border border-green-200 bg-green-50">
                                    <div className="p-1.5 bg-green-100 rounded-none border border-green-300">
                                        <Check className="w-4 h-4 text-green-700" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="text-green-800 font-bold uppercase text-xs">2FA Enabled</p>
                                        <p className="text-green-700 text-xs font-mono">Account secure.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 border border-[#a3a3a3] bg-white">
                                    <div className="p-1.5 bg-[#f5f5f5] border border-[#d4d4d4]">
                                        <Mail className="w-4 h-4 text-[#666]" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="text-black font-bold uppercase text-xs">Email Verified</p>
                                        <p className="text-[#666] text-xs font-mono">admin@stellar.com</p>
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
        <div className="border border-[#a3a3a3] bg-white p-8 relative">
            <div className="mb-8 border-b border-[#a3a3a3] pb-4">
                <h2 className="text-lg font-bold text-black uppercase tracking-tight mb-1">{title}</h2>
                <p className="text-[#666] text-xs font-mono uppercase">{description}</p>
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
            <label className="text-xs font-mono font-bold text-black uppercase">{label}</label>
            <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999] group-focus-within:text-black transition-colors">
                    {Icon && <Icon className="w-4 h-4" />}
                </div>
                <input
                    type={type}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    className={`w-full bg-transparent border border-[#a3a3a3] rounded-none py-2.5 ${Icon ? 'pl-10' : 'pl-4'} pr-4 text-black text-sm font-medium placeholder-[#999] focus:border-black focus:bg-white outline-none transition-all`}
                />
            </div>
        </div>
    );
}

function CompanySettings() {
    const { data: company, isLoading } = useCompanyDetails();
    const updateCompany = useUpdateCompany();
    const [formData, setFormData] = useState<any>({});

    // Initialize form data when company data loads
    useEffect(() => {
        if (company) {
            setFormData({
                companyName: company.companyName,
                companyWebsite: company.companyWebsite,
                supportEmail: company.supportEmail,
                address: company.address // Note: API doesn't seem to return address yet, but keeping for future
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

    if (isLoading) return <div className="p-8 text-center uppercase font-mono text-sm">Loading company details...</div>;

    return (
        <SettingsSection title="Company Profile" description="Update your company information.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-black uppercase">Company Name</label>
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999] group-focus-within:text-black transition-colors">
                            <Building2 className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={formData.companyName || ''}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            placeholder="Stellar Inc."
                            className="w-full bg-transparent border border-[#a3a3a3] rounded-none py-2.5 pl-10 pr-4 text-black text-sm font-medium placeholder-[#999] focus:border-black focus:bg-white outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-black uppercase">Website</label>
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999] group-focus-within:text-black transition-colors">
                            <Globe className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={formData.companyWebsite || ''}
                            onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                            placeholder="https://stellar.com"
                            className="w-full bg-transparent border border-[#a3a3a3] rounded-none py-2.5 pl-10 pr-4 text-black text-sm font-medium placeholder-[#999] focus:border-black focus:bg-white outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-mono font-bold text-black uppercase">Contact Email</label>
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999] group-focus-within:text-black transition-colors">
                            <Mail className="w-4 h-4" />
                        </div>
                        <input
                            type="email"
                            value={formData.supportEmail || ''}
                            onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                            placeholder="contact@stellar.com"
                            className="w-full bg-transparent border border-[#a3a3a3] rounded-none py-2.5 pl-10 pr-4 text-black text-sm font-medium placeholder-[#999] focus:border-black focus:bg-white outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="text-xs font-mono font-bold text-black uppercase mb-2 block">Company Address</label>
                    <textarea
                        rows={3}
                        value={formData.address || ''}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-transparent border border-[#a3a3a3] rounded-none p-4 text-black text-sm font-medium placeholder-[#999] focus:border-black focus:bg-white outline-none transition-all resize-none"
                        placeholder="123 Solana Way, Crypto Valley, CA 94000"
                    />
                </div>

                <div className="md:col-span-2 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={updateCompany.isPending}
                        className="px-6 py-2.5 bg-black text-white font-mono font-bold text-xs uppercase hover:bg-[#1a1a1a] transition-all disabled:opacity-50 flex items-center gap-2"
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
        // In a real app, this would open a wallet connector modal
        alert("To change your payout wallet, please connect a new wallet via the Connect Wallet button in the header.");
    };

    const handleToggleAutoWithdraw = () => {
        setAutoWithdraw(!autoWithdraw);
        // Here we would call an API to update this setting
    };

    if (isLoading) return <div className="p-8 text-center uppercase font-mono text-sm">Loading billing details...</div>;

    return (
        <SettingsSection title="Billing Preferences" description="Manage payouts and platform fees.">
            <div className="p-4 border border-black bg-black/5 mb-6 flex items-start gap-4">
                <div className="p-2 border border-black bg-white text-black">
                    <CreditCard className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-black font-bold text-sm uppercase mb-1">Connected Wallet</h4>
                    <p className="text-[#666] text-xs font-mono mb-2">Payouts are deposited here.</p>
                    <code className="text-xs font-mono bg-white border border-[#a3a3a3] px-2 py-1 text-black font-bold">
                        {company?.walletAddress ? `${company.walletAddress.substring(0, 6)}...${company.walletAddress.substring(company.walletAddress.length - 4)}` : 'No wallet connected'}
                    </code>
                </div>
                <button
                    onClick={handleChangeWallet}
                    className="ml-auto text-xs font-bold font-mono text-black underline uppercase hover:no-underline"
                >
                    Change
                </button>
            </div>

            <div className="space-y-4">
                <h3 className="text-black font-bold text-xs uppercase">Withdrawal Settings</h3>
                <div
                    className="flex items-center justify-between p-4 border border-[#a3a3a3] bg-white cursor-pointer hover:border-black transition-colors"
                    onClick={handleToggleAutoWithdraw}
                >
                    <div>
                        <p className="text-black font-bold text-sm uppercase">Auto-Withdraw</p>
                        <p className="text-[#666] text-xs font-mono">Withdraw when balance exceeds threshold (Coming Soon).</p>
                    </div>
                    <div className={`w-10 h-6 border transition-colors relative ${autoWithdraw ? 'bg-black border-black' : 'bg-white border-[#a3a3a3]'}`}>
                        <div className={`absolute top-0.5 w-4 h-4 bg-white shadow-sm transition-all duration-200 ${autoWithdraw ? 'right-0.5' : 'left-0.5'}`} />
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
        <SettingsSection title="API Keys & Webhooks" description="Manage integration keys.">
            <div className="space-y-6">

                {isLoading && <div>Loading keys...</div>}

                {!isLoading && apiKeys.map((key: any) => (
                    <div key={key.id} className="relative group">
                        <label className="text-xs font-mono font-bold text-black uppercase mb-2 block">
                            {key.name || 'Secret Key'}
                            <span className="ml-2 text-[#666] font-normal">({key.prefix}...)</span>
                        </label>
                        <div className="flex gap-2">
                            <code className="flex-1 bg-[#f5f5f5] border border-[#a3a3a3] px-4 py-3 text-xs text-black font-mono truncate transition-all select-all">
                                {key.key}
                            </code>
                            <button
                                onClick={() => handleRevoke(key.id)}
                                disabled={revokeKey.isPending}
                                className="p-3 border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                                title="Revoke Key"
                            >
                                <AlertTriangle className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-[10px] text-[#999] mt-1 uppercase">Created: {new Date(key.created_at).toLocaleDateString()}</p>
                    </div>
                ))}

                {apiKeys.length === 0 && !isLoading && (
                    <div className="p-4 border border-dashed border-[#a3a3a3] text-center text-sm text-[#666] uppercase">
                        No API Keys found.
                    </div>
                )}

                <button
                    onClick={handleGenerate}
                    disabled={generateKey.isPending}
                    className="w-full py-3 bg-black text-white font-mono font-bold text-xs uppercase hover:bg-[#1a1a1a] transition-all flex items-center justify-center gap-2"
                >
                    {generateKey.isPending ? 'Generating...' : '+ Generate New Secret Key'}
                </button>

                <div className="pt-6 border-t border-[#a3a3a3] mt-8">
                    <h3 className="text-black font-bold text-xs uppercase mb-4 flex items-center gap-2">
                        <Webhook className="w-4 h-4" />
                        Webhook Endpoints
                    </h3>
                    <button className="w-full py-2.5 border border-dashed border-black hover:bg-[#f5f5f5] text-xs font-mono font-bold text-black uppercase transition-all flex items-center justify-center gap-2">
                        + Add Endpoint
                    </button>
                </div>

                <div className="pt-6 border-t border-[#a3a3a3] mt-8">
                    <h3 className="text-black font-bold text-xs uppercase mb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Audit Logs
                    </h3>
                    <AuditLogTable />
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
                companyName: company.companyName // preserve other fields when updating
            });
        }
    }, [company]);

    const handleUpload = () => {
        // Trigger file input click
        document.getElementById('logo-upload')?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            alert(`File "${file.name}" selected. (File upload to storage bucket is coming soon)`);
            // In future: upload to S3, get URL, setFormData({ ...formData, logoUrl: url })
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

    if (isLoading) return <div className="p-8 text-center uppercase font-mono text-sm">Loading branding details...</div>;

    return (
        <SettingsSection title="Branding" description="Checkout page appearance.">
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="text-xs font-mono font-bold text-black uppercase mb-2 block">Brand Color</label>
                    <div className="flex items-center gap-2 p-2 border border-[#a3a3a3] bg-white">
                        <div className="w-8 h-8 border border-black" style={{ backgroundColor: formData.brandColor }} />
                        <input
                            type="text"
                            value={formData.brandColor || ''}
                            onChange={(e) => setFormData({ ...formData, brandColor: e.target.value })}
                            className="text-xs text-black font-mono font-bold w-full outline-none"
                            placeholder="#000000"
                        />
                    </div>
                </div>
                <div>
                    <label className="text-xs font-mono font-bold text-black uppercase mb-2 block">Logo</label>
                    <div
                        className="flex items-center gap-2 p-2 border border-[#a3a3a3] bg-white cursor-pointer hover:border-black transition-colors"
                        onClick={handleUpload}
                    >
                        {formData.logoUrl ? (
                            <img src={formData.logoUrl} alt="Logo" className="w-8 h-8 object-contain bg-gray-100" />
                        ) : (
                            <div className="w-8 h-8 bg-black flex items-center justify-center">
                                <span className="text-xs font-bold text-white">S</span>
                            </div>
                        )}
                        <span className="text-xs text-[#666] font-mono uppercase truncate max-w-[100px]">{formData.logoUrl ? 'Change' : 'Upload'}</span>
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
                    <label className="text-xs font-mono font-bold text-black uppercase mb-2 block">Logo URL</label>
                    <div className="relative">
                        <input
                            type="url"
                            value={formData.logoUrl || ''}
                            onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                            placeholder="https://example.com/logo.png"
                            className="w-full bg-transparent border border-[#a3a3a3] rounded-none py-2 px-3 text-black text-xs font-mono placeholder-[#999] focus:border-black focus:bg-white outline-none transition-all"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            {formData.logoUrl && (
                                <img src={formData.logoUrl} alt="Preview" className="w-6 h-6 object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Headline is not yet in backend schema, so we treat it as visual only for now or map to existing field if appropriate */}
            <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-black uppercase">Checkout Headline (Preview)</label>
                <input
                    type="text"
                    defaultValue="Subscribe to Premium"
                    className="w-full bg-transparent border border-[#a3a3a3] rounded-none py-2.5 px-4 text-black text-sm font-medium placeholder-[#999] focus:border-black focus:bg-white outline-none transition-all"
                />
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={updateCompany.isPending}
                    className="px-6 py-2.5 bg-black text-white font-mono font-bold text-xs uppercase hover:bg-[#1a1a1a] transition-all disabled:opacity-50 flex items-center gap-2"
                >
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

    // Sync with backend data
    useEffect(() => {
        if (preferences) {
            setToggles({
                'New Subscription': preferences.newSubscription,
                'Payment Failed': preferences.paymentFailed,
                'Plan Cancelled': preferences.planCancelled,
                'Payout Processed': preferences.payoutProcessed
            });
        }
    }, [preferences]);

    const handleToggle = async (key: string) => {
        const newState = { ...toggles, [key]: !toggles[key] };
        setToggles(newState);

        try {
            await updatePreferences.mutateAsync({
                newSubscription: newState['New Subscription'],
                paymentFailed: newState['Payment Failed'],
                planCancelled: newState['Plan Cancelled'],
                payoutProcessed: newState['Payout Processed']
            });
        } catch (error) {
            console.error('Failed to update notifications:', error);
            // Revert on failure
            setToggles(toggles);
        }
    };

    if (isLoading) return <div className="p-8 text-center uppercase font-mono text-sm">Loading preferences...</div>;

    return (
        <SettingsSection title="Email Notifications" description="Select updates to receive.">
            <div className="space-y-4">
                {Object.keys(toggles).map((item) => (
                    <div
                        key={item}
                        className="flex items-center justify-between p-4 border border-[#a3a3a3] bg-white hover:border-black transition-colors cursor-pointer"
                        onClick={() => handleToggle(item)}
                    >
                        <span className="text-black font-bold text-sm uppercase">{item}</span>
                        <div className={`w-10 h-6 border transition-colors relative ${toggles[item] ? 'bg-black border-black' : 'bg-white border-[#a3a3a3]'}`}>
                            <div className={`absolute top-0.5 w-4 h-4 bg-white shadow-sm transition-all duration-200 ${toggles[item] ? 'right-0.5' : 'left-0.5'}`} />
                        </div>
                    </div>
                ))}
            </div>
        </SettingsSection>
    )
}
