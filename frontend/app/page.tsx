import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import FeaturesGrid from '@/components/FeaturesGrid';

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen overflow-hidden">
      {/* Global Background Effects - Blends sections together */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-[#050505] to-[#050505]" />

        {/* Side Glows - Continuous across scroll */}
        <div className="absolute top-1/2 -left-[100px] -translate-y-1/2 w-[600px] h-[800px] bg-purple-600/30 rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none" />
        <div className="absolute top-1/2 -right-[100px] -translate-y-1/2 w-[600px] h-[800px] bg-purple-600/30 rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none" />

        {/* Intense Side Beams */}
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[800px] opacity-60 pointer-events-none mix-blend-hard-light"
          style={{
            background: 'radial-gradient(ellipse at left, rgba(255,255,255,0.4) 0%, rgba(168,85,247,0.4) 20%, rgba(88,28,135,0) 70%)',
            filter: 'blur(60px)',
            transform: 'translateX(-40%)'
          }}
        />
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[800px] opacity-60 pointer-events-none mix-blend-hard-light"
          style={{
            background: 'radial-gradient(ellipse at right, rgba(255,255,255,0.4) 0%, rgba(168,85,247,0.4) 20%, rgba(88,28,135,0) 70%)',
            filter: 'blur(60px)',
            transform: 'translateX(40%)'
          }}
        />
      </div>

      <div className="relative z-10">
        <Hero />
        <HowItWorks />
        <FeaturesGrid />
      </div>
    </main>
  );
}
