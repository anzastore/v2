export default function Loading() {
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-zinc-800 border-t-brand-yellow rounded-full animate-spin"></div>
                <div className="text-zinc-500 text-sm font-mono animate-pulse">LOADING...</div>
            </div>
        </div>
    );
}
