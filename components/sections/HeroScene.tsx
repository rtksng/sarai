"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import PatternWaves from "@/components/reactbits/PatternWaves";
import { cn } from "@/lib/cn";

/* WebGL2 capability, read once on the client. */
let webgl2: boolean | null = null;
function hasWebGL2() {
  if (webgl2 === null) {
    const gl = document.createElement("canvas").getContext("webgl2");
    webgl2 = Boolean(gl);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  }
  return webgl2;
}

/** Wave speed while flowing; it glides to rest over the last second. */
const FLOW_SPEED = 0.22;
const FLOW_MS = 4000;
const SETTLE_MS = 1000;

/**
 * Hero shell.
 * Layers, back to front: sky gradient → dot field → eclipse horizon → grain.
 *
 * The dot field is React Bits' PatternWaves (WebGL): corona-blue dots draped
 * like silk that ripple under the cursor. WebGL can only start after
 * hydration, so a CSS dot field ships in the server HTML (visible on first
 * paint) and fades out once the live field has drawn; it also stays as the
 * fallback where WebGL2 is unavailable.
 *
 * Accessibility: self-moving content must stop within 5 s or offer a pause
 * control (WCAG 2.2.2). The waves flow for ~4 s, glide to rest by 5 s, and
 * from then on move only in response to the cursor. Reduced motion keeps
 * them still from the start.
 *
 * Scroll: a "sunrise" — the horizon rises faster than the copy, which drifts
 * and fades (transform/opacity only).
 */
export function HeroScene({ backdrop, children }: { backdrop: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [live, setLive] = useState(false);
  const [speed, setSpeed] = useState(FLOW_SPEED);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const horizonY = useTransform(scrollYProgress, [0, 1], ["0vh", reduce ? "0vh" : "-15vh"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0vh", reduce ? "0vh" : "10vh"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0.15]);

  // Two frames after mount the WebGL field has painted its first frame.
  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setLive(hasWebGL2()));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);

  // Flow, then ease the speed to zero (the surface glides to a stop).
  useEffect(() => {
    let frame = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / SETTLE_MS);
        setSpeed(FLOW_SPEED * (1 - t) ** 3);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, FLOW_MS);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="hero relative isolate overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="hero-sky absolute inset-0" />
        {/* Dot field lives in the open sky: faded under the header and before the copy */}
        <div className="absolute inset-0 [mask-image:linear-gradient(180deg,transparent_4%,black_17%,black_33%,transparent_54%)]">
          <div
            className={cn(
              "hero-dots absolute inset-0 transition-opacity duration-700 ease-out-quart",
              live ? "opacity-0" : "opacity-100",
            )}
          />
          <PatternWaves
            preset="silk"
            color="#2b6fdc"
            backgroundColor="transparent"
            opacity={0.55}
            spacing={11}
            markSize={0.85}
            speed={speed}
            fade="edges"
            fadeSize={0.7}
            cursorSize={70}
            cursorStrength={0.5}
            intro={false}
          />
        </div>
        <m.div className="absolute inset-0" style={{ y: horizonY }}>
          {backdrop}
        </m.div>
        <div className="grain absolute inset-0 opacity-[0.045]" />
      </div>

      <m.div style={{ y: contentY, opacity: contentOpacity }}>{children}</m.div>
    </section>
  );
}
