export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role?: 'admin' | 'user'; // Extended type definition
}

export interface AuthState {
    user: User | null;
    authenticated: boolean;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<User>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
}

export interface LoginCredentials {
    email: string;
    password: string;
    remember?: boolean;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
