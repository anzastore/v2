'use client';

import { useEffect, useRef } from 'react';

interface SnowEffectProps {
    density?: number; // Base number of flakes (default: 100)
    speed?: number;   // Base falling speed (default: 1)
    maxAccumulationTime?: number; // Time in seconds to reach full density (illusion)
}

/**
 * SnowEffect Component
 * A high-performance, canvas-based snow animation.
 * Features:
 * - Purely decorative (pointer-events-none).
 * - RAF loop for 60fps performance using Canvas API.
 * - Accumulation Illusion: Spawns more particles over time.
 * - Reduced motion support.
 * - Auto-optimized for mobile (fewer particles).
 */
export default function SnowEffect({
    density = 150,
    speed = 1.5,
    maxAccumulationTime = 60
}: SnowEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // --- SAFEGUARDS & SETUP ---
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return; // Disable entirely for reduced motion preference

        const isMobile = window.innerWidth < 768;
        const maxParticles = isMobile ? density * 0.4 : density; // Reduce load on mobile

        // --- PARTICLE SYSTEM ---
        let particles: Particle[] = [];
        let animationFrameId: number;
        let w = 0;
        let h = 0;
        const startTime = Date.now();

        class Particle {
            x: number;
            y: number;
            radius: number;
            speedY: number;
            speedX: number;
            opacity: number;
            sway: number; // For horizontal movement
            swaySpeed: number;

            constructor(canvasWidth: number, canvasHeight: number) {
                this.x = Math.random() * canvasWidth;
                this.y = Math.random() * canvasHeight - canvasHeight; // Start above viewport initially to stagger
                this.radius = Math.random() * 2 + 0.5; // Size between 0.5px and 2.5px
                this.speedY = Math.random() * speed + 0.5; // Random fall speed
                this.speedX = (Math.random() - 0.5) * 0.5; // Slight drift
                this.opacity = Math.random() * 0.5 + 0.3; // Base opacity
                this.sway = Math.random() * 20; // Sway amplitude
                this.swaySpeed = Math.random() * 0.02; // Sway frequency
            }

            update(width: number, height: number, timeDelta: number, activeDensityRatio: number) {
                // Movement
                this.y += this.speedY;
                this.x += Math.sin(timeDelta * this.swaySpeed) * 0.2 + this.speedX;

                // Recycling (Wrap around)
                if (this.y > height) {
                    this.y = -10; // Reset to top
                    this.x = Math.random() * width; // Randomize X again

                    // Accumulation Illusion Logic:
                    // If we are currently restricting density (early in animation),
                    // only respawn this particle if it fits within the current "allowed" count.
                    // Otherwise, act as if it's "sticking" (disappearing) until density increases?
                    // actually, simpler: Just spawn particles gradually.
                }

                // Horizontal Wrap
                if (this.x > width) this.x = 0;
                if (this.x < 0) this.x = width;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        // --- INIT & RESIZE ---
        const resize = () => {
            // Handle resizingsafely without destroying state if possible
            if (canvas) {
                const parent = canvas.parentElement;
                if (parent) {
                    w = parent.clientWidth;
                    h = parent.clientHeight;
                } else {
                    w = window.innerWidth;
                    h = window.innerHeight;
                }

                canvas.width = w;
                canvas.height = h;
            }
        };

        // Initial Resize
        resize();
        window.addEventListener('resize', resize);

        // --- LOOP ---
        const render = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, w, h);

            const elapsed = (Date.now() - startTime) / 1000; // Seconds active

            // ACCUMULATION ILLUSION:
            // Gradually increase the "active" particle count cap.
            // We start with 20% particles and ramp to 100% over 'maxAccumulationTime'.
            const accumulationRatio = Math.min(1, (elapsed + 5) / maxAccumulationTime); // +5s head start
            const currentTargetCount = Math.floor(maxParticles * accumulationRatio);

            // Add particles if needed
            while (particles.length < currentTargetCount) {
                const p = new Particle(w, h);
                // Newly added particles start at top - height (random vertical spread above view)
                // to prevent "pop-in" all at once.
                p.y = Math.random() * -h;
                particles.push(p);
            }

            // Update and Draw
            const now = Date.now();
            particles.forEach(p => {
                p.update(w, h, now, accumulationRatio);
                p.draw(ctx);
            });

            // Draw "Accumulation" (Ground Haze) using Canvas Gradient
            // This replaces the CSS "accumulation" div.
            const gradientHeight = h * 0.15 * accumulationRatio; // Grows up to 15% of height
            if (gradientHeight > 0) {
                const grad = ctx.createLinearGradient(0, h - gradientHeight, 0, h);
                grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
                grad.addColorStop(1, `rgba(255, 255, 255, ${0.4 * accumulationRatio})`); // Soft white haze
                ctx.fillStyle = grad;
                ctx.fillRect(0, h - gradientHeight, w, gradientHeight);
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        // --- CLEANUP ---
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [density, speed, maxAccumulationTime]);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-10"
            style={{ width: '100%', height: '100%' }}
            aria-hidden="true"
        />
    );
}
