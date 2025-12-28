'use client';

import { useState, useRef, useEffect } from 'react';
import {
    MessageSquare,
    X,
    Send,
    Bot,
    User,
    AlertCircle,
    ChevronRight,
    HeadphonesIcon,
    Loader2
} from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import axios from '@/lib/axios';

interface Message {
    id: string;
    sender: 'user' | 'bot' | 'system';
    text: string;
    type?: 'text' | 'options' | 'escalation';
    options?: { label: string; action: string }[];
    timestamp: Date;
}

export default function AiAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [mode, setMode] = useState<'ai' | 'human_pending' | 'human_active'>('ai');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'init-1',
            sender: 'bot',
            text: "Hi! I'm Anza, your AI assistant. How can I help you today?",
            type: 'options',
            options: [
                { label: 'How to Top Up?', action: 'guide_topup' },
                { label: 'Check Order Status', action: 'check_status' },
                { label: 'Payment Issue', action: 'issue_payment' }
            ],
            timestamp: new Date()
        }
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSend = async (text: string = input) => {
        if (!text.trim()) return;

        // User Message
        const userMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Analyze Intent (AI Logic)
        setTimeout(() => {
            let botResponse: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: "I'm not sure I understand. Could you rephrase that?",
                timestamp: new Date()
            };

            const lowerText = text.toLowerCase();

            // INTENT RECOGNITION
            if (lowerText.includes('top up') || lowerText.includes('buy') || lowerText.includes('order')) {
                botResponse.text = "To top up, simply go to the Catalog, select your game, enter your User ID, choose a package, and complete payment!";
            } else if (lowerText.includes('status') || lowerText.includes('history')) {
                botResponse = {
                    ...botResponse,
                    text: "You can check your order status in the 'Check Transactions' page or by logging into your dashboard.",
                    type: 'options',
                    options: [{ label: 'Go to Transactions', action: 'nav_transactions' }]
                };
            } else if (lowerText.includes('login') || lowerText.includes('register') || lowerText.includes('sign up')) {
                botResponse.text = "You can login or register by clicking the user icon in the top right corner of the navbar.";
            } else if (lowerText.includes('fail') || lowerText.includes('error') || lowerText.includes('refund') || lowerText.includes('scam') || lowerText.includes('problem') || lowerText.includes('help')) {
                // FRUSTRATION / ESCALATION DETECTED
                botResponse = {
                    ...botResponse,
                    text: "I see you're facing an issue. Would you like to connect with a human support agent?",
                    type: 'escalation',
                    options: [{ label: 'Connect to Support', action: 'escalate_human' }]
                };
            }

            // If mode is already human, we arguably shouldn't be using AI logic, but simpler "Message Sent" logic.
            // For this phase, we assume AI handles until escalation.

            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const handleOptionClick = async (action: string) => {
        if (action === 'escalate_human') {
            setMode('human_pending');
            // Optimistic Update
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                sender: 'system',
                text: "Connecting you to global support...",
                timestamp: new Date()
            }]);

            try {
                // Real API Call
                await axios.post('/support/tickets', {
                    subject: 'AI Agent Escalation',
                    message: "User requested human support via AI Assistant.",
                    priority: 'medium'
                });
                toast.success("Ticket #CREATED. Agent notified.");
            } catch (error) {
                console.error("Failed to create ticket", error);

                // Add fallback user message if no connectivity
                setMessages(prev => [...prev, {
                    id: (Date.now() + 5).toString(),
                    sender: 'system',
                    text: "System Note: Offline. Please email support@anzastore.com",
                    timestamp: new Date()
                }]);

                toast.error("Connection failed. Please try again.");
            }
            return;
        }

        // Map other actions to text queries
        if (action === 'guide_topup') handleSend("How do I top up?");
        if (action === 'check_status') handleSend("How to check order status?");
        if (action === 'issue_payment') handleSend("I have a payment problem.");
    };

    return (
        <>
            {/* TOGGLE BUTTON */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 group animate-bounce-subtle"
                >
                    <div className="relative w-14 h-14 bg-[#0a0a0a] rounded-full flex items-center justify-center border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.2)] group-hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all">
                        <div className="absolute inset-0 rounded-full border border-yellow-500/50 animate-ping opacity-20"></div>
                        <Image
                            src="/images/logo-new.jpg"
                            alt="AI Support"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                    </div>
                </button>
            )}

            {/* CHAT WINDOW */}
            <div
                className={`fixed bottom-6 right-6 z-50 w-[380px] h-[600px] bg-[#050505]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right transform ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'}`}
            >
                {/* HEADER */}
                <div className="bg-gradient-to-r from-zinc-900 to-[#0a0a0a] p-4 flex items-center justify-between border-b border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-yellow-500/5"></div>
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                            {mode === 'ai' ? <Bot className="w-5 h-5 text-yellow-500" /> : <HeadphonesIcon className="w-5 h-5 text-green-500" />}
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">{mode === 'ai' ? 'Anza Assistant' : 'Customer Support'}</h3>
                            <div className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${mode === 'ai' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></span>
                                <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">{mode === 'ai' ? 'AI Online' : 'Live Agent'}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="relative z-10 p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* MESSAGES */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[url('/images/noise.png')] bg-opacity-[0.02]">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender !== 'user' && msg.sender !== 'system' && (
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center mr-2 border border-white/5 flex-shrink-0">
                                    <Bot className="w-4 h-4 text-zinc-400" />
                                </div>
                            )}
                            <div className={`max-w-[80%] ${msg.sender === 'system' ? 'w-full flex justify-center' : ''
                                }`}>
                                {msg.sender === 'system' ? (
                                    <span className="text-xs text-zinc-500 italic bg-white/5 px-3 py-1 rounded-full">{msg.text}</span>
                                ) : (
                                    <div className={`p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                        ? 'bg-yellow-500 text-black rounded-tr-sm font-medium'
                                        : 'bg-zinc-800/80 border border-white/5 text-zinc-200 rounded-tl-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                )}

                                {/* OPTIONS / ACTIONS */}
                                {msg.type === 'options' && msg.options && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {msg.options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleOptionClick(opt.action)}
                                                className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-yellow-500 transition-colors flex items-center gap-1"
                                            >
                                                {opt.label}
                                                <ChevronRight className="w-3 h-3" />
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {msg.type === 'escalation' && msg.options && (
                                    <div className="mt-2">
                                        <button
                                            onClick={() => handleOptionClick(msg.options![0].action)}
                                            className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                                        >
                                            <HeadphonesIcon className="w-3 h-3" />
                                            Connect to Support
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center mr-2 border border-white/5">
                                <Bot className="w-4 h-4 text-zinc-400" />
                            </div>
                            <div className="bg-zinc-800/80 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-75"></span>
                                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-150"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* INPUT */}
                <div className="p-4 bg-[#0a0a0a] border-t border-white/5">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex items-center gap-2"
                    >
                        <input
                            type="text"
                            className="flex-1 bg-white/5 border border-white/5 hover:border-white/10 focus:border-yellow-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                            placeholder={mode === 'ai' ? "Ask me anything..." : "Type your message..."}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="p-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
