import { cn } from "@/lib/cn";

type SectionLabelProps = {
  index?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
};

/** Small editorial label that sits above section headings: "01 —— Agents". */
export function SectionLabel({ index, children, className, tone = "light" }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em]",
        tone === "light" ? "text-ink-3" : "text-white/65",
        className,
      )}
    >
      {index && (
        <span className={cn("tabular-nums", tone === "light" ? "text-corona-deep" : "text-glow")}>
          {index}
        </span>
      )}
      {index && (
        <span
          aria-hidden="true"
          className={cn("h-px w-10", tone === "light" ? "bg-line-strong" : "bg-white/25")}
        />
      )}
      <span>{children}</span>
    </p>
  );
}
