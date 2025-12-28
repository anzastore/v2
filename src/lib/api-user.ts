import axios from './axios';

export interface UserOrder {
    id: string;
    invoice_number: string;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'expired';
    total_amount: number;
    currency_code: string;
    created_at: string;
    items?: any[];
    payment_status?: string;
    payment_instructions?: any;
    audit_summary?: any[];
}

export const UserApi = {
    getOrders: async (page = 1) => {
        const { data } = await axios.get(`/api/user/orders?page=${page}`);
        return data;
    },

    getOrder: async (invoice: string) => {
        const { data } = await axios.get(`/api/user/orders/${invoice}`);
        return data;
    }
};
