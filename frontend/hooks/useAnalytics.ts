import { useQuery } from '@tanstack/react-query';
import { analyticsAPI } from '../lib/api-client';

export const useAnalyticsOverview = () => {
    return useQuery({
        queryKey: ['analytics', 'overview'],
        queryFn: async () => {
            const { data } = await analyticsAPI.getOverview();
            return data.analytics;
        },
    });
};

export const useMRR = () => {
    return useQuery({
        queryKey: ['analytics', 'mrr'],
        queryFn: async () => {
            const { data } = await analyticsAPI.getMRR();
            return data;
        },
    });
};

export const useChurnRate = () => {
    return useQuery({
        queryKey: ['analytics', 'churn'],
        queryFn: async () => {
            const { data } = await analyticsAPI.getChurn();
            return data;
        },
    });
};

export const useRevenueByPlan = () => {
    return useQuery({
        queryKey: ['analytics', 'revenue-by-plan'],
        queryFn: async () => {
            const { data } = await analyticsAPI.getRevenueByPlan();
            return data.plans;
        },
    });
};
