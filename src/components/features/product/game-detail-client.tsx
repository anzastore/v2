'use client';

import { useState } from 'react';
import { Game, Product } from '@/types/catalog';
import { ProductGrid } from './product-grid';
import { UserValidationForm } from './user-validation-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCheckoutStore } from '@/lib/checkout-store';

interface GameDetailClientProps {
    game: Game;
}

export const GameDetailClient = ({ game }: GameDetailClientProps) => {
    const router = useRouter();
    const initCheckout = useCheckoutStore((state) => state.initCheckout);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [validationData, setValidationData] = useState<any>(null);
    const [isValidated, setIsValidated] = useState(false);

    const handleValidationCallback = (valid: boolean, data?: any) => {
        setIsValidated(valid);
        setValidationData(data || null);
    };

    const handleCheckout = () => {
        if (!selectedProduct || !isValidated || !validationData) return;

        // IMMUTABLE CHECKOUT CONTRACT — DO NOT MODIFY WITHOUT BACKEND SIGN-OFF
        const userInputs = {
            user_id: validationData.userId,
            zone_id: validationData.zoneId,
            username: validationData.username
        };

        // Init Store with persisted data
        initCheckout(
            { id: game.id, name: game.name, thumbnails: game.thumbnail_url },
            selectedProduct,
            userInputs
        );

        router.push('/checkout');
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            {/* Breadcrumb / Title */}
            <div className="mb-8 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 backdrop-blur-sm">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">
                    Top Up <span className="text-yellow-500">{game.name}</span>
                </h1>
                <p className="text-zinc-400 mt-2">Instant delivery, safe payment, 24/7 support.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Game Info */}
                <div className="lg:col-span-1">
                    <div className="bg-zinc-900 rounded-2xl overflow-hidden sticky top-24 shadow-2xl border border-zinc-800">
                        <div className="relative aspect-[16/9] w-full lg:aspect-[3/4]">
                            {game.thumbnail_url ? (
                                <Image
                                    src={game.thumbnail_url}
                                    alt={game.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                                    <span className="text-zinc-800 font-bold">No Image</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <span className="text-[10px] bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded font-bold uppercase tracking-wider">
                                        Official
                                    </span>
                                    <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded font-bold uppercase tracking-wider">
                                        Instant
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-zinc-800">
                            <h2 className="text-lg font-bold text-white mb-2">Description</h2>
                            <div className="text-zinc-500 text-sm leading-relaxed prose prose-invert prose-sm">
                                {game.description || 'Top up your game credits instantly and securely. Select your item, enter ID, and pay.'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Flow */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Step 1: User Validation */}
                    <div className="bg-zinc-900 rounded-2xl p-1 border border-zinc-800 shadow-xl">
                        <UserValidationForm
                            gameId={game.id}
                            requiresZone={false}
                            onValidated={handleValidationCallback}
                        />
                    </div>

                    {/* Step 2: Product Selection */}
                    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-bl-full blur-2xl"></div>
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center relative z-10">
                            <span className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-black text-sm font-bold w-8 h-8 flex items-center justify-center rounded-lg mr-4 shadow-lg shadow-yellow-500/20">
                                2
                            </span>
                            Select Top Up Amount
                        </h3>

                        <ProductGrid
                            products={game.products || []}
                            selectedProductId={selectedProduct?.id}
                            onSelect={setSelectedProduct}
                        />
                    </div>

                    {/* Footer: Action Bar */}
                    <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800 p-4 lg:static lg:bg-transparent lg:border-none lg:backdrop-blur-none lg:p-0 z-50">
                        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between lg:bg-zinc-900 lg:p-6 lg:rounded-2xl lg:border lg:border-zinc-800 shadow-2xl">
                            <div className="flex flex-col mb-4 sm:mb-0 w-full sm:w-auto">
                                <span className="text-zinc-500 text-xs uppercase tracking-wider font-bold mb-1">Total Payment</span>
                                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                                    {selectedProduct ?
                                        `Rp ${(selectedProduct.discounted_price || selectedProduct.price).toLocaleString()}`
                                        : 'Rp 0'
                                    }
                                </span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={!isValidated || !selectedProduct}
                                className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-black font-black py-4 px-10 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-yellow-500/20"
                            >
                                BUY NOW
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
