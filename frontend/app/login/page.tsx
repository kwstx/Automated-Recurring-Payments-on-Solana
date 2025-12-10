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
    const title = isMerchant ? 'MERCHANT PORTAL' : 'SUBSCRIBER ACCESS';

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-[900px] relative z-10"
        >
            {/* Back Link */}
            <Link href="/login" className="inline-flex items-center gap-2 text-[#666] hover:text-[#1a1a1a] transition-colors text-xs font-mono font-bold tracking-wider uppercase mb-8">
                <ArrowLeft className="w-3 h-3" />
                Choose Role
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] border border-[#a3a3a3]">
                {/* Left Column: Header */}
                <div className="relative p-8 md:p-10 border-b md:border-b-0 md:border-r border-[#a3a3a3] flex flex-col justify-between">
                    <div>
                        <span className="text-xs font-mono font-bold tracking-wider mb-6 block">[01] LOGIN</span>
                        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-[0.9] text-black mb-4">
                            {title}
                        </h1>
                        <p className="text-sm text-[#666] leading-relaxed">
                            Enter your credentials to access the platform.
                        </p>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="p-8 md:p-10">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Username Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-mono font-bold tracking-wider uppercase text-[#666]">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-transparent border-b border-[#a3a3a3] px-0 py-3 text-[#1a1a1a] placeholder:text-[#999] outline-none focus:border-black transition-colors text-sm"
                                placeholder={isMerchant ? "acme_inc" : "user_123"}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-mono font-bold tracking-wider uppercase text-[#666]">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b border-[#a3a3a3] px-0 py-3 text-[#1a1a1a] placeholder:text-[#999] outline-none focus:border-black transition-colors text-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-red-600 text-xs font-medium bg-red-50 border border-red-200 py-2 px-3"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-black text-white font-bold text-sm uppercase tracking-wide hover:bg-[#1a1a1a] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                'Continue'
                            )}
                        </button>

                        <div className="pt-4 text-center border-t border-[#d4d4d4]">
                            <p className="text-xs text-[#666]">
                                Don&apos;t have an account?{' '}
                                <Link href={`/register`} className="text-black font-bold hover:underline transition-all">
                                    Register here
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-[1200px] relative z-10"
        >
            <div className="text-center mb-12">
                <Link href="/" className="inline-flex items-center gap-2 text-[#666] hover:text-[#1a1a1a] transition-colors text-xs font-mono font-bold tracking-wider uppercase mb-8">
                    <ArrowLeft className="w-3 h-3" />
                    Back home
                </Link>
                <span className="text-xs font-mono font-bold tracking-wider mb-4 block">[01] ROLE SELECTION</span>
                <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight leading-[0.9] text-black mb-4">
                    CHOOSE YOUR<br />ACCESS TYPE
                </h1>
                <p className="text-base text-[#666] max-w-xl mx-auto">
                    Select how you want to interact with the platform.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-0 border border-[#a3a3a3]">
                {/* Merchant Card */}
                <Link href="/login?role=merchant" className="group relative border-b md:border-b-0 md:border-r border-[#a3a3a3] hover:bg-[#f5f5f5] transition-colors">
                    <div className="p-10 md:p-12">
                        <div className="w-12 h-12 bg-black flex items-center justify-center mb-6">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-3 text-black">MERCHANT</h3>
                        <p className="text-[#666] leading-relaxed mb-6 text-sm">
                            Create subscription plans, manage subscribers, and track revenue analytics.
                        </p>
                        <div className="flex items-center text-black font-bold text-xs uppercase tracking-wide group-hover:gap-2 transition-all">
                            Continue <ArrowLeft className="w-3 h-3 rotate-180 ml-1" />
                        </div>
                    </div>
                </Link>

                {/* Subscriber Card */}
                <Link href="/portal" className="group relative hover:bg-[#f5f5f5] transition-colors">
                    <div className="p-10 md:p-12">
                        <div className="w-12 h-12 bg-black flex items-center justify-center mb-6">
                            <Wallet className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-3 text-black">SUBSCRIBER</h3>
                        <p className="text-[#666] leading-relaxed mb-6 text-sm">
                            Subscribe to services, manage active plans, and view your billing history.
                        </p>
                        <div className="flex items-center text-black font-bold text-xs uppercase tracking-wide group-hover:gap-2 transition-all">
                            Continue <ArrowLeft className="w-3 h-3 rotate-180 ml-1" />
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

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-[#EAEAEA] text-[#1a1a1a] font-sans">
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
            <div className="min-h-screen bg-[#EAEAEA] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-black animate-spin" />
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
