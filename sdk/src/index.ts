import axios, { AxiosInstance } from 'axios';

export interface BillingConfig {
    apiKey: string;
    baseUrl?: string;
}

export class BillingClient {
    private client: AxiosInstance;

    constructor(config: BillingConfig) {
        this.client = axios.create({
            baseURL: config.baseUrl || 'http://localhost:4000', // Default to localhost for now
            headers: {
                'X-API-Key': config.apiKey,
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Report usage for a metered billing event
     */
    async reportUsage(subscriptionId: number, event: string, quantity: number, idempotencyKey?: string) {
        const response = await this.client.post('/usage/report', {
            subscriptionId,
            event,
            quantity,
            idempotencyKey
        });
        return response.data;
    }

    /**
     * Get usage for a subscription
     */
    async getUsage(subscriptionId: number) {
        const response = await this.client.get(`/usage/${subscriptionId}`);
        return response.data;
    }

    // TODO: Add more methods (getPlan, cancelSubscription, etc.)
}
