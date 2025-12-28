'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, FileText, MessageCircle, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            id: 1,
            question: "How do I top up my game account?",
            answer: "To top up, simply go to the Catalog, select your game, enter your User ID, choose a package, and complete payment via your preferred method. Your diamonds will be added instantly!"
        },
        {
            id: 2,
            question: "My payment was successful but I haven't received my items.",
            answer: "Transactions are usually instant (1-3 seconds). If delayed, please check your Transaction History status. If it's 'Success' but items are missing, contact our Support via the AI Assistant or 'Contact Support' page."
        },
        {
            id: 3,
            question: "What payment methods do you accept?",
            answer: "We accept QRIS, E-Wallets (GoPay, OVO, Dana), Bank Transfers (BCA, Mandiri, BRI), and Virtual Accounts."
        },
        {
            id: 4,
            question: "Can I request a refund?",
            answer: "Refunds are processed only if the transaction failed on our end or the product was out of stock. Please refer to our Refund Policy for more details."
        }
    ];

    const filteredFaqs = faqs.filter(f =>
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0F0F0F] pt-24 pb-20">
            {/* HERO */}
            <div className="relative overflow-hidden mb-16">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-yellow-500/20 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">help you?</span>
                    </h1>

                    <div className="max-w-xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative flex items-center bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 group-hover:border-yellow-500/50 transition-colors">
                            <Search className="w-5 h-5 text-zinc-500 ml-4" />
                            <input
                                type="text"
                                placeholder="Search for answers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none px-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-0"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl">
                {/* QUICK LINKS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        { icon: FileText, title: 'Order Guide', desc: 'Step-by-step top up tutorial', href: '/help/#guide' },
                        { icon: CreditCard, title: 'Payment Issues', desc: 'Solve payment problems', href: '/help/#payments' },
                        { icon: MessageCircle, title: 'Contact Support', desc: 'Talk to our team', href: '/help/#contact' },
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 hover:border-yellow-500/30 hover:-translate-y-1 transition-all group"
                        >
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-500/10 transition-colors">
                                <item.icon className="w-6 h-6 text-zinc-400 group-hover:text-yellow-500 transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">{item.title}</h3>
                            <p className="text-sm text-zinc-500">{item.desc}</p>
                        </Link>
                    ))}
                </div>

                {/* FAQ */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <HelpCircle className="w-6 h-6 text-yellow-500" />
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {filteredFaqs.map((faq) => (
                            <div
                                key={faq.id}
                                className={`bg-[#1a1a1a] border rounded-xl overflow-hidden transition-all duration-300 ${openFaq === faq.id ? 'border-yellow-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'border-white/5 hover:border-white/10'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                    className="w-full flex items-center justify-between p-5 text-left"
                                >
                                    <span className={`font-bold transition-colors ${openFaq === faq.id ? 'text-yellow-400' : 'text-zinc-200'}`}>
                                        {faq.question}
                                    </span>
                                    {openFaq === faq.id ? (
                                        <ChevronUp className="w-5 h-5 text-yellow-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-zinc-500" />
                                    )}
                                </button>

                                <div
                                    className={`px-5 text-zinc-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${openFaq === faq.id ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    {faq.answer}
                                </div>
                            </div>
                        ))}

                        {filteredFaqs.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-zinc-500">No results found for "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
