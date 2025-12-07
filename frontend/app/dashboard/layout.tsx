import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#050505] flex font-sans selection:bg-purple-500/30">
            {/* Sidebar - Fixed */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 md:ml-[280px] flex flex-col min-h-screen relative z-10">
                {/* Header - Fixed/Sticky */}
                <Header title="Dashboard" />

                {/* Scrollable Content */}
                <main className="flex-1 mt-24 p-8 overflow-y-auto no-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
}
