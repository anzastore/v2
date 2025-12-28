'use client';

import Navbar from '@/components/layout/Navbar';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-black font-sans text-zinc-300">
            {/* Global Premium Navbar */}
            <Navbar />

            {/* Main Content - Centered & Premium */}
            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
