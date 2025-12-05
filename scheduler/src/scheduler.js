import cron from 'node-cron';
import config from './config.js';
import logger from './logger.js';
import PaymentProcessor from './payment-processor.js';

class Scheduler {
    constructor() {
        this.processor = new PaymentProcessor();
        this.cronJob = null;
    }

    start() {
        const intervalMinutes = config.scheduler.intervalMinutes;
        const cronExpression = `*/${intervalMinutes} * * * *`;

        logger.info(`Starting scheduler with interval: every ${intervalMinutes} minutes`);
        logger.info(`Cron expression: ${cronExpression}`);

        this.cronJob = cron.schedule(cronExpression, async () => {
            logger.info('Scheduler triggered - processing due payments');
            try {
                await this.processor.processAllDuePayments();
            } catch (error) {
                logger.error(`Scheduler execution failed: ${error.message}`, { error: error.stack });
            }
        });

        // Run immediately on start
        logger.info('Running initial payment processing...');
        this.processor.processAllDuePayments().catch(error => {
            logger.error(`Initial payment processing failed: ${error.message}`, { error: error.stack });
        });

        logger.info('Scheduler started successfully');
    }

    stop() {
        if (this.cronJob) {
            this.cronJob.stop();
            logger.info('Scheduler stopped');
        }
        this.processor.close();
    }
}

export default Scheduler;
