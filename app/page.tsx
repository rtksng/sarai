import { Agents } from "@/components/sections/Agents";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Hero } from "@/components/sections/Hero";
import { Lifecycle } from "@/components/sections/Lifecycle";
import { Services } from "@/components/sections/Services";
import { SERVICES, SITE } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  alternateName: SITE.brand,
  url: SITE.url,
  logo: `${SITE.url}/icon.svg`,
  slogan: SITE.tagline,
  description: SITE.description,
  knowsAbout: SERVICES.items.map((service) => service.title),
};

export default function Home() {
  return (
    <>
      <main id="main" tabIndex={-1}>
        <Hero />
        <Agents />
        <Lifecycle />
        <CaseStudies />
        <Services />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
