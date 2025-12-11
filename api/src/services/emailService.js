
import logger from '../logger.js';

// Mock Email Service
// In production, replacing this with Resend, SendGrid, or AWS SES
export const emailService = {

    /**
     * Send Welcome Email on New Subscription
     */
    sendWelcomeEmail: async (toEmail, merchantName, planName, amount, currency) => {
        logger.info(`📧 [MOCK EMAIL] Sending 'Welcome' to ${toEmail}`);
        logger.info(`   Subject: Welcome to ${planName}!`);
        logger.info(`   Body: Thanks for subscribing to ${merchantName}. You will be charged ${amount} ${currency}.`);
        return true;
    },

    /**
     * Send Receipt on Successful Payment
     */
    sendReceipt: async (toEmail, merchantName, planName, amount, currency, txSignature) => {
        logger.info(`📧 [MOCK EMAIL] Sending 'Receipt' to ${toEmail}`);
        logger.info(`   Subject: Payment Receipt - ${merchantName}`);
        logger.info(`   Body: Your payment of ${amount} ${currency} for ${planName} was successful.`);
        logger.info(`   TX: ${txSignature}`);
        return true;
    },

    /**
     * Send Payment Failed (Dunning) Alert
     */
    sendPaymentFailed: async (toEmail, merchantName, planName, amount, currency, reason) => {
        logger.info(`📧 [MOCK EMAIL] Sending 'Payment Failed' to ${toEmail}`);
        logger.info(`   Subject: Action Required: Payment Failed for ${merchantName}`);
        logger.info(`   Body: We couldn't process your payment of ${amount} ${currency} for ${planName}.`);
        logger.info(`   Reason: ${reason}`);
        logger.info(`   Please top up your wallet to avoid cancellation.`);
        return true;
    }
};

export default emailService;
