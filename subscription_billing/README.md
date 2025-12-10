# Solana Subscription Billing

## Overview
This project implements a crypto-native subscription billing platform on Solana.

## Program Logic
- **Plan PDA**: Stores plan details (merchant, amount, frequency).
- **Subscription PDA**: Stores subscriber status and billing info.
- **Instructions**:
  - `initialize_plan`: Create a new subscription plan.
  - `subscribe`: Subscribe to a plan (initial payment + setup).
  - `process_payment`: Charge a recurring payment (requires delegate approval).
  - `cancel_subscription`: Cancel a subscription.

## Prerequisites
- Rust
- Solana CLI
- Anchor CLI
- Node.js & Yarn/NPM

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the program:
   ```bash
   anchor build
   ```

3. Run tests:
   ```bash
   anchor test
   ```

## Testing on Devnet
1. Change `Anchor.toml` provider to `devnet`.
2. Run `anchor build`.
3. Run `anchor deploy`.
4. Run `anchor test`.
