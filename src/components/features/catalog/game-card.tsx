import Link from 'next/link';
import { Game } from '@/types/catalog';
import Image from 'next/image';

interface GameCardProps {
    game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
    return (
        <Link
            href={`/games/${game.slug}`}
            className="group block bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500 hover:shadow-[0_10px_30px_-10px_rgba(234,179,8,0.15)]"
        >
            <div className="relative aspect-[3/4] w-full bg-zinc-950">
                {/* Fallback to text if no image, or use a placeholder */}
                {game.thumbnail_url ? (
                    <Image
                        src={game.thumbnail_url}
                        alt={game.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700">
                        <span className="text-4xl font-black opacity-20">ANZA</span>
                    </div>
                )}

                {/* Status Badge */}
                {game.status !== 'active' && (
                    <div className="absolute top-2 right-2 bg-red-600/90 backdrop-blur text-white text-[10px] px-2 py-1 rounded-sm font-bold uppercase tracking-wide border border-red-400/30">
                        {game.status}
                    </div>
                )}

                {/* Overlay Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-4 relative">
                <h3 className="text-white font-bold group-hover:text-yellow-400 transition-colors truncate">
                    {game.name}
                </h3>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
                    {game.publisher || 'Official'}
                </p>
                <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-500/10 rounded-bl-full -mr-2 -mt-2 hidden group-hover:block transition-all blur-xl"></div>
            </div>
        </Link>
    );
};
