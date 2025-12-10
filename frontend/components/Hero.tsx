'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative h-screen flex flex-col pt-2 px-4 pb-4 md:pt-4 md:px-6 md:pb-6 font-sans text-[#1a1a1a] overflow-hidden">

      {/* Top Black Line */}
      <div className="w-full border-t border-black mb-4 md:mb-6"></div>

      {/* Wrapper for Content Below Top Line */}
      <div className="relative flex-1 flex flex-col min-h-0">
        {/* Background Grid Lines Layer */}
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pointer-events-none z-0">
          {/* Left Spacer (matches col-span-4) */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3"></div>
          {/* Right Area (matches col-span-8) - Contains Vertical Lines */}
          <div className="hidden md:block md:col-span-8 lg:col-span-9 border-l border-[#d4d4d4] relative">
            {/* Second Vertical Line */}
            <div className="absolute left-[6.25rem] md:left-[8.5rem] lg:left-[11rem] top-0 bottom-0 w-px bg-[#d4d4d4]"></div>
          </div>
        </div>

        {/* Top Bar / Navigation Line */}
        <div className="w-full pb-2 mb-0 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
            {/* Left: Brand */}
            <div className="md:col-span-4 lg:col-span-3 flex justify-between">
              <h1 className="font-bold text-xl md:text-2xl tracking-tight">W3.</h1>
            </div>

            {/* Center: Mission Statement - Aligned with Typography Column */}
            <div className="md:col-span-4 lg:col-span-5 pl-4 md:pl-0">
              <h3 className="font-bold text-lg md:text-xl lg:text-2xl leading-tight uppercase text-left">
                AUTOMATED RECURRING<br />
                REVENUE INFRASTRUCTURE<br />
                FOR THE MODERN<br />
                WEB3 ECONOMY
              </h3>
            </div>

            {/* Right: Navigation - Aligned with 'WHAT' */}
            <div className="md:col-span-4 lg:col-span-4 flex flex-col items-start text-left text-xs md:text-sm font-medium leading-relaxed gap-1 pl-4 md:pl-12 lg:pl-16">
              <div className="w-full flex justify-between">
                <div>
                  <Link href="#" className="block hover:underline">SDKs</Link>
                  <Link href="#" className="block hover:underline">Webhooks</Link>
                  <Link href="#" className="block hover:underline">Resources</Link>
                  <Link href="#" className="block hover:underline">Pricing</Link>
                  <Link href="#" className="block hover:underline">Docs</Link>
                  <Link href="#" className="block hover:underline">Portal</Link>
                  <div className="h-2"></div>
                  <Link href="/login" className="block font-bold underline decoration-1 underline-offset-4 hover:text-black">Launch App</Link>
                </div>
                <span className="text-[#999] text-xs">[2025]</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA - Above Grid */}
        <div className="w-full py-4 md:py-8 flex justify-start relative z-20">
          <div>
            <Link href="/register" className="flex items-center gap-2 font-semibold text-sm hover:gap-3 transition-all underline decoration-1 underline-offset-4">
              Start engineering <span className="text-lg">↘</span>
            </Link>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 min-h-0 relative z-20 items-end md:items-center">



          {/* Left: Square Gray Box with Gradient */}
          <div className="md:col-span-4 lg:col-span-3 flex items-center justify-end py-4">
            <div className="relative h-48 md:h-60 lg:h-72 xl:h-[22rem] aspect-square bg-[#d0d0d0]">
              {/* Gradient inside gray box */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="w-[90%] h-[90%] rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-gradient-to-br from-[#ff5f6d] via-[#ffc371] to-[#ff5f6d] blur-2xl opacity-70 animate-morph-slow"></div>
                <div className="absolute w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 blur-2xl opacity-50 animate-morph-reverse"></div>
              </div>
            </div>
          </div>

          {/* Right: Massive Typography */}
          <div className="md:col-span-8 lg:col-span-9 flex items-center justify-start py-4 pl-4 md:pl-0 relative overflow-visible">

            <h2 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[7rem] font-bold tracking-tighter leading-[0.8] relative z-10 w-full">
              <div className="flex justify-between w-full">
                <span className="text-[#999]">AUTOMATE</span>
                <span className="text-[#999]">YOUR</span>
              </div>

              <div className="flex justify-between w-full">
                <AnimatedText text="BILLING" className="text-black" delay={0.5} />
                <span className="text-[#999]">ON</span>
                <span className="text-[#999]">CHAIN</span>
              </div>

              <span className="text-[#999]">WITH</span> <AnimatedText text="SOLANA" className="text-black ml-[0.3em]" delay={1.5} /><br />
              <AnimatedText text="SUBSCRIPTIONS." className="text-black" delay={2.5} />
            </h2>
          </div>
        </div>
      </div>

      {/* Bottom Black Line */}
      <div className="w-full border-t border-black mt-0"></div>

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
