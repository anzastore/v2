'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ShoppingCart,
    Gamepad2,
    Package,
    Users,
    Megaphone,
    CreditCard,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    HeadphonesIcon
} from 'lucide-react';

export default function AdminSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
        { name: 'Games', href: '/admin/games', icon: Gamepad2 },
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Promotions', href: '/admin/promotions', icon: Megaphone },
        { name: 'Transactions', href: '/admin/transactions', icon: CreditCard },
        { name: 'Support', href: '/admin/support', icon: HeadphonesIcon },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <>
            <aside
                className={`fixed top-0 left-0 h-full bg-[#080808] border-r border-white/5 transition-all duration-300 z-40 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'
                    }`}
            >
                {/* LOGO AREA */}
                <div className={`h-16 flex items-center border-b border-white/5 ${isCollapsed ? 'justify-center' : 'px-6 justify-between'}`}>
                    <Link href="/admin/dashboard" className="flex items-center gap-3 overflow-hidden">
                        <div className="relative w-8 h-8 flex-shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg blur-sm opacity-50"></div>
                            <Image
                                src="/images/logo-new.jpg"
                                alt="Admin"
                                fill
                                className="object-cover rounded-lg border border-yellow-500/20 relative z-10"
                            />
                        </div>
                        {!isCollapsed && (
                            <span className="font-display font-black text-xl italic text-white tracking-tight whitespace-nowrap">
                                ANZA<span className="text-yellow-500">ADMIN</span>
                            </span>
                        )}
                    </Link>
                </div>

                {/* MENU ITEMS */}
                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                    ? 'bg-yellow-500/10 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                    }`}
                                title={isCollapsed ? item.name : ''}
                            >
                                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-500 rounded-r-full shadow-[0_0_10px_#eab308]"></div>}

                                <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]' : 'group-hover:scale-110'}`} />

                                {!isCollapsed && (
                                    <span className="font-bold text-sm tracking-wide transition-opacity duration-300">
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* FOOTER / COLLAPSE - Fixed at bottom */}
                <div className="p-3 border-t border-white/5">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-full flex items-center justify-center p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
                    >
                        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : (
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                                <ChevronLeft className="w-4 h-4" />
                                <span>Collapse</span>
                            </div>
                        )}
                    </button>
                </div>
            </aside>
        </>
    );
}
