import type { CSSProperties, ReactNode } from "react";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

/**
 * Site card: React Bits SpotlightCard with the theme's light-blue hairline
 * border and a soft corona-tinted shadow. Used by Agents and Services so both
 * sections share one card language.
 */
const THEME = {
  "--spotlight-card-border": "oklch(0.87 0.055 245)",
  // Layered, low-opacity shadow: soft and diffuse rather than one hard drop.
  "--spotlight-card-shadow": [
    "0 1px 1px oklch(0.55 0.12 252 / 0.025)",
    "0 2px 4px oklch(0.55 0.12 252 / 0.025)",
    "0 6px 12px oklch(0.55 0.12 252 / 0.03)",
    "0 14px 28px oklch(0.55 0.12 252 / 0.035)",
    "0 28px 56px -8px oklch(0.55 0.12 252 / 0.045)",
  ].join(", "),
} as CSSProperties;

export function ThemeCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <SpotlightCard
      theme="light"
      spotlightColor="oklch(0.6 0.17 252)"
      intensity={0.24}
      borderGlow={0.85}
      spotlightSize={300}
      className={className}
      style={THEME}
    >
      {children}
    </SpotlightCard>
  );
}
