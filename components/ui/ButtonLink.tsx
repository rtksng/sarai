import type { IconType } from "react-icons";
import { PiArrowDown } from "react-icons/pi";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text";
  icon?: IconType;
  className?: string;
  external?: boolean;
};

const base =
  "group relative inline-flex h-12 items-center rounded-full text-[0.9375rem] font-medium tracking-[-0.005em] " +
  "transition-[background-color,border-color,box-shadow,transform] duration-300 ease-out-quart active:scale-[0.98]";

const variants = {
  primary:
    "gap-3 bg-ink pl-6 pr-1.5 text-paper shadow-[0_10px_30px_-12px_oklch(0.2_0.04_265/0.55)] hover:bg-[oklch(0.27_0.045_265)] hover:shadow-[0_16px_36px_-14px_oklch(0.2_0.04_265/0.6)]",
  secondary:
    "border border-line-strong/80 bg-paper/60 px-6 text-ink backdrop-blur-md hover:border-ink/25 hover:bg-paper",
  /** Quiet companion to a primary button: underline draws in on hover. */
  text: "px-1 text-ink after:absolute after:inset-x-1 after:bottom-3 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-[scale] after:duration-500 after:ease-out-expo hover:after:origin-left hover:after:scale-x-100",
};

/**
 * Pill-shaped link styled as a button. The primary variant carries an icon
 * that swaps on hover (the outgoing arrow leaves, a fresh one slides in).
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon: Icon = PiArrowDown,
  className,
  external,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-paper/12"
        >
          <Icon className="size-[1.05rem] transition-transform duration-500 ease-out-expo group-hover:translate-y-[160%]" />
          <Icon className="absolute size-[1.05rem] -translate-y-[160%] transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
        </span>
      )}
    </a>
  );
}
