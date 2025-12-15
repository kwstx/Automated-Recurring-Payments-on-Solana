'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDownRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="sticky top-0 z-0 min-h-screen flex flex-col pt-2 px-4 pb-0 md:pt-4 md:px-6 md:pb-0 font-sans text-[#1a1a1a] overflow-x-hidden w-full max-w-[100vw]">

      {/* Background Image */}
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="/hero-gradient-bg.png"
          alt="Hero Background Gradient"
          fill
          className="object-cover opacity-80"
          priority
        />
      </div>



      {/* Wrapper for Content Below Top Line */}
      <div className="relative flex-1 flex flex-col min-h-0 w-full">


        {/* Header / Navigation */}
        <header className="w-full relative z-20 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center">
            <h1 className="font-bold text-2xl tracking-tight">ZyoPay</h1>
          </div>

          {/* Right Side: Links & Button */}
          <div className="flex items-center gap-8">
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1a1a1a]">
              <Link href="/sdks" className="hover:text-black transition-colors">SDKs</Link>
              <Link href="/webhooks" className="hover:text-black transition-colors">Webhooks</Link>
              <Link href="/resources" className="hover:text-black transition-colors">Resources</Link>
              <Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link>
              <Link href="/docs" className="hover:text-black transition-colors">Docs</Link>
              <Link href="/portal" className="hover:text-black transition-colors">Portal</Link>
            </nav>

            {/* Launch App Button */}
            <Link
              href="/login"
              className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-black/90 transition-all shadow-sm"
            >
              Launch App
            </Link>
          </div>
        </header>



        {/* Main Content - Centered Layout */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full mx-auto px-4 mt-8">

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-0 relative z-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] text-black mb-6 max-w-4xl mx-auto">
              Automate your billing on chain<br className="hidden md:block" />
              with solana subscriptions.
            </h2>
            <p className="text-[#666] text-sm md:text-base font-medium tracking-normal max-w-3xl mx-auto">
              Automated recurring revenue infrastructure for the modern web3 economy [2025]
            </p>
          </motion.div>



          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[210rem] aspect-[1.6] -mt-24 md:-mt-52 pointer-events-none select-none z-10"
          >
            <Image
              src="/hero-phone-final.png"
              alt="ZyoPay Mobile App Interface"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* CTA Buttons - Positioned relatively to float near bottom/middle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-0 -translate-y-12 md:-translate-y-48 relative z-20"
          >
            <Link
              href="/register"
              className="bg-black text-white px-8 py-3 rounded-lg font-bold text-sm tracking-wide hover:bg-black/90 transition-colors shadow-lg"
            >
              Get Started with Solana
            </Link>
            <Link
              href="/docs"
              className="bg-[#EAEAEA] text-black border border-[#d4d4d4] px-8 py-3 rounded-lg font-bold text-sm tracking-wide hover:bg-[#d4d4d4] transition-colors"
            >
              View Developer Docs
            </Link>
          </motion.div>

        </div>
      </div>



    </div>
  );
}

function AnimatedText({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) {
  // Split text into characters
  const characters = text.split("");

  return (
    <span className={`inline-block whitespace-pre ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ color: "#999999" }}
          animate={{ color: "#000000" }}
          transition={{
            duration: 0,
            delay: delay + index * 0.1,
            ease: "linear"
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
