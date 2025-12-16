const getResendClient = (apiKey) => {
    if (apiKey) return new Resend(apiKey);
    return new Resend(process.env.RESEND_API_KEY || 're_123456789');
};

const getSender = (fromEmail) => {
    return fromEmail || process.env.EMAIL_FROM || 'onboarding@resend.dev';
};

export const emailService = {

    /**
     * Send Welcome Email on New Subscription
     */
    sendWelcomeEmail: async (toEmail, merchantName, planName, amount, currency, config = {}) => {
        try {
            const resend = getResendClient(config.apiKey);
            const from = getSender(config.fromEmail);

            const { data, error } = await resend.emails.send({
                from: from,
                to: toEmail,
                subject: `Welcome to ${planName}!`,
                html: `
                    <h1>Welcome to ${merchantName}!</h1>
                    <p>Thanks for subscribing to <strong>${planName}</strong>.</p>
                    <p>You will be automatically charged <strong>${amount} ${currency}</strong> per billing cycle.</p>
                    <p>Manage your subscription in the <a href="http://localhost:3000/portal">Subscriber Portal</a>.</p>
                `
            });

            if (error) {
                logger.error('Resend Error (Welcome)', error);
                return false;
            }

            logger.info(`📧 Sent 'Welcome' to ${toEmail} (ID: ${data.id})`);
            return true;
        } catch (err) {
            logger.error('Email Service Error', err);
            return false;
        }
    },

    /**
     * Send Receipt on Successful Payment
     */
    sendReceipt: async (toEmail, merchantName, planName, amount, currency, txSignature, config = {}) => {
        try {
            const resend = getResendClient(config.apiKey);
            const from = getSender(config.fromEmail);

            const { data, error } = await resend.emails.send({
                from: from,
                to: toEmail,
                subject: `Payment Receipt - ${merchantName}`,
                html: `
                    <h1>Payment Successful</h1>
                    <p>Your payment of <strong>${amount} ${currency}</strong> for <strong>${planName}</strong> was successful.</p>
                    <p><strong>Transaction Signature:</strong> <code>${txSignature}</code></p>
                    <p><a href="https://explorer.solana.com/tx/${txSignature}?cluster=devnet">View on Explorer</a></p>
                `
            });

            if (error) {
                logger.error('Resend Error (Receipt)', error);
                return false;
            }

            logger.info(`📧 Sent 'Receipt' to ${toEmail} (ID: ${data.id})`);
            return true;
        } catch (err) {
            logger.error('Email Service Error', err);
            return false;
        }
    },

    /**
     * Send Payment Failed (Dunning) Alert
     */
    sendPaymentFailed: async (toEmail, merchantName, planName, amount, currency, reason, config = {}) => {
        try {
            const resend = getResendClient(config.apiKey);
            const from = getSender(config.fromEmail);

            const { data, error } = await resend.emails.send({
                from: from,
                to: toEmail,
                subject: `Action Required: Payment Failed for ${merchantName}`,
                html: `
                    <h1 style="color: red;">Payment Failed</h1>
                    <p>We couldn't process your payment of <strong>${amount} ${currency}</strong> for <strong>${planName}</strong>.</p>
                    <p><strong>Reason:</strong> ${reason}</p>
                    <p>Please top up your wallet to avoid outgoing service cancellation.</p>
                    <a href="http://localhost:3000/portal" style="background-color: black; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Manage Subscription</a>
                `
            });

            if (error) {
                logger.error('Resend Error (Payment Failed)', error);
                return false;
            }

            logger.info(`📧 Sent 'Payment Failed' to ${toEmail} (ID: ${data.id})`);
            return true;
        } catch (err) {
            logger.error('Email Service Error', err);
            return false;
        }
    },

    /**
     * Send Renewal Notification
     */
    sendRenewalNotification: async (toEmail, { merchantName, planName, renewalDate, amount, currency }, config = {}) => {
        try {
            const resend = getResendClient(config.apiKey);
            const from = getSender(config.fromEmail);

            const { data, error } = await resend.emails.send({
                from: from,
                to: toEmail,
                subject: `Upcoming Renewal: ${merchantName}`,
                html: `
                    <h1>Upcoming Renewal</h1>
                    <p>Your subscription to <strong>${planName}</strong> will renew on <strong>${renewalDate}</strong>.</p>
                    <p>Amount: <strong>${amount} ${currency}</strong></p>
                    <p>Ensure your wallet has sufficient funds.</p>
                `
            });

            if (error) {
                logger.error('Resend Error (Renewal)', error);
                return false;
            }
            logger.info(`📧 Sent 'Renewal Notification' to ${toEmail} (ID: ${data.id})`);
            return true;
        } catch (err) {
            logger.error('Email Service Error', err);
            return false;
        }
    }
};

export default emailService;
