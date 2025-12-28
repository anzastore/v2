'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useNotifications } from '@/lib/hooks/useNotifications';
import { NotificationApi } from '@/lib/api-notification';
import { useRouter } from 'next/navigation';

export default function NotificationBell() {
    const { notifications, mutate } = useNotifications();
    useNotifications(); // Call hook to trigger SWR
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const unreadCount = notifications.filter(n => !n.read_at).length;

    const handleMarkAllRead = async () => {
        await NotificationApi.markAllRead();
        mutate(); // Refresh SWR
    };

    const handleNotificationClick = async (id: string, invoice: string) => {
        await NotificationApi.markAsRead(id);
        mutate();
        setIsOpen(false);
        router.push(`/user/orders/${invoice}`);
    };

    return (
        <div className="relative">
            {/* Bell Icon Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-400 hover:text-white focus:outline-none"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>

                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700 bg-zinc-950">
                        <h3 className="text-sm font-semibold text-white">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                className="text-xs text-yellow-400 hover:text-yellow-300"
                            >
                                Mark all read
                            </button>
                        )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-center text-zinc-500 text-sm">
                                No notifications yet.
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    onClick={() => handleNotificationClick(notification.id, notification.data.invoice_number)}
                                    className={`block px-4 py-3 border-b border-zinc-700 cursor-pointer hover:bg-zinc-800 transition-colors ${!notification.read_at ? 'bg-zinc-800/50 border-l-4 border-l-yellow-400' : ''
                                        }`}
                                >
                                    <p className="text-sm font-medium text-white">
                                        {notification.data.invoice_number}
                                    </p>
                                    <p className="text-sm text-zinc-300 mt-0.5 truncate">
                                        {notification.data.message || 'Status updated'}
                                    </p>
                                    <p className="text-xs text-zinc-500 mt-1">
                                        {new Date(notification.created_at).toLocaleString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Background Overlay to Close */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}
