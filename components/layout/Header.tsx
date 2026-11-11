"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { NAV, SITE } from "@/lib/content";
import { cn } from "@/lib/cn";
import { menuPanelState, useHeaderState } from "./useHeaderState";

const SECTION_IDS = NAV.map((item) => item.href.slice(1));

export function Header() {
  const {
    scrolled,
    hidden,
    open,
    setOpen,
    active,
    headerRef,
    toggleRef,
    panelRef,
    navigateFromMenu,
    onLogoClick,
    revealHeader,
  } = useHeaderState({ sectionIds: SECTION_IDS });

  const elevated = scrolled || open;

  return (
    <header
      ref={headerRef}
      onFocus={revealHeader}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[translate] duration-500 ease-out-expo",
        hidden && "-translate-y-[130%]",
      )}
    >
      {/* Mobile menu panel (sits under the bar so the toggle stays reachable) */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={cn(
          "fixed inset-0 flex flex-col bg-paper/95 px-6 pb-10 pt-32 backdrop-blur-2xl md:hidden",
          menuPanelState(open),
        )}
      >
        <nav aria-label="Primary">
          <ol>
            {NAV.map((item, i) => (
              <li
                key={item.href}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
                className={cn(
                  "border-b border-line transition-[opacity,translate] duration-700 ease-out-expo",
                  open ? "opacity-100" : "translate-y-4 opacity-0",
                )}
              >
                <a
                  href={item.href}
                  onClick={(event) => navigateFromMenu(event, item.href)}
                  aria-current={active === item.href.slice(1) ? "true" : undefined}
                  className="flex items-baseline gap-4 py-4 text-[2.25rem] font-light leading-none tracking-[-0.04em] text-ink"
                >
                  <span className="text-sm font-normal tabular-nums tracking-normal text-ink-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <p className="mt-auto max-w-xs text-ink-2">
          <span className="text-ink">{SITE.brand}</span> — {SITE.tagline}.
        </p>
      </div>

      <div className="shell relative pt-3">
        <div
          className={cn(
            "flex h-[4.25rem] items-center justify-between gap-6 rounded-full border pl-4 pr-2 transition-[background-color,border-color,box-shadow] duration-500 ease-out-quart sm:pl-5",
            elevated
              ? "border-line/80 bg-paper/80 shadow-[0_10px_40px_-20px_oklch(0.2_0.04_265/0.35)] backdrop-blur-xl"
              : "border-transparent",
          )}
        >
          <Link
            href="/"
            onClick={onLogoClick}
            aria-label={`${SITE.brand}, home`}
            className="-m-1 rounded-full p-1"
          >
            <Logo idPrefix="logo-header" className="h-8 w-auto sm:h-9" />
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "inline-flex h-11 items-center rounded-full px-4 text-[0.9375rem] transition-colors duration-300",
                        isActive
                          ? "bg-ink text-paper"
                          : "text-ink-2 hover:bg-ink/[0.06] hover:text-ink",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 items-center gap-3 rounded-full bg-ink pl-5 pr-4 text-sm font-medium text-paper md:hidden"
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute left-0 top-0.5 h-px w-4 bg-current transition-[translate,rotate] duration-500 ease-out-expo",
                  open && "translate-y-1 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0.5 left-0 h-px w-4 bg-current transition-[translate,rotate] duration-500 ease-out-expo",
                  open && "-translate-y-1 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
