import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionsAPI } from '../lib/api-client';

export const useSubscriptions = () => {
    return useQuery({
        queryKey: ['subscriptions'],
        queryFn: async () => {
            const { data } = await subscriptionsAPI.list();
            return data.subscriptions;
        },
    });
};

export const useCancelSubscription = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (subscriptionPda: string) => subscriptionsAPI.cancel(subscriptionPda),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
        },
    });
};

export const useChargeSubscription = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (subscriptionPda: string) => subscriptionsAPI.charge(subscriptionPda),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
        },
    });
};
