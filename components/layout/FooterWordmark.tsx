"use client";

import { animate } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { LETTERS, MARK_LOWER, MARK_UPPER } from "@/components/brand/logo-paths";
import MetallicPaint from "@/components/reactbits/MetallicPaint";

/* The "S" mark's box inside the 174 × 47 logo (square, so the paint maps 1:1). */
const MARK = { x: 8.5, y: -0.5, size: 47 };
const LOGO_W = 174;
const LOGO_H = 47;

/** The supplied S artwork (inner strokes), black on transparent — the shape MetallicPaint pours into. */
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK.x} ${MARK.y} ${MARK.size} ${MARK.size}" width="940" height="940"><defs><mask id="a" maskUnits="userSpaceOnUse" x="0" y="-1" width="64" height="49"><path d="${MARK_UPPER}" fill="#fff"/></mask><mask id="b" maskUnits="userSpaceOnUse" x="0" y="-1" width="64" height="49"><path d="${MARK_LOWER}" fill="#fff"/></mask></defs><g mask="url(#a)"><path d="${MARK_UPPER}" fill="none" stroke="#000" stroke-width="4.33313"/></g><g mask="url(#b)"><path d="${MARK_LOWER}" fill="none" stroke="#000" stroke-width="4.33313"/></g></svg>`;
const MARK_SRC = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markSvg)}`;

/** Flow speed at rest and while hovered (eased between). */
const BASE_SPEED = 1;
const HOVER_SPEED = 2.6;

let webgl2: boolean | null = null;
function hasWebGL2() {
  if (webgl2 === null) {
    const gl = document.createElement("canvas").getContext("webgl2");
    webgl2 = Boolean(gl);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  }
  return webgl2;
}
const subscribeNever = () => () => {};

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/**
 * Oversized footer logo. "ARAI" is the gradient SVG lettering; the "S" mark
 * is React Bits' MetallicPaint — liquid chrome poured into the mark's exact
 * outline. It flows continuously (pausing when off-screen, still under
 * reduced motion); hovering speeds the flow up and tilts the reflections
 * toward the cursor. Without WebGL2 the original gradient SVG mark is shown.
 */
export function FooterWordmark({ className }: { className?: string }) {
  const supported = useSyncExternalStore(subscribeNever, hasWebGL2, () => true);
  const [speed, setSpeed] = useState(BASE_SPEED);
  const speedRef = useRef(BASE_SPEED);
  const tween = useRef<ReturnType<typeof animate> | null>(null);

  const easeSpeed = (goal: number) => {
    tween.current?.stop();
    tween.current = animate(speedRef.current, goal, {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        speedRef.current = value;
        setSpeed(value);
      },
    });
  };

  useEffect(() => () => tween.current?.stop(), []);

  return (
    <div aria-hidden="true" className={`relative aspect-[174/47] w-full ${className ?? ""}`}>
      <svg viewBox={`0 0 ${LOGO_W} ${LOGO_H}`} className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="footer-wordmark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="oklch(0.97 0.02 240)" stopOpacity="0.95" />
            <stop offset="0.65" stopColor="oklch(0.8 0.09 240)" stopOpacity="0.55" />
            <stop offset="1" stopColor="oklch(0.6 0.12 250)" stopOpacity="0.1" />
          </linearGradient>
          {!supported && (
            <>
              <linearGradient id="footer-mark-g1" x1="20.4148" y1="0" x2="20.4148" y2="30.693" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6C6C6C" />
                <stop offset="1" stopColor="#FFFFFF" />
              </linearGradient>
              <linearGradient id="footer-mark-g2" x1="43.8856" y1="45.8587" x2="43.8856" y2="15.1658" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6C6C6C" />
                <stop offset="1" stopColor="#FFFFFF" />
              </linearGradient>
              <mask id="footer-mark-m1" maskUnits="userSpaceOnUse" x="8" y="-1" width="48" height="49">
                <path d={MARK_UPPER} fill="#fff" />
              </mask>
              <mask id="footer-mark-m2" maskUnits="userSpaceOnUse" x="8" y="-1" width="48" height="49">
                <path d={MARK_LOWER} fill="#fff" />
              </mask>
            </>
          )}
        </defs>
        <path d={LETTERS} fill="url(#footer-wordmark-fill)" />
        {!supported && (
          <>
            <g mask="url(#footer-mark-m1)">
              <path d={MARK_UPPER} fill="none" strokeWidth="4.33313" stroke="url(#footer-mark-g1)" />
            </g>
            <g mask="url(#footer-mark-m2)">
              <path d={MARK_LOWER} fill="none" strokeWidth="4.33313" stroke="url(#footer-mark-g2)" />
            </g>
          </>
        )}
      </svg>

      {supported && (
        <div
          className="absolute"
          onPointerEnter={() => easeSpeed(HOVER_SPEED)}
          onPointerLeave={() => easeSpeed(BASE_SPEED)}
          style={{
            left: pct(MARK.x, LOGO_W),
            top: pct(MARK.y, LOGO_H),
            width: pct(MARK.size, LOGO_W),
            height: pct(MARK.size, LOGO_H),
          }}
        >
          <MetallicPaint
            imageSrc={MARK_SRC}
            scale={1}
            color="#dce8ff"
            density={2}
            softness={0.12}
            dispersion={0.25}
            distortion={0.07}
            edgeBend={0.6}
            mouseTilt={1}
            speed={speed}
          />
        </div>
      )}
    </div>
  );
}
