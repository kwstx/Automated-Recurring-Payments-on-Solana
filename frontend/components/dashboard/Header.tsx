'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Search, Menu, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '@/hooks/useNotifications';

interface HeaderProps {
    title: string;
    onMenuClick: () => void;
}

export default function Header({ title, onMenuClick }: HeaderProps) {
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef<any>(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { data: notifications = [], isLoading } = useNotifications();

    return (
        <header className="fixed top-0 right-0 left-0 md:left-[280px] h-20 bg-[#F8F9FA]/80 backdrop-blur-md z-30 px-6 md:px-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">{title}</h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Search Bar (Hidden on mobile) */}
                <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-[#EAEAEA] w-[300px] focus-within:border-black/20 focus-within:ring-2 focus-within:ring-black/5 transition-all">
                    <Search className="w-4 h-4 text-[#999]" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#999]"
                    />
                </div>

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative w-10 h-10 bg-white border border-[#EAEAEA] rounded-xl flex items-center justify-center hover:bg-[#fafafa] hover:border-black/20 transition-all ${showNotifications ? 'bg-gray-50 border-black/20' : ''}`}
                    >
                        <Bell className="w-5 h-5 text-black" />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 top-12 w-80 md:w-96 bg-white border border-[#EAEAEA] rounded-2xl shadow-xl overflow-hidden z-50"
                            >
                                <div className="p-4 border-b border-[#F5F5F5] flex justify-between items-center bg-[#F8F9FA]">
                                    <h3 className="font-bold text-sm">Notifications</h3>
                                    <button className="text-xs text-black font-medium hover:underline">Mark all as read</button>
                                </div>
                                <div className="max-h-[400px] overflow-y-auto">
                                    {isLoading ? (
                                        <div className="p-8 text-center text-xs text-[#999]">Loading...</div>
                                    ) : notifications.length === 0 ? (
                                        <div className="p-8 text-center text-xs text-[#999]">No new notifications</div>
                                    ) : (
                                        notifications.map((n: any) => (
                                            <div key={n.id} className={`p-4 border-b border-[#F5F5F5] hover:bg-[#F8F9FA] transition-colors cursor-pointer ${n.unread ? 'bg-blue-50/30' : ''}`}>
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="text-sm font-bold text-black">{n.title}</h4>
                                                    <span className="text-[10px] text-[#999] bg-white border border-[#EAEAEA] px-1.5 py-0.5 rounded">{n.time}</span>
                                                </div>
                                                <p className="text-xs text-[#666] leading-relaxed">{n.message}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="p-3 text-center border-t border-[#F5F5F5] bg-[#F8F9FA]">
                                    <button className="text-xs font-bold text-black hover:opacity-70 transition-opacity">View All Activity</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
