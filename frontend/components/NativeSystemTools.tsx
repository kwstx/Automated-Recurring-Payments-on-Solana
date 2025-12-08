'use client';

const tools = [
    {
        id: 'access',
        title: 'ACCESS RAW NETWORK DATA ACROSS SOLANA ECOSYSTEMS',
        description: 'Scan, trace, and filter account data with deep precision. Perfect for indexing immutable content layers on Solana.',
        metric: '214K Tx',
        metricLabel: 'Processed'
    },
    {
        id: 'automate',
        title: 'AUTOMATE REACTIONS FROM VERIFIED CHAIN EVENTS',
        description: 'Deploy condition-based automation that listens to network behavior. Configure event outputs from Programs or Token events — and sync logic instantly.',
        metric: '5.2s',
        metricLabel: 'Latency'
    },
    {
        id: 'verify',
        title: 'VERIFY TRANSACTION SETTLEMENT WITHOUT THIRD PARTIES',
        description: 'Gain proof of execution without trust assumptions. Track confirmation depth and commitment, from instruction-level actions to block inclusion.',
        metric: '100%',
        metricLabel: 'Verified'
    }
];

export default function NativeSystemTools() {
    return (
        <section className="relative w-full text-[#1a1a1a] bg-[#EAEAEA] pb-20">
            {/* Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#a3a3a3]">
                <div className="p-6 md:p-10 border-r-0 md:border-r border-[#a3a3a3]">
                    <span className="text-xs font-mono font-bold tracking-wider mb-2 block">[02] SYSTEM TOOLS</span>
                </div>
                <div className="p-6 md:p-10 flex items-end">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none max-w-lg">
                        TOOLS FOR SOLANA-<br />
                        NATIVE WEB3<br />
                        SYSTEMS
                    </h2>
                </div>
            </div>

            {/* List Row Items */}
            <div className="flex flex-col border-b border-[#a3a3a3]">
                {tools.map((tool) => (
                    <div key={tool.id} className="group border-t border-[#a3a3a3] first:border-t-0 hover:bg-white/40 transition-colors duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[180px]">

                            {/* Column 1: Bullet/Icon */}
                            <div className="hidden md:flex col-span-1 border-r border-[#a3a3a3] items-center justify-center p-6">
                                <div className="w-4 h-4 bg-black group-hover:scale-110 transition-transform duration-300" />
                            </div>

                            {/* Column 2: Title */}
                            <div className="col-span-12 md:col-span-4 border-r-0 md:border-r border-[#a3a3a3] p-6 md:p-10 flex items-center">
                                <h3 className="text-xl md:text-2xl font-bold uppercase leading-tight max-w-sm">
                                    {tool.title}
                                </h3>
                            </div>

                            {/* Column 3: Description */}
                            <div className="col-span-6 md:col-span-5 border-r-0 md:border-r border-[#a3a3a3] p-6 md:p-10 flex items-center">
                                <p className="text-sm md:text-base leading-relaxed text-[#555] max-w-md">
                                    {tool.description}
                                </p>
                            </div>

                            {/* Column 4: Metric */}
                            <div className="col-span-6 md:col-span-2 p-6 md:p-10 flex flex-col items-end justify-center">
                                <span className="text-[#999] text-xs font-mono uppercase mb-1">{tool.metricLabel}</span>
                                <span className="text-2xl font-mono font-medium">{tool.metric}</span>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom spacer line similar to reference */}
            <div className="w-full border-t border-[#a3a3a3] mt-20"></div>
        </section>
    );
}
