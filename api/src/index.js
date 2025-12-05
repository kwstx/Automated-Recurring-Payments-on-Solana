import 'dotenv/config';
import express from 'express';
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
import { apiLimiter, authLimiter, subscriptionLimiter } from './middleware/rateLimiter.js';
import { startMetadataSyncScheduler } from './metadata-scheduler.js';
import { startWebhookRetryScheduler } from './webhook-retry-scheduler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
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

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
    logger.error('Unhandled error', {
        error: err.message,
        stack: err.stack,
        path: req.path
    });
    res.status(500).json({ error: 'Internal server error' });
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
});
