'use client';

import LandingHeader from '@/components/LandingHeader';
import { BLOG_POSTS } from '@/lib/blog-data';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans">
            <LandingHeader />

            <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-24">
                <div className="max-w-4xl mx-auto">
                    {/* Back Link */}
                    <div className="mb-12">
                        <Link href="/blog" className="flex items-center gap-2 font-bold uppercase text-xs hover:gap-3 transition-all text-[#666] hover:text-black">
                            <ArrowLeft size={14} /> Back to Blog
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="border-b border-black pb-8 mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="font-mono text-xs uppercase bg-black text-white px-2 py-1">{post.category}</span>
                            <span className="font-mono text-xs text-[#666] uppercase">{post.date}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[0.9] text-black">
                            {post.title}
                        </h1>
                    </div>

                    {/* Content */}
                    <article className="prose max-w-none font-mono text-sm leading-8 text-[#333]">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </article>

                    {/* Footer Navigation */}
                    <div className="mt-20 pt-12 border-t border-[#a3a3a3] flex justify-between items-center">
                        <span className="font-mono text-xs text-[#666] uppercase">Thanks for reading.</span>
                        <div className="flex gap-4">
                            <button className="font-bold uppercase text-xs border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                                Share Article
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
