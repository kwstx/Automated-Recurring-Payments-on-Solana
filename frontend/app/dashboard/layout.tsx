import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#050505] flex">
            {/* Sidebar - Fixed */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 md:ml-64 flex flex-col">
                {/* Header - Fixed/Sticky */}
                <Header title="Dashboard" />

                {/* Scrollable Content */}
                <main className="flex-1 mt-20 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
