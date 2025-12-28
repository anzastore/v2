'use client';

import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#0F0F0F] text-white">

            {/* LEFT: Form Section */}
            <div className="flex flex-col justify-center items-center p-8 md:p-12 lg:p-16 relative">
                {/* Close Button */}
                <Link href="/" className="absolute top-8 left-8 text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <span className="text-sm font-medium">Back to Store</span>
                </Link>

                <div className="w-full max-w-md space-y-8 mt-12 md:mt-0">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-black text-white mb-2">Create Account</h1>
                        <p className="text-zinc-400">Join AnzaGame today and start your journey.</p>
                    </div>

                    <RegisterForm />

                    <div className="mt-6 text-center">
                        <p className="text-sm text-zinc-500">
                            Already have an account?{' '}
                            <Link href="/login" className="font-bold text-yellow-500 hover:text-yellow-400">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT: Visual Section */}
            <div className="hidden md:block relative overflow-hidden bg-black">
                <div className="absolute inset-0 bg-[url('/images/register-bg.jpg')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-[#0F0F0F] via-transparent to-transparent"></div>

                {/* Decorative Circles */}
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-12">
                    <div className="mb-8">
                        <Link href="/" className="inline-block group">
                            <div className="flex flex-col items-center justify-center animate-float">
                                <div className="relative w-48 h-48 mb-6 transition-transform duration-500 group-hover:scale-110">
                                    <div className="absolute inset-0 bg-yellow-500/30 rounded-full blur-3xl animate-pulse" />
                                    <Image
                                        src="/images/logo-new.jpg"
                                        alt="AnzaGame"
                                        width={192}
                                        height={192}
                                        className="relative z-10 rounded-full border-4 border-yellow-500/50 shadow-[0_0_50px_rgba(234,179,8,0.3)] object-cover"
                                    />
                                </div>
                                <h1 className="text-6xl font-black tracking-tighter text-white italic drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                                    AnzaGame
                                </h1>
                            </div>
                        </Link>
                    </div>
                    <h3 className="text-4xl font-black text-white mb-2">JOIN THE ELITE</h3>
                    <p className="text-lg text-zinc-400 max-w-md">Get access to member-only prices, instant delivery, and exclusive rewards.</p>
                </div>
            </div>
        </div>
    );
}
