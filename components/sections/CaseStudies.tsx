import { getImageProps, type StaticImageData } from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CASE_STUDIES } from "@/lib/content";
import { CaseGallery, type GalleryProject } from "./CaseGallery";

/** Optimised (AVIF/WebP, 1080px) URL for a WebGL texture. */
const textureUrl = (src: StaticImageData) => getImageProps({ src, alt: "", width: 540, quality: 78 }).props.src;

export function CaseStudies() {
  const count = CASE_STUDIES.items.length;
  const projects: GalleryProject[] = CASE_STUDIES.items.map((study) => ({
    name: study.name,
    description: study.description,
    href: study.href,
    texture: textureUrl(study.photo.src),
    alt: study.photo.alt,
  }));

  return (
    <section id="case-studies" aria-labelledby="case-studies-title" className="relative py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <SectionLabel index="03">{CASE_STUDIES.label}</SectionLabel>
            <h2 id="case-studies-title" className="mt-6 text-h2 text-ink">
              {CASE_STUDIES.title}
            </h2>
          </div>
          <p className="max-w-[17rem] text-sm leading-relaxed text-ink-3">
            <span className="tabular-nums text-ink">{String(count).padStart(2, "0")}</span> projects. Drag the arc
            to browse; click a card to open it.
          </p>
        </Reveal>
      </div>

      <div className="mt-4 sm:mt-6">
        <CaseGallery projects={projects} linkLabel={CASE_STUDIES.linkLabel} />
      </div>
    </section>
  );
}
