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
        <div className="min-h-screen bg-[#F8F9FA] flex font-sans text-black">
            {/* Desktop Sidebar - Fixed */}
            <Sidebar />

            {/* Mobile Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className="flex-1 md:ml-[280px] flex flex-col min-h-screen relative z-10 w-full">
                {/* Header - Fixed/Sticky */}
                <Header title="Dashboard" onMenuClick={() => setIsSidebarOpen(true)} />

                {/* Scrollable Content */}
                <main className="flex-1 mt-24 p-6 md:p-10 overflow-y-auto w-full max-w-[1920px] mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
