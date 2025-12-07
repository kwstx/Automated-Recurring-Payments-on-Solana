import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import FeaturesGrid from '@/components/FeaturesGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen overflow-hidden">
      {/* Global Background Effects - Blends sections together */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#050505]" />

        {/* Central subtle glow to backing the hero */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-transparent to-transparent opacity-30" />
      </div>

      <div className="relative z-10">
        <Hero />
        <HowItWorks />
        <FeaturesGrid />
        <Footer />
      </div>
    </main>
  );
}
