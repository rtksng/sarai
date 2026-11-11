import { ImageResponse } from "next/og";
import { LETTERS, MARK_LOWER, MARK_UPPER } from "@/components/brand/logo-paths";
import { SITE } from "@/lib/content";

export const alt = `${SITE.brand} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The Sarai logo (S mark + "ARAI"), ink lettering for the light card. */
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174 47">
<defs>
<linearGradient id="g1" x1="20.4148" y1="0" x2="20.4148" y2="30.693" gradientUnits="userSpaceOnUse"><stop stop-color="#6C6C6C"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient>
<linearGradient id="g2" x1="43.8856" y1="45.8587" x2="43.8856" y2="15.1658" gradientUnits="userSpaceOnUse"><stop stop-color="#6C6C6C"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient>
<mask id="m1" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="10" y="0" width="37" height="31"><path d="${MARK_UPPER}" fill="#fff"/></mask>
<mask id="m2" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="18" y="15" width="37" height="31"><path d="${MARK_LOWER}" fill="#fff"/></mask>
</defs>
<g mask="url(#m1)"><path d="${MARK_UPPER}" fill="none" stroke-width="4.33313" stroke="url(#g1)"/></g>
<g mask="url(#m2)"><path d="${MARK_LOWER}" fill="none" stroke-width="4.33313" stroke="url(#g2)"/></g>
<path d="${LETTERS}" fill="#141a2b"/>
</svg>`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(180deg, #fbfcfe 0%, #f0f4fb 50%, #dce7f6 100%)",
          color: "#141a2b",
        }}
      >
        {/* Horizon */}
        <div
          style={{
            position: "absolute",
            left: -700,
            top: 500,
            width: 2600,
            height: 2600,
            borderRadius: 9999,
            background: "#fbfcfe",
            boxShadow:
              "0 0 0 2px #ffffff, 0 0 28px 6px rgba(160, 214, 240, 0.95), 0 0 120px 30px rgba(110, 160, 235, 0.45)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          width={260}
          height={70}
          src={`data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`}
        />
        <div
          style={{
            display: "flex",
            fontSize: 76,
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            maxWidth: 900,
            marginBottom: 96,
          }}
        >
          {SITE.tagline}
        </div>
      </div>
    ),
    size,
  );
}
