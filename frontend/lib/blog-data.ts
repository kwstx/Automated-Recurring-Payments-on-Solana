export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    content: string; // HTML or Markdown content
}

export const BLOG_POSTS: BlogPost[] = [
    {
        slug: 'smart-invoices',
        title: 'Introducing Smart Invoices',
        date: 'Dec 10, 2024',
        category: 'Product',
        excerpt: 'Automatically generate tax-compliant PDF invoices for every on-chain transaction.',
        content: `
            <p class="mb-6">We are thrilled to announce the launch of Smart Invoices, a game-changing feature for crypto-native businesses. For too long, on-chain payments have been a black hole for accounting departments. Smart Invoices bridges this gap.</p>

            <h3 class="text-2xl font-bold uppercase mb-4">The Problem</h3>
            <p class="mb-6">Sending USDC is easy. Generating a compliant receipt with VAT details, customer addresses, and itemized breakdowns is not. Most DAOs and Web3 companies rely on manual spreadsheets or expensive third-party tools that don't talk to the blockchain.</p>

            <h3 class="text-2xl font-bold uppercase mb-4">The Solution</h3>
            <p class="mb-6">Solanasub Smart Invoices generates a PDF automatically whenever a subscription charge clears. It pulls data directly from the on-chain metadata and emails it to both the merchant and the subscriber.</p>

            <ul class="list-disc pl-5 mb-8 space-y-2">
                <li><strong>Automatic Generation:</strong> No manual clicks required.</li>
                <li><strong>Tax Compliant:</strong> Customize tax rates based on region.</li>
                <li><strong>On-Chain Proof:</strong> Includes txn hash and block time.</li>
            </ul>

            <p>Smart Invoices are available today for all Enterprise plans.</p>
        `
    },
    {
        slug: 'solana-defi-2025',
        title: 'The State of Solana DeFi 2025',
        date: 'Nov 24, 2024',
        category: 'Research',
        excerpt: 'Analyzing the growth of recurring payment models in the decentralized ecosystem.',
        content: `
            <p class="mb-6">Solana has matured from a high-speed L1 into a robust financial ecosystem. In 2025, we are seeing a definitive shift from speculative trading to recurring value exchange.</p>

            <h3 class="text-2xl font-bold uppercase mb-4">Recurring Revenue on Chain</h3>
            <p class="mb-6">The "Subscription Economy" has officially arrived on Solana. Protocols are no longer just selling tokens; they are selling access, tools, and content via recurring on-chain payments.</p>

            <p class="mb-6">Our data shows a 300% year-over-year increase in active subscription accounts on mainnet. The primary drivers are:</p>
            <ul class="list-disc pl-5 mb-8 space-y-2">
                <li>SaaS tools gating access via NFT subscriptions.</li>
                <li>Content creators moving away from Patreon.</li>
                <li>DAOs automating payroll and grant distributions.</li>
            </ul>

            <p>The future is automated, and it's built on Solana.</p>
        `
    },
    {
        slug: 'v2-sdk-release',
        title: 'v2 SDK Release Notes',
        date: 'Oct 15, 2024',
        category: 'Engineering',
        excerpt: 'Faster instruction building, improved type safety, and reduced bundle size.',
        content: `
            <p class="mb-6">We've rebuilt our SDK from the ground up to be lighter, faster, and more developer-friendly. Version 2.0 is now available on npm/cargo.</p>

            <h3 class="text-2xl font-bold uppercase mb-4">Key Improvements</h3>
            <p class="mb-6"><strong>1. Tree-Shaking Support:</strong> The new SDK is fully modular. Only import what you need. This reduces the bundle size impact by up to 60%.</p>

            <p class="mb-6"><strong>2. Improved TypeScript Types:</strong> We've tightened our strict options. No more guessing what arguments an instruction requires. IntelliSense now works perfectly.</p>
            
            <pre class="bg-[#EAEAEA] p-4 font-mono text-sm mb-6 border border-black">
import { createSubscription } from '@solanasub/sdk';

// Fully typed response
const tx = await createSubscription(connection, wallet, planId);
            </pre>

            <p>Upgrade today by running <code>npm install @solanasub/sdk@latest</code>.</p>
        `
    }
];
