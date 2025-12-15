'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { authAPI } from '@/lib/api-client';

function RegisterContent() {
    const router = useRouter();
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
            // Call the register API
            const response = await authAPI.register(username, password, email);

            // Auto-login: Store token and redirect to dashboard
            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
                // Also store minimal user info if needed
                if (response.data.merchant) {
                    localStorage.setItem('merchant_info', JSON.stringify(response.data.merchant));
                }
                router.push('/dashboard');
            } else {
                // Fallback if no token returned (shouldn't happen with new backend)
                router.push('/login?registered=true');
            }
        } catch (err: any) {
            console.error('Registration error:', err);
            const errorMessage = err.response?.data?.error
                || err.message
                || 'Registration failed. Please check your connection.';
            const errorDetails = err.response?.data?.details
                ? JSON.stringify(err.response.data.details)
                : '';
            setError(`${errorMessage} ${errorDetails}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-[#EAEAEA] text-[#1a1a1a] font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-[900px] relative z-10"
            >
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-[#666] hover:text-[#1a1a1a] transition-colors text-xs font-mono font-bold mb-8">
                    <ArrowLeft className="w-3 h-3" />
                    Back
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] border border-[#a3a3a3]">
                    {/* Left Column: Header */}
                    <div className="relative p-8 md:p-10 border-b md:border-b-0 md:border-r border-[#a3a3a3] flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-mono font-bold mb-6 block">[01] REGISTER</span>
                            <h1 className="text-3xl md:text-4xl font-bold leading-[0.9] text-black mb-4">
                                CREATE<br />
                                ACCOUNT
                            </h1>
                            <p className="text-sm text-[#666] leading-relaxed">
                                Join the platform to access subscription billing infrastructure.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="p-8 md:p-10">
                        <form onSubmit={handleRegister} className="space-y-6">
                            {/* Username Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[#666]">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#a3a3a3] px-0 py-3 text-[#1a1a1a] placeholder:text-[#999] outline-none focus:border-black transition-colors text-sm"
                                    placeholder="Choose a username"
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-mono font-bold text-[#666]">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#a3a3a3] px-0 py-3 text-[#1a1a1a] placeholder:text-[#999] outline-none focus:border-black transition-colors text-sm"
                                    placeholder="name@example.com"
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
                                    placeholder="Create a strong password"
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
                                    'Create Account'
                                )}
                            </button>

                            <div className="pt-4 text-center border-t border-[#d4d4d4]">
                                <p className="text-xs text-[#666]">
                                    Already have an account?{' '}
                                    <Link href="/login" className="text-black font-bold hover:underline transition-all">
                                        Sign in here
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#EAEAEA] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-black animate-spin" />
            </div>
        }>
            <RegisterContent />
        </Suspense>
    );
}
