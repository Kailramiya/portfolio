import { useEffect, useRef } from 'react';

/**
 * Cursor trail — canvas fixed overlay.
 * Draws a glowing dot + outer ring at cursor, plus a comet tail of fading dots.
 * Uses rAF + native events only — zero React re-renders.
 * Skips on: prefers-reduced-motion, touch/coarse devices.
 */
const CursorTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse  = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || coarse) return;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const mouse = { x: -200, y: -200 };
    const trail = []; // { x, y, life }
    const TRAIL_LEN  = 28;
    const DECAY      = 0.045;
    const DOT_R      = 5;
    const RING_R     = 13;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      trail.unshift({ x: e.clientX, y: e.clientY, life: 1.0 });
      if (trail.length > TRAIL_LEN) trail.pop();
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let rafId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Trail dots ──
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].life -= DECAY;
        if (trail[i].life <= 0) { trail.splice(i, 1); continue; }

        const { x, y, life } = trail[i];
        const r = Math.max(0.5, DOT_R * life);

        // Glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
        glow.addColorStop(0,   `rgba(99,102,241,${life * 0.5})`);
        glow.addColorStop(1,   'rgba(99,102,241,0)');
        ctx.beginPath();
        ctx.arc(x, y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129,140,248,${life * 0.9})`;
        ctx.fill();
      }

      // ── Main cursor: filled dot ──
      const dotGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, DOT_R * 2.5);
      dotGlow.addColorStop(0, 'rgba(99,102,241,0.6)');
      dotGlow.addColorStop(1, 'rgba(99,102,241,0)');
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, DOT_R * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = dotGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, DOT_R, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(129,140,248,1)';
      ctx.fill();

      // ── Main cursor: outer ring ──
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, RING_R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(99,102,241,0.45)';
      ctx.lineWidth   = 1.5;
      ctx.stroke();

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    />
  );
};

export default CursorTrail;
