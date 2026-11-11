"use client";

import { PiArrowUp } from "react-icons/pi";
import { cn } from "@/lib/cn";
import { scrollToHash } from "@/lib/scroll";

export function BackToTop({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        scrollToHash("#top");
        window.history.replaceState(null, "", "/");
      }}
      className={cn(
        "group inline-flex h-11 items-center gap-3 rounded-full border border-white/20 pl-5 pr-2 text-sm text-white/85 transition-colors duration-300 hover:border-white/40 hover:text-white",
        className,
      )}
    >
      Back to top
      <span
        aria-hidden="true"
        className="relative flex size-8 items-center justify-center overflow-hidden rounded-full bg-white/10"
      >
        <PiArrowUp className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-[160%]" />
        <PiArrowUp className="absolute size-4 translate-y-[160%] transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
      </span>
    </button>
  );
}
