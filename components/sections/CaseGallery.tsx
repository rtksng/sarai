"use client";

import { useState } from "react";
import { PiArrowUpRight } from "react-icons/pi";
import CircularGallery from "@/components/reactbits/CircularGallery";

export type GalleryProject = {
  name: string;
  description: string;
  /** Full case study; null hides the link. */
  href: string | null;
  /** Optimised URL used as the WebGL texture. */
  texture: string;
  alt: string;
};

/**
 * Case studies on React Bits' CircularGallery: drag or swipe to travel the
 * arc (the mouse wheel keeps scrolling the page — no scroll trap), arrow keys
 * when focused, click a card to open it with its description. One quiet line underneath
 * follows the centred project and carries its case-study link.
 */
export function CaseGallery({ projects, linkLabel }: { projects: GalleryProject[]; linkLabel: string }) {
  const [active, setActive] = useState(0);
  const project = projects[active] ?? projects[0];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      {/* Vertical wheel scrolls the page; drag / swipe (or a sideways trackpad swipe) moves the arc. */}
      <div className="relative h-[30rem] sm:h-[37.5rem]">
        <CircularGallery
          items={projects.map((p) => ({ image: p.texture, text: p.name, description: p.description, alt: p.alt }))}
          bend={3}
          textColor="#161c2d"
          borderRadius={0.05}
          scrollEase={0.05}
          wheelAxis="horizontal"
          openAspect={1.5}
          shadow={0.3}
          shadowColor="#3f74c4"
          font="600 30px var(--font-albert-sans), sans-serif"
          onActiveChange={setActive}
        />
      </div>

      <div className="shell mt-6 flex min-h-[4.5rem] flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line pt-6">
        <p className="flex items-baseline gap-4" aria-live="polite">
          <span className="text-sm tabular-nums text-ink-3">
            <span className="text-corona-deep">{pad(active + 1)}</span> / {pad(projects.length)}
          </span>
          <span className="text-h3 text-ink">{project.name}</span>
        </p>
        {/* Shown only once the project's case study is published */}
        {project.href && (
          <a
            href={project.href}
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-ink pl-6 pr-1.5 text-[0.9375rem] font-medium text-paper transition-colors duration-300 hover:bg-[oklch(0.27_0.045_265)]"
          >
            {linkLabel}
            <span className="sr-only">: {project.name}</span>
            <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-paper/12">
              <PiArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
            </span>
          </a>
        )}
      </div>
    </>
  );
}
