'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 1. Data Definitions
const CATEGORIES = [
    { id: 'topup', name: 'Top Up Games' },
    { id: 'joki-mlbb', name: 'Joki MLBB' },
    { id: 'joki-hok', name: 'Joki HOK' },
    { id: 'via-link', name: 'Top Up via LINK' },
    { id: 'pulsa', name: 'Pulsa & Data' },
    { id: 'voucher', name: 'Voucher' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'tagihan', name: 'Tagihan' },
];

const ALL_ITEMS = [
    // --- GAMES ---
    { id: 1, name: 'Mobile Legends', slug: 'mobile-legends', image: '/images/popular/pop-mlbb.jpg', tag: 'INDONESIA', category: 'topup' },
    { id: 2, name: 'Free Fire', slug: 'free-fire', image: '/images/popular/pop-ff.jpg', tag: 'POPULAR', category: 'topup' },
    { id: 3, name: 'PUBG Mobile', slug: 'pubg-mobile', image: '/images/popular/pop-pubgm.jpg', category: 'topup' },
    { id: 4, name: 'Genshin Impact', slug: 'genshin-impact', image: '/images/popular/pop-genshin.jpg', category: 'topup' },
    { id: 5, name: 'Valorant', slug: 'valorant', image: '/images/popular/pop-valorant.jpg', category: 'topup' },
    { id: 6, name: 'Roblox', slug: 'roblox', image: '/images/popular/pop-roblox.jpg', category: 'topup' },
    { id: 7, name: 'Honor of Kings', slug: 'honor-of-kings', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', tag: 'NEW', category: 'topup' },
    { id: 8, name: 'Call of Duty', slug: 'cod-mobile', image: 'https://images.unsplash.com/photo-1593305841991-05c29736560e?q=80&w=2070&auto=format&fit=crop', category: 'topup' },
    { id: 9, name: 'League of Legends', slug: 'lol', image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=2070&auto=format&fit=crop', category: 'topup' },
    { id: 10, name: 'Steam Wallet', slug: 'steam', image: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?q=80&w=1974&auto=format&fit=crop', category: 'topup' },
    { id: 11, name: 'Point Blank', slug: 'point-blank', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop', category: 'topup' },
    { id: 12, name: 'Brawl Stars', slug: 'brawl-stars', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop', category: 'topup' },
    { id: 13, name: 'Metal Slug', slug: 'metal-slug', image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=2070&auto=format&fit=crop', category: 'topup' },
    { id: 14, name: 'Eggy Party', slug: 'eggy-party', image: 'https://images.unsplash.com/photo-1500995617113-cf789362a3e1?q=80&w=2070&auto=format&fit=crop', category: 'topup' },
    { id: 15, name: 'Arena of Valor', slug: 'arena-of-valor', image: 'https://images.unsplash.com/photo-1533972724419-75b48bc662b8?q=80&w=2070&auto=format&fit=crop', category: 'topup' },
    { id: 16, name: 'Wild Rift', slug: 'wild-rift', image: 'https://images.unsplash.com/photo-1548686013-c283870a4bc4?q=80&w=2070&auto=format&fit=crop', category: 'topup' },
    { id: 17, name: 'Alchemy Stars', slug: 'alchemy-stars', image: 'https://images.unsplash.com/photo-1605218427306-6354db696fc9?q=80&w=2070&auto=format&fit=crop', category: 'topup' },
    { id: 18, name: 'Ace Racer', slug: 'ace-racer', image: 'https://images.unsplash.com/photo-1570211110793-ecf972b9a1da?q=80&w=2071&auto=format&fit=crop', category: 'topup' },
    { id: 19, name: 'AU2 Mobile', slug: 'au2-mobile', image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop', category: 'topup' },
    { id: 20, name: 'Eyougame', slug: 'eyougame', image: 'https://images.unsplash.com/photo-1532585293213-9b48952402ba?q=80&w=1974&auto=format&fit=crop', category: 'topup' },

    // --- PULSA & DATA ---
    { id: 101, name: 'Telkomsel', slug: 'telkomsel', image: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?q=80&w=2070&auto=format&fit=crop', category: 'pulsa' },
    { id: 102, name: 'Indosat', slug: 'indosat', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d02?q=80&w=2070&auto=format&fit=crop', category: 'pulsa' },
    { id: 103, name: 'XL Axiata', slug: 'xl', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d02?q=80&w=2070&auto=format&fit=crop', category: 'pulsa' },
    { id: 104, name: 'Tri (3)', slug: 'tri', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d02?q=80&w=2070&auto=format&fit=crop', category: 'pulsa' },
    { id: 105, name: 'Smartfren', slug: 'smartfren', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d02?q=80&w=2070&auto=format&fit=crop', category: 'pulsa' },

    // --- JOKI ---
    { id: 201, name: 'Joki Rank Classic', slug: 'joki-classic-mlbb', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', category: 'joki-mlbb' },
    { id: 202, name: 'Joki Gendong', slug: 'joki-gendong-mlbb', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', category: 'joki-mlbb' },
];

export default function GameCatalog() {
    const [activeTab, setActiveTab] = useState('topup');
    const [visibleCount, setVisibleCount] = useState(12);

    const filteredItems = ALL_ITEMS.filter(item => {
        if (activeTab === 'topup') return item.category === 'topup';
        if (activeTab === 'pulsa') return item.category === 'pulsa';
        if (activeTab === 'joki-mlbb') return item.category === 'joki-mlbb';
        // For demonstration, map other tabs to 'topup' or show empty if you prefer
        // But let's show topup games for others as fallback or empty
        return item.category === activeTab;
    });

    const isExpanded = visibleCount >= filteredItems.length;
    const visibleItems = filteredItems.slice(0, visibleCount);

    const handleTabChange = (id: string) => {
        setActiveTab(id);
        setVisibleCount(12); // Reset count on tab switch
    };

    return (
        <div className="w-full">
            {/* Filter Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => handleTabChange(cat.id)}
                        className={`
                            px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border
                            ${activeTab === cat.id
                                ? 'bg-yellow-500 text-black border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)] scale-105'
                                : 'bg-white/5 text-zinc-400 border-white/5 hover:border-yellow-500/50 hover:text-white hover:bg-white/10'
                            }
                        `}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Content Grid */}
            {visibleItems.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8 animate-fade-up">
                    {visibleItems.map((item) => (
                        <Link
                            key={item.id}
                            href={`/games/${item.slug}`}
                            className="group relative block"
                        >
                            {/* Glass Card Container */}
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-dark transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_rgba(234,179,8,0.15)] group-hover:border-yellow-500/30">

                                {/* Image Container */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                                    />
                                    {/* Vignette Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 transition-opacity duration-300"></div>
                                </div>

                                {/* Tag Badge */}
                                {item.tag && (
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-yellow-500 text-black text-[10px] font-black px-2 py-1 rounded-md shadow-lg shadow-yellow-500/20 tracking-wider">
                                            {item.tag}
                                        </span>
                                    </div>
                                )}

                                {/* Card Content (Bottom) */}
                                <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end h-full z-10">
                                    <div className="transform transition-transform duration-300 group-hover:translate-y-[-5px]">
                                        <h3 className="text-white font-display font-black text-lg md:text-xl uppercase italic tracking-tighter leading-none drop-shadow-md group-hover:text-gold-gradient transition-all">
                                            {item.name}
                                        </h3>
                                        <div className="h-0.5 w-10 bg-yellow-500 mt-2 transition-all duration-300 group-hover:w-full opacity-50 group-hover:opacity-100"></div>
                                    </div>
                                </div>

                                {/* Hover Glow Overlay */}
                                <div className="absolute inset-0 border-2 border-yellow-500/0 rounded-2xl transition-all duration-300 group-hover:border-yellow-500/30 pointer-events-none"></div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center glass-dark rounded-3xl border-dashed border-2 border-white/5">
                    <div className="text-6xl mb-4 grayscale opacity-20 animate-pulse">📂</div>
                    <p className="text-zinc-500 text-lg font-display">Coming Soon</p>
                </div>
            )}

            {/* Load More Button */}
            {(!isExpanded && visibleItems.length > 0) && (
                <div className="flex justify-center mt-12 mb-8">
                    <button
                        onClick={() => setVisibleCount(filteredItems.length)}
                        className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-xl"
                    >
                        <div className="absolute inset-0 w-full h-full bg-white/5 border border-white/10 group-hover:bg-yellow-500/10 group-hover:border-yellow-500/50 transition-all duration-300 rounded-xl"></div>
                        <span className="relative text-zinc-300 font-bold group-hover:text-yellow-500 flex items-center gap-2 transition-colors">
                            View All Games
                            <svg className="w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
}
