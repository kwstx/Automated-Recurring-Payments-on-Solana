import { useQuery } from '@tanstack/react-query';
import { notificationsAPI } from '../lib/api-client';

export const useNotifications = () => {
    return useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const { data } = await notificationsAPI.getRecent();
            console.log('Notifications data:', data);
            return data.notifications;
        },
        refetchInterval: 30000, // Poll every 30 seconds
    });
};
