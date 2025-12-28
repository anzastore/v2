'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { HeadphonesIcon, MessageSquare, AlertCircle, CheckCircle, Search, Filter } from 'lucide-react';

interface Ticket {
    id: string;
    user: string;
    subject: string;
    status: 'open' | 'active' | 'resolved';
    priority: 'low' | 'medium' | 'high';
    last_message: string;
    timestamp: string;
}

export default function AdminSupportPage() {
    const [activeTab, setActiveTab] = useState<'tickets' | 'live_chat'>('tickets');
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('/admin/support/tickets');
                setTickets(response.data.map((t: any) => ({
                    id: t.id.substring(0, 8), // Short ID for display
                    user: t.user?.name || t.guest_email || 'Guest',
                    subject: t.subject,
                    status: t.status,
                    priority: t.priority,
                    last_message: t.messages?.[t.messages.length - 1]?.text || 'No messages',
                    timestamp: new Date(t.created_at).toLocaleTimeString()
                })));
            } catch (error) {
                console.error("Error fetching tickets", error);
            }
        };

        fetchTickets();
        const interval = setInterval(fetchTickets, 5000); // Polling every 5s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                    <HeadphonesIcon className="w-8 h-8 text-yellow-500" />
                    Support Center
                </h1>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="text-sm font-bold text-zinc-400">Live System Active</span>
                </div>
            </div>

            {/* TABS */}
            <div className="flex items-center gap-4 border-b border-white/5">
                <button
                    onClick={() => setActiveTab('tickets')}
                    className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'tickets' ? 'text-yellow-500' : 'text-zinc-500 hover:text-white'}`}
                >
                    All Tickets
                    {activeTab === 'tickets' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-t-full"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('live_chat')}
                    className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'live_chat' ? 'text-yellow-500' : 'text-zinc-500 hover:text-white'}`}
                >
                    Live Chats (1)
                    {activeTab === 'live_chat' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-t-full"></div>}
                </button>
            </div>

            {/* FILTERS */}
            <div className="flex items-center gap-4 bg-[#0a0a0a] border border-white/5 p-2 rounded-xl">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search tickets..."
                        className="w-full bg-white/5 border border-white/5 hover:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500/50 transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-lg text-sm font-bold transition-all">
                    <Filter className="w-4 h-4" />
                    Filter
                </button>
            </div>

            {/* TICKET LIST */}
            <div className="space-y-3">
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all group cursor-pointer">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/5 shrink-0 ${ticket.status === 'open' ? 'bg-red-500/10 text-red-500' :
                                    ticket.status === 'active' ? 'bg-yellow-500/10 text-yellow-500' :
                                        'bg-green-500/10 text-green-500'
                                    }`}>
                                    {ticket.status === 'open' ? <AlertCircle className="w-5 h-5" /> :
                                        ticket.status === 'active' ? <MessageSquare className="w-5 h-5" /> :
                                            <CheckCircle className="w-5 h-5" />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-zinc-500 font-mono text-xs">{ticket.id}</span>
                                        <h3 className="text-white font-bold text-sm group-hover:text-yellow-500 transition-colors">{ticket.subject}</h3>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${ticket.priority === 'high' ? 'bg-red-500/20 text-red-500' :
                                            ticket.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                                                'bg-blue-500/20 text-blue-500'
                                            }`}>
                                            {ticket.priority}
                                        </span>
                                    </div>
                                    <p className="text-zinc-600 text-sm line-clamp-1">{ticket.last_message}</p>
                                    <div className="mt-2 flex items-center gap-4 text-xs text-zinc-500">
                                        <span className="flex items-center gap-1">
                                            User: <span className="text-zinc-400">{ticket.user}</span>
                                        </span>
                                        <span>•</span>
                                        <span>{ticket.timestamp}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-bold rounded-lg transition-all">
                                    Manage
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
