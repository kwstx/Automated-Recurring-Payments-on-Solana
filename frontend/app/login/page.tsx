'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, ShieldCheck, Wallet } from 'lucide-react';
import Link from 'next/link';
import { authAPI } from '@/lib/api-client';

const LoginForm = ({ role, isMerchant }: { role: string; isMerchant: boolean }) => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Dynamic text based on role
    const title = isMerchant ? 'Merchant Portal' : 'Subscriber Access';
    const subtitle = 'Please sign in or sign up below.';

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await authAPI.login(username, password);
            localStorage.setItem('auth_token', response.data.token);
            const redirectPath = isMerchant ? '/dashboard' : '/portal';
            router.push(redirectPath);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-[480px] relative z-10"
        >
            {/* Back Link */}
            <Link href="/login" className="absolute -top-16 left-0 inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-medium tracking-wide uppercase">
                <ArrowLeft className="w-3 h-3" />
                Choose Role
            </Link>

            {/* Glassmorphic Card */}
            <div className="relative rounded-[32px] p-1">
                {/* Subtle border gradient */}
                <div className="absolute inset-0 rounded-[32px] border border-white/5 pointer-events-none"></div>

                <div className="relative bg-[#0A0A0A]/80 backdrop-blur-3xl rounded-[30px] p-8 md:p-12 shadow-2xl border border-white/5">

                    {/* Header */}
                    <div className="text-center mb-10">
                        {/* Icon similar to reference */}
                        <div className="flex justify-center mb-6">
                            <div className="text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-white tracking-tight mb-3">{title}</h1>
                        <p className="text-white/60 text-sm font-medium">{subtitle}</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-6">

                        <div className="space-y-5">
                            {/* Username Input */}
                            <div className="space-y-2">
                                <label className="text-[13px] font-semibold text-white/90 ml-1">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-white/[0.07] hover:bg-white/[0.1] focus:bg-white/[0.1] border border-transparent focus:border-white/10 rounded-xl px-4 py-3.5 text-white/90 placeholder:text-white/30 outline-none transition-all text-[15px]"
                                    placeholder={isMerchant ? "acme_inc" : "user_123"}
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
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Helper text as per image */}
                        <p className="text-xs text-white/40 leading-relaxed px-1">
                            A magic link will be sent to your email to complete the sign-in process. (Mock text)
                        </p>

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
                            className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-[15px] hover:bg-gray-100 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70 flex items-center justify-center gap-2 mt-2 shadow-lg shadow-white/5"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin text-black" />
                            ) : (
                                'Continue With Email'
                            )}
                        </button>

                        {/* Divider-ish area or spacing */}
                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10"></span>
                            </div>
                        </div>

                        {/* Secondary Button / Google */}
                        <button
                            type="button"
                            className="w-full py-3.5 rounded-xl bg-transparent border border-white/20 text-white font-medium text-[15px] hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.053-1.147 8.213-3.307C23 18.427 23.653 15.413 23.653 12.853c0-.853-.093-1.707-.267-2.533H12.48z" />
                            </svg>
                            Google
                        </button>

                        <div className="mt-4 text-center">
                            <p className="text-sm text-white/40">
                                Don&apos;t have an account?{' '}
                                <Link href={`/register`} className="text-white hover:text-purple-300 font-semibold transition-colors">
                                    Click here
                                </Link>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </motion.div>
    );
};

const RoleSelection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-4xl relative z-10"
        >
            <div className="text-center mb-16">
                <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-medium tracking-wide uppercase mb-8">
                    <ArrowLeft className="w-3 h-3" />
                    Back home
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Choose your path</h1>
                <p className="text-lg text-white/50 max-w-xl mx-auto">Select how you want to interact with the platform.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 px-4">
                {/* Merchant Card */}
                <Link href="/login?role=merchant" className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-[30px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative h-full bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 hover:border-purple-500/50 hover:bg-[#0A0A0A]/80 transition-all duration-300 group-hover:-translate-y-1">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-900/40">
                            <ShieldCheck className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Merchant</h3>
                        <p className="text-white/50 leading-relaxed mb-6">Create subscription plans, manage subscribers, and track revenue analytics.</p>
                        <div className="flex items-center text-purple-400 font-semibold text-sm group-hover:gap-2 transition-all">
                            Continue as Merchant <ArrowLeft className="w-4 h-4 rotate-180 ml-1" />
                        </div>
                    </div>
                </Link>

                {/* Subscriber Card */}
                <Link href="/login?role=subscriber" className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-teal-600/20 rounded-[30px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative h-full bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 hover:border-cyan-500/50 hover:bg-[#0A0A0A]/80 transition-all duration-300 group-hover:-translate-y-1">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mb-6 shadow-lg shadow-cyan-900/40">
                            <Wallet className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Subscriber</h3>
                        <p className="text-white/50 leading-relaxed mb-6">Subscribe to services, manage active plans, and view your billing history.</p>
                        <div className="flex items-center text-cyan-400 font-semibold text-sm group-hover:gap-2 transition-all">
                            Continue as Subscriber <ArrowLeft className="w-4 h-4 rotate-180 ml-1" />
                        </div>
                    </div>
                </Link>
            </div>
        </motion.div>
    );
};

function LoginContent() {
    const searchParams = useSearchParams();
    const roleParam = searchParams.get('role');

    // Background Blobs reused for both views
    const background = (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[120px] mix-blend-screen opacity-60 animate-pulse-slow"></div>
            <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen opacity-60 animate-pulse-slow delay-700"></div>
        </div>
    );

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-[#050505] text-white font-sans selection:bg-purple-500/30">
            {background}

            {!roleParam ? (
                <RoleSelection />
            ) : (
                <LoginForm role={roleParam} isMerchant={roleParam === 'merchant'} />
            )}
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
