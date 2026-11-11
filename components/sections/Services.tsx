import { PiArrowRight } from "react-icons/pi";
import { Reveal } from "@/components/motion/Reveal";
import { ThemeCard } from "@/components/ui/ThemeCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SERVICES } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

/** Six service cards — same card language as the Agents section. */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative pb-20 sm:pb-28 lg:pb-32">
      <div className="shell">
        <div className="rounded-[2rem] bg-mist px-5 py-16 sm:rounded-[2.5rem] sm:px-10 sm:py-20 lg:px-14 lg:py-24">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <SectionLabel index="04">{SERVICES.label}</SectionLabel>
              <h2 id="services-title" className="mt-6 text-h2 text-ink">
                {SERVICES.title}
              </h2>
            </div>
            <p className="max-w-md text-lead text-ink-2 lg:col-span-5 lg:pb-2">{SERVICES.intro}</p>
          </Reveal>

          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {SERVICES.items.map((service, i) => (
              <Reveal as="li" key={service.title} className="flex" delay={(i % 3) * 90}>
                <ThemeCard
                  className="group flex w-full flex-col rounded-[1.75rem] p-7 sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-full bg-corona-soft text-corona-deep ring-1 ring-inset ring-corona/15 transition-[scale] duration-500 ease-out-expo group-hover:scale-110">
                      <service.icon aria-hidden="true" className="size-6" />
                    </span>
                    <span className="text-sm tabular-nums text-ink-3">{pad(i + 1)}</span>
                  </div>

                  <h3 className="mt-10 text-h3 text-ink">{service.title}</h3>
                  <p className="mt-3 text-[0.9688rem] leading-relaxed text-ink-2">{service.description}</p>

                  <div className="mt-auto pt-8">
                    <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-3">
                      {SERVICES.toolsLabel}
                    </p>
                    <ul aria-label={`${service.title}: ${SERVICES.toolsLabel.toLowerCase()}`} className="mt-3 flex min-h-[4.75rem] flex-wrap content-start gap-2">
                      {service.tools.map((tool) => (
                        <li
                          key={tool.name}
                          className="inline-flex items-center gap-2 rounded-full border border-line bg-paper py-1.5 pl-2.5 pr-3.5 text-sm text-ink-2"
                        >
                          <tool.icon aria-hidden="true" className="size-4 text-corona-deep" />
                          {tool.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ThemeCard>
              </Reveal>
            ))}
          </ul>

          {SERVICES.more.href && (
            <a
              href={SERVICES.more.href}
              className="group mt-12 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink"
            >
              <span className="border-b border-ink/30 pb-0.5 transition-colors duration-300 group-hover:border-ink">
                {SERVICES.more.label}
              </span>
              <PiArrowRight aria-hidden="true" className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
