import cron from 'node-cron';
import * as Sentry from '@sentry/node';
import logger from './logger.js';
import { retryFailedWebhooks } from './webhook-triggers.js';

/**
 * Background service to retry failed webhooks
 */
export const startWebhookRetryScheduler = () => {
    // Retry failed webhooks every 2 minutes
    cron.schedule('*/2 * * * *', async () => {
        logger.debug('Starting webhook retry job');
        try {
            const results = await retryFailedWebhooks();
            if (results.retried > 0) {
                logger.info('Webhook retry job completed', results);
            }
        } catch (error) {
            logger.error('Webhook retry job failed', { error: error.message });
            Sentry.captureException(error, { tags: { scheduler: 'webhook-retry' } });
        }
    });

    logger.info('Webhook retry scheduler started (runs every 2 minutes)');
};
