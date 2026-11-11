import { Logo } from "@/components/brand/Logo";
import { LEGAL, NAV, SERVICES, SITE } from "@/lib/content";
import { currentYear } from "@/lib/year";
import { Reveal } from "@/components/motion/Reveal";
import { BackToTop } from "./BackToTop";
import { FooterWordmark } from "./FooterWordmark";

const columnHeading = "text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-white/55";
const footerLink =
  "inline-flex items-center gap-1.5 rounded-sm py-1.5 text-white/80 transition-colors duration-300 hover:text-white";

export async function Footer() {
  const year = await currentYear();

  return (
    <footer
      id="site-footer"
      className="relative isolate overflow-hidden bg-night text-white [--focus-ring:var(--color-glow)]"
    >
      {/* Eclipse glow behind the wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(60%_55%_at_50%_100%,oklch(0.55_0.16_250/0.55),oklch(0.4_0.12_255/0.25)_45%,transparent_75%)]"
      />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.07]" />

      <div className="shell pt-20 sm:pt-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-12 lg:col-span-5">
            <Logo idPrefix="logo-footer" title={SITE.brand} className="h-11 w-auto text-white" />
            <p className="mt-6 max-w-sm text-lead text-white/70">{SITE.tagline}.</p>
            <BackToTop className="mt-8" />
          </div>

          <nav aria-labelledby="footer-explore" className="md:col-span-6 lg:col-span-3 lg:col-start-7">
            <h2 id="footer-explore" className={columnHeading}>
              Explore
            </h2>
            <ul className="mt-5 space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={footerLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-6 lg:col-span-3">
            <h2 className={columnHeading}>{SERVICES.label}</h2>
            <ul className="mt-5 space-y-1">
              {SERVICES.items.map((service) => (
                <li key={service.title} className="py-1.5 text-white/80">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Oversized logo, cropped by the bottom bar: the S mark is liquid metal (MetallicPaint) */}
      <Reveal variant="fade" className="shell mt-16 sm:mt-24">
        <FooterWordmark className="translate-y-[8%]" />
      </Reveal>

      <div className="relative border-t border-white/10 bg-night/60 backdrop-blur-sm">
        <div className="shell flex flex-col gap-4 py-6 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}
          </p>
          <ul className="flex gap-6">
            {LEGAL.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </a>
                ) : (
                  item.label
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
