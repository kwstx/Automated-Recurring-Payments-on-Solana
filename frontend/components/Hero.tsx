'use client';

import { motion, AnimatePresence } from 'framer-motion';
import HeroBackground from './HeroBackground';
import { useState } from 'react';

export default function Hero() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-32">

      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <HeroBackground />
      </div>

      {/* NAVBAR - WHITE PILL */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 bg-white rounded-full px-2 py-2 flex items-center justify-between z-50 shadow-[0_10px_40px_rgba(0,0,0,0.5)] max-w-3xl w-[90%] md:w-auto md:min-w-[600px]">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2 px-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
          <span className="font-bold text-black text-lg tracking-tight">SolanaSub</span>
        </div>

        {/* Links - Hidden on small mobile */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">

          {/* Features Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-black transition-colors py-2 outline-none">
              Features
              {/* Chevron */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* Dropdown Menu - Mega Menu Style */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[800px] max-w-[95vw] bg-[#1a1a1a] rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-2 z-50 origin-top"
                >
                  <div className="grid grid-cols-4 gap-2">

                    {/* Card 1: Recurring */}
                    <a href="#" className="group flex flex-col p-3 rounded-[1.5rem] hover:bg-white/5 transition-colors">
                      <div className="h-28 w-full rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 mb-4 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
                      </div>
                      <span className="text-white font-bold text-base mb-1">Subscriptions</span>
                      <span className="text-[#888] text-xs leading-relaxed">Automate recurring billing cycles securely.</span>
                    </a>

                    {/* Card 2: Analytics */}
                    <a href="#" className="group flex flex-col p-3 rounded-[1.5rem] hover:bg-white/5 transition-colors">
                      <div className="h-28 w-full rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 mb-4 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
                      </div>
                      <span className="text-white font-bold text-base mb-1">Analytics</span>
                      <span className="text-[#888] text-xs leading-relaxed">Real-time revenue metrics and churn insights.</span>
                    </a>

                    {/* Card 3: Invoicing */}
                    <a href="#" className="group flex flex-col p-3 rounded-[1.5rem] hover:bg-white/5 transition-colors">
                      <div className="h-28 w-full rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 mb-4 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                      </div>
                      <span className="text-white font-bold text-base mb-1">Invoicing</span>
                      <span className="text-[#888] text-xs leading-relaxed">Smart invoices with auto-reconciliation.</span>
                    </a>

                    {/* Card 4: Security */}
                    <a href="#" className="group flex flex-col p-3 rounded-[1.5rem] hover:bg-white/5 transition-colors">
                      <div className="h-28 w-full rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-4 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                      </div>
                      <span className="text-white font-bold text-base mb-1">Security</span>
                      <span className="text-[#888] text-xs leading-relaxed">Enterprise-grade encryption and safety.</span>
                    </a>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#" className="hover:text-black transition-colors">Benefits</a>
          <a href="#" className="hover:text-black transition-colors">Docs</a>
        </div>

        {/* CTA Button */}
        <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors">
          Get Started
        </a>
      </nav>

      {/* MAIN CONTENT - CENTERED TYPOGRAPHY */}
      <div className="relative z-10 flex flex-col items-center text-center mt-20 md:mt-32 max-w-4xl px-4">

        {/* Gradient Subheading */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg md:text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-6"
        >
          Subscription infrastructure for Solana
        </motion.span>

        {/* Main Heading */}
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-10 max-w-3xl mx-auto"
        >
          Automated Recurring <br className="hidden md:block" /> Payments
        </motion.h1>

        {/* Dashboard Access Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 z-20"
        >
          <a href="/login" className="px-8 py-3 rounded-full bg-white text-black font-semibold shadow-lg shadow-white/20 hover:bg-gray-200 hover:scale-105 transition-all duration-300">
            Get Started
          </a>
        </motion.div>

        {/* Secondary Floating Element (Pill) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3 flex items-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-sm text-gray-300">Live on Solana Devnet</span>
        </motion.div>

      </div>

    </div >
  );
}
