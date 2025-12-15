'use client';

import { useState } from 'react';
import { Plus, Search, FileText, CheckCircle, Clock } from 'lucide-react';
import { useInvoices, useCreateInvoice } from '@/hooks/useInvoices';
import { motion, AnimatePresence } from 'framer-motion';

export default function InvoicesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { data: invoices = [], isLoading } = useInvoices();
    const createInvoice = useCreateInvoice();

    const [newInvoice, setNewInvoice] = useState({
        customerName: '',
        customerEmail: '',
        amount: '',
        description: '',
        dueDate: '',
        invoiceNumber: `INV-${Date.now().toString().slice(-6)}`
    });

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createInvoice.mutateAsync({
                ...newInvoice,
                amount: parseFloat(newInvoice.amount) * 1000000,
                dueDate: newInvoice.dueDate ? new Date(newInvoice.dueDate).getTime() / 1000 : null
            });
            setShowCreateModal(false);
            setNewInvoice({
                customerName: '',
                customerEmail: '',
                amount: '',
                description: '',
                dueDate: '',
                invoiceNumber: `INV-${Date.now().toString().slice(-6)}`
            });
        } catch (error) {
            alert('Failed to create invoice');
        }
    };

    const filteredInvoices = invoices.filter((inv: any) =>
        inv.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-black">Invoices</h1>
                    <p className="text-[#666] mt-1 text-sm">Create and track customer invoices.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="group flex items-center px-4 py-2.5 bg-white border border-[#EAEAEA] rounded-xl w-full md:w-64 focus-within:border-black/20 focus-within:shadow-sm transition-colors">
                        <Search className="w-4 h-4 text-[#999] group-focus-within:text-black mr-3" />
                        <input
                            type="text"
                            placeholder="Search invoices..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm font-medium text-black placeholder:text-[#999] w-full"
                        />
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-bold rounded-xl hover:bg-[#1a1a1a] shadow-lg shadow-black/20 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Create Invoice
                    </button>
                </div>
            </div>

            {/* Invoices List */}
            <div className="bg-white rounded-2xl border border-transparent hover:border-[#EAEAEA] shadow-sm overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#F8F9FA] border-b border-[#EAEAEA]">
                    <div className="col-span-3 text-xs font-bold text-[#666]">Invoice #</div>
                    <div className="col-span-3 text-xs font-bold text-[#666]">Customer</div>
                    <div className="col-span-2 text-xs font-bold text-[#666]">Amount</div>
                    <div className="col-span-2 text-xs font-bold text-[#666]">Status</div>
                    <div className="col-span-2 text-xs font-bold text-[#666]">Date</div>
                </div>

                {isLoading ? (
                    <div className="p-12 text-center text-[#999] text-sm">Loading...</div>
                ) : filteredInvoices.length === 0 ? (
                    <div className="p-24 text-center flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                            <FileText className="w-6 h-6 text-[#999]" />
                        </div>
                        <p className="text-sm font-medium text-[#666]">No invoices found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-[#F5F5F5]">
                        {filteredInvoices.map((inv: any) => (
                            <div key={inv.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#F8F9FA] group transition-colors">
                                <div className="col-span-3 font-bold text-sm text-black flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center text-[#666]">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    {inv.invoice_number}
                                </div>
                                <div className="col-span-3 text-sm text-black font-medium">
                                    {inv.customer_name}
                                    <span className="block text-xs text-[#999] font-normal">{inv.customer_email}</span>
                                </div>
                                <div className="col-span-2 font-bold text-sm text-black">
                                    ${(inv.amount / 1000000).toFixed(2)} <span className="text-[#999] text-xs font-normal">{inv.currency}</span>
                                </div>
                                <div className="col-span-2">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full ${inv.status === 'paid' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                        {inv.status === 'paid' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                        <span className="capitalize">{inv.status}</span>
                                    </span>
                                </div>
                                <div className="col-span-2 text-xs font-medium text-[#666]">
                                    {new Date(inv.created_at * 1000).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
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
                            className="bg-white p-8 max-w-lg w-full rounded-2xl shadow-xl"
                        >
                            <h2 className="text-xl font-bold mb-6 text-black">Create New Invoice</h2>
                            <form onSubmit={handleCreate} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-[#666] mb-2">Customer Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl px-4 py-3 outline-none text-sm focus:border-black/20 focus:bg-white transition-all font-medium"
                                        value={newInvoice.customerName}
                                        onChange={e => setNewInvoice({ ...newInvoice, customerName: e.target.value })}
                                        placeholder="Enter customer name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#666] mb-2">Email</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl px-4 py-3 outline-none text-sm focus:border-black/20 focus:bg-white transition-all font-medium"
                                        value={newInvoice.customerEmail}
                                        onChange={e => setNewInvoice({ ...newInvoice, customerEmail: e.target.value })}
                                        placeholder="customer@example.com"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#666] mb-2">Amount (USDC)</label>
                                        <input
                                            required
                                            type="number"
                                            step="0.01"
                                            className="w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl px-4 py-3 outline-none text-sm focus:border-black/20 focus:bg-white transition-all font-medium"
                                            value={newInvoice.amount}
                                            onChange={e => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#666] mb-2">Due Date</label>
                                        <input
                                            type="date"
                                            className="w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl px-4 py-3 outline-none text-sm focus:border-black/20 focus:bg-white transition-all font-medium"
                                            value={newInvoice.dueDate}
                                            onChange={e => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#666] mb-2">Description</label>
                                    <textarea
                                        className="w-full bg-[#F8F9FA] border border-[#EAEAEA] rounded-xl px-4 py-3 outline-none text-sm focus:border-black/20 focus:bg-white transition-all font-medium min-h-[80px] resize-none"
                                        value={newInvoice.description}
                                        onChange={e => setNewInvoice({ ...newInvoice, description: e.target.value })}
                                        placeholder="Invoice details..."
                                    />
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
                                        disabled={createInvoice.isPending}
                                        className="px-6 py-2.5 bg-black text-white text-sm font-bold rounded-xl hover:bg-[#1a1a1a] shadow-lg shadow-black/10 transition-all"
                                    >
                                        {createInvoice.isPending ? 'Creating...' : 'Create Invoice'}
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
