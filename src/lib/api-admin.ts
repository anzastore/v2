import axios from './axios';

export interface OrderItem {
    id: string;
    product_code: string;
    product_name_snap: string;
    price_snap: number;
    quantity: number;
    data: any;
}

export interface Payment {
    id: string;
    payment_method: string;
    status: string;
    amount: number;
    provider_reference?: string;
    created_at: string;
}

export interface OrderAudit {
    id: string;
    user: { name: string; email: string };
    action: string;
    reason?: string;
    created_at: string;
}

export interface Order {
    id: string;
    invoice_number: string;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'expired';
    payment_status: 'unpaid' | 'paid' | 'refunded';
    total_amount: number;
    currency_code: string;
    payment_method: string;
    customer_email: string;
    customer_phone?: string;
    created_at: string;
    items?: OrderItem[];
    payments?: Payment[];
    audits?: OrderAudit[];
    user?: { name: string; email: string };
}

// --- GAMES & PRODUCTS ---

export interface Game {
    id: number;
    title: string;
    slug: string;
    description?: string;
    thumbnail?: string;
    cover_image?: string;
    publisher?: string;
    category_id?: number;
    is_active: boolean;
    input_fields: any; // JSON Schema for inputs
    created_at: string;
}

export interface Product {
    id: number;
    game_id: number;
    name: string;
    code: string;
    price: number;
    price_original?: number;
    currency_code: string;
    is_active: boolean;
    stock?: number;
}

export const AdminApi = {
    getOrders: async (params?: { page?: number; status?: string; search?: string }) => {
        const { data } = await axios.get('/api/admin/orders', { params });
        return data;
    },

    getOrder: async (invoice: string) => {
        const { data } = await axios.get(`/api/admin/orders/${invoice}`);
        return data;
    },

    approveOrder: async (id: string) => {
        const { data } = await axios.post(`/api/admin/orders/${id}/approve`);
        return data;
    },

    rejectOrder: async (id: string, reason: string) => {
        const { data } = await axios.post(`/api/admin/orders/${id}/reject`, { reason });
        return data;
    },

    refundOrder: async (id: string, reason: string) => {
        const { data } = await axios.post(`/api/admin/orders/${id}/refund`, { reason });
        return data;
    },

    // --- GAME METHODS ---
    getGames: async (params?: { search?: string; page?: number }) => {
        const { data } = await axios.get('/api/admin/games', { params });
        return data;
    },

    getGame: async (id: string) => {
        const { data } = await axios.get(`/api/admin/games/${id}`);
        return data;
    },

    createGame: async (payload: Partial<Game>) => {
        const { data } = await axios.post('/api/admin/games', payload);
        return data;
    },

    updateGame: async (id: string | number, payload: Partial<Game>) => {
        const { data } = await axios.put(`/api/admin/games/${id}`, payload);
        return data;
    },

    deleteGame: async (id: string | number) => {
        const { data } = await axios.delete(`/api/admin/games/${id}`);
        return data;
    },

    // --- PRODUCT METHODS ---
    createProduct: async (payload: Partial<Product>) => {
        const { data } = await axios.post('/api/admin/products', payload);
        return data;
    },

    updateProduct: async (id: string | number, payload: Partial<Product>) => {
        const { data } = await axios.put(`/api/admin/products/${id}`, payload);
        return data;
    },

    deleteProduct: async (id: string | number) => {
        const { data } = await axios.delete(`/api/admin/products/${id}`);
        return data;
    },
};
