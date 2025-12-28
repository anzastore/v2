'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Plus,
    Search,
    MoreHorizontal,
    Edit2,
    Power,
    Trash2,
    Gamepad2,
    Filter
} from 'lucide-react';
import { AdminApi, Game } from '@/lib/api-admin';
import { toast } from 'sonner';

export default function AdminGamesPage() {
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await AdminApi.getGames();
            // Handle different pagination structures if needed
            setGames(Array.isArray(response) ? response : response.data || []);
        } catch (error) {
            console.error(error);
            // Mock Data Fallback for Dev/Demo if API fails or empty
            setGames([
                { id: 1, title: 'Mobile Legends', slug: 'mobile-legends', thumbnail: '/images/games/mlbb.jpg', publisher: 'Moonton', is_active: true, input_fields: {}, created_at: '2024-01-01' },
                { id: 2, title: 'PUBG Mobile', slug: 'pubg-mobile', thumbnail: '/images/games/pubgm.jpg', publisher: 'Tencent', is_active: true, input_fields: {}, created_at: '2024-01-01' },
                { id: 3, title: 'Genshin Impact', slug: 'genshin-impact', thumbnail: '/images/games/genshin.jpg', publisher: 'HoYoverse', is_active: true, input_fields: {}, created_at: '2024-01-01' },
                { id: 4, title: 'Valorant', slug: 'valorant', thumbnail: '/images/games/valorant.jpg', publisher: 'Riot Games', is_active: false, input_fields: {}, created_at: '2024-01-01' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleStatus = async (id: number, currentStatus: boolean) => {
        try {
            await AdminApi.updateGame(id, { is_active: !currentStatus });
            toast.success("Game status updated");
            setGames(games.map(g => g.id === id ? { ...g, is_active: !currentStatus } : g));
        } catch (e) {
            // Mock success for UI feedback in dev
            setGames(games.map(g => g.id === id ? { ...g, is_active: !currentStatus } : g));
            toast.success("Game status updated (Demo)");
        }
    };

    const filteredGames = games.filter(g =>
        (g.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (g.slug || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                        <Gamepad2 className="w-8 h-8 text-yellow-500" />
                        Game Management
                    </h1>
                    <p className="text-zinc-500 mt-1">Manage game catalog, configurations, and products.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                        className="p-2.5 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-lg border border-white/5 transition-all"
                    >
                        {viewMode === 'grid' ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        )}
                    </button>
                    <Link
                        href="/admin/games/new"
                        className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black rounded-xl text-sm font-black shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transform hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Game
                    </Link>
                </div>
            </div>

            {/* FILTERS */}
            <div className="flex items-center gap-4 bg-[#0a0a0a] border border-white/5 p-2 rounded-xl">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search games..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/5 hover:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500/50 transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-lg text-sm font-bold transition-all">
                    <Filter className="w-4 h-4" />
                    Filters
                </button>
            </div>

            {/* CONTENT */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-white/5 rounded-2xl"></div>)}
                </div>
            ) : (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
                    {filteredGames.map((game) => (
                        viewMode === 'grid' ? (
                            // GRID CARD
                            <div key={game.id} className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-yellow-500/40 transition-all duration-300 flex flex-col h-full">
                                {/* Image */}
                                <div className="relative h-40 w-full overflow-hidden bg-zinc-900">
                                    <Image
                                        src={game.thumbnail || '/images/placeholder-game.jpg'}
                                        alt={game.title || 'Game Image'}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:grayscale-0 grayscale-[0.3]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80"></div>
                                    <div className="absolute top-3 right-3 flex gap-2">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${game.is_active ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                                            {game.is_active ? 'Active' : 'Disabled'}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-500 transition-colors">{game.title}</h3>
                                        <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">{game.publisher || 'Unknown Publisher'}</p>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                                        <button
                                            onClick={() => toggleStatus(game.id, game.is_active)}
                                            className="text-zinc-500 hover:text-white transition-colors"
                                            title={game.is_active ? "Disable Game" : "Enable Game"}
                                        >
                                            <Power className={`w-4 h-4 ${game.is_active ? 'hover:text-red-500' : 'hover:text-green-500'}`} />
                                        </button>
                                        <div className="flex gap-3">
                                            <Link href={`/admin/games/${game.id}`} className="p-2 bg-white/5 rounded-lg text-zinc-400 hover:text-yellow-500 hover:bg-yellow-500/10 transition-all">
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button className="p-2 bg-white/5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // LIST ROW
                            <div key={game.id} className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-white/5 rounded-xl hover:border-white/10 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-800">
                                        <Image src={game.thumbnail || '/placeholder.jpg'} alt={game.title || 'Game Image'} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{game.title}</h3>
                                        <p className="text-xs text-zinc-500">{game.publisher} • {game.slug}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${game.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                        {game.is_active ? 'Active' : 'Disabled'}
                                    </span>
                                    <Link href={`/admin/games/${game.id}`} className="text-sm font-bold text-zinc-400 hover:text-white hover:underline">Edit</Link>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
}
