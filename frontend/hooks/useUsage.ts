import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

const usageAPI = {
    getUsage: async (subscriptionId: string) => {
        const response = await api.get(`/usage/subscriptions/${subscriptionId}`);
        return response.data;
    },
    // We can add recordUsage here if needed for testing from frontend
};

export function useSubscriptionUsage(subscriptionId: string) {
    return useQuery({
        queryKey: ['usage', subscriptionId],
        queryFn: () => usageAPI.getUsage(subscriptionId),
        enabled: !!subscriptionId
    });
}
