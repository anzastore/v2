import { Product } from '@/types/catalog';
import { clsx } from 'clsx';
import Image from 'next/image';

interface ProductGridProps {
    products: Product[];
    selectedProductId?: number;
    onSelect: (product: Product) => void;
}

export const ProductGrid = ({ products, selectedProductId, onSelect }: ProductGridProps) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <button
                    key={product.id}
                    onClick={() => onSelect(product)}
                    className={clsx(
                        'relative group flex flex-col items-center p-4 rounded-xl border transition-all duration-300',
                        selectedProductId === product.id
                            ? 'bg-yellow-500/10 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.2)] scale-[1.02]'
                            : 'bg-zinc-900 border-zinc-800 hover:border-yellow-500/50 hover:bg-zinc-800 hover:-translate-y-1'
                    )}
                >
                    {/* Bonus Badge */}
                    {product.bonus_diamonds && product.bonus_diamonds > 0 && (
                        <div className="absolute -top-3 right-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-lg border border-red-400/20">
                            Bonus +{product.bonus_diamonds}
                        </div>
                    )}

                    {/* Icon */}
                    <div className="relative w-12 h-12 mb-3 transform group-hover:scale-110 transition-transform duration-300">
                        {/* Placeholder for Diamond Icon */}
                        <div className={clsx(
                            "w-full h-full rounded-full flex items-center justify-center text-2xl shadow-inner",
                            selectedProductId === product.id ? "bg-yellow-500/20 text-yellow-400" : "bg-zinc-800 text-zinc-600 group-hover:text-yellow-400 group-hover:bg-yellow-500/10"
                        )}>
                            💎
                        </div>
                    </div>

                    {/* Name/Amount */}
                    <span className={clsx(
                        "font-bold text-lg mb-1 transition-colors",
                        selectedProductId === product.id ? "text-yellow-400" : "text-white group-hover:text-yellow-200"
                    )}>
                        {product.name}
                    </span>

                    {/* Price */}
                    <div className="flex flex-col items-center">
                        {product.discounted_price ? (
                            <>
                                <span className="text-zinc-500 text-xs line-through mb-0.5">
                                    Rp {product.price.toLocaleString()}
                                </span>
                                <span className="text-white font-bold">
                                    Rp {product.discounted_price.toLocaleString()}
                                </span>
                            </>
                        ) : (
                            <span className="text-zinc-300 font-medium group-hover:text-white">
                                Rp {product.price.toLocaleString()}
                            </span>
                        )}
                    </div>
                </button>
            ))}
        </div>
    );
};
