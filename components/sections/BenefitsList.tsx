"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Benefit = { label: string; icon: ReactNode };

/**
 * Large typographic list. The word crossing the middle of the viewport is
 * highlighted and gains its icon — a scroll-driven reading cue, not a
 * requirement: every word stays legible (≥ 3:1 at this size) when inactive.
 */
export function BenefitsList({ items }: { items: Benefit[] }) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <ul className="mx-auto flex w-fit flex-col items-center">
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <li
            key={item.label}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            data-index={i}
            className="relative py-[0.06em] text-benefit"
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute right-full top-1/2 mr-[0.22em] hidden size-[0.62em] -translate-y-1/2 items-center justify-center rounded-full bg-paper text-corona-deep shadow-[0_10px_30px_-12px_oklch(0.3_0.08_255/0.45)] ring-1 ring-line transition-[opacity,scale] duration-700 ease-out-expo sm:flex",
                isActive ? "scale-100 opacity-100" : "scale-50 opacity-0",
              )}
            >
              {item.icon}
            </span>
            <span
              className={cn(
                "block transition-colors duration-700 ease-out-quart",
                isActive ? "text-ink" : "text-ink-faint",
              )}
            >
              {item.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
