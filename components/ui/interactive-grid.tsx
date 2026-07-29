"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive mesh grid.
 *
 * A canvas of white-grey lines on black. The cursor pushes the nearest
 * vertices away from it and brightens the lines it passes, so the ground
 * under the hero registers the reader rather than just sitting there.
 *
 * Adapted from a community "aqueous mesh" hero background; five things
 * were changed because the original could not ship as a background layer
 * on this page.
 *
 * 1. SIZED TO ITS PARENT, NOT THE WINDOW. The original set the canvas to
 *    window.innerWidth/innerHeight and read the cursor as clientX/clientY.
 *    This canvas sits inside the hero stage, which is shorter than the
 *    viewport and moves as the page scrolls, so it measures its own box
 *    with a ResizeObserver and converts the cursor into box-local
 *    coordinates. Without that the distortion trails the cursor by
 *    whatever the hero's offset happens to be.
 *
 * 2. DEVICE PIXEL RATIO. Hairlines on a 2x screen were drawn at 1 CSS
 *    pixel into a 1x buffer and came out soft and grey-brown. The buffer
 *    is scaled by DPR (capped at 2 — past that the fill cost buys nothing
 *    a grid line can show).
 *
 * 3. ONE PATH FOR THE QUIET LINES. The original stroked every segment
 *    individually: roughly 4,600 beginPath/stroke pairs a frame at
 *    1080p, which is most of a frame budget spent on lines that all look
 *    identical. Only the segments the cursor is actually near are stroked
 *    on their own; the rest go into a single batched path.
 *
 * 4. IT STOPS. A requestAnimationFrame loop with no exit keeps running
 *    when the hero is scrolled past. An IntersectionObserver parks the
 *    loop off-screen, and the loop also parks itself once the mesh has
 *    settled back to rest and the cursor has left.
 *
 * 5. REDUCED MOTION. One static frame, no listeners, no loop. This
 *    site's contract is that motion is never load-bearing, and a
 *    background is the least load-bearing thing on the page.
 */

export interface InteractiveGridProps {
  className?: string;
  /** Distance in CSS pixels between vertices. */
  cellSize?: number;
  /** Radius in CSS pixels the cursor disturbs. */
  influence?: number;
}

export default function InteractiveGrid({
  className,
  cellSize = 40,
  influence = 170,
}: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const host = canvas.parentElement ?? canvas;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* Point positions live in three flat arrays rather than an array of
       objects. The inner loops touch every vertex twice a frame, and a
       few thousand small objects is exactly the allocation pattern that
       shows up as a sawtooth in the GC. */
    let cols = 0;
    let rows = 0;
    let ox = new Float32Array(0); // rest position
    let oy = new Float32Array(0);
    let px = new Float32Array(0); // current position
    let py = new Float32Array(0);
    let pz = new Float32Array(0); // 0..1, how disturbed this vertex is

    let width = 0;
    let height = 0;
    /* Held in viewport coordinates and converted to box-local ones each
       frame. Storing the local value instead would go stale the moment
       the page scrolled under a stationary cursor, leaving a bright patch
       of mesh sitting where the cursor no longer is. */
    let clientX = Number.NaN;
    let clientY = Number.NaN;
    let frame = 0;
    let visible = true;
    let running = false;

    const build = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* One vertex past each edge in both directions, so the mesh runs off
         the frame instead of ending on a visible last line. */
      cols = Math.ceil(width / cellSize) + 1;
      rows = Math.ceil(height / cellSize) + 1;
      const n = cols * rows;

      ox = new Float32Array(n);
      oy = new Float32Array(n);
      px = new Float32Array(n);
      py = new Float32Array(n);
      pz = new Float32Array(n);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const k = i * rows + j;
          ox[k] = i * cellSize;
          oy[k] = j * cellSize;
          px[k] = ox[k];
          py[k] = oy[k];
        }
      }
    };

    /* Returns true while the picture is still CHANGING — not merely while
       it is disturbed. A cursor parked inside the mesh reaches an
       equilibrium where the push out and the pull home cancel; the frame
       after that is identical to the one before it, so there is nothing
       to be gained by drawing it sixty times a second. */
    const step = () => {
      let mx = Number.NaN;
      let my = Number.NaN;
      if (!Number.isNaN(clientX)) {
        const rect = canvas.getBoundingClientRect();
        mx = clientX - rect.left;
        my = clientY - rect.top;
      }
      const hasMouse = !Number.isNaN(mx);
      let moved = 0;

      for (let k = 0; k < px.length; k++) {
        const wasX = px[k];
        const wasY = py[k];
        const wasZ = pz[k];

        if (hasMouse) {
          const dx = px[k] - mx;
          const dy = py[k] - my;
          const dist = Math.hypot(dx, dy);
          if (dist < influence) {
            const force = (influence - dist) / influence;
            const angle = Math.atan2(dy, dx);
            px[k] += Math.cos(angle) * force * 6;
            py[k] += Math.sin(angle) * force * 6;
            pz[k] = force;
          }
        }
        // Everything eases back to rest whether or not it was just pushed.
        px[k] += (ox[k] - px[k]) * 0.12;
        py[k] += (oy[k] - py[k]) * 0.12;
        pz[k] += (0 - pz[k]) * 0.1;

        const d = Math.max(
          Math.abs(px[k] - wasX),
          Math.abs(py[k] - wasY),
          Math.abs(pz[k] - wasZ) * 20,
        );
        if (d > moved) moved = d;
      }
      return moved > 0.02;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      ctx.lineCap = "round";

      // Pass one: every quiet segment, one path, one stroke.
      ctx.beginPath();
      ctx.strokeStyle = "rgba(233, 236, 242, 0.13)";
      ctx.lineWidth = 1;

      // Pass two is collected here and drawn after, so the lit lines sit
      // on top of the quiet ones rather than being crossed by them.
      const lit: number[] = [];

      const line = (a: number, b: number) => {
        const z = Math.max(pz[a], pz[b]);
        if (z > 0.02) {
          lit.push(a, b, z);
          return;
        }
        ctx.moveTo(px[a], py[a]);
        ctx.lineTo(px[b], py[b]);
      };

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const k = i * rows + j;
          if (j + 1 < rows) line(k, k + 1); // down
          if (i + 1 < cols) line(k, k + rows); // across
        }
      }
      ctx.stroke();

      for (let n = 0; n < lit.length; n += 3) {
        const a = lit[n];
        const b = lit[n + 1];
        const z = lit[n + 2];
        ctx.beginPath();
        // 0.13 at rest up to ~0.75 under the cursor: white-grey, never a
        // glow. The line thickens slightly with it so the brightening
        // reads as the mesh lifting rather than as a colour change.
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.13 + z * 0.62})`;
        ctx.lineWidth = 1 + z * 0.9;
        ctx.moveTo(px[a], py[a]);
        ctx.lineTo(px[b], py[b]);
        ctx.stroke();
      }
    };

    const tick = () => {
      const awake = step();
      draw();
      if (!visible || !awake) {
        running = false;
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduced.matches || !visible) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // a finger is scrolling, not pointing
      clientX = e.clientX;
      clientY = e.clientY;
      start();
    };

    const onPointerLeave = () => {
      clientX = Number.NaN;
      clientY = Number.NaN;
      start(); // one last run so the mesh eases home instead of snapping
    };

    /* The hero moves under a held cursor when the page scrolls, which
       changes where the cursor falls on the mesh without any pointer event
       to announce it. */
    const onScroll = () => {
      if (!Number.isNaN(clientX)) start();
    };

    build();
    draw();

    if (reduced.matches) return;

    const ro = new ResizeObserver(() => {
      build();
      draw();
    });
    ro.observe(host);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      running = false;
    };
  }, [cellSize, influence]);

  return (
    <div className={className} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
