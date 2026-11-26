/**
 * Interactive HTML5 Scratch-Off Date Card Component
 * Recreates the golden scratch-to-reveal interaction from the reference invitation video.
 */

export class ScratchCardManager {
  constructor({ cardsContainerId, onRevealComplete }) {
    this.container = document.getElementById(cardsContainerId);
    this.onRevealComplete = onRevealComplete;
    this.cards = [];
    this.isAllRevealed = false;
  }

  init(cardsData) {
    if (!this.container) return;
    this.container.innerHTML = '';
    this.cards = [];

    cardsData.forEach((item, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'scratch-card-item relative overflow-hidden rounded-2xl shadow-lg border border-[#D4AF37]/50 select-none';
      cardEl.style.aspectRatio = '1 / 1.15';

      // Underlying revealed date content
      const contentEl = document.createElement('div');
      contentEl.className = 'scratch-card-content absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#2B0E14] to-[#1C050B] p-2 text-center';
      contentEl.innerHTML = `
        <span class="scratch-value font-serif text-2xl sm:text-3xl font-bold gold-foil-text leading-tight">${item.value}</span>
        <span class="scratch-label text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#D4AF37]/90 mt-1">${item.label}</span>
      `;
      cardEl.appendChild(contentEl);

      // Canvas for gold foil scratch overlay
      const canvas = document.createElement('canvas');
      canvas.className = 'scratch-canvas absolute inset-0 w-full h-full cursor-pointer z-10';
      cardEl.appendChild(canvas);

      this.container.appendChild(cardEl);

      const scratchInstance = this.setupCanvas(canvas, cardEl, item, index);
      this.cards.push(scratchInstance);
    });
  }

  setupCanvas(canvas, cardEl, item, index) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let isDrawing = false;
    let isRevealed = false;
    let lastPoint = null;

    const resize = () => {
      const rect = cardEl.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      drawGoldFoil(rect.width, rect.height);
    };

    const drawGoldFoil = (w, h) => {
      if (isRevealed) return;
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';

      // Realistic brushed gold foil gradient
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#BF953F');
      grad.addColorStop(0.25, '#FCF6BA');
      grad.addColorStop(0.5, '#B38728');
      grad.addColorStop(0.75, '#FBF5B7');
      grad.addColorStop(1, '#AA771C');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Subtle metallic shimmer grain
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 2 + 1;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Decorative inner border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(6, 6, w - 12, h - 12);

      // Center sparkle icon or hint
      ctx.fillStyle = 'rgba(122, 31, 43, 0.85)';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦ ✦ ✦', w / 2, h / 2);

      ctx.restore();
    };

    // Calculate scratch percentage
    const checkCleared = () => {
      if (isRevealed) return;
      const w = canvas.width;
      const h = canvas.height;
      try {
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        let transparentPixels = 0;
        const totalSampled = data.length / 16; // Sample every 4th pixel for high performance

        for (let i = 3; i < data.length; i += 16) {
          if (data[i] < 128) {
            transparentPixels++;
          }
        }

        const percent = (transparentPixels / totalSampled) * 100;
        if (percent > 35) {
          revealCard();
        }
      } catch (e) {
        // Fallback for security/tainted canvas edge cases
      }
    };

    const revealCard = () => {
      if (isRevealed) return;
      isRevealed = true;
      canvas.style.transition = 'opacity 0.4s ease-out';
      canvas.style.opacity = '0';
      canvas.style.pointerEvents = 'none';
      setTimeout(() => {
        canvas.style.display = 'none';
      }, 420);

      this.checkAllRevealed();
    };

    const scratch = (x, y) => {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      if (lastPoint) {
        ctx.lineWidth = 44;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      ctx.restore();
      lastPoint = { x, y };
    };

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    // Event listeners for touch & mouse
    const onStart = (e) => {
      if (isRevealed) return;
      isDrawing = true;
      const pos = getPos(e);
      lastPoint = pos;
      scratch(pos.x, pos.y);
    };

    const onMove = (e) => {
      if (!isDrawing || isRevealed) return;
      if (e.cancelable && e.type === 'touchmove') {
        // Prevent window scrolling while scratching the card
        e.preventDefault();
      }
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    };

    const onEnd = () => {
      if (!isDrawing) return;
      isDrawing = false;
      lastPoint = null;
      checkCleared();
    };

    canvas.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    canvas.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);

    // Initial setup with requestAnimationFrame
    requestAnimationFrame(resize);
    window.addEventListener('resize', resize);

    return {
      reveal: revealCard,
      updateValues: (val, lbl) => {
        const valEl = cardEl.querySelector('.scratch-value');
        const lblEl = cardEl.querySelector('.scratch-label');
        if (valEl) valEl.textContent = val;
        if (lblEl) lblEl.textContent = lbl;
      },
      isRevealed: () => isRevealed,
    };
  }

  revealAll() {
    this.cards.forEach(card => card.reveal());
    this.isAllRevealed = true;
    if (this.onRevealComplete) {
      this.onRevealComplete();
    }
  }

  checkAllRevealed() {
    const allDone = this.cards.every(c => c.isRevealed());
    if (allDone && !this.isAllRevealed) {
      this.isAllRevealed = true;
      if (this.onRevealComplete) {
        this.onRevealComplete();
      }
    }
  }

  updateLanguage(cardsData) {
    cardsData.forEach((item, index) => {
      if (this.cards[index]) {
        this.cards[index].updateValues(item.value, item.label);
      }
    });
  }
}
