'use client';

import { useState } from 'react';
import { Plus, GripVertical, Trash2, Edit2, Package } from 'lucide-react';
import { Product } from '@/lib/api-admin';

interface ProductManagerProps {
    products: Product[];
    onUpdate: (products: Product[]) => void;
}

export default function ProductManager({ products = [], onUpdate }: ProductManagerProps) {
    // Basic local state for managing list - in real app would trigger modal/api
    const [isAdding, setIsAdding] = useState(false);

    // Mock add for prototype
    const handleAddMock = () => {
        const newProduct: Product = {
            id: Date.now(),
            game_id: 0,
            name: 'New Diamond Pack',
            code: `DM-${Math.floor(Math.random() * 1000)}`,
            price: 10000,
            currency_code: 'IDR',
            is_active: true,
            stock: 999
        };
        onUpdate([...products, newProduct]);
    };

    const handleRemove = (id: number) => {
        onUpdate(products.filter(p => p.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Package className="w-5 h-5 text-yellow-500" />
                        Products & Top-Up Packages
                    </h3>
                    <p className="text-zinc-500 text-sm">Manage the items users can purchase for this game.</p>
                </div>
                <button
                    type="button"
                    onClick={handleAddMock}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg text-sm font-bold shadow-lg shadow-yellow-500/20 transition-all flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    New Package
                </button>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/5 text-zinc-500 text-xs uppercase tracking-wider">
                            <th className="p-4 w-10"></th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Code</th>
                            <th className="p-4">Price</th>
                            <th className="p-4 text-center">Stock</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-zinc-500 text-sm">
                                    No products configured yet.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="p-4 text-zinc-600 cursor-move"><GripVertical className="w-4 h-4" /></td>
                                    <td className="p-4 font-bold text-zinc-200">{product.name}</td>
                                    <td className="p-4 font-mono text-xs text-zinc-500">{product.code}</td>
                                    <td className="p-4 font-bold text-yellow-500">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: product.currency_code }).format(product.price)}
                                    </td>
                                    <td className="p-4 text-center text-zinc-400 text-sm">{product.stock || '∞'}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${product.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {product.is_active ? 'Active' : 'Disabled'}
                                        </span>
                                    </td>
                                    <td className="p-4 flex items-center justify-end gap-2">
                                        <button className="p-1.5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-all">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleRemove(product.id)}
                                            className="p-1.5 hover:bg-red-500/10 rounded-lg text-zinc-400 hover:text-red-500 transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
