"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis, { type LenisOptions } from "lenis";

/**
 * Lenis smooth-scroll provider.
 *
 * Wraps the whole app in a single Lenis instance so every scroll on the
 * page is buttery-smooth with momentum, parallax and mouse-wheel
 * deceleration. It runs on the main thread (RAF-driven) and forwards
 * scroll events to any `data-scroll` consumers (Framer Motion
 * `useScroll` reads the native scroll position, which Lenis keeps in
 * sync via `scrollTo`/`onScroll`).
 */
export default function LenisScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureInertia: 0.85,
      syncWheel: true,
      syncTouch: true,
      ignoreWheel: (el: HTMLElement) =>
        el.closest("[data-scroll-ignore]") !== null,
      ignoreTouch: (el: HTMLElement) =>
        el.closest("[data-scroll-ignore]") !== null,
    } as LenisOptions);

    lenisRef.current = lenis;

    // Expose the instance on window for any component that needs it.
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;

    // RAF loop — drives the smooth scroll on the main thread.
    let rafId: number;
    const frame = (time: number) => {
      lenis.raf(time * 1000);
      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    // Respect the OS-level "reduce motion" preference.
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      lenis.destroy();
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (lenisRef.current) lenisRef.current.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}