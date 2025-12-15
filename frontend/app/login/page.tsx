'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, ShieldCheck, Wallet } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { authAPI } from '@/lib/api-client';
import LandingHeader from '@/components/LandingHeader';

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
            <Link href="/login" className="inline-flex items-center gap-2 text-[#666] hover:text-[#1a1a1a] transition-colors text-xs font-mono font-bold mb-8">
                <ArrowLeft className="w-3 h-3" />
                Choose Role
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] border border-[#a3a3a3]">
                {/* Left Column: Header */}
                <div className="relative p-8 md:p-10 border-b md:border-b-0 md:border-r border-[#a3a3a3] flex flex-col justify-between">
                    <div>
                        <span className="text-xs font-mono font-bold mb-6 block">[01] LOGIN</span>
                        <h1 className="text-3xl md:text-4xl font-bold leading-[0.9] text-black mb-4">
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
                            <label className="text-xs font-mono font-bold text-[#666]">Username</label>
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
                            <label className="text-xs font-mono font-bold text-[#666]">Password</label>
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
                            className="w-full py-4 bg-black text-white font-bold text-sm hover:bg-[#1a1a1a] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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
            className="w-full max-w-[1000px] relative z-10 px-4"
        >
            <div className="text-center mb-16">
                <Link href="/" className="inline-flex items-center gap-2 text-[#666] hover:text-black transition-colors text-xs font-mono font-bold mb-8">
                    <ArrowLeft className="w-3 h-3" />
                    Back home
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-6 text-black">
                    Choose Your Access Type
                </h1>
                <p className="text-[#666] text-sm md:text-base font-medium tracking-normal max-w-xl mx-auto leading-relaxed">
                    Select how you want to interact with the ZyoPay platform.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Subscriber Card */}
                <Link href="/portal" className="group relative bg-white border border-[#e5e5e5] rounded-xl p-10 hover:border-black hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                    <div className="relative w-32 h-32 mb-8 group-hover:scale-110 transition-transform overflow-hidden">
                        <div className="absolute top-0 left-0 w-[200%] h-full scale-125 origin-left">
                            <Image
                                src="/icons-sprite.png"
                                alt="Subscriber"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-black">Subscriber</h3>
                    <p className="text-[#666] text-sm leading-relaxed mb-6 max-w-xs">
                        Manage your active subscriptions, view billing history, and control payments.
                    </p>
                    <div className="flex items-center text-black font-bold text-xs group-hover:gap-2 transition-all mt-auto">
                        Enter Portal <ArrowLeft className="w-3 h-3 rotate-180 ml-1" />
                    </div>
                </Link>

                {/* Merchant Card */}
                <Link href="/login?role=merchant" className="group relative bg-white border border-[#e5e5e5] rounded-xl p-10 hover:border-black hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                    <div className="relative w-32 h-32 mb-8 group-hover:scale-110 transition-transform overflow-hidden">
                        <div className="absolute top-0 right-0 w-[200%] h-full scale-125 origin-right">
                            <Image
                                src="/icons-sprite.png"
                                alt="Merchant"
                                fill
                                className="object-contain object-right"
                            />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-black">Merchant</h3>
                    <p className="text-[#666] text-sm leading-relaxed mb-6 max-w-xs">
                        Create plans, manage subscribers, and view revenue analytics.
                    </p>
                    <div className="flex items-center text-black font-bold text-xs group-hover:gap-2 transition-all mt-auto">
                        Dashboard Login <ArrowLeft className="w-3 h-3 rotate-180 ml-1" />
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
        <div className="relative min-h-screen flex flex-col text-black font-sans overflow-x-hidden">
            {/* Background Image Gradient */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="relative w-full h-full">
                    <Image
                        src="/resources-bg-v2.png"
                        alt="Background Gradient"
                        fill
                        className="object-cover opacity-100 object-top"
                        priority
                    />
                </div>
            </div>

            <LandingHeader transparent={true} />

            <div className="flex-1 flex items-center justify-center w-full">
                {!roleParam ? (
                    <RoleSelection />
                ) : (
                    <LoginForm role={roleParam} isMerchant={roleParam === 'merchant'} />
                )}
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-black animate-spin" />
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
