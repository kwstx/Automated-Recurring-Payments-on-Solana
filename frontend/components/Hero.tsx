'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col pt-4 px-4 pb-4 md:pt-6 md:px-6 md:pb-6 font-sans text-[#1a1a1a]">

      {/* Top Bar / Navigation Line */}
      <div className="w-full pb-4 mb-0 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
          {/* Left: Brand */}
          <div className="md:col-span-4 lg:col-span-3 flex justify-between">
            <h1 className="font-bold text-xl md:text-2xl tracking-tight">W3.</h1>
          </div>

          {/* Center: Mission Statement - Aligned with Typography Column */}
          <div className="md:col-span-4 lg:col-span-5 pl-4 md:pl-0">
            <h3 className="font-bold text-xl md:text-2xl lg:text-3xl leading-tight uppercase text-left">
              WE BUILD TOOLS<br />
              FOR DEVELOPERS WHO<br />
              TREAT THE BLOCKCHAIN<br />
              AS EXECUTION, NOT<br />
              SPECTACLE
            </h3>
          </div>

          {/* Right: Navigation - Aligned with 'WHAT' */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col items-start text-left text-xs md:text-sm font-medium leading-relaxed gap-1 pl-4 md:pl-12 lg:pl-16">
            <div className="w-full flex justify-between">
              <div>
                <Link href="#" className="block hover:underline">Stack</Link>
                <Link href="#" className="block hover:underline">Triggers</Link>
                <Link href="#" className="block hover:underline">Knowledge</Link>
                <Link href="#" className="block hover:underline">Signals</Link>
                <Link href="#" className="block hover:underline">Docs</Link>
                <Link href="#" className="block hover:underline">Console</Link>
                <div className="h-2"></div>
                <Link href="/login" className="block font-bold underline decoration-1 underline-offset-4 hover:text-black">Launch Tools</Link>
              </div>
              <span className="text-[#999] text-xs">[2025]</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA - Above Grid */}
      <div className="w-full py-8 md:py-12 flex justify-start">
        <div>
          <Link href="/register" className="flex items-center gap-2 font-semibold text-sm hover:gap-3 transition-all underline decoration-1 underline-offset-4">
            Start engineering <span className="text-lg">↘</span>
          </Link>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 min-h-[50vh] px-4 md:px-6">



        {/* Left: Square Gray Box with Gradient */}
        <div className="md:col-span-4 lg:col-span-3 flex items-center justify-end py-10">
          <div className="relative h-40 md:h-52 lg:h-64 xl:h-80 aspect-square bg-[#d0d0d0]">
            {/* Gradient inside gray box */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="w-[90%] h-[90%] rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-gradient-to-br from-[#ff5f6d] via-[#ffc371] to-[#ff5f6d] blur-2xl opacity-70 animate-morph-slow"></div>
              <div className="absolute w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 blur-2xl opacity-50 animate-morph-reverse"></div>
            </div>
          </div>
        </div>

        {/* Right: Massive Typography */}
        <div className="md:col-span-8 lg:col-span-9 flex items-center justify-start py-10 pl-4 md:pl-0 relative overflow-visible">

          {/* Vertical Grid Line 1: Left of 'RUNS' */}
          <div className="absolute left-[0] md:left-[-4px] bottom-10 w-px bg-[#d4d4d4] h-[200vh] pointer-events-none hidden md:block" style={{ top: '-100vh' }}></div>

          {/* Vertical Grid Line 2: Middle of 'T' in 'RETHINK' */}
          {/* Adjusted to be more to the right as requested */}
          <div className="absolute left-[5.25rem] md:left-[7.25rem] lg:left-[9rem] bottom-10 w-px bg-[#d4d4d4] h-[200vh] pointer-events-none hidden md:block" style={{ top: '-100vh', marginBottom: '0.2em' }}></div>

          <h2 className="text-[3.25rem] md:text-[4rem] lg:text-[5rem] xl:text-[6.5rem] font-bold tracking-tighter leading-[0.85] relative z-10 w-full">
            <div className="flex justify-between w-full">
              <span className="text-[#999]">RETHINK</span>
              <span className="text-[#999]">WHAT</span>
            </div>

            <div className="flex justify-between w-full">
              <span className="text-black">WEB3</span>
              <span className="text-[#999]">CAN</span>
              <span className="text-[#999]">BE</span>
            </div>

            <span className="text-[#999]">WHEN</span> <span className="text-black">BITCOIN</span><br />
            <span className="text-black">RUNS THE LOGIC.</span>
          </h2>
        </div>
      </div>

    </div>
  );
}
