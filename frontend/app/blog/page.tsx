'use client';

import LandingHeader from '@/components/LandingHeader';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-24">
                <div className="max-w-5xl mx-auto">
                    <span className="text-xs font-mono font-bold tracking-wider mb-6 block text-[#666]">BLOG</span>
                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-20">
                        LATEST<br />UPDATES
                    </h1>

                    <div className="grid gap-12">
                        {BLOG_POSTS.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                                <article className="border-b border-black pb-12">
                                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                                        <div className="flex items-center gap-4 mb-2 md:mb-0">
                                            <span className="font-mono text-xs uppercase bg-black text-white px-2 py-1">{post.category}</span>
                                            <span className="font-mono text-xs text-[#666] uppercase">{post.date}</span>
                                        </div>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4 group-hover:underline decoration-4 decoration-black">{post.title}</h2>
                                    <p className="text-lg text-[#333] font-mono leading-relaxed max-w-2xl mb-6">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 font-bold uppercase text-xs group-hover:gap-4 transition-all">
                                        Read Article <ArrowRight size={14} />
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
