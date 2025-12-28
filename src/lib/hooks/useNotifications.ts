import useSWR from 'swr';
import axios from '@/lib/axios'; // Make sure to use the configured axios instance
import { Notification } from '../api-notification';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useNotifications() {
    const { data, error, mutate } = useSWR('/api/user/notifications', fetcher, {
        refreshInterval: 0, // Polling disabled by default, can enable if needed (30000 = 30s)
        revalidateOnFocus: true,
    });

    return {
        notifications: (data?.data as Notification[]) || [],
        meta: data?.meta, // Pagination meta
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}
