import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-black text-zinc-800 select-none">404</h1>
            <h2 className="text-2xl font-bold text-white mt-4">Page Not Found</h2>
            <p className="text-zinc-400 mt-2 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                href="/"
                className="mt-8 px-6 py-3 bg-brand-yellow text-black font-bold uppercase tracking-wide rounded hover:bg-yellow-400 transition-colors"
            >
                Return Home
            </Link>
        </div>
    );
}
