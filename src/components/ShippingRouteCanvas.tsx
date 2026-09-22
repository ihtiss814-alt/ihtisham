import { useEffect, useRef } from 'react';

/**
 * Animated chart of the export routes out of Japan.
 *
 * Deliberately a navigational chart rather than a world map: drawing real
 * coastlines would mean shipping a geometry file, and a hand-faked continent
 * outline would just be wrong. A graticule plus real port coordinates is
 * honest about what it is and reads correctly at hero size.
 *
 * The projection is centred on Yokohama, so routes leave the origin the way
 * ships actually do — Africa and Europe to the west, the Americas east across
 * the Pacific — with no antimeridian seam to work around.
 *
 * Canvas 2D only, no dependencies. Pauses when off-screen or when the tab is
 * hidden, and renders a single static frame when the visitor asks for reduced
 * motion. Several destination markets buy over cellular, so idle cost matters.
 */

const ORIGIN = { name: 'Yokohama', lat: 35.44, lng: 139.64 };

/** Real ports we ship to — coordinates are the actual harbours. */
const PORTS = [
  { name: 'Vladivostok',   lat:  43.12, lng: 131.89 },
  { name: 'Chittagong',    lat:  22.33, lng:  91.81 },
  { name: 'Colombo',       lat:   6.93, lng:  79.86 },
  { name: 'Karachi',       lat:  24.86, lng:  67.01 },
  { name: 'Dubai',         lat:  25.27, lng:  55.30 },
  { name: 'Mombasa',       lat:  -4.04, lng:  39.67 },
  { name: 'Dar es Salaam', lat:  -6.82, lng:  39.28 },
  { name: 'Durban',        lat: -29.87, lng:  31.02 },
  { name: 'Lagos',         lat:   6.45, lng:   3.39 },
  { name: 'Tema',          lat:   5.62, lng:   0.02 },
  { name: 'Southampton',   lat:  50.90, lng:  -1.40 },
  { name: 'Auckland',      lat: -36.84, lng: 174.76 },
  { name: 'Port Moresby',  lat:  -9.44, lng: 147.18 },
  { name: 'Georgetown',    lat:   6.80, lng: -58.16 },
  { name: 'Kingston',      lat:  17.97, lng: -76.79 },
  { name: 'Port of Spain', lat:  10.65, lng: -61.51 },
];

const CRIMSON = '#C8102E';
/**
 * Keeps the outermost ports off the canvas edge. Latitude is exaggerated
 * relative to longitude — our ports sit between roughly 51°N and 37°S, so at a
 * true ratio they bunch into a thin band and leave the hero looking empty.
 */
const SPREAD_X = 0.9;
const SPREAD_Y = 1.12;

interface Pt { x: number; y: number }

function project(lat: number, lng: number, w: number, h: number): Pt {
  // Wrap into [-180, 180) relative to the origin meridian.
  const dl = ((lng - ORIGIN.lng + 540) % 360) - 180;
  return {
    x: w / 2 + (dl / 180) * (w / 2) * SPREAD_X,
    y: h / 2 - (lat / 90) * (h / 2) * SPREAD_Y,
  };
}

/** Control point for a route arc — bows perpendicular to the run, scaled by length. */
function controlPoint(a: Pt, b: Pt): Pt {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy) || 1;
  // Perpendicular, always bowing "up" so arcs read as a family rather than a tangle.
  const bow = Math.min(dist * 0.18, 90);
  return { x: mx + (dy / dist) * bow, y: my - (dx / dist) * bow };
}

function bezier(a: Pt, c: Pt, b: Pt, t: number): Pt {
  const u = 1 - t;
  return {
    x: u * u * a.x + 2 * u * t * c.x + t * t * b.x,
    y: u * u * a.y + 2 * u * t * c.y + t * t * b.y,
  };
}

export default function ShippingRouteCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let visible = true;
    let onScreen = true;

    // Stagger each route so pulses do not depart in lockstep.
    const phases = PORTS.map((_, i) => (i * 0.618) % 1);

    const draw = (time: number, animate: boolean) => {
      ctx.clearRect(0, 0, width, height);
      const origin = project(ORIGIN.lat, ORIGIN.lng, width, height);

      // ── Graticule ──
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (let lat = -60; lat <= 60; lat += 30) {
        const y = project(lat, ORIGIN.lng, width, height).y;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let d = -150; d <= 150; d += 30) {
        const x = project(0, ORIGIN.lng + d, width, height).x;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // ── Routes ──
      PORTS.forEach((port, i) => {
        const dest = project(port.lat, port.lng, width, height);
        const ctrl = controlPoint(origin, dest);

        ctx.strokeStyle = 'rgba(255,255,255,0.16)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.quadraticCurveTo(ctrl.x, ctrl.y, dest.x, dest.y);
        ctx.stroke();

        // Destination port marker
        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.beginPath();
        ctx.arc(dest.x, dest.y, 2, 0, Math.PI * 2);
        ctx.fill();

        if (!animate) return;

        // Pulse in transit, with a short tail behind it.
        const t = ((time / 14000) + phases[i]) % 1;
        const head = bezier(origin, ctrl, dest, t);
        const tailLen = 0.06;

        ctx.lineWidth = 1.6;
        ctx.strokeStyle = CRIMSON;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        for (let s = 0; s <= 6; s++) {
          const tt = Math.max(0, t - (tailLen * s) / 6);
          const p = bezier(origin, ctrl, dest, tt);
          if (s === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.fillStyle = CRIMSON;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── Origin: Japan ──
      if (animate) {
        // Slow outward ring, one every ~3.5s.
        const ring = (time / 3500) % 1;
        ctx.strokeStyle = `rgba(200,16,46,${(1 - ring) * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(origin.x, origin.y, 6 + ring * 42, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = CRIMSON;
      ctx.beginPath();
      ctx.arc(origin.x, origin.y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.85)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(origin.x, origin.y, 8, 0, Math.PI * 2);
      ctx.stroke();
    };

    const loop = (time: number) => {
      draw(time, true);
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!running) return;
      cancelAnimationFrame(frame);
      running = false;
    };

    const start = () => {
      if (running || reduceMotion.matches || !visible || !onScreen) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Repaint immediately so a resize never leaves a blank or stretched frame.
      draw(performance.now(), running);
      if (reduceMotion.matches) draw(0, false);
    };

    const onMotionPrefChange = () => {
      if (reduceMotion.matches) {
        stop();
        draw(0, false);
      } else {
        start();
      }
    };

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) start();
      else stop();
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    }, { rootMargin: '100px' });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    io.observe(canvas);
    document.addEventListener('visibilitychange', onVisibility);
    reduceMotion.addEventListener('change', onMotionPrefChange);

    resize();
    if (reduceMotion.matches) draw(0, false);
    else start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      reduceMotion.removeEventListener('change', onMotionPrefChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      role="presentation"
    />
  );
}
