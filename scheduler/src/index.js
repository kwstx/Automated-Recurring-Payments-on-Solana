import Scheduler from './scheduler.js';
import logger from './logger.js';

const scheduler = new Scheduler();

// Handle graceful shutdown
process.on('SIGINT', () => {
    logger.info('Received SIGINT, shutting down gracefully...');
    scheduler.stop();
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.info('Received SIGTERM, shutting down gracefully...');
    scheduler.stop();
    process.exit(0);
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
    logger.error('Uncaught exception:', { error: error.stack });
    scheduler.stop();
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled rejection:', { reason, promise });
});

// Start the scheduler
logger.info('Starting Subscription Payment Scheduler...');
scheduler.start();
