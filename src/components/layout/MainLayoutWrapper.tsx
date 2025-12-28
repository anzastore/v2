'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AiAssistant from '@/components/support/AiAssistant';

export default function MainLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAuthPage = ['/login', '/register'].some(path => pathname?.startsWith(path));
    const isAdminPage = pathname?.startsWith('/admin');

    // For Auth pages, return clean layout without Navbar/Footer
    if (isAuthPage) {
        return <>{children}</>;
    }

    // For Admin pages, return clean layout as AdminLayout handles the shell
    if (isAdminPage) {
        return <>{children}</>;
    }

    // Proceeding with Global Navbar as requested for now.

    return (
        <div className="flex flex-col min-h-screen bg-[#0F0F0F]">
            {/* Global Navbar */}
            <Navbar />

            {/* Main Content Area */}
            {/* Navbar is relative, so no top padding needed */}
            <main className="flex-1">
                {children}
            </main>

            {/* Global Footer */}
            <Footer />

            {/* AI Assistant Widget (User Side Only) */}
            {!isAdminPage && <AiAssistant />}
        </div>
    );
}
