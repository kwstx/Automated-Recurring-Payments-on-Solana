'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    z: number;
    size: number;
}

export default function ParticleSphere() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let rotation = 0;

        // Configuration
        const particleCount = 2000;
        const radius = 300;
        const rotationSpeed = 0.002;

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                // Spherical coordinates for even distribution
                const theta = Math.random() * 2 * Math.PI;
                const phi = Math.acos((Math.random() * 2) - 1);

                particles.push({
                    x: radius * Math.sin(phi) * Math.cos(theta),
                    y: radius * Math.sin(phi) * Math.sin(theta),
                    z: radius * Math.cos(phi),
                    size: Math.random() * 1.5 + 0.5
                });
            }
        };

        const resizeCanvas = () => {
            if (!canvas) return;
            // Handle high DPI displays
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            ctx.scale(dpr, dpr);

            // Adjust radius based on screen size if needed, 
            // but fixed radius usually works well for this bg effect
        };

        const render = () => {
            if (!canvas || !ctx) return;

            // Clear canvas
            const width = canvas.width / (window.devicePixelRatio || 1);
            const height = canvas.height / (window.devicePixelRatio || 1);
            ctx.clearRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;

            // Update rotation
            rotation += rotationSpeed;

            // Draw particles
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

            particles.forEach(p => {
                // Rotate around Y axis
                const cos = Math.cos(rotation);
                const sin = Math.sin(rotation);

                // 3D Rotation
                const x = p.x * cos - p.z * sin;
                const z = p.z * cos + p.x * sin;
                const y = p.y; // No X-axis rotation for simple globe spin

                // Project to 2D
                // Simple perspective projection
                const scale = 400 / (400 + z);
                const x2d = x * scale + centerX;
                const y2d = y * scale + centerY;

                // Opacity based on Z-depth (fade out back particles)
                const alpha = (z + radius) / (radius * 2);
                ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha * 0.8));

                // Draw circle
                const size = p.size * scale;
                ctx.beginPath();
                ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        // Initialize
        initParticles();
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-[800px] h-[800px] opacity-70"
            style={{ width: '800px', height: '800px' }}
        />
    );
}
