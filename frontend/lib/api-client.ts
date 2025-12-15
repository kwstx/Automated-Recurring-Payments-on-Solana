import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000';

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

console.log('API Client initialized with Base URL:', API_BASE_URL);

// Request interceptor to add JWT token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear token and redirect to login
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    login: (username: string, password: string) =>
        apiClient.post('/auth/login', { username, password }),
    register: (username: string, password: string, email: string) =>
        apiClient.post('/auth/register', { username, password, email }),
};

// Plans API
export const plansAPI = {
    list: () => apiClient.get('/plan/list'),
    listPaginated: (params?: { page?: number; limit?: number; search?: string; status?: string }) =>
        apiClient.get('/plan/list-paginated', { params }),
    create: (data: any) => apiClient.post('/plan/create', data),
    update: (data: any) => apiClient.post('/plan/update', data),
    delete: (id: number) => apiClient.delete(`/plan/${id}`),
    getSubscribers: (id: number) => apiClient.get(`/plan/${id}/subscribers`),
};

// Analytics API
export const analyticsAPI = {
    getOverview: () => apiClient.get('/merchant/analytics'),
    getMRR: () => apiClient.get('/merchant/analytics/mrr'),
    getChurn: () => apiClient.get('/merchant/analytics/churn'),
    getRevenueByPlan: () => apiClient.get('/merchant/analytics/revenue-by-plan'),
    exportCSV: () => apiClient.get('/merchant/analytics/export', { responseType: 'blob' }),
};

// Settings API
export const settingsAPI = {
    getCompany: () => apiClient.get('/settings/company'),
    updateCompany: (data: any) => apiClient.put('/settings/company', data),
    listAPIKeys: () => apiClient.get('/settings/api-keys'),
    generateAPIKey: (name?: string) => apiClient.post('/settings/api-keys/generate', { name }),
    revokeAPIKey: (id: number) => apiClient.delete(`/settings/api-keys/${id}`),
    getNotifications: () => apiClient.get('/settings/notifications'),
    updateNotifications: (data: any) => apiClient.put('/settings/notifications', data),
};

// Webhooks API
export const webhooksAPI = {
    list: () => apiClient.get('/webhooks/list'),
    create: (data: any) => apiClient.post('/webhooks/register', data),
    update: (id: number, data: any) => apiClient.patch(`/webhooks/${id}`, data),
    delete: (id: number) => apiClient.delete(`/webhooks/${id}`),
    getLogs: (id: number) => apiClient.get(`/webhooks/${id}/deliveries`),
    getDelivery: (id: number) => apiClient.get(`/webhooks/delivery/${id}`),
    retryDelivery: (id: number) => apiClient.post(`/webhooks/delivery/${id}/retry`),
    async retryWebhookDelivery(deliveryId: number) {
        const { data } = await apiClient.post(`/webhooks/deliveries/${deliveryId}/retry`);
        return data;
    },

};

// Audit Logs API
export const auditAPI = {
    getLogs: async () => {
        const { data } = await apiClient.get('/audit');
        return data;
    }
};

// Subscriptions API (Merchant side)
export const subscriptionsAPI = {
    list: () => apiClient.get('/merchant/subscriptions'),
    cancel: (subscriptionPda: string) => apiClient.post('/subscription/cancel', { subscriptionPda }),
};

// Portal API (public, no auth required)
export const portalAPI = {
    getSubscriptions: (walletAddress: string) =>
        apiClient.get(`/portal/subscriptions/${walletAddress}`),
    pauseSubscription: (id: number, walletAddress: string) =>
        apiClient.post(`/portal/subscriptions/${id}/pause`, { walletAddress }),
    resumeSubscription: (id: number, walletAddress: string) =>
        apiClient.post(`/portal/subscriptions/${id}/resume`, { walletAddress }),
    cancelSubscription: (id: number, walletAddress: string) =>
        apiClient.post(`/portal/subscriptions/${id}/cancel`, { walletAddress }),
    getPaymentHistory: (id: number, walletAddress: string) =>
        apiClient.get(`/portal/subscriptions/${id}/history`, { params: { walletAddress } }),
};

// Invoices API
export const invoicesAPI = {
    list: (status?: string) => apiClient.get('/merchant/invoices', { params: { status } }),
    create: (data: any) => apiClient.post('/merchant/invoices', data),
    get: (id: number) => apiClient.get(`/merchant/invoices/${id}`),
};

export { apiClient };
export default apiClient;
