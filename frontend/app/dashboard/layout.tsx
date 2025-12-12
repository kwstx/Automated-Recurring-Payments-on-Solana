'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#EAEAEA] flex font-sans text-[#1a1a1a]">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Mobile Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className="flex-1 md:ml-[280px] flex flex-col min-h-screen relative z-10 w-full">
                {/* Header - Fixed/Sticky */}
                <Header title="Dashboard" onMenuClick={() => setIsSidebarOpen(true)} />

                {/* Scrollable Content */}
                <main className="flex-1 mt-24 p-4 md:p-8 overflow-y-auto no-scrollbar w-full max-w-[100vw] overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
