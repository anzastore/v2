'use client';

import { Game, Product } from '@/types/catalog';
import Image from 'next/image';

interface OrderSummaryProps {
    game: { id: number; name: string; thumbnails: string };
    product: Product;
    // MATCH CONTRACT SHAPE
    userInfo: { user_id: string; zone_id?: string; username?: string };
}

export const OrderSummary = ({ game, product, userInfo }: OrderSummaryProps) => {
    return (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-24">
            <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>

            {/* Game Info */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-700">
                <div className="relative w-16 h-16 rounded overflow-hidden">
                    {game.thumbnails ? (
                        <Image src={game.thumbnails} alt={game.name} fill className="object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-700" />
                    )}
                </div>
                <div>
                    <h4 className="font-bold text-white">{game.name}</h4>
                    <span className="text-xs text-green-400">Instant Delivery</span>
                </div>
            </div>

            {/* Item Details */}
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-400">Item</span>
                    <span className="text-white font-medium">{product.name}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Account Info</span>
                    <div className="text-right">
                        <div className="text-white">{userInfo.user_id} {userInfo.zone_id ? `(${userInfo.zone_id})` : ''}</div>
                        {userInfo.username && <div className="text-xs text-gray-500">{userInfo.username}</div>}
                    </div>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-700">
                    <span className="text-gray-400">Price</span>
                    <span className="text-white">Rp {product.price.toLocaleString()}</span>
                </div>
                {product.discounted_price && (
                    <div className="flex justify-between">
                        <span className="text-gray-400">Discount</span>
                        <span className="text-green-400">- Rp {(product.price - product.discounted_price).toLocaleString()}</span>
                    </div>
                )}

                <div className="flex justify-between pt-3 border-t border-gray-700 mt-2">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-xl font-bold text-yellow-500">
                        Rp {(product.discounted_price || product.price).toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
};
