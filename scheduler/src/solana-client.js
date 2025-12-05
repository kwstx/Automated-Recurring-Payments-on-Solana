import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { AnchorProvider, Program, web3 } from '@coral-xyz/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import fs from 'fs';
import config from './config.js';
import logger from './logger.js';

class SolanaClient {
    constructor() {
        this.connection = new Connection(config.solana.rpcUrl, 'confirmed');
        this.programId = new PublicKey(config.solana.programId);

        // Load payer keypair
        const keypairData = JSON.parse(fs.readFileSync(config.solana.payerKeypairPath, 'utf8'));
        this.payer = Keypair.fromSecretKey(new Uint8Array(keypairData));

        // Set up Anchor provider
        const wallet = {
            publicKey: this.payer.publicKey,
            signTransaction: async (tx) => {
                tx.partialSign(this.payer);
                return tx;
            },
            signAllTransactions: async (txs) => {
                return txs.map(tx => {
                    tx.partialSign(this.payer);
                    return tx;
                });
            },
        };

        this.provider = new AnchorProvider(this.connection, wallet, {
            commitment: 'confirmed',
        });

        // Load IDL (you'll need to copy this from your Anchor build)
        this.program = null; // Will be initialized with IDL

        logger.info(`Solana client initialized with program ID: ${this.programId.toString()}`);
    }

    async processPayment(subscription) {
        try {
            const subscriptionPda = new PublicKey(subscription.subscription_pda);
            const planPda = new PublicKey(subscription.plan_pda);
            const subscriberTokenAccount = new PublicKey(subscription.subscriber_token_account);
            const merchantTokenAccount = new PublicKey(subscription.merchant_token_account);

            // Build transaction manually since we don't have IDL
            const instruction = await this.buildProcessPaymentInstruction(
                subscriptionPda,
                planPda,
                subscriberTokenAccount,
                merchantTokenAccount
            );

            const transaction = new web3.Transaction().add(instruction);
            const signature = await this.connection.sendTransaction(
                transaction,
                [this.payer],
                { skipPreflight: false }
            );

            // Wait for confirmation
            await this.connection.confirmTransaction(signature, 'confirmed');

            logger.info(`Payment processed successfully: ${signature}`);
            return { success: true, signature };
        } catch (error) {
            logger.error(`Payment processing failed: ${error.message}`, { error });
            return { success: false, error: error.message };
        }
    }

    async buildProcessPaymentInstruction(subscriptionPda, planPda, subscriberTokenAccount, merchantTokenAccount) {
        // Instruction discriminator for process_payment
        // Calculated from sha256("global:process_payment")[0..8]
        const discriminator = Buffer.from([189, 81, 30, 198, 139, 186, 115, 23]);

        const keys = [
            { pubkey: subscriptionPda, isSigner: false, isWritable: true },
            { pubkey: planPda, isSigner: false, isWritable: true },
            { pubkey: subscriberTokenAccount, isSigner: false, isWritable: true },
            { pubkey: merchantTokenAccount, isSigner: false, isWritable: true },
            { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        ];

        return new web3.TransactionInstruction({
            keys,
            programId: this.programId,
            data: discriminator,
        });
    }

    async getSubscriptionAccount(subscriptionPda) {
        try {
            const accountInfo = await this.connection.getAccountInfo(new PublicKey(subscriptionPda));
            return accountInfo;
        } catch (error) {
            logger.error(`Failed to fetch subscription account: ${error.message}`);
            return null;
        }
    }
}

export default SolanaClient;
