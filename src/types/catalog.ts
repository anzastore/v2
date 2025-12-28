export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image_url?: string;
}

export interface Product {
    id: number;
    game_id: number;
    name: string;
    code: string;
    price: number; // Base price
    discounted_price?: number; // Optional promo price
    diamonds: number; // For calculation
    bonus_diamonds?: number;
    image_url?: string;
}

export interface Game {
    id: number;
    name: string;
    slug: string;
    description: string;
    thumbnail_url: string; // Card image
    cover_url: string; // Detail page banner
    category_id: number;
    category?: Category;
    products?: Product[];
    publisher?: string;
    developer?: string;
    release_date?: string;
    status: 'active' | 'maintenance' | 'inactive';
}

export interface PaginatedResponse<T> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}
