import { Reveal } from "@/components/motion/Reveal";
import { LIFECYCLE } from "@/lib/content";
import { BenefitsList } from "./BenefitsList";
import { BenefitsOrbits } from "./BenefitsOrbits";
import { LifecycleArc } from "./LifecycleArc";

const subLabel = "text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-ink-3";

export function Lifecycle() {
  const benefits = LIFECYCLE.benefits.map((benefit) => ({
    label: benefit.label,
    icon: <benefit.icon aria-hidden="true" className="size-[55%]" />,
  }));

  return (
    <section id="lifecycle" aria-labelledby="lifecycle-title" className="relative">
      {/* Edge-to-edge band: a soft corona tint that rises out of the page and settles back */}
      <div className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-paper)_0%,oklch(0.965_0.018_245)_22%,oklch(0.952_0.026_240)_62%,var(--color-paper)_100%)] py-24 sm:py-32 lg:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(oklch(0.56_0.16_256/0.16)_1.2px,transparent_1.6px)] [background-size:22px_22px] [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[38%] -z-10 mx-auto h-[28rem] max-w-5xl rounded-full bg-[radial-gradient(closest-side,oklch(0.9_0.06_225/0.55),transparent)] blur-2xl"
        />

        <div className="shell">
          <Reveal>
            <LifecycleArc
              label={LIFECYCLE.label}
              title={LIFECYCLE.title}
              stages={LIFECYCLE.stages}
              weeks={LIFECYCLE.weeks}
            />
          </Reveal>

          {/* Expertise: one quiet typographic line */}
          <Reveal className="mt-16 text-center md:mt-14" delay={120}>
            <h3 className={subLabel}>Expertise</h3>
            <ul className="mt-6 flex flex-col items-center gap-5 md:flex-row md:flex-wrap md:justify-center md:gap-x-0 md:gap-y-5">
              {LIFECYCLE.expertise.map((item, i) => (
                <li key={item.label} className="group flex items-center">
                  {i > 0 && (
                    <span aria-hidden="true" className="mx-7 hidden size-1.5 rounded-full bg-corona/40 md:block" />
                  )}
                  <span className="flex items-center gap-3.5 text-[clamp(1.375rem,0.9rem+1.3vw,1.875rem)] font-light tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-corona-deep">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-paper text-corona-deep shadow-[0_6px_18px_-10px_oklch(0.3_0.08_255/0.5)] ring-1 ring-line transition-[rotate,box-shadow] duration-500 ease-out-expo group-hover:-rotate-12 group-hover:ring-corona/40">
                      <item.icon aria-hidden="true" className="size-5" />
                    </span>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Benefits */}
      <div className="shell pb-20 pt-6 sm:pb-28 lg:pb-32">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-[radial-gradient(70%_55%_at_50%_0%,oklch(0.94_0.035_245),transparent_70%),linear-gradient(180deg,oklch(0.972_0.009_250),oklch(0.95_0.022_244))] px-6 py-20 sm:py-24 lg:py-28">
          <BenefitsOrbits />
          <div className="relative">
            <h3 className={`${subLabel} text-center`}>Benefits</h3>
            <div className="mt-8 sm:mt-10">
              <BenefitsList items={benefits} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
