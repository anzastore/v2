'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/layout/AdminSidebar';
import AdminTopBar from '@/components/admin/layout/AdminTopBar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    // We can lift the collapse state here to share it if needed, 
    // but for now the Sidebar handles its own state. 
    // Ideally, Sidebar should expose its state or accept props.
    // For simplicity efficiently, we assume Sidebar manages its width via CSS classes 
    // and we might need a context or simple global state if we want TopBar to know.
    // However, clean and fast: 

    // Actually, AdminTopBar needs to know if Sidebar is collapsed to adjust its 'left' position.
    // So let's share state here. Wait, AdminSidebar currently has internal state.
    // Refactoring AdminSidebar to accept props would be cleaner, but it's already written.
    // Let's rely on CSS media queries or simple layout tricks.

    // Better approach: Grid layout or Flex layout where Sidebar is static and Content takes remaining space.
    // But requirement was "Fixed Sidebar".

    // Let's modify: Content Area padding.

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-200 font-sans selection:bg-yellow-500/30 selection:text-white">
            <AdminSidebar />
            <AdminTopBar />

            <main className="pt-20 lg:pl-64 min-h-screen transition-all duration-300 p-6">
                <div className="max-w-7xl mx-auto animate-fade-in-up">
                    {children}
                </div>
            </main>
        </div>
    );
}

// NOTE: Since AdminSidebar has internal state 'isCollapsed', the main content padding 'lg:pl-64'
// won't dynamically update unless we lift state.
// CHECKPOINT: Updating AdminSidebar to be controlled or communicate state?
// DECISION: For Phase 1, keep it 64 (expanded) by default.
// If specific user interaction creates issue, we will refactor to Context.
