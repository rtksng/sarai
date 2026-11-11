# Sarai Platforms — landing page

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · React Icons · Motion · Lenis · React Bits

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Where things live

| Path | What it holds |
| --- | --- |
| `lib/content.ts` | **All page copy and links** (from the Sarai content inventory) plus case-study photos. Edit text here. |
| `app/globals.css` | Design tokens (OKLCH colours, fluid type scale, easing), hero horizon, reveal and reduced-motion rules. |
| `app/layout.tsx` · `app/page.tsx` | Fonts, metadata, header/footer, section order, JSON-LD. |
| `components/sections/` | Hero, Agents, Lifecycle (bridge arc + expertise + benefits orbits), Case studies (gallery), Services. |
| `components/layout/` | Header (+ `useHeaderState`), Footer, Back to top. |
| `components/reactbits/` | React Bits components (see below). |
| `components/brand/` | Sarai logo (S mark + “ARAI”) from the supplied artwork; lettering follows the text colour. Favicon: `app/icon.svg`. |

## React Bits

MIT + Commons Clause — https://reactbits.dev

- **PatternWaves** — hero background (dependency: `ogl`). Flows for ~4 s, then glides to rest (WCAG 2.2.2); cursor ripples stay live. A CSS dot field paints first and remains the no-WebGL fallback.
- **CircularGallery** — case studies. Adapted: the mouse wheel keeps scrolling the page (drag/swipe moves the arc), and cleanup no longer calls `loseContext()`, which broke the gallery whenever React re-ran its effect; `openAspect` makes every opened card the same size.
- **SpotlightCard** — agent and service cards, via `components/ui/ThemeCard` (light-blue border and shadow).
- **BlurText** — hero headline, rebuilt on CSS keyframes so it animates before hydration.

## Notes

- Case-study links point to the existing pages on www.sarai.group.
- “Privacy Policy” and “Terms & Conditions” are placeholders on the current site; add an `href` in `LEGAL` (`lib/content.ts`) and they become links.
- Motion respects `prefers-reduced-motion` everywhere (smooth scroll, reveals, hero, gallery).

## Case-study images

One image per project in `assets/case-studies/<id>.jpg` (ids are in `CASE_STUDIES`, `lib/content.ts`). Use 1600 × 1067 (3:2) and keep the subject in the centre 52% of the width: that strip is what the portrait cards on the arc show; opened cards show the whole image. Replace a file with the same name and nothing else needs to change. Originals supplied as PNG are kept in `assets/case-studies/new-images/`.
