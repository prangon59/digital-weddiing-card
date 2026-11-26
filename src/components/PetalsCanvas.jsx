import React, { useEffect, useRef } from 'react';
import { isLowEndDevice, prefersReducedMotion } from '../utils/helpers';

export default function PetalsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (prefersReducedMotion()) return;

    let animationFrameId;
    let isTabVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastTime = performance.now();
        render(lastTime);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Optimize particle count for mobile / low-end devices
    const isMobile = window.innerWidth < 768;
    const isLowEnd = isLowEndDevice();
    const particleCount = isMobile || isLowEnd ? 22 : 45;

    // Palette of marigolds, soft rose, and golden fireflies
    const petalColors = ['#F4A300', '#FFAF1A', '#E58A00', '#C9A24B', '#FFD340'];

    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const isFirefly = Math.random() < 0.35;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isFirefly ? Math.random() * 2.5 + 1.2 : Math.random() * 8 + 6,
        speedY: isFirefly ? (Math.random() - 0.5) * 0.5 : Math.random() * 0.7 + 0.5,
        speedX: (Math.random() - 0.5) * 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        isFirefly,
        opacity: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let lastTime = performance.now();

    const render = (currentTime) => {
      if (!isTabVisible) return;

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY * 60 * delta;
        p.x += Math.sin(currentTime * 0.001 + p.pulseOffset) * 0.4 + p.speedX * 60 * delta;
        p.rotation += p.rotationSpeed * 60 * delta;

        // Wrap around borders
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        } else if (p.y < -20) {
          p.y = height + 20;
        }

        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.isFirefly) {
          // Firefly glowing dot
          const glow = Math.sin(currentTime * 0.003 + p.pulseOffset) * 0.3 + 0.6;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 226, 128, ${p.opacity * glow})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#F4A300';
          ctx.fill();
        } else {
          // Petal oval shape
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.shadowBlur = 3;
          ctx.shadowColor = 'rgba(201, 162, 75, 0.2)';
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
}
