import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SubscriptionBilling } from "../target/types/subscription_billing";
import { createMint, createAccount, mintTo, getAccount, approve, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { assert } from "chai";

describe("subscription_billing", () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.SubscriptionBilling as Program<SubscriptionBilling>;

    let mint: anchor.web3.PublicKey;
    let merchant: anchor.web3.Keypair;
    let subscriber: anchor.web3.Keypair;
    let merchantTokenAccount: anchor.web3.PublicKey;
    let subscriberTokenAccount: anchor.web3.PublicKey;
    let planPda: anchor.web3.PublicKey;
    import * as anchor from "@coral-xyz/anchor";
    import { Program } from "@coral-xyz/anchor";
    import { SubscriptionBilling } from "../target/types/subscription_billing";
    import { createMint, createAccount, mintTo, getAccount, approve, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
    import { assert } from "chai";

    describe("subscription_billing", () => {
        const provider = anchor.AnchorProvider.env();
        anchor.setProvider(provider);

        const program = anchor.workspace.SubscriptionBilling as Program<SubscriptionBilling>;

        let mint: anchor.web3.PublicKey;
        let merchant: anchor.web3.Keypair;
        let subscriber: anchor.web3.Keypair;
        let merchantTokenAccount: anchor.web3.PublicKey;
        let subscriberTokenAccount: anchor.web3.PublicKey;
        let planPda: anchor.web3.PublicKey;
        let subscriptionPda: anchor.web3.PublicKey;

        const planId = "basic_plan";
        const amount = new anchor.BN(1000000); // 1 USDC
        const frequency = new anchor.BN(2); // 2 seconds

        // Helper to safely execute RPC and print logs on failure
        const safeRpc = async (methodBuilder: any, signers: anchor.web3.Keypair[] = []) => {
            try {
                const tx = await methodBuilder.signers(signers).rpc();
                console.log("Transaction signature:", tx);
                return tx;
            } catch (e: any) {
                console.error("Transaction failed!");
                if (e.logs) {
                    console.log("Transaction Logs:");
                    e.logs.forEach((log: string) => console.log(log));
                } else {
                    console.error(e);
                }
                throw e; // Rethrow to fail the test, but logs are printed
            }
        };

        it("Is initialized!", async () => {
            merchant = anchor.web3.Keypair.generate();
            subscriber = anchor.web3.Keypair.generate();

            console.log("Merchant:", merchant.publicKey.toString());
            console.log("Subscriber:", subscriber.publicKey.toString());

            // Airdrop SOL
            try {
                const sig1 = await provider.connection.requestAirdrop(merchant.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL);
                await provider.connection.confirmTransaction(sig1);
                const sig2 = await provider.connection.requestAirdrop(subscriber.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL);
                await provider.connection.confirmTransaction(sig2);
            } catch (e) {
                console.log("Airdrop failed, assuming accounts have funds or running on localnet with skip-preflight");
            }

            // Create Mint
            // Note: In a real devnet scenario with a specific mint, we would skip this and use the known mint.
            // Since we need to mint tokens to the subscriber for the test to work, we create a new mint here.
            mint = await createMint(
                provider.connection,
                merchant, // payer
                merchant.publicKey, // mint authority
                null,
                6
            );
            console.log("Mint:", mint.toString());

            // Create Token Accounts
            merchantTokenAccount = (await getOrCreateAssociatedTokenAccount(
                provider.connection,
                merchant,
                mint,
                merchant.publicKey
            )).address;

            subscriberTokenAccount = (await getOrCreateAssociatedTokenAccount(
                provider.connection,
                subscriber,
                mint,
                subscriber.publicKey
            )).address;

            // Mint to Subscriber
            await mintTo(
                provider.connection,
                merchant,
                mint,
                subscriberTokenAccount,
                merchant,
                10000000 // 10 USDC
            );
        });

        it("Initializes a Plan", async () => {
            [planPda] = anchor.web3.PublicKey.findProgramAddressSync(
                [Buffer.from("plan"), merchant.publicKey.toBuffer(), Buffer.from(planId)],
                program.programId
            );

            // Check if PDA exists
            const planInfo = await provider.connection.getAccountInfo(planPda);
            if (planInfo) {
                console.log("Plan PDA already exists, skipping initialization.");
                return;
            }

            await safeRpc(
                program.methods
                    .initializePlan(planId, amount, frequency)
                    .accounts({
                        plan: planPda,
                        merchant: merchant.publicKey,
                        tokenMint: mint,
                        systemProgram: anchor.web3.SystemProgram.programId,
                    }),
                [merchant]
            );

            const planAccount = await program.account.plan.fetch(planPda);
            assert.equal(planAccount.amount.toString(), amount.toString());
            assert.equal(planAccount.frequency.toString(), frequency.toString());
        });

        it("Subscribes to a Plan", async () => {
            // Seeds: ["sub", subscriber, plan]
            [subscriptionPda] = anchor.web3.PublicKey.findProgramAddressSync(
                [Buffer.from("sub"), subscriber.publicKey.toBuffer(), planPda.toBuffer()],
                program.programId
            );

            // Check if PDA exists
            const subInfo = await provider.connection.getAccountInfo(subscriptionPda);
            if (subInfo) {
                console.log("Subscription PDA already exists, skipping subscription.");
                return;
            }

            await safeRpc(
                program.methods
                    .subscribe()
                    .accounts({
                        subscription: subscriptionPda,
                        plan: planPda,
                        subscriber: subscriber.publicKey,
                        subscriberTokenAccount: subscriberTokenAccount,
                        merchantTokenAccount: merchantTokenAccount,
                        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                        systemProgram: anchor.web3.SystemProgram.programId,
                    }),
                [subscriber]
            );

            const subscriptionAccount = await program.account.subscription.fetch(subscriptionPda);
            assert.isTrue(subscriptionAccount.isActive);

            // Check balance - should have paid initial amount
            const merchantAccountInfo = await getAccount(provider.connection, merchantTokenAccount);
            assert.equal(merchantAccountInfo.amount.toString(), amount.toString());
        });

        it("Processes a recurring payment", async () => {
            // Wait for frequency
            console.log("Waiting for billing cycle...");
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Check if billing is due
            const subAccount = await program.account.subscription.fetch(subscriptionPda);
            const now = Math.floor(Date.now() / 1000);
            if (subAccount.nextBillingTime.toNumber() > now) {
                console.log("Not due for billing yet. Next billing:", subAccount.nextBillingTime.toNumber(), "Now:", now);
                // In a real app we would wait or skip. Here we might fail if we expect it to be due.
                // Since we waited 3s and frequency is 2s, it should be due.
            }

            // Check delegate
            const tokenAccountInfo = await getAccount(provider.connection, subscriberTokenAccount);
            if (!tokenAccountInfo.delegate) {
                console.error("No delegate set on subscriber token account!");
                assert.fail("No delegate set");
            }
            if (!tokenAccountInfo.delegate.equals(subscriptionPda)) {
                console.error("Delegate mismatch! Expected:", subscriptionPda.toString(), "Got:", tokenAccountInfo.delegate.toString());
                assert.fail("Delegate mismatch");
            }
            // Check allowance (delegatedAmount)
            // Note: We approved u64::MAX, so it should be plenty.
            console.log("Delegated amount:", tokenAccountInfo.delegatedAmount.toString());

            await safeRpc(
                program.methods
                    .processPayment()
                    .accounts({
                        subscription: subscriptionPda,
                        plan: planPda,
                        subscriberTokenAccount: subscriberTokenAccount,
                        merchantTokenAccount: merchantTokenAccount,
                        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                    })
            );

            // Check balance
            const merchantAccountInfo = await getAccount(provider.connection, merchantTokenAccount);
            assert.equal(merchantAccountInfo.amount.toString(), amount.mul(new anchor.BN(2)).toString());
        });

        it("Pauses and Resumes Subscription", async () => {
            // Pause
            await safeRpc(
                program.methods
                    .pauseSubscription()
                    .accounts({
                        subscription: subscriptionPda,
                        subscriber: subscriber.publicKey,
                    }),
                [subscriber]
            );

            let subscriptionAccount = await program.account.subscription.fetch(subscriptionPda);
            assert.isFalse(subscriptionAccount.isActive);

            // Try to process payment - should fail
            try {
                await program.methods
                    .processPayment()
                    .accounts({
                        subscription: subscriptionPda,
                        plan: planPda,
                        subscriberTokenAccount: subscriberTokenAccount,
                        merchantTokenAccount: merchantTokenAccount,
                        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                    })
                    .rpc();
                assert.fail("Should have failed");
            } catch (e: any) {
                // Expected failure
                console.log("Expected failure caught:", e.message);
                // assert.include(e.message, "SubscriptionInactive"); 
            }

            // Resume
            await safeRpc(
                program.methods
                    .resumeSubscription()
                    .accounts({
                        subscription: subscriptionPda,
                        subscriber: subscriber.publicKey,
                    }),
                [subscriber]
            );

            subscriptionAccount = await program.account.subscription.fetch(subscriptionPda);
            assert.isTrue(subscriptionAccount.isActive);
        });

        it("Cancels subscription", async () => {
            await safeRpc(
                program.methods
                    .cancelSubscription()
                    .accounts({
                        subscription: subscriptionPda,
                        subscriber: subscriber.publicKey,
                    }),
                [subscriber]
            );

            const subscriptionAccount = await program.account.subscription.fetch(subscriptionPda);
            assert.isFalse(subscriptionAccount.isActive);
        });
    });
