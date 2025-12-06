'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import ParticleSphere from './ParticleSphere';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FeaturesDropdown from './FeaturesDropdown';

export default function Hero() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 max-w-7xl mx-auto w-full">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
          <div className="w-5 h-3 bg-white rounded-full" />
        </div>

        <div className="hidden md:flex items-center gap-8 px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md relative z-50">
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 py-4">
              Features
              <span className={`text-[10px] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
            </a>
            <AnimatePresence>
              {isDropdownOpen && <FeaturesDropdown />}
            </AnimatePresence>
          </div>

          {['Learn', 'Explore', 'Company', 'Support'].map((item) => (
            <a key={item} href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <WalletMultiButton style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0.5rem',
            padding: '0 1.5rem',
            height: '42px',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'white',
            fontFamily: 'inherit',
          }} />
        </div>
      </nav>

      {/* Animated Background Elements - Reduced due to Global Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle local gradient if needed, can be empty or minimal */}
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
          <ParticleSphere />
        </div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center"
        >
          <span className="text-2xl md:text-3xl font-medium text-white mb-4 tracking-wide font-serif italic">
            Next-Generation
          </span>
          <span
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-purple-200 to-purple-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]"
            style={{ fontFamily: 'serif' }}
          >
            Automated
          </span>
          <span
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-purple-300 via-purple-400 to-purple-600 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)] -mt-2 md:-mt-4 pb-4 px-1"
            style={{ fontFamily: 'serif' }}
          >
            Recurring
          </span>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light tracking-wide"
          >
            Seamlessly manage crypto subscriptions with the power of Solana.
          </motion.p>
        </motion.h1>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12"
        >
          <a
            href="/login"
            className="group px-8 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center gap-2 hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] hover:scale-105"
          >
            Merchant Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/portal"
            className="group px-8 py-4 bg-white/10 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:bg-white/20 transition-all border border-white/20 hover:scale-105"
          >
            Manage Subscriptions
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>


    </div>
  );
}
