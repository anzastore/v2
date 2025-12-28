'use client';

import { Megaphone } from 'lucide-react';

export default function AdminPromotionsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                <Megaphone className="w-8 h-8 text-yellow-500" />
                Promotions
            </h1>
            <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-2xl bg-[#0a0a0a]">
                <p className="text-zinc-500">Banner and advertising management module under construction.</p>
            </div>
        </div>
    );
}
