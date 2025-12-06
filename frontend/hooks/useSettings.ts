import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsAPI } from '../lib/api-client';

export const useCompanyDetails = () => {
    return useQuery({
        queryKey: ['settings', 'company'],
        queryFn: async () => {
            const { data } = await settingsAPI.getCompany();
            return data;
        },
    });
};

export const useUpdateCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (companyData: any) => settingsAPI.updateCompany(companyData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings', 'company'] });
        },
    });
};

export const useAPIKeys = () => {
    return useQuery({
        queryKey: ['settings', 'api-keys'],
        queryFn: async () => {
            const { data } = await settingsAPI.listAPIKeys();
            return data.apiKeys;
        },
    });
};

export const useGenerateAPIKey = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (name?: string) => settingsAPI.generateAPIKey(name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings', 'api-keys'] });
        },
    });
};

export const useRevokeAPIKey = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => settingsAPI.revokeAPIKey(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings', 'api-keys'] });
        },
    });
};

export const useNotificationPreferences = () => {
    return useQuery({
        queryKey: ['settings', 'notifications'],
        queryFn: async () => {
            const { data } = await settingsAPI.getNotifications();
            return data;
        },
    });
};

export const useUpdateNotifications = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (preferences: any) => settingsAPI.updateNotifications(preferences),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings', 'notifications'] });
        },
    });
};
