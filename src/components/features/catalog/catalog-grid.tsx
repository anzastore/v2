'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Game {
    id: number;
    name: string;
    slug: string;
    image: string;
    tag?: string;
}

interface CatalogGridProps {
    games: Game[];
}

export default function CatalogGrid({ games }: CatalogGridProps) {
    const INITIAL_LIMIT = 12;
    const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);

    const isExpanded = visibleCount >= games.length;

    const handleShowMore = () => {
        setVisibleCount(games.length); // Show all
    };

    const visibleGames = games.slice(0, visibleCount);

    return (
        <>
            {/* Game Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8">
                {visibleGames.map((game) => (
                    <Link
                        key={game.id}
                        href={`/games/${game.slug}`}
                        className="group relative block"
                    >
                        {/* Card Container */}
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#242528] transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:ring-2 group-hover:ring-yellow-500/50">

                            {/* Snow Cap Overlay */}
                            <div className="absolute top-0 left-0 w-full h-8 z-20 pointer-events-none">
                                <svg
                                    className="w-full h-full text-white drop-shadow-md"
                                    viewBox="0 0 100 20"
                                    preserveAspectRatio="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M0 0 H100 V10 Q90 15 80 10 T60 12 T40 8 T20 12 T0 10 Z" fill="white" />
                                </svg>
                            </div>

                            {/* Banner Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={game.image}
                                    alt={game.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                                />
                                {/* Subtle Gradient Overlay at bottom */}
                                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                            </div>

                            {/* Tag Overlay (if exists) */}
                            {game.tag && (
                                <div className="absolute top-8 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-l-md shadow-lg z-20">
                                    {game.tag}
                                </div>
                            )}

                            {/* Game Title (Bottom) */}
                            <div className="absolute bottom-0 left-0 w-full p-4 text-center z-20">
                                <h3 className="text-white font-black text-lg md:text-xl uppercase italic tracking-tighter leading-none drop-shadow-lg group-hover:text-yellow-400 transition-colors">
                                    {game.name}
                                </h3>
                                {/* Hover info */}
                                <div className="h-0 overflow-hidden group-hover:h-6 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100">
                                    <p className="text-[10px] text-zinc-300 mt-1">Instant Delivery</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Load More Button */}
            {!isExpanded && (
                <div className="flex justify-center mt-12 mb-8">
                    <button
                        onClick={handleShowMore}
                        className="bg-[#323437] text-zinc-300 font-bold px-8 py-3 rounded-xl border border-zinc-700 hover:bg-[#3f4145] hover:text-white hover:border-zinc-500 transition-all active:scale-95 flex items-center gap-2"
                    >
                        Tampilkan Lainnya
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>
            )}
        </>
    );
}
