'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Bell, LogOut, User, Shield, Menu } from 'lucide-react';
import { useAuthContext } from '@/providers/AuthProvider';
import Link from 'next/link';

interface AdminTopBarProps {
    isSidebarCollapsed?: boolean;
    onMobileMenuClick?: () => void;
}

export default function AdminTopBar({ isSidebarCollapsed = false, onMobileMenuClick }: AdminTopBarProps) {
    const { user, logout } = useAuthContext();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Outside click handler
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
        // Redirect logic handled by AuthProvider or Component consuming it
    };

    return (
        <header className={`fixed top-0 right-0 z-30 h-16 bg-[#080808]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300 flex items-center justify-between px-6 ${isSidebarCollapsed ? 'left-20' : 'left-0 lg:left-64'
            }`}>
            {/* SEARCH AREA */}
            <div className="flex items-center gap-4 flex-1">
                {/* Mobile Menu Toggle */}
                <button className="lg:hidden p-2 text-zinc-400" onClick={onMobileMenuClick}>
                    <Menu className="w-6 h-6" />
                </button>

                <div className="relative group w-full max-w-md hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search orders, users, or games..."
                        className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all font-medium"
                    />
                </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-4">

                {/* Notifications */}
                <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#090909]"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full bg-white/5 border border-white/5 hover:border-yellow-500/30 transition-all group"
                    >
                        <div className="hidden md:block text-right mr-1">
                            <p className="text-[10px] text-zinc-500 leading-none uppercase tracking-wider font-bold">Administrator</p>
                            <p className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors leading-none mt-0.5">{user?.name || 'Admin'}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center text-white font-bold shadow-lg shadow-yellow-500/10">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                    </button>

                    {isProfileOpen && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-[#0f0f0f] border border-white/10 rounded-xl shadow-2xl py-1 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                            <div className="px-4 py-3 border-b border-white/5">
                                <p className="text-sm font-bold text-white">{user?.name || 'Admin User'}</p>
                                <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                            </div>

                            <div className="p-1">
                                <Link href="/admin/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                    <User className="w-4 h-4" />
                                    Profile
                                </Link>
                                <Link href="/admin/security" className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                    <Shield className="w-4 h-4" />
                                    Security
                                </Link>
                            </div>

                            <div className="border-t border-white/5 p-1 mt-1">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-bold"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
