// import './instrument.js'; // Must be first import
import 'dotenv/config';
import express from 'express';
// // import * as Sentry from '@sentry/node';
// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.tracingHandler());
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';
import logger from './logger.js';
import authRoutes from './routes/authRoutes.js';
import planRoutes from './routes/planRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import merchantRoutes from './routes/merchantRoutes.js';
import metadataRoutes from './routes/metadataRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import portalRoutes from './routes/portalRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import usageRoutes from './routes/usageRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import auditRoutes from './routes/auditRoutes.js';
import { apiLimiter, authLimiter, subscriptionLimiter } from './middleware/rateLimiter.js';
import { startMetadataSyncScheduler } from './metadata-scheduler.js';
import { startWebhookRetryScheduler } from './webhook-retry-scheduler.js';
import { startBalanceMonitor } from './balance-monitor.js';
import { startKeeperScheduler } from './services/keeperService.js';
import db from './database.js';
import { connection } from './solana-client.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Sentry Request Handler not needed in v8+ with auto instrumentation
// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.tracingHandler());

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:4000', 'http://127.0.0.1:4000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    logger.info('HTTP Request', {
        method: req.method,
        path: req.path,
        ip: req.ip
    });
    next();
});

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes with rate limiting
app.use('/auth', authLimiter, authRoutes);
app.use('/plan', apiLimiter, planRoutes);
app.use('/subscription', subscriptionLimiter, subscriptionRoutes);
app.use('/merchant', apiLimiter, merchantRoutes);
app.use('/metadata', apiLimiter, metadataRoutes);
app.use('/webhooks', apiLimiter, webhookRoutes);
app.use('/portal', apiLimiter, portalRoutes);
app.use('/settings', apiLimiter, settingsRoutes);
app.use('/usage', apiLimiter, usageRoutes);
app.use('/invoices', apiLimiter, invoiceRoutes);
app.use('/audit', apiLimiter, auditRoutes);

// Debug Sentry
app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error('My first Sentry error!');
});

// Health check
// Deep Health Check

app.get('/health', async (req, res) => {
    const health = {
        api: 'operational',
        database: 'unknown',
        solana: 'unknown',
        timestamp: new Date().toISOString()
    };

    // Check Database
    try {
        db.prepare('SELECT 1').get();
        health.database = 'operational';
    } catch (e) {
        health.database = 'outage';
        health.db_error = e.message;
    }

    // Check Solana
    try {
        const version = await connection.getVersion();
        health.solana = 'operational';
        health.solana_version = version['solana-core'];
    } catch (e) {
        health.solana = 'outage';
        health.solana_error = e.message;
    }

    const statusCode = (health.database === 'outage' || health.solana === 'outage') ? 503 : 200;
    res.status(statusCode).json(health);
});

// Sentry Error Handler must be before any other error middleware and after all controllers
// app.use(Sentry.expressErrorHandler());

// Error handling
app.use((err, req, res, next) => {
    logger.error('Unhandled error', {
        error: err.message,
        stack: err.stack,
        path: req.path
    });
    res.status(500).json({ error: 'Internal server error', eventId: res.sentry });
});

// Start server
app.listen(PORT, () => {
    logger.info(`Subscription Billing API listening on port ${PORT}`);
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);

    // Start metadata sync scheduler
    if (process.env.ENABLE_METADATA_SYNC !== 'false') {
        startMetadataSyncScheduler();
    }

    // Start webhook retry scheduler
    if (process.env.ENABLE_WEBHOOK_RETRIES !== 'false') {
        startWebhookRetryScheduler();
    }

    // Start balance monitor
    if (process.env.ENABLE_BALANCE_MONITOR !== 'false') {
        startBalanceMonitor();
    }

    // Start Keeper Bot (Payment Processor)
    if (process.env.ENABLE_KEEPER !== 'false') {
        startKeeperScheduler();
    }
});
