'use client';

import { useState, useEffect } from 'react';
import SignInForm from './SignInForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialView?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
    const [view, setView] = useState<'login' | 'register'>(initialView);

    useEffect(() => {
        if (isOpen) {
            setView(initialView);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, initialView]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in-down"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-[#0F0F0F] rounded-2xl border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-modal-enter">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors z-20"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-600"></div>
                <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000" />

                <div className="p-8 md:p-10 relative z-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-white italic tracking-tighter mb-2">
                            {view === 'login' ? 'WELCOME BACK (v2.1)' : 'JOIN THE TEAM'}
                        </h2>
                        <p className="text-zinc-400 text-sm">
                            {view === 'login'
                                ? 'Enter your coordinates to access the system.'
                                : 'Initialize your profile for combat deployment.'}
                        </p>
                    </div>

                    {view === 'login' ? (
                        <SignInForm
                            isModal
                            onSuccess={onClose}
                            onRegisterClick={() => setView('register')}
                        />
                    ) : (
                        <RegisterForm
                            isModal
                            onSuccess={onClose}
                            onLoginClick={() => setView('login')}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
