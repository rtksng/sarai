import type { CSSProperties } from "react";
import { BlurText } from "@/components/reactbits/BlurText";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HERO } from "@/lib/content";
import { HeroScene } from "./HeroScene";

const SPARKLE =
  "M0-13C.7-3.4 2.4-1.2 13 0 2.4 1.2.7 3.4 0 13-.7 3.4-2.4 1.2-13 0-2.4-1.2-.7-3.4 0-13Z";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** The eclipse horizon and the sparkle where light breaks over its rim. */
function HeroBackdrop() {
  return (
    <div className="hero-horizon horizon-rise">
      <span className="hero-sparkle">
        <span className="streak-in absolute left-1/2 top-1/2 h-px w-[22rem] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,oklch(1_0_0/0.95)_50%,transparent)] sm:w-[34rem]" />
        <span className="sparkle-in relative block size-28 sm:size-36">
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,oklch(1_0_0/0.95)_0%,oklch(0.93_0.07_210/0.6)_20%,transparent_62%)]" />
          <svg
            viewBox="-14 -14 28 28"
            className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 sm:size-12"
          >
            <path d={SPARKLE} fill="white" />
          </svg>
        </span>
      </span>
    </div>
  );
}

/** A tiny eclipse that closes the headline in place of a full stop. */
function EclipseStop() {
  return (
    <span className="ml-[0.07em] inline-block size-[0.17em] rounded-full bg-night align-baseline shadow-[0_0_0_0.012em_oklch(1_0_0/0.95),0_0_0.14em_0.025em_oklch(0.7_0.14_245/0.75)]" />
  );
}

export function Hero() {
  return (
    <HeroScene backdrop={<HeroBackdrop />}>
      <div className="shell flex min-h-[100svh] flex-col justify-end pb-[calc(var(--cap)+clamp(2.5rem,7vh,5rem))] pt-32">
        <div className="grid gap-x-8 gap-y-9 lg:grid-cols-12 lg:items-end">
          <BlurText
            as="h1"
            id="hero-title"
            text={HERO.title}
            keepTogether={HERO.keepTogether}
            className="text-display text-ink lg:col-span-8"
            trailing={<EclipseStop />}
          />
          <div className="max-w-md lg:col-span-4 lg:pb-3">
            <p className="hero-in text-lead text-ink-2" style={delay(640)}>
              {HERO.lead}
            </p>
            <div className="hero-in mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" style={delay(780)}>
              <ButtonLink href={HERO.primaryCta.href}>{HERO.primaryCta.label}</ButtonLink>
              <ButtonLink href={HERO.secondaryCta.href} variant="text">
                {HERO.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </HeroScene>
  );
}
