
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { portalAPI } from '../lib/api-client';

export const usePortalSubscriptions = (walletAddress: string | null) => {
    return useQuery({
        queryKey: ['portal', 'subscriptions', walletAddress],
        queryFn: async () => {
            if (!walletAddress) return [];
            const { data } = await portalAPI.getSubscriptions(walletAddress);
            return data.subscriptions;
        },
        enabled: !!walletAddress, // Only fetch if wallet connected
    });
};

export const usePortalActions = (walletAddress: string) => {
    const queryClient = useQueryClient();

    const pause = useMutation({
        mutationFn: (id: number) => portalAPI.pauseSubscription(id, walletAddress),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portal', 'subscriptions'] });
        },
    });

    const resume = useMutation({
        mutationFn: (id: number) => portalAPI.resumeSubscription(id, walletAddress),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portal', 'subscriptions'] });
        },
    });

    const cancel = useMutation({
        mutationFn: (id: number) => portalAPI.cancelSubscription(id, walletAddress),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portal', 'subscriptions'] });
        },
    });

    return { pause, resume, cancel };
};
