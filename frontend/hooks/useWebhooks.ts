import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { webhooksAPI } from '../lib/api-client';

export const useWebhooks = () => {
    return useQuery({
        queryKey: ['webhooks'],
        queryFn: async () => {
            const { data } = await webhooksAPI.list();
            return data.webhooks;
        },
    });
};

export const useWebhookLogs = (id: number) => {
    return useQuery({
        queryKey: ['webhooks', id, 'logs'],
        queryFn: async () => {
            const { data } = await webhooksAPI.getLogs(id);
            return data.deliveries;
        },
        enabled: !!id,
    });
};

export const useCreateWebhook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => webhooksAPI.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['webhooks'] });
        },
    });
};

export const useUpdateWebhook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => webhooksAPI.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['webhooks'] });
        },
    });
};

export const useDeleteWebhook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => webhooksAPI.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['webhooks'] });
        },
    });
};
