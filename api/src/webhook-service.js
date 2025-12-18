import crypto from 'crypto';
import logger from './logger.js';

/**
 * Deliver webhook to endpoint
 */
export const deliverWebhook = async (url, event, payload, secret) => {
    try {
        // Generate signature
        const signature = crypto
            .createHmac('sha256', secret)
            .update(JSON.stringify(payload))
            .digest('hex');

        // Validate URL (SSRF Protection)
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;

        // Block localhost and private IP ranges unless in development mode
        const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
        const isPrivateIp = hostname.startsWith('192.168.') || hostname.startsWith('10.') || hostname.startsWith('172.');

        if ((isLocalhost || isPrivateIp) && process.env.NODE_ENV !== 'development') {
            throw new Error('Webhook URL cannot be a local or private address');
        }

        // Send webhook
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Webhook-Signature': signature,
                'X-Webhook-Event': event
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        const responseBody = await response.text();

        logger.info('Webhook delivered', {
            url,
            event,
            statusCode: response.status,
            success: response.ok
        });

        return {
            success: response.ok,
            statusCode: response.status,
            responseBody: responseBody.substring(0, 500) // Limit response body size
        };
    } catch (error) {
        logger.error('Webhook delivery failed', {
            url,
            event,
            error: error.message
        });

        return {
            success: false,
            statusCode: null,
            error: error.message
        };
    }
};

/**
 * Calculate next retry time with exponential backoff
 */
export const calculateNextRetry = (attemptCount) => {
    // Exponential backoff: 1min, 5min, 15min, 1hr, 6hr
    const delays = [60, 300, 900, 3600, 21600];
    const delaySeconds = delays[Math.min(attemptCount - 1, delays.length - 1)];
    return Math.floor(Date.now() / 1000) + delaySeconds;
};

/**
 * Create webhook signature for verification
 */
export const createWebhookSignature = (payload, secret) => {
    return crypto
        .createHmac('sha256', secret)
        .update(JSON.stringify(payload))
        .digest('hex');
};

/**
 * Verify webhook signature
 */
export const verifyWebhookSignature = (payload, signature, secret) => {
    const expectedSignature = createWebhookSignature(payload, secret);
    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
    );
};
