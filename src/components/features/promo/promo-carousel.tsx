'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Banners Configuration
const SLIDES = [
    {
        id: 1,
        title: "Mobile Legends",
        subtitle: "Winter Crystal Savings",
        discount: "5% OFF",
        image: "/images/banners/banner-mlbb.png",
        link: "/games/mobile-legends",
        color: "from-blue-600 to-indigo-900",
        accent: "text-blue-400"
    },
    {
        id: 2,
        title: "Free Fire",
        subtitle: "Frozen Frontier Savings",
        discount: "5% OFF",
        image: "/images/banners/banner-ff.png",
        link: "/games/free-fire",
        color: "from-emerald-500 to-teal-900",
        accent: "text-emerald-400"
    },
    {
        id: 3,
        title: "PUBG Mobile",
        subtitle: "Arctic Adventure Deals",
        discount: "5% OFF",
        image: "/images/banners/banner-pubgm.png",
        link: "/games/pubg-mobile",
        color: "from-sky-500 to-slate-900",
        accent: "text-sky-400"
    }
];

export default function PromoCarousel() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrent(index);
    };

    // Auto-slide effect
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextSlide, 6000);
        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    // Parallax Effect
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
        setMousePos({ x: 0, y: 0 });
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[21/9] md:aspect-[3/1] lg:aspect-[3.5/1] overflow-hidden rounded-2xl group border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-zinc-900"
            onMouseEnter={() => setIsPaused(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* --- GLOBAL OVERLAYS --- */}

            {/* Particles / Snow Overlay (CSS Only for Performance) */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-60">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/effects/particles.png')] bg-repeat animate-shimmer opacity-30 mix-blend-screen"></div>
            </div>

            {/* Scanline Effect (HUD Vibe) */}
            <div className="absolute inset-0 pointer-events-none z-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20"></div>

            {/* --- SLIDES --- */}
            <div className="relative w-full h-full">
                {SLIDES.map((slide, index) => {
                    const isActive = index === current;
                    return (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            {/* Parallax Background Layer */}
                            <div
                                className="absolute inset-0 w-full h-full transition-transform duration-100 ease-out will-change-transform scale-110"
                                style={{
                                    transform: isActive ? `scale(1.1) translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` : 'scale(1.1)'
                                }}
                            >
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                                {/* Gradient Overlays */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-40 mix-blend-multiply transition-opacity duration-1000`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-90" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-black/40 to-transparent" />
                            </div>

                            {/* Content Layer (Parallax moves opposite or slower) */}
                            <div
                                className="absolute inset-0 flex flex-col justify-end md:justify-center p-6 md:p-12 lg:p-20 text-white z-20 pointer-events-none"
                                style={{
                                    transform: isActive ? `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` : 'none'
                                }}
                            >
                                <div className={`max-w-xl pointer-events-auto ${isActive ? 'animate-fade-up' : 'opacity-0'}`}>
                                    {/* Badge */}
                                    <div className="mb-4 overflow-hidden">
                                        <span className={`inline-block px-3 py-1 text-xs font-bold tracking-wider text-yellow-400 uppercase bg-yellow-500/10 border border-yellow-500/20 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.2)] ${isActive ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
                                            Official Partner
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2
                                        className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] italic ${isActive ? 'animate-fade-up' : 'opacity-0'}`}
                                        style={{ animationDelay: '200ms' }}
                                    >
                                        {slide.title}
                                    </h2>

                                    {/* Subtitle & Discount */}
                                    <div
                                        className={`flex items-center gap-4 mb-8 ${isActive ? 'animate-fade-up' : 'opacity-0'}`}
                                        style={{ animationDelay: '300ms' }}
                                    >
                                        <p className="text-lg md:text-2xl text-zinc-300 font-medium drop-shadow-md">
                                            {slide.subtitle}
                                        </p>
                                        <span className="px-2 py-1 bg-red-600/90 text-white text-xs font-bold rounded animate-pulse border border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                                            {slide.discount}
                                        </span>
                                    </div>

                                    {/* CTA Button */}
                                    <div
                                        className={`${isActive ? 'animate-fade-up' : 'opacity-0'}`}
                                        style={{ animationDelay: '400ms' }}
                                    >
                                        <Link
                                            href={slide.link}
                                            className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-black text-black bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.6)]"
                                        >
                                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                            <span className="relative flex items-center gap-2">
                                                TOP UP NOW
                                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* --- CONTROLS --- */}

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 left-0 flex items-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pl-4">
                <button
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:border-yellow-500 hover:text-yellow-400 hover:bg-black/60 transition-all hover:scale-110 active:scale-95 group/btn"
                >
                    <ChevronLeft size={28} className="drop-shadow-lg" />
                </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-4">
                <button
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:border-yellow-500 hover:text-yellow-400 hover:bg-black/60 transition-all hover:scale-110 active:scale-95 group/btn"
                >
                    <ChevronRight size={28} className="drop-shadow-lg" />
                </button>
            </div>

            {/* Progress/Pagination Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
                {SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`group relative h-2 rounded-full transition-all duration-500 ease-out overflow-hidden ${current === index
                                ? "w-12 bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.8)]"
                                : "w-2 bg-white/20 hover:bg-white/40"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        {current === index && (
                            <div className="absolute inset-0 bg-white/50 w-full h-full animate-shimmer" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
