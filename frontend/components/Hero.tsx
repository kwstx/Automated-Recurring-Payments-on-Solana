'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col pt-4 px-4 pb-4 md:pt-6 md:px-6 md:pb-6 font-sans text-[#1a1a1a]">

      {/* Top Bar / Navigation Line */}
      <div className="w-full border-b border-[#a3a3a3] pb-4 flex justify-between items-start mb-0">
        <h1 className="font-bold text-xl md:text-2xl tracking-tight">SOLANA.</h1>

        <div className="flex flex-col text-right text-xs md:text-sm font-medium leading-relaxed gap-1">
          <Link href="#" className="hover:underline">Stack</Link>
          <Link href="#" className="hover:underline">Triggers</Link>
          <Link href="#" className="hover:underline">Knowledge</Link>
          <Link href="#" className="hover:underline">Signals</Link>
          <Link href="#" className="hover:underline">Docs</Link>
          <div className="h-4"></div>
          <Link href="/login" className="font-bold underline decoration-1 underline-offset-4 hover:text-black">Launch Tools</Link>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 border-b border-[#a3a3a3]">

        {/* Left Column: Visual & CTA */}
        <div className="relative border-r-0 md:border-r border-[#a3a3a3] flex flex-col justify-end p-6 md:p-10 overflow-hidden">

          {/* CTA Top Left of this cell */}
          <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
            <Link href="/register" className="flex items-center gap-2 font-semibold text-sm hover:gap-3 transition-all underline decoration-1 underline-offset-4">
              Start engineering <span className="text-lg">↘</span>
            </Link>
          </div>

          {/* Abstract CSS Visual */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="w-[80%] aspect-square rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-gradient-to-br from-[#ff5f6d] via-[#ffc371] to-[#ff5f6d] blur-3xl opacity-80 animate-morph-slow mix-blend-multiply"></div>
            <div className="absolute w-[60%] aspect-square rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 blur-3xl opacity-60 animate-morph-reverse mix-blend-multiply"></div>
          </div>
        </div>

        {/* Right Column: Typography */}
        <div className="relative flex flex-col p-6 md:p-10">
          {/* Top Text Block */}
          <div className="mb-auto max-w-sm">
            <h3 className="font-bold text-base md:text-lg leading-tight uppercase mb-4">
              WE BUILD TOOLS<br />
              FOR DEVELOPERS WHO<br />
              TREAT THE BLOCKCHAIN<br />
              AS EXECUTION, NOT<br />
              SPECTACLE
            </h3>
          </div>

          {/* Massive Display Text */}
          <div className="mt-10 md:mt-20">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.85] text-[#999] mix-blend-darken">
              RETHINK<br />
              <span className="text-black">WEB3</span> CAN <span className="text-[#999]">BE</span><br />
              <span className="text-[#999]">WHEN</span> <span className="text-black">SOLANA</span><br />
              <span className="text-black">RUNS THE LOGIC.</span>
            </h2>
          </div>
        </div>
      </div>

    </div>
  );
}
