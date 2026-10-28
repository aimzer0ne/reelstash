const COLORS = ['#feda75', '#fa7e1e', '#d62976', '#962fbf', '#4f5bd5'];

// A short burst of Instagram-gradient confetti from a point on screen. One canvas,
// removed when the last piece falls; skipped entirely for reduced motion.
export function burstConfetti(x, y, count = 46) {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.className = 'confetti-canvas';
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas.remove();
  ctx.scale(dpr, dpr);

  const pieces = Array.from({ length: count }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
    const speed = 6 + Math.random() * 7;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 5 + Math.random() * 5,
      spin: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * Math.PI,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      round: Math.random() < 0.35
    };
  });

  const started = performance.now();
  function frame(now) {
    const life = (now - started) / 1400;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (life >= 1) return canvas.remove();
    ctx.globalAlpha = 1 - life * life;
    for (const piece of pieces) {
      piece.vy += 0.32;
      piece.vx *= 0.985;
      piece.x += piece.vx;
      piece.y += piece.vy;
      piece.rotation += piece.spin;
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.rotation);
      ctx.fillStyle = piece.color;
      if (piece.round) {
        ctx.beginPath();
        ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
      }
      ctx.restore();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
