import Hero from '@/components/Hero';
import InfrastructureModules from '@/components/InfrastructureModules';
import NativeSystemTools from '@/components/NativeSystemTools';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative bg-[#Eaeaea] min-h-screen text-black font-sans">
      <div className="relative z-10">
        <Hero />
        <InfrastructureModules />
        <NativeSystemTools />
        <Footer />
      </div>
    </main>
  );
}
