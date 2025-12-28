'use client';

import { CreditCard } from 'lucide-react';

export default function AdminTransactionsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-yellow-500" />
                Transactions
            </h1>
            <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-2xl bg-[#0a0a0a]">
                <p className="text-zinc-500">Transaction history and order filtering module under construction.</p>
            </div>
        </div>
    );
}
