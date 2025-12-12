'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDownRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-screen flex flex-col pt-2 px-4 pb-4 md:pt-4 md:px-6 md:pb-6 font-sans text-[#1a1a1a] overflow-hidden w-full max-w-[100vw]">

      {/* Top Black Line */}
      <div className="w-full border-t border-black mb-4 md:mb-6"></div>

      {/* Wrapper for Content Below Top Line */}
      <div className="relative flex-1 flex flex-col min-h-0 w-full">
        {/* Background Grid Lines Layer */}
        <div className="absolute inset-x-0 bottom-0 -top-4 md:-top-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pointer-events-none z-0">
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
          <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-12 items-start">
            {/* Left: Brand */}
            <div className="md:col-span-4 lg:col-span-3 flex justify-between w-full md:w-auto">
              <h1 className="font-bold text-xl md:text-2xl tracking-tight">ZyoPay.</h1>
            </div>

            {/* Center: Mission Statement - Aligned with Typography Column */}
            <div className="md:col-span-4 lg:col-span-5 pl-0 md:pl-0 w-full md:w-auto mt-4 md:mt-0">
              <h3 className="font-bold text-lg md:text-xl lg:text-2xl leading-tight uppercase text-left">
                AUTOMATED RECURRING<br />
                REVENUE INFRASTRUCTURE<br />
                FOR THE MODERN<br />
                WEB3 ECONOMY
              </h3>
            </div>

            {/* Right: Navigation - Aligned with 'WHAT' */}
            <div className="md:col-span-4 lg:col-span-4 flex flex-col items-start text-left text-xs md:text-sm font-medium leading-relaxed gap-1 pl-0 md:pl-12 lg:pl-16 w-full md:w-auto mt-4 md:mt-0">
              <div className="w-full flex justify-between">
                <div>
                  <Link href="/sdks" className="block hover:underline">SDKs</Link>
                  <Link href="/webhooks" className="block hover:underline">Webhooks</Link>
                  <Link href="/resources" className="block hover:underline">Resources</Link>
                  <Link href="/pricing" className="block hover:underline">Pricing</Link>
                  <Link href="/docs" className="block hover:underline">Docs</Link>
                  <Link href="/portal" className="block hover:underline">Portal</Link>
                  <div className="h-2"></div>
                  <Link href="/login" className="block font-bold underline decoration-1 underline-offset-4 hover:text-black">Launch App</Link>
                </div>
                <span className="text-[#999] text-xs">[2025]</span>
              </div>
            </div>
          </div>
        </div>



        {/* Main Grid Content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 min-h-0 relative z-20 items-end md:items-center content-end pb-12 md:pb-0">

          {/* Left: Square Gray Box with Gradient */}
          {/* Left: Square Gray Box with Gradient */}
          <div className="flex md:col-span-4 lg:col-span-3 items-center justify-center md:justify-end py-4 order-none w-full">
            <div className="flex flex-col gap-2">
              <Link href="/register" className="hidden md:flex items-center gap-1 font-semibold text-sm hover:gap-2 transition-all underline decoration-1 underline-offset-4 self-start">
                Start engineering <ArrowDownRight className="w-4 h-4 ml-0.5" />
              </Link>
              <div className="relative h-64 w-64 md:w-auto md:h-60 lg:h-72 xl:h-[22rem] aspect-square">
                <img
                  src="/hero-graphic.png"
                  alt="Abstract Hero Graphic"
                  className="w-full h-full object-contain brightness-[0.25]"
                />
              </div>
            </div>
          </div>

          {/* Right: Massive Typography */}
          <div className="md:col-span-8 lg:col-span-9 flex items-center justify-start py-4 pl-0 md:pl-0 relative overflow-visible w-full">

            <h2 className="text-[1.8rem] xs:text-[2.2rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[7rem] font-bold tracking-tighter leading-[0.9] md:leading-[0.8] relative z-10 w-full break-words">
              <div className="flex justify-between w-full max-w-[85%] md:max-w-none">
                <span className="text-[#999]">AUTOMATE</span>
                <span className="text-[#999]">YOUR</span>
              </div>

              <div className="flex justify-between w-full max-w-[85%] md:max-w-none">
                <AnimatedText text="BILLING" className="text-black" delay={0.5} />
                <span className="text-[#999]">ON</span>
                <span className="text-[#999]">CHAIN</span>
              </div>

              <span className="text-[#999] whitespace-nowrap">WITH <AnimatedText text="SOLANA" className="text-black ml-[0.2em] md:ml-[0.3em]" delay={1.5} /></span><br />
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
