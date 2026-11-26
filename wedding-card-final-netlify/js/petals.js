/**
 * Floating Blessing Flowers & Golden Fireflies Canvas Engine
 * Recreates the ambient blessing petals floating behind the wedding elements.
 */

export class PetalsCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.animationFrameId = null;
    this.particles = [];
    this.isTabVisible = true;
    this.width = 0;
    this.height = 0;
    this.lastTime = performance.now();
    this.scrollVelocity = 0;
    this.lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
  }

  init() {
    if (!this.canvas || !this.ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Track scroll velocity for realistic physical petal updrafts
    window.addEventListener('scroll', () => {
      const curY = window.scrollY;
      const delta = curY - this.lastScrollY;
      this.lastScrollY = curY;
      // Downward scroll creates an upward relative draft on floating petals
      const draft = Math.max(-4.5, Math.min(4.5, delta * 0.07));
      this.scrollVelocity = draft;
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      this.isTabVisible = !document.hidden;
      if (this.isTabVisible) {
        this.lastTime = performance.now();
        this.render(this.lastTime);
      } else if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
    });

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 24 : 45;

    // Rich palette of marigold, warm amber, and golden rose petals
    const petalColors = ['#F4A300', '#FFAF1A', '#E58A00', '#C9A24B', '#FFD340', '#D4AF37'];
    this.particles = [];

    for (let i = 0; i < count; i++) {
      const isFirefly = Math.random() < 0.35;
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: isFirefly ? Math.random() * 2.5 + 1.2 : Math.random() * 7 + 5,
        speedY: isFirefly ? (Math.random() - 0.5) * 0.4 : Math.random() * 0.65 + 0.45,
        speedX: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        isFirefly,
        opacity: Math.random() * 0.45 + 0.25,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    this.render(performance.now());
  }

  resize() {
    if (!this.canvas) return;
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  render(currentTime) {
    if (!this.isTabVisible) return;

    const delta = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Smoothly decay scroll velocity draft
    const currentVelocity = this.scrollVelocity;
    this.scrollVelocity *= 0.92;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      // Petals rise when scrolling down, creating fluid camera depth
      p.y += (p.speedY - currentVelocity * 0.8) * 60 * delta;
      p.x += Math.sin(currentTime * 0.001 + p.pulseOffset) * 0.4 + p.speedX * 60 * delta;
      p.rotation += (p.rotationSpeed + currentVelocity * 0.008) * 60 * delta;

      // Wrap around screen boundaries
      if (p.y > this.height + 25) {
        p.y = -25;
        p.x = Math.random() * this.width;
      } else if (p.y < -25) {
        p.y = this.height + 25;
      }

      if (p.x > this.width + 25) p.x = -25;
      if (p.x < -25) p.x = this.width + 25;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);

      if (p.isFirefly) {
        // Glowing Firefly Light
        const glow = Math.sin(currentTime * 0.003 + p.pulseOffset) * 0.3 + 0.6;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 230, 140, ${p.opacity * glow})`;
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = '#F4A300';
        this.ctx.fill();
      } else {
        // Organic Petal Shape
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.opacity;
        this.ctx.shadowBlur = 3;
        this.ctx.shadowColor = 'rgba(212, 175, 55, 0.25)';
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    this.animationFrameId = requestAnimationFrame((t) => this.render(t));
  }
}
