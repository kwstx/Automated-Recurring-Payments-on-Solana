# Solana Subscription Billing & Automations

A full-stack implementation of recurring crypto payments on Solana, featuring a custom Anchor smart program, a backend scheduler (keeper bot), and a merchant/subscriber dashboard.

## 🏗 Architecture

The system consists of four main components:

1.  **Smart Contract (`/subscription_billing`)**:
    *   Built with **Anchor Framework**.
    *   Manages Plans, Subscriptions, and Payment execution on-chain.
    *   Supports SPL Tokens (USDC, etc.).

2.  **Frontend (`/frontend`)**:
    *   **Next.js 16** (App Router) + TypeScript.
    *   **Tailwind CSS** + **Framer Motion** for premium UI.
    *   Wallet integration via `@solana/wallet-adapter`.
    *   Merchant Dashboard (Create Plans, View Analytics, Webhooks).
    *   Subscriber Portal (Manage Subscriptions, Billing History).

3.  **Backend API (`/api`)**:
    *   **Node.js** + **Express**.
    *   **PostgreSQL** database for off-chain data (Merchant profiles, Webhook configs, History).
    *   Handles authentication, log indexing, and webhook dispatching.

4.  **Scheduler / Keeper (`/scheduler`)**:
    *   A Node.js bot that monitors active subscriptions.
    *   Automatically triggers the `process_payment` instruction on-chain when payments are due.

## 🚀 Prerequisites

*   **Node.js**: v20.x (Required for Next.js 16)
*   **Docker** & **Docker Compose** (for easy stack startup)
*   **Solana Tool Suite** (if developing smart contracts)
*   **PostgreSQL** (if running locally without Docker)

## 🛠 Setup & Installation

### Option A: Quick Start (Docker)

The easiest way to run the entire stack (API, Frontend, Database).

1.  **Clone the repository**:
    ```bash
    git clone <repo-url>
    cd solana-subscription-billing
    ```

2.  **Configure Environment**:
    *   Copy `.env.example` to `.env` in `api`, `frontend`, and `scheduler` (if present).
    *   *Note: Docker Compose handles most networking variables automatically.*

3.  **Start Services**:
    ```bash
    docker-compose up --build
    ```
    *   Frontend: [http://localhost:3000](http://localhost:3000)
    *   API: [http://localhost:4000](http://localhost:4000)

### Option B: Manual Setup (Local Dev)

1.  **Install Dependencies**:
    ```bash
    # Frontend
    cd frontend && npm install

    # API
    cd ../api && npm install

    # Smart Contract (Rust/Anchor)
    cd ../subscription_billing && anchor build
    ```

2.  **Database Setup**:
    *   Ensure PostgreSQL is running.
    *   Run migrations:
        ```bash
        cd api
        npm run migrate
        ```

3.  **Start Development Servers**:
    *   **Frontend**: `npm run dev` (in `/frontend`)
    *   **API**: `npm run dev` (in `/api`)
    *   **Scheduler**: `npm run start` (in `/scheduler`)

## 🔑 Environment Variables

See `.env.example` in each directory for specific requirements. Key variables include:

*   `NEXT_PUBLIC_PROGRAM_ID`: The Deployed Program ID (Devnet).
*   `DATABASE_URL`: PostgreSQL connection string.
*   `SOLANA_RPC_URL`: Helius or Alchemy RPC URL.
*   `RESEND_API_KEY`: For email notifications.
*   `SENTRY_DSN`: For error tracking.

## 🧪 Testing

*   **Frontend**: `npm run test` (Vitest)
*   **API**: `npm test` (Jest)
*   **Smart Contract**: `anchor test`

## 📦 Deployment

*   **Frontend**: Ready for Vercel deployment.
*   **API/Scheduler**: Can be deployed to Railway, AWS ECS, or DigitalOcean via Docker.
*   **Smart Contract**: Deployed to Solana Devnet (see `Anchor.toml`).

## 🤝 Contributing

1.  Fork the repo.
2.  Create a feature branch.
3.  Commit changes with conventional commits (e.g., `feat: add new payment method`).
4.  Open a Pull Request.

## 📄 License

MIT
