'use client';

import { useAuthContext } from '@/providers/AuthProvider';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

interface RegisterFormProps {
    onSuccess?: () => void;
    onLoginClick?: () => void;
    isModal?: boolean;
}

export default function RegisterForm({ onSuccess, onLoginClick, isModal = false }: RegisterFormProps) {
    const { register } = useAuthContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await register({ name, email, password, password_confirmation: passwordConfirmation });
            setError('');
            toast.success("Account created!");

            // Critical for Modal: Close it
            if (onSuccess) {
                onSuccess();
            } else {
                router.push('/');
            }
        } catch (err: any) {
            // Extract specific validation message if available
            const message = err.response?.data?.message || err.message || 'Registration failed';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm flex items-center gap-3 animate-fade-in-down">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Full Name</label>
                <input
                    type="text"
                    required
                    className="block w-full px-4 py-3 border border-zinc-800 rounded-xl leading-5 bg-zinc-900/50 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 sm:text-sm transition-all shadow-inner hover:border-zinc-700"
                    placeholder="Jhon Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email Address</label>
                <input
                    type="email"
                    required
                    className="block w-full px-4 py-3 border border-zinc-800 rounded-xl leading-5 bg-zinc-900/50 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 sm:text-sm transition-all shadow-inner hover:border-zinc-700"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Password</label>
                    <input
                        type="password"
                        required
                        className="block w-full px-4 py-3 border border-zinc-800 rounded-xl leading-5 bg-zinc-900/50 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 sm:text-sm transition-all shadow-inner hover:border-zinc-700"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Confirm</label>
                    <input
                        type="password"
                        required
                        className="block w-full px-4 py-3 border border-zinc-800 rounded-xl leading-5 bg-zinc-900/50 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 sm:text-sm transition-all shadow-inner hover:border-zinc-700"
                        placeholder="••••••••"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                </div>
            </div>

            <div className="pt-2">
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
                            Creating Account...
                        </span>
                    ) : 'CREATE ACCOUNT'}
                </button>
            </div>

            <div className="mt-6 text-center">
                <p className="text-sm text-zinc-500">
                    Already have an account?{' '}
                    {onLoginClick ? (
                        <button type="button" onClick={onLoginClick} className="font-bold text-yellow-500 hover:text-yellow-400 hover:underline transition-all">
                            Sign in
                        </button>
                    ) : (
                        <Link href="/login" className="font-bold text-yellow-500 hover:text-yellow-400 hover:underline transition-all">
                            Sign in
                        </Link>
                    )}
                </p>
            </div>
        </form>
    );
}
