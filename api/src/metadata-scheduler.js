import cron from 'node-cron';
import * as Sentry from '@sentry/node';
import logger from './logger.js';
import { syncAllPlansMetadata, syncAllSubscriptionsMetadata } from './metadata-sync.js';

/**
 * Background service to periodically sync metadata from on-chain
 */
export const startMetadataSyncScheduler = () => {
    // Sync plans metadata every hour
    cron.schedule('0 * * * *', async () => {
        logger.info('Starting scheduled plan metadata sync');
        try {
            const results = await syncAllPlansMetadata();
            logger.info('Scheduled plan metadata sync completed', results);
        } catch (error) {
            logger.error('Scheduled plan metadata sync failed', { error: error.message });
            Sentry.captureException(error, { tags: { scheduler: 'metadata-sync', type: 'plans' } });
        }
    });

    // Sync subscriptions metadata every 30 minutes
    cron.schedule('*/30 * * * *', async () => {
        logger.info('Starting scheduled subscription metadata sync');
        try {
            const results = await syncAllSubscriptionsMetadata();
            logger.info('Scheduled subscription metadata sync completed', results);
        } catch (error) {
            logger.error('Scheduled subscription metadata sync failed', { error: error.message });
            Sentry.captureException(error, { tags: { scheduler: 'metadata-sync', type: 'subscriptions' } });
        }
    });

    logger.info('Metadata sync scheduler started');
    logger.info('- Plan metadata: syncing every hour');
    logger.info('- Subscription metadata: syncing every 30 minutes');
};
