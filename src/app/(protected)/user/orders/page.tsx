'use client';

import { UserApi, UserOrder } from '@/lib/api-user';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/providers/AuthProvider';

export default function UserOrdersPage() {
    const { user } = useAuthContext(); // Just to double check auth context if needed, but page is protected
    const [orders, setOrders] = useState<UserOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await UserApi.getOrders(page);
            setOrders(res.data);
            setLastPage(res.last_page);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [page]);

    return (
        <div className="p-4 lg:p-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-black text-white tracking-tight">Your Orders</h1>
                <Link href="/" className="text-sm font-bold text-yellow-500 hover:text-yellow-400 uppercase tracking-widest border-b border-yellow-500/20 pb-1 hover:border-yellow-500 transition-all">
                    New Top Up
                </Link>
            </div>

            <div className="space-y-4">
                {orders.length === 0 && !loading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No active missions</h3>
                        <p className="text-zinc-500 mb-6">You haven't placed any orders yet.</p>
                        <Link href="/" className="bg-white text-black font-bold px-6 py-2.5 rounded-lg hover:bg-yellow-400 transition-colors">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {orders.map((order) => (
                            <Link
                                key={order.id}
                                href={`/user/orders/${order.invoice_number}`}
                                className="group block bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-yellow-500/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.05)] transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <svg className="w-24 h-24 text-white transform rotate-12 translate-x-8 -translate-y-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                </div>

                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Invoice</span>
                                            <span className="text-yellow-500/80 font-mono text-xs bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/20">
                                                {order.invoice_number}
                                            </span>
                                        </div>
                                        <div className="text-white font-bold text-lg">
                                            {(order.total_amount / 100).toLocaleString()} <span className="text-sm text-zinc-500">{order.currency_code}</span>
                                        </div>
                                    </div>
                                    <StatusBadge status={order.status} />
                                </div>

                                <div className="flex justify-between items-end relative z-10 border-t border-zinc-800 pt-4 mt-2">
                                    <div className="text-xs text-zinc-500">
                                        {new Date(order.created_at).toLocaleDateString()} &bull; {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <span className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors flex items-center gap-1">
                                        View Details
                                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {lastPage > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage(p => p - 1)}
                        className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-lg text-white hover:border-white transition-colors disabled:opacity-30 disabled:border-zinc-800"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <span className="text-sm font-medium text-zinc-400">Page {page} of {lastPage}</span>
                    <button
                        disabled={page >= lastPage}
                        onClick={() => setPage(p => p + 1)}
                        className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-lg text-white hover:border-white transition-colors disabled:opacity-30 disabled:border-zinc-800"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            )}
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: any = {
        pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.2)]',
        completed: 'bg-green-500/10 text-green-500 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]',
        failed: 'bg-red-500/10 text-red-500 border-red-500/20',
        expired: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20',
    };

    return (
        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${styles[status] || 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
            {status}
        </span>
    );
}
