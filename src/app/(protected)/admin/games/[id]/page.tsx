'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ChevronLeft,
    Save,
    Image as ImageIcon,
    LayoutTemplate,
    Settings2,
    Package
} from 'lucide-react';
import { AdminApi, Game, Product } from '@/lib/api-admin';
import { toast } from 'sonner';
import InputSchemaBuilder, { FieldDefinition } from '@/components/admin/games/InputSchemaBuilder';
import ProductManager from '@/components/admin/games/ProductManager';

export default function GameEditorPage() {
    const router = useRouter();
    const params = useParams();
    const isNew = params?.id === 'new';

    // State
    const [isLoading, setIsLoading] = useState(!isNew);
    const [activeTab, setActiveTab] = useState<'general' | 'schema' | 'products'>('general');
    const [isSaving, setIsSaving] = useState(false);

    // Form Data
    const [formData, setFormData] = useState<Partial<Game>>({
        title: '',
        slug: '',
        publisher: '',
        description: '',
        thumbnail: '',
        cover_image: '',
        is_active: true,
        input_fields: [], // Initialize as empty array for builder
        category_id: 1,
    });

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (!isNew && params?.id) {
            loadGameData(params.id as string);
        }
    }, [isNew, params?.id]);

    const loadGameData = async (id: string) => {
        try {
            // Mock Fetch implementation as we don't have real backend endpoints working 100% yet
            // In real scenario: const data = await AdminApi.getGame(id);
            // Simulate delay
            await new Promise(r => setTimeout(r, 500));

            // Mock Data
            setFormData({
                id: Number(id),
                title: 'Mobile Legends',
                slug: 'mobile-legends',
                publisher: 'Moonton',
                description: 'Join your friends in a brand new 5v5 MOBA showdown against real human opponents, Mobile Legends: Bang Bang!',
                thumbnail: '/images/games/mlbb.jpg',
                is_active: true,
                input_fields: [
                    { id: '1', label: 'User ID', type: 'number', placeholder: '12345678', required: true },
                    { id: '2', label: 'Zone ID', type: 'number', placeholder: '1234', required: true }
                ]
            });

            setProducts([
                { id: 101, game_id: Number(id), name: 'Weekly Diamond Pass', code: 'WDP', price: 28000, currency_code: 'IDR', is_active: true, stock: 999 },
                { id: 102, game_id: Number(id), name: '86 Diamonds', code: 'DM-86', price: 19500, currency_code: 'IDR', is_active: true, stock: 999 },
            ]);
        } catch (error) {
            toast.error("Failed to load game data");
            router.push('/admin/games');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Simulate API Call
            await new Promise(r => setTimeout(r, 800));

            // Real implementation:
            // if (isNew) await AdminApi.createGame(formData);
            // else await AdminApi.updateGame(formData.id, formData);

            toast.success(`Game ${isNew ? 'created' : 'updated'} successfully!`);
            router.push('/admin/games');
        } catch (error) {
            toast.error("Failed to save game");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="animate-pulse space-y-8 p-4">
            <div className="h-8 bg-white/5 w-1/3 rounded"></div>
            <div className="h-64 bg-white/5 rounded-xl"></div>
        </div>;
    }

    return (
        <div className="max-w-5xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 sticky top-[80px] z-20 bg-[#050505]/80 backdrop-blur-md py-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-all">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight">
                            {isNew ? 'New Game' : `Edit ${formData.title}`}
                        </h1>
                        <p className="text-xs text-zinc-500 font-mono">
                            {isNew ? 'Create a new catalog entry' : `ID: ${formData.id} • ${formData.slug}`}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/games" className="px-4 py-2 text-sm font-bold text-zinc-400 hover:text-white transition-all">
                        Cancel
                    </Link>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg text-sm font-black shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? <span className="animate-spin text-xl">•</span> : <Save className="w-4 h-4" />}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 mb-8 bg-zinc-900/50 p-1 rounded-xl w-fit border border-white/5">
                {[
                    { id: 'general', icon: LayoutTemplate, label: 'General Info' },
                    { id: 'schema', icon: Settings2, label: 'Input Configuration' },
                    { id: 'products', icon: Package, label: 'Products' },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id
                                ? 'bg-white/10 text-white shadow-lg'
                                : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="space-y-8 animate-fade-in-up">

                {/* GENERAL TAB */}
                {activeTab === 'general' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 space-y-4">
                                <h3 className="text-lg font-bold text-white mb-4">Basic Information</h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase">Game Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all font-bold"
                                            placeholder="e.g. Mobile Legends"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase">Publisher</label>
                                        <input
                                            type="text"
                                            value={formData.publisher}
                                            onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                                            className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-all"
                                            placeholder="e.g. Moonton"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Slug (URL)</label>
                                    <div className="flex items-center">
                                        <span className="bg-white/5 border border-r-0 border-white/10 rounded-l-lg px-3 py-3 text-zinc-500 text-sm font-mono">/games/</span>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                            className="flex-1 bg-zinc-900/50 border border-white/10 rounded-r-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-all font-mono text-sm"
                                            placeholder="mobile-legends"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Description</label>
                                    <textarea
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-all resize-none"
                                        placeholder="Game description..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Side Visuals */}
                        <div className="space-y-6">
                            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5 text-yellow-500" />
                                    Visual Assets
                                </h3>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase">Thumbnail URL</label>
                                        <input
                                            type="text"
                                            value={formData.thumbnail}
                                            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                            className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-yellow-500 focus:outline-none"
                                            placeholder="https://..."
                                        />
                                        {/* Preview */}
                                        <div className="aspect-[4/5] bg-zinc-800 rounded-lg overflow-hidden border border-white/5 relative group">
                                            {formData.thumbnail ? (
                                                <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-zinc-600">No Image</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                                        <input
                                            type="checkbox"
                                            id="isActive"
                                            checked={formData.is_active}
                                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                            className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-yellow-500 focus:ring-yellow-500"
                                        />
                                        <label htmlFor="isActive" className="text-sm font-bold text-white cursor-pointer select-none">Game is Visible</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SCHEMA TAB */}
                {activeTab === 'schema' && (
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-white mb-2">Input Configuration</h2>
                            <p className="text-zinc-500 text-sm">Define what information users need to provide (e.g., ID, Server, Zone) to top-up this game.</p>
                        </div>
                        <InputSchemaBuilder
                            value={formData.input_fields as FieldDefinition[]}
                            onChange={(fields) => setFormData({ ...formData, input_fields: fields })}
                        />
                    </div>
                )}

                {/* PRODUCTS TAB */}
                {activeTab === 'products' && (
                    <ProductManager
                        products={products}
                        onUpdate={setProducts}
                    />
                )}
            </div>
        </div>
    );
}
