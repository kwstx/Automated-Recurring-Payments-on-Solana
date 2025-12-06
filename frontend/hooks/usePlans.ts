import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { plansAPI } from '../lib/api-client';

export const usePlans = () => {
    return useQuery({
        queryKey: ['plans'],
        queryFn: async () => {
            const { data } = await plansAPI.list();
            return data.plans;
        },
    });
};

export const usePlansPaginated = (params?: { page?: number; limit?: number; search?: string; status?: string }) => {
    return useQuery({
        queryKey: ['plans', 'paginated', params],
        queryFn: async () => {
            const { data } = await plansAPI.listPaginated(params);
            return data;
        },
    });
};

export const usePlanSubscribers = (planId: number) => {
    return useQuery({
        queryKey: ['plans', planId, 'subscribers'],
        queryFn: async () => {
            const { data } = await plansAPI.getSubscribers(planId);
            return data;
        },
        enabled: !!planId,
    });
};

export const useCreatePlan = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (planData: any) => plansAPI.create(planData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans'] });
        },
    });
};

export const useUpdatePlan = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (planData: any) => plansAPI.update(planData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans'] });
        },
    });
};

export const useDeletePlan = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (planId: number) => plansAPI.delete(planId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans'] });
        },
    });
};
