import axios from '@/lib/axios';

export interface Notification {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: string; // UUID
    data: {
        event: string;
        invoice_number: string;
        order_id: string;
        message: string;
        timestamp: string;
    };
    read_at: string | null;
    created_at: string;
    updated_at: string;
}

export const NotificationApi = {
    getAll: async (page = 1) => {
        const { data } = await axios.get(`/api/user/notifications?page=${page}`);
        return data;
    },

    markAsRead: async (id: string) => {
        const { data } = await axios.patch(`/api/user/notifications/${id}/read`);
        return data;
    },

    markAllRead: async () => {
        const { data } = await axios.patch(`/api/user/notifications/read-all`);
        return data;
    }
};
