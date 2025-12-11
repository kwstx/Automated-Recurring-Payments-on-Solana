import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoicesAPI } from '../lib/api-client';

export const useInvoices = (status?: string) => {
    return useQuery({
        queryKey: ['invoices', status],
        queryFn: async () => {
            const { data } = await invoicesAPI.list(status);
            return data.invoices;
        },
    });
};

export const useInvoice = (id: number) => {
    return useQuery({
        queryKey: ['invoices', id],
        queryFn: async () => {
            const { data } = await invoicesAPI.get(id);
            return data.invoice;
        },
        enabled: !!id,
    });
};

export const useCreateInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (invoiceData: any) => invoicesAPI.create(invoiceData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] });
        },
    });
};
