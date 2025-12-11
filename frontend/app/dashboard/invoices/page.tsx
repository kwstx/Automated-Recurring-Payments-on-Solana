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
                amount: parseFloat(newInvoice.amount) * 1000000, // Convert to units
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
        <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#a3a3a3] pb-6">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-tight text-black">Invoices</h1>
                    <p className="text-[#666] mt-1 text-sm font-mono uppercase">Manage and track payments.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="group flex items-center px-4 py-2.5 bg-transparent border border-[#a3a3a3] w-full md:w-64 focus-within:border-black focus-within:bg-white transition-colors">
                        <Search className="w-4 h-4 text-[#666] group-focus-within:text-black mr-3" />
                        <input
                            type="text"
                            placeholder="SEARCH INVOICES..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-xs font-mono font-bold text-black placeholder:text-[#999] w-full uppercase"
                        />
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-black text-white font-mono font-bold text-xs uppercase hover:bg-[#1a1a1a] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Create Invoice
                    </button>
                </div>
            </div>

            {/* Invoices List */}
            <div className="border border-[#a3a3a3] bg-white">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#a3a3a3] bg-[#f5f5f5]">
                    <div className="col-span-3 text-xs font-mono font-bold text-black uppercase">Invoice #</div>
                    <div className="col-span-3 text-xs font-mono font-bold text-black uppercase">Customer</div>
                    <div className="col-span-2 text-xs font-mono font-bold text-black uppercase">Amount</div>
                    <div className="col-span-2 text-xs font-mono font-bold text-black uppercase">Status</div>
                    <div className="col-span-2 text-xs font-mono font-bold text-black uppercase">Date</div>
                </div>

                {isLoading ? (
                    <div className="p-12 text-center text-[#999] font-mono uppercase">Loading...</div>
                ) : filteredInvoices.length === 0 ? (
                    <div className="p-12 text-center text-[#999] font-mono uppercase">No invoices found</div>
                ) : (
                    <div className="divide-y divide-[#EAEAEA]">
                        {filteredInvoices.map((inv: any) => (
                            <div key={inv.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#fafafa] group transition-colors">
                                <div className="col-span-3 font-bold text-sm text-black flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-[#666]" />
                                    {inv.invoice_number}
                                </div>
                                <div className="col-span-3 text-sm text-[#1a1a1a] font-medium">
                                    {inv.customer_name}
                                    <span className="block text-xs text-[#666]">{inv.customer_email}</span>
                                </div>
                                <div className="col-span-2 font-mono font-bold text-sm">
                                    ${(inv.amount / 1000000).toFixed(2)} <span className="text-[#999] text-xs">{inv.currency}</span>
                                </div>
                                <div className="col-span-2">
                                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono font-bold border uppercase ${inv.status === 'paid' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
                                        {inv.status === 'paid' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                        {inv.status}
                                    </span>
                                </div>
                                <div className="col-span-2 text-xs font-mono text-[#666]">
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
                            <h2 className="text-xl font-bold uppercase mb-6">Create New Invoice</h2>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase mb-1">Customer Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-[#f5f5f5] border border-[#a3a3a3] p-3 text-sm outline-none focus:border-black transition-colors"
                                        value={newInvoice.customerName}
                                        onChange={e => setNewInvoice({ ...newInvoice, customerName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase mb-1">Email</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full bg-[#f5f5f5] border border-[#a3a3a3] p-3 text-sm outline-none focus:border-black transition-colors"
                                        value={newInvoice.customerEmail}
                                        onChange={e => setNewInvoice({ ...newInvoice, customerEmail: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase mb-1">Amount (USDC)</label>
                                        <input
                                            required
                                            type="number"
                                            step="0.01"
                                            className="w-full bg-[#f5f5f5] border border-[#a3a3a3] p-3 text-sm outline-none focus:border-black transition-colors"
                                            value={newInvoice.amount}
                                            onChange={e => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase mb-1">Due Date</label>
                                        <input
                                            type="date"
                                            className="w-full bg-[#f5f5f5] border border-[#a3a3a3] p-3 text-sm outline-none focus:border-black transition-colors"
                                            value={newInvoice.dueDate}
                                            onChange={e => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase mb-1">Description</label>
                                    <textarea
                                        className="w-full bg-[#f5f5f5] border border-[#a3a3a3] p-3 text-sm outline-none focus:border-black transition-colors min-h-[80px]"
                                        value={newInvoice.description}
                                        onChange={e => setNewInvoice({ ...newInvoice, description: e.target.value })}
                                    />
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
                                        disabled={createInvoice.isPending}
                                        className="px-6 py-2.5 bg-black text-white text-xs font-mono font-bold uppercase hover:bg-[#1a1a1a]"
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
