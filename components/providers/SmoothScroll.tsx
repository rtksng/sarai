"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { scrollToHash, setLenis } from "@/lib/scroll";

/**
 * Inertial smooth scrolling (Lenis) plus smooth in-page anchor navigation.
 * Lenis drives the native scroll position, so keyboard scrolling, find-in-page
 * and scroll-linked effects keep working. It is never started when the user
 * prefers reduced motion, and stops if that preference changes.
 */
export function SmoothScroll() {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
        stopInertiaOnNavigate: true,
      });
      setLenis(lenis);
    };

    const stop = () => {
      lenis?.destroy();
      lenis = null;
      setLenis(null);
    };

    if (!motionQuery.matches) start();
    const onMotionChange = () => (motionQuery.matches ? stop() : start());
    motionQuery.addEventListener("change", onMotionChange);

    // Intercept same-page hash links for a smooth, focus-managed jump.
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as Element | null)?.closest?.("a[href^='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const hash = link.getAttribute("href") ?? "#";
      if (scrollToHash(hash)) {
        event.preventDefault();
        const url = hash === "#" || hash === "#top" ? window.location.pathname : hash;
        window.history.replaceState(null, "", url);
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("click", onClick);
      stop();
    };
  }, []);

  return null;
}
