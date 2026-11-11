"use client";

import { m, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import type { IconType } from "react-icons";
import {
  PiBrowserLight,
  PiChartLineUpLight,
  PiChatCircleDotsLight,
  PiCloudLight,
  PiCpuLight,
  PiCursorClickLight,
  PiDatabaseLight,
  PiShieldCheckLight,
} from "react-icons/pi";

/** Rings (diameter in rem). Icons ride the two outer rings; inner rings stay quiet. */
const RINGS = [24, 40, 56, 72, 88];
const ORBITS: { size: number; turn: number; offset: number; icons: IconType[] }[] = [
  { size: 56, turn: 110, offset: 20, icons: [PiCursorClickLight, PiChartLineUpLight, PiCpuLight, PiChatCircleDotsLight] },
  { size: 72, turn: -80, offset: 65, icons: [PiDatabaseLight, PiCloudLight, PiBrowserLight, PiShieldCheckLight] },
];

function OrbitIcon({ icon: Icon, angle, radius, spin }: { icon: IconType; angle: number; radius: number; spin: MotionValue<number> }) {
  // Counter-rotate so the icon stays upright while its orbit turns.
  const upright = useTransform(spin, (value) => -(value + angle));
  return (
    <span
      className="absolute left-1/2 top-1/2 size-0"
      style={{ transform: `rotate(${angle}deg) translateY(-${radius}rem)` }}
    >
      <m.span
        style={{ rotate: upright }}
        className="absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink-2 shadow-[0_8px_24px_-12px_oklch(0.3_0.08_255/0.45)] ring-1 ring-line"
      >
        <Icon className="size-5" />
      </m.span>
    </span>
  );
}

function Orbit({ size, turn, offset, icons, progress }: (typeof ORBITS)[number] & { progress: MotionValue<number> }) {
  const spin = useTransform(progress, [0, 1], [0, turn]);
  return (
    <m.div
      style={{ rotate: spin, width: `${size}rem` }}
      className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2"
    >
      {icons.map((icon, i) => (
        <OrbitIcon key={i} icon={icon} angle={offset + (360 / icons.length) * i} radius={size / 2} spin={spin} />
      ))}
    </m.div>
  );
}

/**
 * Concentric orbits behind the benefits list. Interface icons ride the outer
 * rings and turn — in opposite directions — as the panel scrolls through the
 * viewport (eased by a spring). Scroll-driven rather than self-running, so
 * nothing moves unless the reader does.
 */
export function BenefitsOrbits() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, restDelta: 0.0005 });

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {RINGS.map((size, i) => (
        <span
          key={size}
          className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/[0.06]"
          style={{ width: `${size}rem`, opacity: 1 - i * 0.12 }}
        />
      ))}
      {ORBITS.map((orbit) => (
        <Orbit key={orbit.size} {...orbit} progress={progress} />
      ))}
    </div>
  );
}
