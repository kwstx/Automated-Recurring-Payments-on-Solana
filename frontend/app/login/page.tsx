'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogIn, Loader2, ArrowLeft, ShieldCheck, Wallet } from 'lucide-react';
import Link from 'next/link';
import { authAPI } from '@/lib/api-client';
import HeroBackground from '@/components/HeroBackground';

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const roleParam = searchParams.get('role');

    // Determine context based on role param
    const isMerchant = roleParam === 'merchant';
    const title = isMerchant ? 'Merchant Login' : 'Subscriber Access';
    const subtitle = isMerchant ? 'Manage your recurring revenue' : 'Manage your subscriptions securely';
    const icon = isMerchant ? <Wallet className="w-8 h-8 text-white" /> : <ShieldCheck className="w-8 h-8 text-white" />;
    const accentColor = isMerchant ? 'from-purple-500 to-indigo-600' : 'from-blue-500 to-cyan-500';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await authAPI.login(username, password);
            localStorage.setItem('auth_token', response.data.token);
            // Redirect based on role or default to dashboard
            const redirectPath = isMerchant ? '/dashboard' : '/portal';
            router.push(redirectPath);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-black text-white selection:bg-purple-500/30">

            {/* HEROBACKGROUND: Reused from Home for consistent vibe */}
            <div className="absolute inset-0 z-0">
                <HeroBackground />
            </div>

            {/* Content Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[420px] relative z-10"
            >
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-sm font-medium tracking-wide">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                {/* Glassmorphic Card */}
                <div className="relative group">
                    {/* Glow Effect behind card */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${accentColor} rounded-[2.5rem] opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500`} />

                    <div className="relative p-8 md:p-10 rounded-[2rem] bg-[#0A0A0A]/60 backdrop-blur-2xl border border-white/10 shadow-2xl">

                        {/* Header */}
                        <div className="text-center mb-10">
                            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${accentColor} mb-6 shadow-lg shadow-purple-500/20`}>
                                {icon}
                            </div>
                            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">{title}</h1>
                            <p className="text-gray-400 text-sm">{subtitle}</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:bg-white/10 focus:border-white/20 transition-all placeholder:text-gray-600"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:bg-white/10 focus:border-white/20 transition-all placeholder:text-gray-600"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-4 rounded-xl bg-gradient-to-r ${accentColor} text-white font-bold tracking-wide hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 text-sm`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Authenticating...
                                    </>
                                ) : (
                                    <>
                                        Login to Dashboard
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-white/10 text-center">
                            <p className="text-sm text-gray-400">
                                New here?{' '}
                                <Link href="/register" className="text-white hover:text-purple-300 font-semibold transition-colors">
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
