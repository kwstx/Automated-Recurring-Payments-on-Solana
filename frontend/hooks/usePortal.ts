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
        enabled: !!walletAddress,
    });
};

export const usePauseSubscription = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, walletAddress }: { id: number; walletAddress: string }) =>
            portalAPI.pauseSubscription(id, walletAddress),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portal', 'subscriptions'] });
        },
    });
};

export const useResumeSubscription = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, walletAddress }: { id: number; walletAddress: string }) =>
            portalAPI.resumeSubscription(id, walletAddress),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portal', 'subscriptions'] });
        },
    });
};

export const useCancelSubscription = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, walletAddress }: { id: number; walletAddress: string }) =>
            portalAPI.cancelSubscription(id, walletAddress),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portal', 'subscriptions'] });
        },
    });
};
