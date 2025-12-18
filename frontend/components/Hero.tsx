'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDownRight } from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';

export default function Hero() {
  return (
    <div className="sticky top-0 z-0 min-h-screen flex flex-col pt-0 px-0 pb-0 md:pb-0 font-sans text-[#1a1a1a] overflow-x-hidden w-full max-w-[100vw] bg-[#fdfdfd]">

      {/* Background Image Removed */}
      {/* <div className="absolute inset-0 z-[-1]"> ... </div> */}



      {/* Wrapper for Content Below Top Line */}
      <div className="relative flex-1 flex flex-col min-h-0 w-full">


        {/* Header / Navigation */}
        <LandingHeader transparent />



        {/* Main Content - Centered Layout */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full mx-auto px-4 mt-0">

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-20 -mt-12 md:-mt-24 relative z-20"
          >
            <h1 className="text-4xl md:text-[3.5rem] font-black tracking-tighter text-black leading-[1.1] md:leading-[0.9] mb-6 md:mb-8 translate-y-8">
              Automate your billing on chain <br className="hidden md:block" />
              with solana subscriptions.
            </h1>
            <p className="text-[#666] text-sm md:text-base font-medium tracking-normal max-w-xl md:max-w-3xl mx-auto translate-y-4 px-4">
              Automated recurring revenue infrastructure for the modern web3 economy [2025]
            </p>
          </motion.div>



          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[20rem] md:max-w-[40rem] aspect-[1.6] mt-4 md:-mt-24 md:translate-y-12 pointer-events-none select-none z-10"
          >
            <Image
              src="/hero-phone-replaced.png"
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
            className="flex flex-col w-full sm:w-auto sm:flex-row gap-4 mt-8 md:mt-0 -translate-y-0 md:translate-y-16 relative z-20 px-4 sm:px-0"
          >
            <Link
              href="/register"
              className="bg-black text-white px-8 py-3 rounded-lg font-bold text-sm tracking-wide hover:bg-black/90 transition-colors shadow-lg text-center"
            >
              Get Started with Solana
            </Link>
            <Link
              href="/docs"
              className="bg-[#EAEAEA] text-black border border-[#d4d4d4] px-8 py-3 rounded-lg font-bold text-sm tracking-wide hover:bg-[#d4d4d4] transition-colors text-center"
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
