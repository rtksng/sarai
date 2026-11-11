"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { getLenis, scrollToHash } from "@/lib/scroll";

/**
 * Shared behaviour for both site headers:
 * - `scrolled` once the page leaves the very top;
 * - `hidden` while scrolling down (never while focus is inside the header);
 * - `active` section for the scrollspy;
 * - a mobile menu that locks scroll, makes the page outside the header inert,
 *   closes on Escape / when the viewport grows, and defers in-page navigation
 *   until it has closed.
 */
export function useHeaderState({
  sectionIds,
  homePath = "/",
  desktopQuery = "(min-width: 48rem)",
}: {
  sectionIds: string[];
  homePath?: string;
  desktopQuery?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pendingHash = useRef<string | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 12);
      const delta = y - lastY;
      if (Math.abs(delta) < 6) return;
      const focusInside = headerRef.current?.contains(document.activeElement) ?? false;
      setHidden(delta > 0 && y > 640 && !focusInside);
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const idsKey = sectionIds.join("|");
  useEffect(() => {
    const targets = ["top", ...idsKey.split("|")]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setActive(entry.target.id === "top" ? null : entry.target.id);
        }
      },
      { rootMargin: "-38% 0px -58% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [idsKey]);

  useEffect(() => {
    if (!open) return;
    const outside = ["main", "site-footer"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    outside.forEach((el) => el.setAttribute("inert", ""));
    const lenis = getLenis();
    lenis?.stop();
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia(desktopQuery);
    const onViewport = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onViewport);

    return () => {
      outside.forEach((el) => el.removeAttribute("inert"));
      root.style.overflow = previousOverflow;
      lenis?.start();
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onViewport);
      const hash = pendingHash.current;
      pendingHash.current = null;
      if (hash) {
        requestAnimationFrame(() => {
          scrollToHash(hash);
          window.history.replaceState(null, "", hash === "#top" ? homePath : hash);
        });
      }
    };
  }, [open, desktopQuery, homePath]);

  /** For links inside the open menu: close first, then scroll. */
  const navigateFromMenu = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    pendingHash.current = hash;
    setOpen(false);
  };

  /** Logo: smooth-scroll to the top when already on this version's home. */
  const onLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== homePath) return;
    if (open) return navigateFromMenu(event, "#top");
    event.preventDefault();
    scrollToHash("#top");
    window.history.replaceState(null, "", homePath);
  };

  return {
    scrolled,
    hidden: hidden && !open,
    open,
    setOpen,
    active,
    headerRef,
    toggleRef,
    panelRef,
    navigateFromMenu,
    onLogoClick,
    revealHeader: () => setHidden(false),
  };
}

/** Classes for a menu panel whose visibility flips instantly on open, so focus can land in it. */
export const menuPanelState = (open: boolean) =>
  open
    ? "visible opacity-100 [transition:opacity_500ms_var(--ease-out-quart),visibility_0s]"
    : "invisible opacity-0 [transition:opacity_500ms_var(--ease-out-quart),visibility_0s_500ms]";
