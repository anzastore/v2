'use client';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-3xl font-bold text-red-500 mb-4">
                Admin Command Center
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-zinc-900 border border-red-900/50 p-6 rounded-xl">
                    <h2 className="text-xl font-bold mb-2 text-red-500">Orders</h2>
                    <p className="text-zinc-500 text-sm">Manage incoming transactions.</p>
                </div>
                <div className="bg-zinc-900 border border-red-900/50 p-6 rounded-xl">
                    <h2 className="text-xl font-bold mb-2 text-red-500">Users</h2>
                    <p className="text-zinc-500 text-sm">Manage customer accounts.</p>
                </div>
                <div className="bg-zinc-900 border border-red-900/50 p-6 rounded-xl">
                    <h2 className="text-xl font-bold mb-2 text-red-500">Products</h2>
                    <p className="text-zinc-500 text-sm">Edit game catalog & prices.</p>
                </div>
            </div>
        </div>
    );
}
