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
            <p class="mb-6">ZyoPay Smart Invoices generates a PDF automatically whenever a subscription charge clears. It pulls data directly from the on-chain metadata and emails it to both the merchant and the subscriber.</p>

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
import { createSubscription } from '@zyopay/sdk';

// Fully typed response
const tx = await createSubscription(connection, wallet, planId);
            </pre>
            <p>Upgrade today by running <code>npm install @zyopay/sdk@latest</code>.</p>
        `
    },
    {
        slug: 'optimizing-payment-streams',
        title: 'Optimizing High-Frequency Payment Streams on Mainnet',
        date: 'Dec 02, 2024',
        category: 'Engineering',
        excerpt: 'Best practices for reducing latency in high-volume recurring transaction loops.',
        content: `
            <p class="mb-6">High-frequency payment streams present a unique set of challenges on Solana mainnet. As transaction volume scales, latency and jitter can impact user experience. Here is how we optimized our infrastructure.</p>
            <h3 class="text-2xl font-bold uppercase mb-4">Priority Fees & Compute Units</h3>
            <p class="mb-6">We implemented dynamic priority fees based on network congestion. By analyzing recent blocks, we can estimate the optimal micro-lamport fee to ensure inclusion in the next slot.</p>
            <p class="mb-6">Additionally, we optimized our Compute Unit (CU) request for every instruction, ensuring we don't over-allocate and waste validator resources.</p>
            <h3 class="text-2xl font-bold uppercase mb-4">Results</h3>
            <ul class="list-disc pl-5 mb-8 space-y-2">
                <li><strong>99.9%</strong> transaction landing rate.</li>
                <li><strong>< 400ms</strong> average confirmation time.</li>
            </ul>
        `
    },
    {
        slug: 'token-gating',
        title: 'Token Gating: Designing Permissionless Access Tiers',
        date: 'Dec 08, 2024',
        category: 'Product',
        excerpt: 'Strategies for implementing tier-based access control using SPL tokens.',
        content: `
            <p class="mb-6">Token gating is more than just checking a balance. It's about designing a permissionless access system that scales. We explore how to use SPL tokens to create flexible subscription tiers.</p>
            <h3 class="text-2xl font-bold uppercase mb-4">The Architecture</h3>
            <p class="mb-6">Our system uses a PDA (Program Derived Address) to track active subscriptions. When a user creates a plan, an SPL token acts as the "key" to that plan.</p>
            <p class="mb-6">This allows for secondary markets. A user can sell their "Pro Plan" access token on an NFT marketplace if they no longer need it, and the new owner instantly gains access.</p>
        `
    },
    {
        slug: 'scaling-infrastructure',
        title: 'Designing Scalable Subscription Infrastructure',
        date: 'Dec 12, 2024',
        category: 'Engineering',
        excerpt: 'How we architected our subscription infrastructure to handle high throughput.',
        content: `
            <p class="mb-6">Designing for scale on Solana requires a fundamental rethink of our indexing and database layer.</p>
            <h3 class="text-2xl font-bold uppercase mb-4">Horizontal Scaling</h3>
            <p class="mb-6">We moved from a monolithic indexer to a distributed system. We now have dedicated indexers for different program instructions (create, cancel, renew).</p>
            <p class="mb-6">This separation of concerns allows us to handle spikes in traffic—like during a popular NFT mint or a major product launch—without degrading performance for other users.</p>
        `
    }
];
