import type Lenis from "lenis";

/**
 * Shared smooth-scroll API. SmoothScroll registers the Lenis instance here;
 * when Lenis is not running (reduced motion), native scrolling is used.
 */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Move focus to an in-page target without a second scroll jump. */
function focusTarget(target: HTMLElement | null) {
  const el = target ?? document.getElementById("main");
  if (!el) return;
  if (!el.matches("a[href], button, input, select, textarea, [tabindex]")) {
    el.setAttribute("tabindex", "-1");
  }
  el.focus({ preventScroll: true });
}

/**
 * Smoothly scroll to `#id` (or the top for `#` / `#top`), then hand focus to
 * the target so keyboard and screen-reader users continue from there.
 */
export function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const target = id && id !== "top" ? document.getElementById(id) : null;
  if (id && id !== "top" && !target) return false;

  const reduce = prefersReducedMotion();
  const top = target
    ? target.getBoundingClientRect().top + window.scrollY
    : 0;

  if (lenis && !reduce) {
    lenis.scrollTo(top, {
      duration: 1.5,
      easing: easeOutExpo,
      onComplete: () => focusTarget(target),
    });
  } else {
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    focusTarget(target);
  }
  return true;
}
