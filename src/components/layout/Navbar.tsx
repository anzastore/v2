'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuthContext } from '@/providers/AuthProvider';
import { useSettings } from '@/providers/SettingsProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
    const { user, logout } = useAuthContext();
    const { language, currency, toggleLanguage, toggleCurrency } = useSettings();
    const pathname = usePathname();
    const router = useRouter();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const userDropdownRef = useRef<HTMLDivElement>(null);

    // Scroll Detection
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Outside Click for Dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setIsUserDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Route Change -> Close Mobile Menu
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        await logout();
        setIsUserDropdownOpen(false);
        router.push('/login');
    };

    const navLinks = [
        { name: language === 'EN' ? 'Top Up' : 'Top Up', href: '/' },
        { name: language === 'EN' ? 'Check Transaction' : 'Cek Transaksi', href: '/check-transaction' },
        { name: language === 'EN' ? 'Promotions' : 'Promo', href: '/promo' },
    ];

    // Hide Navbar on specific routes (login/register pages)
    if (pathname === '/login' || pathname === '/register') {
        return null;
    }

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/0 ${isScrolled
                    ? 'glass-dark py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between">

                        {/* LEFT: LOGO */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-zinc-700 group-hover:border-yellow-500 transition-colors shadow-lg shadow-black/50">
                                    <Image
                                        src="/images/logo-new.jpg"
                                        alt="Anza Store"
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <span className="font-display font-black text-xl md:text-2xl tracking-tighter text-white italic group-hover:text-gold-gradient transition-all">
                                    ANZA<span className="text-yellow-500">STORE</span>
                                </span>
                            </Link>
                        </div>

                        {/* CENTER: DESKTOP NAV */}
                        <nav className="hidden lg:flex items-center gap-1 bg-black/20 backdrop-blur-sm px-2 py-1.5 rounded-full border border-white/5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${pathname === link.href
                                        ? 'text-black bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* RIGHT: ACTIONS */}
                        <div className="flex items-center gap-3 md:gap-4">

                            {/* SETTINGS TOGGLES (Desktop) */}
                            <div className="hidden md:flex items-center gap-2 bg-black/40 backdrop-blur-sm px-2 py-1.5 rounded-lg border border-white/5">
                                <button
                                    onClick={toggleLanguage}
                                    className="px-2 py-1 text-[10px] font-bold text-zinc-400 hover:text-white transition-colors"
                                >
                                    {language}
                                </button>
                                <span className="w-[1px] h-3 bg-white/10"></span>
                                <button
                                    onClick={toggleCurrency}
                                    className="px-2 py-1 text-[10px] font-bold text-zinc-400 hover:text-white transition-colors"
                                >
                                    {currency}
                                </button>
                            </div>

                            {/* AUTH AREA */}
                            {user ? (
                                <div className="relative" ref={userDropdownRef}>
                                    <button
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                        className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full bg-black/40 border border-white/10 hover:border-yellow-500/50 transition-all group"
                                    >
                                        <div className="hidden md:block text-right mr-1">
                                            <p className="text-[10px] text-zinc-500 leading-none">Commander</p>
                                            <p className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors leading-none mt-0.5">{user.name}</p>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-black font-black text-xs shadow-lg shadow-yellow-500/20">
                                            {user.name.charAt(0)}
                                        </div>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isUserDropdownOpen && (
                                        <div className="absolute top-full right-0 mt-3 w-64 bg-[#0F0F0F] rounded-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] py-2 overflow-hidden animate-modal-enter origin-top-right backdrop-blur-xl">
                                            <div className="px-5 py-4 border-b border-white/5 bg-white/5">
                                                <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Signed in as</p>
                                                <p className="text-sm font-bold text-white truncate">{user.email}</p>
                                            </div>
                                            <div className="p-2 space-y-1">
                                                <Link href="/user/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all group">
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-yellow-500/10 group-hover:text-yellow-500 transition-colors">
                                                        📦
                                                    </div>
                                                    <span className="font-medium text-sm">My Orders</span>
                                                </Link>
                                                <Link href="/notifications" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all group">
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-yellow-500/10 group-hover:text-yellow-500 transition-colors">
                                                        🔔
                                                    </div>
                                                    <span className="font-medium text-sm">Notifications</span>
                                                </Link>
                                            </div>
                                            <div className="p-2 border-t border-white/5 mt-1">
                                                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-bold text-sm">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                                                    System Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href="/login"
                                        className="hidden md:flex px-5 py-2 rounded-full text-sm font-bold text-zinc-300 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="px-6 py-2 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-black transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:scale-105 active:scale-95"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}

                            {/* MOBILE MENU TOGGLE */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 text-zinc-400 hover:text-white"
                            >
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMobileMenuOpen
                                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    }
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* MOBILE MENU OVERLAY */}
            <div className={`fixed inset-0 z-[100] lg:hidden pointer-events-none transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}>
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />

                {/* Menu Content */}
                <div className={`absolute top-0 right-0 w-[80%] max-w-sm h-full bg-[#0F0F0F] border-l border-white/10 shadow-2xl transition-transform duration-300 ease-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-6 pt-24 h-full flex flex-col">
                        <div className="space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block px-4 py-4 rounded-xl text-lg font-bold transition-all ${pathname === link.href
                                        ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                            <button onClick={toggleLanguage} className="bg-white/5 rounded-xl py-3 text-sm font-bold text-zinc-400 border border-white/5">{language === 'EN' ? '🇬🇧 English' : '🇮🇩 Indonesia'}</button>
                            <button onClick={toggleCurrency} className="bg-white/5 rounded-xl py-3 text-sm font-bold text-zinc-400 border border-white/5">{currency}</button>
                        </div>

                        {!user && (
                            <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                <Link href="/login" className="py-3.5 rounded-xl text-center font-bold border border-white/10 text-zinc-300 hover:bg-white/5 transition-all flex items-center justify-center">Login</Link>
                                <Link href="/register" className="py-3.5 rounded-xl text-center font-bold bg-yellow-500 text-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 transition-all flex items-center justify-center">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
