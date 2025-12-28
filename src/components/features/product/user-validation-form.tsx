'use client';

import { useState } from 'react';
import { CatalogApi } from '@/lib/api-catalog';

interface UserValidationFormProps {
    gameId: number;
    requiresZone: boolean; // Some games need Zone ID (e.g. MLBB)
    onValidated: (valid: boolean, data?: any) => void;
}

export const UserValidationForm = ({ gameId, requiresZone, onValidated }: UserValidationFormProps) => {
    const [userId, setUserId] = useState('');
    const [zoneId, setZoneId] = useState('');
    const [loading, setLoading] = useState(false);
    const [validatedName, setValidatedName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Mock Validation Logic (Real API call stubbed)
    // In production, this would call CatalogApi.validatePlayerId
    const handleValidate = async () => {
        setLoading(true);
        setError(null);
        setValidatedName(null);
        onValidated(false);

        try {
            // TODO: Uncomment when backend endpoint is ready
            // const result = await CatalogApi.validatePlayerId(gameId, userId, zoneId);

            // SIMULATION
            await new Promise(r => setTimeout(r, 800));
            if (userId.length < 4) throw new Error('Invalid Player ID');

            const mainName = 'DemoUser123';
            setValidatedName(mainName);
            onValidated(true, { userId, zoneId, username: mainName });

        } catch (err: any) {
            setError(err.message || 'Validation failed');
            onValidated(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-black text-sm font-bold w-8 h-8 flex items-center justify-center rounded-lg mr-4 shadow-lg shadow-yellow-500/20">
                    1
                </span>
                Enter Account Info
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Player ID</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="12345678"
                        className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 outline-none transition-all placeholder:text-zinc-800 font-mono"
                    />
                </div>
                {requiresZone && (
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Zone ID</label>
                        <input
                            type="text"
                            value={zoneId}
                            onChange={(e) => setZoneId(e.target.value)}
                            placeholder="1234"
                            className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 outline-none transition-all placeholder:text-zinc-800 font-mono"
                        />
                    </div>
                )}
            </div>

            {/* Validation Result */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-center animate-in fade-in slide-in-from-top-2">
                    <span className="mr-2">❌</span> {error}
                </div>
            )}

            {validatedName && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm flex items-center animate-in fade-in slide-in-from-top-2">
                    <span className="mr-2">✅</span>
                    Account found: <span className="font-bold text-white ml-2">{validatedName}</span>
                </div>
            )}

            {/* Validate Button */}
            {!validatedName && (
                <div className="flex justify-end">
                    <button
                        onClick={handleValidate}
                        disabled={loading || !userId}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-700 hover:border-zinc-500"
                    >
                        {loading ? 'Checking...' : 'Check ID'}
                    </button>
                </div>
            )}
        </div>
    );
};
