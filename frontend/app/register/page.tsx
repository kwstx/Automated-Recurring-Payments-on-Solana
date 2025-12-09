'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { authAPI } from '@/lib/api-client';

function RegisterContent() {
    const router = useRouter();
    const title = 'Join Kvents';
    const subtitle = 'Create your account to get started.';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await authAPI.register(username, password, email);
            // On success, redirect to login (authAPI.register returns { message, merchantId })
            router.push('/login?registered=true');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-[#050505] text-white font-sans selection:bg-purple-500/30">

            {/* Background Blobs - Consistent with Login */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Green Blob - Left */}
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[120px] mix-blend-screen opacity-60 animate-pulse-slow"></div>
                {/* Purple Blob - Right */}
                <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen opacity-60 animate-pulse-slow delay-700"></div>
            </div>

            {/* Content Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-[480px] relative z-10"
            >
                {/* Back Link */}
                <Link href="/" className="absolute -top-16 left-0 inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-medium tracking-wide uppercase">
                    <ArrowLeft className="w-3 h-3" />
                    Back
                </Link>

                {/* Glassmorphic Card */}
                <div className="relative rounded-[32px] p-1">
                    {/* Subtle border gradient */}
                    <div className="absolute inset-0 rounded-[32px] border border-white/5 pointer-events-none"></div>

                    <div className="relative bg-[#0A0A0A]/80 backdrop-blur-3xl rounded-[30px] p-8 md:p-12 shadow-2xl border border-white/5">

                        {/* Header */}
                        <div className="text-center mb-8">
                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>
                                </div>
                            </div>

                            <h1 className="text-2xl font-bold text-white tracking-tight mb-3">{title}</h1>
                            <p className="text-white/60 text-sm font-medium">{subtitle}</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleRegister} className="space-y-5">

                            {/* Username Input */}
                            <div className="space-y-2">
                                <label className="text-[13px] font-semibold text-white/90 ml-1">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-white/[0.07] hover:bg-white/[0.1] focus:bg-white/[0.1] border border-transparent focus:border-white/10 rounded-xl px-4 py-3.5 text-white/90 placeholder:text-white/30 outline-none transition-all text-[15px]"
                                    placeholder="Choose a username"
                                    required
                                />
                            </div>

                            {/* Email Input (Replaces Wallet Address) */}
                            <div className="space-y-2">
                                <label className="text-[13px] font-semibold text-white/90 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/[0.07] hover:bg-white/[0.1] focus:bg-white/[0.1] border border-transparent focus:border-white/10 rounded-xl px-4 py-3.5 text-white/90 placeholder:text-white/30 outline-none transition-all text-[15px]"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="text-[13px] font-semibold text-white/90 ml-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/[0.07] hover:bg-white/[0.1] focus:bg-white/[0.1] border border-transparent focus:border-white/10 rounded-xl px-4 py-3.5 text-white/90 placeholder:text-white/30 outline-none transition-all text-[15px]"
                                    placeholder="Create a strong password"
                                    required
                                />
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="text-red-400 text-xs text-center font-medium bg-red-500/10 py-2 rounded-lg"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {/* White Primary Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-[15px] hover:bg-gray-100 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70 flex items-center justify-center gap-2 mt-4 shadow-lg shadow-white/5"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin text-black" />
                                ) : (
                                    'Create Account'
                                )}
                            </button>

                        </form>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-white/10 text-center">
                            <p className="text-sm text-white/40">
                                Already have an account?{' '}
                                <Link href="/login" className="text-white hover:text-purple-300 font-semibold transition-colors">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
        }>
            <RegisterContent />
        </Suspense>
    );
}
