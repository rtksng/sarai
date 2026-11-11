"use client";

import { useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState, type CSSProperties } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";

/* Geometry (SVG user units). A true semicircle "bridge"; the box keeps the
   viewBox ratio, so it scales uniformly and stays perfectly round. */
const W = 1000;
const H = 560;
const CX = 500;
const CY = 470;
const R = 410;
const ARC = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;
const STAGE_ANGLES = [180, 120, 60, 0];
const WEEK_ANGLES = [150, 90, 30];

const pointAt = (deg: number) => ({
  x: CX + R * Math.cos((deg * Math.PI) / 180),
  y: CY - R * Math.sin((deg * Math.PI) / 180),
});

/** Share of the arc's length reached at a given angle (uniform on a circle). */
const lengthShare = (deg: number) => (180 - deg) / 180;

const STAGE_AT = STAGE_ANGLES.map(lengthShare);
const WEEK_AT = WEEK_ANGLES.map(lengthShare);
const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/** Where each stage label sits relative to its node. */
const LABEL_STYLES: CSSProperties[] = STAGE_ANGLES.map((deg, i) => {
  const p = pointAt(deg);
  if (i === 0) return { left: pct(p.x - 10, W), top: pct(p.y + 26, H) };
  if (i === 3) return { right: pct(W - p.x - 10, W), top: pct(p.y + 26, H), textAlign: "right" };
  return { left: pct(p.x, W), top: pct(p.y - 26, H), transform: "translate(-50%, -100%)", textAlign: "center" };
});

type Props = {
  label: string;
  title: string;
  stages: readonly string[];
  /** weeks[i] labels the transition stages[i] → stages[i + 1]. */
  weeks: readonly number[];
};

/**
 * The digital modernization lifecycle as a bridge: one thin arc from
 * "Idea development" to "Deployment at scale" that draws itself as the panel
 * scrolls into view, lighting each stage as it arrives. The heading sits in
 * the bowl of the arc. On small screens (and for assistive tech everywhere)
 * the same content is a plain ordered list.
 */
export function LifecycleArc({ label, title, stages, weeks }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const drawRef = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "center 0.45"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.0005 });
  // Discrete state: re-render only when a stage or a time label is reached.
  const [stagesOn, setStagesOn] = useState(1);
  const [weeksOn, setWeeksOn] = useState(0);

  useMotionValueEvent(progress, "change", (value) => {
    // Draw the bridge: dash offset runs 1 → 0 over a normalised path length.
    drawRef.current?.style.setProperty("stroke-dashoffset", String(1 - Math.min(1, Math.max(0, value))));
    setStagesOn(STAGE_AT.filter((at) => value >= at - 0.004).length);
    setWeeksOn(WEEK_AT.filter((at) => value >= at).length);
  });

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div ref={ref} className="relative md:aspect-[1000/560]">
      {/* Heading — inside the bowl of the arc from md up */}
      <div className="relative z-10 md:absolute md:left-1/2 md:top-[60%] md:w-[min(36rem,62%)] md:-translate-x-1/2 md:-translate-y-1/2 md:text-center">
        <SectionLabel index="02" className="md:justify-center">
          {label}
        </SectionLabel>
        <h2 id="lifecycle-title" className="mt-5 text-h2 text-ink">
          {title}
        </h2>
      </div>

      {/* The bridge (decorative; the list below carries the content) */}
      <div aria-hidden="true" className="hidden md:block">
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible">
          <path d={ARC} fill="none" stroke="var(--color-line-strong)" strokeWidth="1.25" strokeDasharray="2 7" strokeLinecap="round" />
          <path
            ref={drawRef}
            d={ARC}
            fill="none"
            stroke="var(--color-corona)"
            strokeWidth="1.75"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset="1"
            className="arc-draw"
          />
        </svg>

        {STAGE_ANGLES.map((deg, i) => {
          const p = pointAt(deg);
          const on = i < stagesOn;
          return (
            <span
              key={deg}
              className={cn(
                "arc-node absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[background-color,border-color,box-shadow] duration-500",
                on
                  ? "border-corona bg-corona shadow-[0_0_0_6px_oklch(0.56_0.18_256/0.12)]"
                  : "border-line-strong bg-paper",
              )}
              style={{ left: pct(p.x, W), top: pct(p.y, H) }}
            />
          );
        })}

        {stages.map((stage, i) => (
          <p key={stage} className="absolute max-w-[13rem]" style={LABEL_STYLES[i]}>
            <span className="block text-sm tabular-nums text-ink-3">{pad(i + 1)}</span>
            <span
              className={cn(
                "arc-stage mt-1 block text-[clamp(1rem,0.7rem+0.7vw,1.3rem)] leading-snug tracking-[-0.015em] transition-colors duration-500",
                i < stagesOn ? "text-ink" : "text-ink-3",
              )}
            >
              {stage}
            </span>
          </p>
        ))}

        {WEEK_ANGLES.map((deg, i) => {
          const p = pointAt(deg);
          const on = i < weeksOn;
          return (
            <span
              key={deg}
              className={cn(
                "arc-pill absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border bg-paper px-3 py-1 text-sm tabular-nums transition-[opacity,scale,border-color,color] duration-700 ease-out-expo",
                on ? "scale-100 border-corona/30 text-corona-deep opacity-100" : "scale-90 border-line text-ink-3 opacity-0",
              )}
              style={{ left: pct(p.x, W), top: pct(p.y, H) }}
            >
              {weeks[i]} weeks
            </span>
          );
        })}
      </div>

      {/* Content list: visible on small screens, read by assistive tech everywhere */}
      <ol className="mt-10 border-l border-line-strong pl-6 md:sr-only">
        {stages.map((stage, i) => (
          <li key={stage} className="relative pb-7 last:pb-0">
            <span aria-hidden="true" className="absolute -left-[1.84rem] top-1.5 size-3 rounded-full border border-corona bg-paper" />
            <span className="text-sm tabular-nums text-ink-3">{pad(i + 1)}</span>
            <p className="mt-0.5 text-[1.25rem] tracking-[-0.015em] text-ink">{stage}</p>
            {i < weeks.length && (
              <p className="mt-3 inline-flex rounded-full border border-line px-3 py-1 text-sm text-ink-2">
                <span className="sr-only">{`${stage} to ${stages[i + 1].toLowerCase()}: `}</span>
                {weeks[i]} weeks
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
