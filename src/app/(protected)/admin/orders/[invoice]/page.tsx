'use client';

import { AdminApi, Order } from '@/lib/api-admin';
import { useParams, useRouter } from 'next/navigation'; // Correct import for App Router
import { useEffect, useState } from 'react';

export default function AdminOrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.invoice as string; // Route param is named [invoice] but backend expects ID, link passed ID.

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    // Modal State
    const [modal, setModal] = useState<{ type: 'reject' | 'refund' | 'approve' | null }>({ type: null });
    const [reason, setReason] = useState('');

    const fetchOrder = async () => {
        try {
            const data = await AdminApi.getOrder(id);
            setOrder(data);
        } catch (err) {
            setError('Failed to load order.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const handleAction = async () => {
        if (!modal.type || !order) return;
        setActionLoading(true);
        try {
            if (modal.type === 'approve') {
                await AdminApi.approveOrder(order.id);
            } else if (modal.type === 'reject') {
                await AdminApi.rejectOrder(order.id, reason);
            } else if (modal.type === 'refund') {
                await AdminApi.refundOrder(order.id, reason);
            }
            fetchOrder(); // Refresh State
            setModal({ type: null });
            setReason('');
        } catch (err) {
            alert('Action failed. Check console.');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-white">Loading order...</div>;
    if (error || !order) return <div className="p-8 text-red-500">{error || 'Order not found'}</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <button onClick={() => router.back()} className="text-zinc-500 hover:text-white mb-4">
                &larr; Back to Orders
            </button>

            {/* Header */}
            <div className="flex justify-between items-start mb-8 border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{order.invoice_number}</h1>
                    <div className="flex gap-2">
                        <span className="text-zinc-400 text-sm">Created: {new Date(order.created_at).toLocaleString()}</span>
                        <span className="text-zinc-600">|</span>
                        <span className="text-zinc-400 text-sm">ID: {order.id}</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-mono text-brand-yellow font-bold">
                        {(order.total_amount / 100).toLocaleString()} {order.currency_code}
                    </div>
                    <div className={`mt-2 inline-block px-3 py-1 rounded text-sm font-bold uppercase
                        ${order.status === 'completed' ? 'bg-green-500 text-green-900' : ''}
                        ${order.status === 'pending' ? 'bg-yellow-500 text-yellow-900' : ''}
                        ${order.status === 'failed' ? 'bg-red-500 text-red-900' : ''}
                    `}>
                        {order.status}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                {/* DETAILS COLUMN */}
                <div className="col-span-2 space-y-6">
                    {/* Items */}
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
                        <h2 className="text-lg font-bold text-white mb-4">Order Items</h2>
                        <div className="space-y-4">
                            {order.items?.map(item => (
                                <div key={item.id} className="flex justify-between items-center border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                                    <div>
                                        <div className="text-white font-medium">{item.product_name_snap}</div>
                                        <div className="text-zinc-500 text-sm font-mono">SKU: {item.product_code}</div>
                                        {/* Nested Data Display */}
                                        <div className="mt-2 text-xs text-zinc-400 bg-zinc-950 p-2 rounded">
                                            {JSON.stringify(item.data, null, 2)}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white">x{item.quantity}</div>
                                        <div className="text-brand-yellow">{(item.price_snap / 100).toLocaleString()}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Audit Log */}
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
                        <h2 className="text-lg font-bold text-white mb-4">Audit Log</h2>
                        <div className="space-y-4">
                            {order.audits?.map(audit => (
                                <div key={audit.id} className="text-sm">
                                    <div className="flex justify-between">
                                        <span className="font-bold text-white uppercase">{audit.action}</span>
                                        <span className="text-zinc-500">{new Date(audit.created_at).toLocaleString()}</span>
                                    </div>
                                    <div className="text-zinc-400">by {audit.user.name} ({audit.user.email})</div>
                                    {audit.reason && <div className="text-zinc-300 italic">" {audit.reason} "</div>}
                                </div>
                            ))}
                            {(!order.audits || order.audits.length === 0) && (
                                <div className="text-zinc-500 italic">No audit records found.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* SIDEBAR */}
                <div className="space-y-6">
                    {/* Customer */}
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
                        <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">Customer</h3>
                        <div className="text-white break-all">{order.customer_email}</div>
                        <div className="text-zinc-400">{order.customer_phone || 'No Phone'}</div>
                        <div className="mt-4 pt-4 border-t border-zinc-800">
                            <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">Payment Info</h3>
                            <div className="text-white capitalize">{order.payment_method}</div>
                            <div className="text-zinc-400 text-sm">Status: {order.payment_status}</div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-3">
                        <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">Admin Actions</h3>

                        {order.status === 'pending' && order.payment_method === 'manual' && (
                            <>
                                <button
                                    onClick={() => setModal({ type: 'approve' })}
                                    className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded"
                                >
                                    Approve Payment
                                </button>
                                <button
                                    onClick={() => setModal({ type: 'reject' })}
                                    className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
                                >
                                    Reject Order
                                </button>
                            </>
                        )}

                        {order.payment_status === 'paid' && order.status !== 'refunded' && (
                            <button
                                onClick={() => setModal({ type: 'refund' })}
                                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded"
                            >
                                Refund Order
                            </button>
                        )}

                        {order.status !== 'pending' && order.payment_status !== 'paid' && (
                            <div className="text-center text-zinc-500 text-sm">No actions available</div>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {modal.type && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-bold text-white mb-4 capitalizes">
                            Confirm {modal.type}
                        </h3>

                        {(modal.type === 'reject' || modal.type === 'refund') && (
                            <div className="mb-4">
                                <label className="block text-zinc-400 text-sm mb-2">Reason (Required)</label>
                                <textarea
                                    className="w-full bg-zinc-950 border border-zinc-700 text-white p-2 rounded"
                                    rows={3}
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Enter reason for this action..."
                                />
                            </div>
                        )}

                        {modal.type === 'approve' && (
                            <p className="text-zinc-300 mb-6">
                                Are you sure you want to mark this transaction as PAID? This cannot be undone easily.
                            </p>
                        )}

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModal({ type: null })}
                                className="px-4 py-2 text-zinc-400 hover:text-white"
                                disabled={actionLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAction}
                                disabled={actionLoading || ((modal.type === 'reject' || modal.type === 'refund') && reason.length < 5)}
                                className={`px-4 py-2 rounded text-white font-bold
                                    ${modal.type === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}
                                    ${modal.type === 'reject' ? 'bg-red-600 hover:bg-red-700' : ''}
                                    ${modal.type === 'refund' ? 'bg-purple-600 hover:bg-purple-700' : ''}
                                    disabled:opacity-50
                                `}
                            >
                                {actionLoading ? 'Processing...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
