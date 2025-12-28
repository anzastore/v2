'use client';

import { UserApi } from '@/lib/api-user';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UserOrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const invoice = params.invoice as string;

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await UserApi.getOrder(invoice);
                setData(res);
            } catch (err: any) {
                if (err.response?.status === 404) {
                    setError('Order not found.');
                } else {
                    setError('Failed to load order.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [invoice]);

    if (loading) return <div className="p-8 text-center text-white">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!data) return null;

    const { order, items, payment_instructions } = data;

    return (
        <div className="p-4 lg:p-8 max-w-4xl mx-auto">
            {/* Header / Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-sm text-zinc-500">
                <Link href="/user/orders" className="hover:text-white transition-colors">My Orders</Link>
                <span>/</span>
                <span className="text-white font-bold">{order.invoice_number}</span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative">
                {/* Status Bar */}
                <div className={`h-1.5 w-full ${getStatusColor(order.status)}`}></div>

                <div className="p-6 lg:p-10">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-white mb-2">Order Details</h1>
                            <div className="flex items-center gap-3">
                                <StatusBadge status={order.status} />
                                <span className="text-zinc-500 text-sm font-mono">
                                    {order.invoice_number}
                                </span>
                            </div>
                        </div>
                        {/* Download Receipt Button Placeholder */}
                        <button className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-white border border-zinc-800 hover:border-zinc-600 px-4 py-2 rounded-lg transition-all">
                            Download Receipt
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Items Column */}
                        <div className="lg:col-span-2 space-y-4">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Items</h3>
                            {items.map((item: any) => (
                                <div key={item.id} className="flex gap-4 p-4 bg-black/50 rounded-xl border border-zinc-800/50">
                                    <div className="w-16 h-16 bg-zinc-800 rounded-lg flex-shrink-0 relative overflow-hidden">
                                        {/* Placeholder Image */}
                                        <div className="absolute inset-0 flex items-center justify-center text-2xl">🎮</div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">{item.game_name}</h4>
                                        <p className="text-sm text-zinc-400">{item.product_name}</p>
                                        <div className="mt-2 text-xs text-brand-yellow font-mono bg-yellow-500/10 inline-block px-2 py-0.5 rounded border border-yellow-500/10">
                                            {item.data?.user_id} {item.data?.zone_id ? `(${item.data.zone_id})` : ''}
                                        </div>
                                    </div>
                                    <div className="ml-auto font-bold text-white">
                                        {(item.price / 100).toLocaleString()} <span className="text-xs text-zinc-500">IDR</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Payment Info Column */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Total Amount</h3>
                                <div className="text-3xl font-black text-white">
                                    {(order.total_amount / 100).toLocaleString()} <span className="text-sm text-zinc-500">IDR</span>
                                </div>
                            </div>

                            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Payment Method</h3>
                                <div className="font-bold text-white mb-1">{order.payment_method || 'QRIS / E-Wallet'}</div>
                                <div className="text-xs text-zinc-600">Processed securely</div>
                            </div>

                            {payment_instructions && order.status === 'pending' && (
                                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                                    <h3 className="text-xs font-bold text-yellow-500 uppercase mb-2">Transfer To:</h3>
                                    <div className="mb-2">
                                        <div className="text-zinc-500 text-xs">Bank</div>
                                        <div className="text-white font-bold">{payment_instructions.bank}</div>
                                    </div>
                                    <div>
                                        <div className="text-zinc-500 text-xs">Account No.</div>
                                        <div className="text-yellow-400 font-mono font-bold text-lg">{payment_instructions.account}</div>
                                    </div>
                                </div>
                            )}

                            {order.status === 'pending' && (
                                <button
                                    onClick={() => window.location.href = `/checkout/payment/${order.invoice_number}`}
                                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black font-bold py-3.5 rounded-xl shadow-lg shadow-yellow-500/20 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <span>Complete Payment</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </button>
                            )}

                            {order.status === 'failed' && (
                                <button
                                    onClick={() => router.push('/')}
                                    className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3.5 rounded-xl border border-zinc-700 transition-all">
                                    Retry Order
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-zinc-800 pt-6 mt-6">
                        <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
                            <span>Order ID: <span className="font-mono text-zinc-400">{order.id}</span></span>
                            <span>&bull;</span>
                            <span>Created: {new Date(order.created_at).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getStatusColor(status: string) {
    switch (status) {
        case 'completed': return 'bg-green-500';
        case 'pending': return 'bg-yellow-500';
        case 'failed': return 'bg-red-500';
        default: return 'bg-zinc-500';
    }
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
