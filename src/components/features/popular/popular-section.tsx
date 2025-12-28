'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const POPULAR_ITEMS = [
    {
        id: 1,
        name: "Mobile Legends",
        provider: "Moonton",
        image: "/images/popular/pop-mlbb.jpg",
        href: "/games/mobile-legends",
        color: "from-blue-900/40 to-indigo-900/40"
    },
    {
        id: 2,
        name: "Free Fire",
        provider: "Garena",
        image: "/images/popular/pop-ff.jpg",
        href: "/games/free-fire",
        color: "from-orange-900/40 to-red-900/40"
    },
    {
        id: 3,
        name: "PUBG Mobile",
        provider: "Tencent",
        image: "/images/popular/pop-pubgm.jpg",
        href: "/games/pubg-mobile",
        color: "from-emerald-900/40 to-teal-900/40"
    },
    {
        id: 4,
        name: "Roblox",
        provider: "Roblox Corp",
        image: "/images/popular/pop-roblox.jpg",
        href: "/games/roblox",
        color: "from-zinc-800 to-zinc-900"
    },
    {
        id: 5,
        name: "Valorant",
        provider: "Riot Games",
        image: "/images/popular/pop-valorant.jpg",
        href: "/games/valorant",
        color: "from-rose-900/40 to-pink-900/40"
    },
    {
        id: 6,
        name: "Genshin Impact",
        provider: "HoYoverse",
        image: "/images/popular/pop-genshin.jpg",
        href: "/games/genshin-impact",
        color: "from-purple-900/40 to-violet-900/40"
    }
];

export default function PopularSection() {
    return (
        <section className="container mx-auto px-4 py-8 mb-8">
            {/* Section Header */}
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-black text-white italic tracking-tight">
                    POPULAR <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">SEKARANG!</span>
                </h2>
                <p className="text-zinc-400 text-sm md:text-base mt-2">
                    Berikut adalah beberapa produk yang paling populer saat ini.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {POPULAR_ITEMS.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className={`
                            group relative flex items-center gap-4 p-3 rounded-xl 
                            bg-gradient-to-br ${item.color} 
                            border border-white/5 hover:border-yellow-500/50 
                            transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-500/10
                            overflow-hidden
                        `}
                    >
                        {/* Ice Decoration (Top Edge) */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-30 group-hover:opacity-60 transition-opacity"></div>
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/10 blur-xl rounded-full group-hover:bg-white/20 transition-all"></div>

                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden shadow-inner border border-white/10 group-hover:border-yellow-500/50 transition-colors">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        {/* Text Info */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-bold text-lg leading-tight truncate group-hover:text-yellow-400 transition-colors">
                                {item.name}
                            </h3>
                            <p className="text-zinc-400 text-xs md:text-sm uppercase tracking-wider font-semibold">
                                {item.provider}
                            </p>
                        </div>

                        {/* Hover Indicator */}
                        <div className="pr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <ChevronRight className="w-5 h-5 text-yellow-500" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
