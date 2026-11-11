import { Reveal } from "@/components/motion/Reveal";
import { ThemeCard } from "@/components/ui/ThemeCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AGENTS } from "@/lib/content";

export function Agents() {
  return (
    <section
      id="agents"
      aria-labelledby="agents-title"
      className="relative pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24"
    >
      <div className="shell">
        <Reveal>
          <SectionLabel index="01">{AGENTS.label}</SectionLabel>
          <h2 id="agents-title" className="mt-6 max-w-[18ch] text-h2 text-ink">
            {AGENTS.title}
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {AGENTS.items.map((item, i) => (
            <Reveal as="li" key={item.emphasis} className="flex" delay={i * 90}>
              <ThemeCard
                className="group flex min-h-[13.5rem] w-full flex-col justify-between rounded-[1.75rem] p-7 sm:min-h-[19rem] sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full bg-corona-soft text-corona-deep ring-1 ring-inset ring-corona/15 transition-[scale,background-color] duration-500 ease-out-expo group-hover:scale-110">
                    <item.icon aria-hidden="true" className="size-6" />
                  </span>
                  <span className="text-sm tabular-nums text-ink-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-10 text-[1.1875rem] leading-[1.42] tracking-[-0.012em] text-ink-2 sm:mt-14">
                  <span className="font-medium text-ink">{item.emphasis}</span> {item.rest}
                </p>
              </ThemeCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
