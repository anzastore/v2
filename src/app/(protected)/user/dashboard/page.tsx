'use client';

export default function UserDashboard() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
                User Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-yellow-500/50 transition-colors group">
                    <h2 className="text-xl font-bold mb-2 group-hover:text-yellow-400">My Orders</h2>
                    <p className="text-zinc-400 text-sm">View your recent top-up history.</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-yellow-500/50 transition-colors group">
                    <h2 className="text-xl font-bold mb-2 group-hover:text-yellow-400">Settings</h2>
                    <p className="text-zinc-400 text-sm">Manage your account preferences.</p>
                </div>
            </div>
        </div>
    );
}
