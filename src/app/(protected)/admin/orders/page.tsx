'use client';

import { AdminApi, Order } from '@/lib/api-admin';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState('');

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await AdminApi.getOrders({ page, status: filterStatus });
            setOrders(response.data);
            setLastPage(response.last_page);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [page, filterStatus]);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Order Management</h1>
                <select
                    className="bg-zinc-800 border border-zinc-700 text-white p-2 rounded"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                </select>
            </div>

            <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-zinc-800 text-zinc-400">
                        <tr>
                            <th className="p-4">Invoice</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Method</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-zinc-800/50">
                                <td className="p-4 font-mono text-sm text-brand-yellow">{order.invoice_number}</td>
                                <td className="p-4">
                                    <div className="text-white">{order.customer_email}</div>
                                    <div className="text-xs text-zinc-500">{order.customer_phone || '-'}</div>
                                </td>
                                <td className="p-4 text-white">
                                    {(order.total_amount / 100).toLocaleString()} {order.currency_code}
                                </td>
                                <td className="p-4 text-zinc-300 uppercase text-xs font-bold">{order.payment_method}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                                        ${order.status === 'completed' ? 'bg-green-500/20 text-green-400' : ''}
                                        ${order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                                        ${order.status === 'failed' ? 'bg-red-500/20 text-red-400' : ''}
                                        ${order.status === 'refunded' ? 'bg-purple-500/20 text-purple-400' : ''}
                                    `}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4 text-zinc-500 text-sm">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    <Link
                                        href={`/admin/orders/${order.id}`} // Passing UUID
                                        className="text-brand-yellow hover:underline text-sm"
                                    >
                                        Manage
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && !loading && (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-zinc-500">No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={page <= 1}
                    onClick={() => setPage(p => p - 1)}
                    className="px-4 py-2 bg-zinc-800 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <div className="text-zinc-500">Page {page} of {lastPage}</div>
                <button
                    disabled={page >= lastPage}
                    onClick={() => setPage(p => p + 1)}
                    className="px-4 py-2 bg-zinc-800 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
