"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode, type Ref } from "react";

/**
 * Scroll reveal for server-rendered content.
 *
 * Content is fully visible in the server HTML (no-JS and SEO safe). After this
 * element hydrates, it is hidden only if it is still below the fold, then
 * revealed once on entry (styles: `[data-reveal]` in globals.css). The state
 * lives in a DOM attribute React never renders, so hydration cannot mismatch
 * and revealing costs no re-render. One IntersectionObserver serves every
 * instance. Reduced motion leaves everything as-is.
 */
let observer: IntersectionObserver | null = null;
const onEnter = new WeakMap<Element, () => void>();

function observe(el: Element, callback: () => void) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        onEnter.get(entry.target)?.();
        onEnter.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  onEnter.set(el, callback);
  observer.observe(el);
  return () => {
    onEnter.delete(el);
    observer?.unobserve(el);
  };
}

type RevealProps = {
  as?: ElementType;
  /** Stagger delay in ms. */
  delay?: number;
  /** "up" rises into place; "fade" only fades. */
  variant?: "up" | "fade";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
};

export function Reveal({ as: Tag = "div", delay = 0, variant = "up", className, style, children, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) return;
    el.dataset.reveal = "out";
    return observe(el, () => {
      el.dataset.reveal = "in";
    });
  }, []);

  return (
    <Tag
      ref={ref as Ref<HTMLElement>}
      id={id}
      className={className}
      data-reveal-variant={variant === "fade" ? "fade" : undefined}
      style={delay ? ({ "--reveal-delay": `${delay}ms`, ...style } as CSSProperties) : style}
    >
      {children}
    </Tag>
  );
}
