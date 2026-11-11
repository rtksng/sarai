import { LETTERS, MARK_LOWER, MARK_UPPER } from "./logo-paths";

/**
 * The "S" mark: each stroke is drawn inside its own shape (a luminance mask),
 * with a grey-to-white metallic gradient — exactly as in the supplied artwork.
 * Ids are prefixed so several logos can share a page.
 */
function MarkShapes({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-g1`} x1="20.4148" y1="0" x2="20.4148" y2="30.693" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6C6C6C" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id={`${id}-g2`} x1="43.8856" y1="45.8587" x2="43.8856" y2="15.1658" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6C6C6C" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <mask id={`${id}-m1`} style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="10" y="0" width="37" height="31">
          <path d={MARK_UPPER} fill="#FFFFFF" />
        </mask>
        <mask id={`${id}-m2`} style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="18" y="15" width="37" height="31">
          <path d={MARK_LOWER} fill="#FFFFFF" />
        </mask>
      </defs>
      <g mask={`url(#${id}-m1)`}>
        <path d={MARK_UPPER} fill="none" strokeWidth="4.33313" stroke={`url(#${id}-g1)`} />
      </g>
      <g mask={`url(#${id}-m2)`}>
        <path d={MARK_LOWER} fill="none" strokeWidth="4.33313" stroke={`url(#${id}-g2)`} />
      </g>
    </>
  );
}

type LogoProps = {
  className?: string;
  /** Accessible name. Omit when the surrounding link already names it. */
  title?: string;
  /** Unique prefix for gradient/mask ids when the logo appears more than once. */
  idPrefix?: string;
  /** Fill for the "ARAI" lettering (defaults to the current text colour). */
  fill?: string;
};

/** Full Sarai logo — the "S" mark plus "ARAI". Lettering uses currentColor. */
export function Logo({ className, title, idPrefix = "sarai-logo", fill = "currentColor" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 174 47"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <MarkShapes id={idPrefix} />
      <path d={LETTERS} fill={fill} />
    </svg>
  );
}
