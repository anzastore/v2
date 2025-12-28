'use client';

import { useAuthContext } from '@/providers/AuthProvider';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

interface SignInFormProps {
    onSuccess?: () => void;
    onRegisterClick?: () => void;
    isModal?: boolean;
}

export default function SignInForm({ onSuccess, onRegisterClick, isModal = false }: SignInFormProps) {
    const { login } = useAuthContext();
    console.log('VERSION 2.1 ACTIVE - DEBUGGING'); // VERIFICATION TAG
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // Router is only used for fallback if not modal, but for modal auth we prefer sticking to current page
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = await login({ email: identifier, password });
            setError(''); // Clear errors
            toast.success(`Role Detected: ${user.role}`); // DEBUG ROLE

            // Admin Logic: Redirect to Admin Dashboard
            if (user.role === 'admin') {
                toast.success("Redirecting Admin...");
                window.location.href = '/admin/dashboard';
                return;
            }

            // User Logic: Redirect to User Dashboard
            if (user.role === 'user') {
                toast.success("Redirecting User...");
                window.location.href = '/user/dashboard';
                return;
            }

            // Fallback (if any other role exists)
            toast.warning(`Unknown Role: ${user.role}. Redirecting Home...`);
            if (onSuccess) {
                onSuccess();
            } else {
                window.location.href = '/';
            }
        } catch (err: any) {
            // Extract specific validation message if available
            const message = err.response?.data?.message || err.message || 'Login failed';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm flex items-center gap-3 animate-fade-in-down">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email or Username</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-yellow-500">
                            <svg className="h-5 w-5 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </div>
                        <input
                            type="text"
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-zinc-800 rounded-xl leading-5 bg-zinc-900/50 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 sm:text-sm transition-all shadow-inner hover:border-zinc-700"
                            placeholder="user@example.com"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Password</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-yellow-500">
                            <svg className="h-5 w-5 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <input
                            type="password"
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-zinc-800 rounded-xl leading-5 bg-zinc-900/50 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 sm:text-sm transition-all shadow-inner hover:border-zinc-700"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-zinc-700 bg-zinc-800 rounded cursor-pointer" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-400 cursor-pointer hover:text-white transition-colors">Remember me</label>
                </div>
                <div className="text-sm">
                    <a href="#" className="font-medium text-yellow-500 hover:text-yellow-400 transition-colors">Forgot password?</a>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.2)] text-sm font-black text-black bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all transform hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                    </span>
                ) : 'SIGN IN (v2.0)'}
            </button>

            <div className="mt-6 text-center">
                <p className="text-sm text-zinc-500">
                    Don't have an account?{' '}
                    {onRegisterClick ? (
                        <button type="button" onClick={onRegisterClick} className="font-bold text-yellow-500 hover:text-yellow-400 hover:underline transition-all">
                            Sign up for free
                        </button>
                    ) : (
                        <Link href="/register" className="font-bold text-yellow-500 hover:text-yellow-400 hover:underline transition-all">
                            Sign up for free
                        </Link>
                    )}
                </p>
            </div>
        </form>
    );
}
