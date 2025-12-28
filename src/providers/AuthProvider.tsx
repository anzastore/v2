'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import api from '@/lib/axios';
import { AuthState, LoginCredentials, RegisterData, User } from '@/types';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const setRoleCookie = (role: string) => {
        // Set visible cookie for middleware to read
        document.cookie = `user_role=${role}; path=/; max-age=86400; SameSite=Lax`;
    };

    const clearRoleCookie = () => {
        document.cookie = "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    };

    useEffect(() => {
        const checkRoleRedirect = (userData: User, path: string) => {
            if (path === '/login' || path === '/register') {
                if (userData.role === 'admin') router.replace('/admin/dashboard');
                else router.replace('/');
                return;
            }

            if (userData.role === 'admin') {
                if (path.startsWith('/user')) router.replace('/admin/dashboard');
            } else if (userData.role === 'user') {
                if (path.startsWith('/admin')) router.replace('/');
            }
        };

        const initAuth = async () => {
            setLoading(true);
            try {
                await api.get('/sanctum/csrf-cookie');
                const { data } = await api.get<User>('/api/me');
                setUser(data);
                setAuthenticated(true);
                setRoleCookie(data.role || 'user');
                checkRoleRedirect(data, pathname);
            } catch (error: any) {
                setUser(null);
                setAuthenticated(false);
                clearRoleCookie();
                // If on protected route and auth fails -> Login
                if (pathname.includes('/admin') || pathname.includes('/user')) {
                    router.push('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (credentials: LoginCredentials): Promise<User> => {
        // Token Auth: No need for Sanctum CSRF cookie
        const response = await api.post('/api/login', credentials);
        const { user: data, token } = response.data;

        if (token) {
            localStorage.setItem('auth_token', token);
        }

        setUser(data);
        setAuthenticated(true);
        setRoleCookie(data.role || 'user');

        return data;
    };

    const register = async (data: RegisterData) => {
        const response = await api.post('/api/register', data);
        const { user: userData, token } = response.data;

        if (token) {
            localStorage.setItem('auth_token', token);
        }

        setUser(userData);
        setAuthenticated(true);
        setRoleCookie(userData.role || 'user');
    };

    const logout = async () => {
        try {
            await api.post('/api/logout');
        } catch (e) {
            console.error('Logout error', e);
        } finally {
            // HARD RESET
            setUser(null);
            setAuthenticated(false);
            clearRoleCookie();
            localStorage.removeItem('auth_token'); // Clear Token

            // MANUALLY expire is_auth cookie on client side for guaranteed safety
            document.cookie = "is_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

            // NO REDIRECT - Stay on current page (unless it's protected, which middleware handles)
            router.refresh();
        }
    };

    return (
        <AuthContext.Provider value={{ user, authenticated, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuthContext must be used within AuthProvider');
    return context;
};
