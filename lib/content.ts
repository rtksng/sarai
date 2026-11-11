/**
 * Single source of truth for all page copy.
 *
 * Every string below comes from the Sarai Group website content inventory
 * (reviewed 10 November 2026). Link targets were verified against the live
 * www.sarai.group homepage. Edit copy here — components only render it.
 */
import type { StaticImageData } from "next/image";
import type { IconType } from "react-icons";
// Case-study images: replace a file (same name, ~1600 × 1067, 3:2) to update it.
// Originals supplied as PNG live in assets/case-studies/new-images/.
import truckLotsImage from "@/assets/case-studies/trucklots.jpg";
import greenSightImage from "@/assets/case-studies/greensight.jpg";
import eqipImage from "@/assets/case-studies/eqip.jpg";
import gratiaeImage from "@/assets/case-studies/gratiae.jpg";
import alluviumImage from "@/assets/case-studies/alluvium.jpg";
import lotIqImage from "@/assets/case-studies/lotiq.jpg";
import runirImage from "@/assets/case-studies/runir.jpg";
import {
  PiCubeFocusLight,
  PiDatabaseLight,
  PiSlidersHorizontalLight,
  PiSparkleLight,
  PiStackLight,
  PiMagicWandLight,
  PiSquaresFourLight,
  PiLightningLight,
  PiGaugeLight,
  PiSmileyLight,
  PiTrendUpLight,
  PiTargetLight,
  PiDeviceMobileLight,
  PiBrainLight,
  PiLockKeyLight,
  PiAppWindowLight,
  PiCloudArrowUpLight,
  PiChartLineUpLight,
  PiSealCheckLight,
  PiFilePyLight,
  PiCloudLight,
  PiGraphLight,
  PiShieldCheckLight,
  PiKeyLight,
  PiScanLight,
  PiAtomLight,
  PiHexagonLight,
  PiFileCSharpLight,
  PiAmazonLogoLight,
  PiSteeringWheelLight,
  PiChartBarLight,
  PiChartPieSliceLight,
  PiBrowserLight,
  PiMaskHappyLight,
} from "react-icons/pi";

export const SITE = {
  name: "Sarai Group",
  brand: "Sarai Platforms",
  url: "https://www.sarai.group",
  title: "Sarai Group | AI Solutions & Digital Transformation",
  tagline: "Your bridge to digital transformation excellence",
  description:
    "Sarai Platforms is your bridge to digital transformation excellence: agents for bespoke digital transformation, from ideation to implementation — rapid prototyping, data assets, tailored AI solutions and AI-enhanced business capabilities.",
} as const;

export type NavItem = { label: string; href: `#${string}` };

export const NAV: NavItem[] = [
  { label: "Agents", href: "#agents" },
  { label: "Lifecycle", href: "#lifecycle" },
  { label: "Case studies", href: "#case-studies" },
  { label: "Services", href: "#services" },
];

/* 01 — Header and hero ---------------------------------------------------- */

export const HERO = {
  title: "Your bridge to digital transformation excellence",
  /** Phrase kept on one line on large screens. */
  keepTogether: "digital transformation",
  /** Composed from the two section titles that follow the hero. */
  lead: "Agents for bespoke digital transformation, from ideation to implementation.",
  primaryCta: { label: "Explore our services", href: "#services" },
  secondaryCta: { label: "View case studies", href: "#case-studies" },
} as const;

/* 02 — Agents for bespoke digital transformation ------------------------- */

export type Agent = { emphasis: string; rest: string; icon: IconType };

export const AGENTS = {
  label: "Agents",
  title: "Agents for bespoke digital transformation",
  items: [
    {
      emphasis: "Define digital product concepts",
      rest: "and build prototypes quickly.",
      icon: PiCubeFocusLight,
    },
    {
      emphasis: "Develop data assets",
      rest: "for strategic planning, tactical decisions, and daily operations.",
      icon: PiDatabaseLight,
    },
    {
      emphasis: "Tailor AI solutions",
      rest: "to businesses looking to modernize their digital operations.",
      icon: PiSlidersHorizontalLight,
    },
    {
      emphasis: "Use AI",
      rest: "to enhance business capabilities.",
      icon: PiSparkleLight,
    },
  ] satisfies Agent[],
} as const;

/* 03 — From ideation to implementation ----------------------------------- */

export type LabelledIcon = { label: string; icon: IconType };

export const LIFECYCLE = {
  label: "Digital modernization lifecycle",
  title: "From ideation to implementation",
  stages: [
    "Idea development",
    "Data-informed insights",
    "Rapid prototyping",
    "Deployment at scale",
  ],
  /** Time label for each transition: stages[i] → stages[i + 1]. */
  weeks: [4, 8, 12],
  expertise: [
    { label: "Data asset curation", icon: PiStackLight },
    { label: "AI enhancements", icon: PiMagicWandLight },
    { label: "AI and digital platforms", icon: PiSquaresFourLight },
  ] satisfies LabelledIcon[],
  benefits: [
    { label: "Efficiency", icon: PiLightningLight },
    { label: "Productivity", icon: PiGaugeLight },
    { label: "Experience", icon: PiSmileyLight },
    { label: "Growth", icon: PiTrendUpLight },
    { label: "Impact", icon: PiTargetLight },
  ] satisfies LabelledIcon[],
} as const;

/* 04 — Case studies ------------------------------------------------------- */

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** Photographer / source, when the image needs a credit. */
  credit?: string;
};

export type CaseStudy = {
  id: string;
  name: string;
  description: string;
  /** Full case study; null until it is published (the link is then hidden). */
  href: string | null;
  photo: Photo;
};

export const CASE_STUDIES = {
  label: "Case studies",
  title: "Featured client projects",
  linkLabel: "View case study",
  items: [
    {
      id: "trucklots",
      name: "TruckLots",
      description:
        "A smart truck parking platform giving drivers real-time availability and secure lot access — book a spot fast and skip the wasted fuel and idling from searching.",
      href: "https://www.sarai.group/trucklots.html",
      photo: { src: truckLotsImage, alt: "Truck parking lot at dusk with a gated entry and a route-to-spot map overlay" },
    },
    {
      id: "greensight",
      name: "GreenSight",
      description:
        "An AI-powered carbon intelligence platform that simplifies emissions data, automates sustainability reporting, and helps teams make faster decarbonization decisions.",
      href: null,
      photo: { src: greenSightImage, alt: "Emissions dashboard with a glowing globe above wind turbines, forest and solar panels" },
    },
    {
      id: "eqip",
      name: "EQIP Enterprise AI",
      description:
        "An AI-powered Enterprise Quality Intelligence platform that automates software testing, improves test coverage, and helps teams release higher-quality software faster.",
      href: null,
      photo: { src: eqipImage, alt: "AI chip connecting code, automated test checks and quality dashboards" },
    },
    {
      id: "gratiae",
      name: "Gratiae",
      description:
        "A unified wellness-practice platform that connects booking, clinical care, patient journeys, payments, and operational insights in one system.",
      href: null,
      photo: { src: gratiaeImage, alt: "Wellness platform panels for booking, care, payments and insights around a meditating woman" },
    },
    {
      id: "alluvium",
      name: "Alluvium",
      description:
        "AI-powered document intelligence that extracts and structures data from invoices, PDFs, forms, and scanned documents for faster, accurate processing.",
      href: "https://www.sarai.group/alluvium.html",
      photo: { src: alluviumImage, alt: "Invoices, PDFs, forms and scans flowing into AI that extracts structured, verified data" },
    },
    {
      id: "lotiq",
      name: "LotIQ",
      description:
        "AI-powered parking management connecting drivers and parking admins through intelligent discovery, booking, navigation, payments, and real-time occupancy insights.",
      href: null,
      photo: { src: lotIqImage, alt: "Smart parking lot with a booking app on a phone and an occupancy dashboard on a laptop" },
    },
    {
      id: "runir",
      name: "Runir",
      description:
        "AI governance and monitoring that gives secure visibility into enterprise AI usage — monitor LLM activity, manage risks, enforce policies, and gain actionable insights.",
      href: null,
      photo: { src: runirImage, alt: "AI governance shield surrounded by model activity, risk alerts and policy controls" },
    },
  ] satisfies CaseStudy[],
};

/* 05 — Services ----------------------------------------------------------- */

export type Tool = { name: string; icon: IconType };
export type Service = { title: string; description: string; icon: IconType; tools: Tool[] };

export const SERVICES = {
  label: "Services",
  title: "Our services.",
  intro: "Specialist capabilities that connect strategy, data, technology, and delivery.",
  toolsLabel: "Typical tools",
  /** Shown once it has a destination. */
  more: { label: "View more services", href: undefined as string | undefined },
  items: [
    {
      title: "AI, Data & Cognitive Technologies",
      description: "Turn data into intelligent products, sharper decisions, and scalable automation.",
      icon: PiBrainLight,
      tools: [
        { name: "Python", icon: PiFilePyLight },
        { name: "Azure AI", icon: PiCloudLight },
        { name: "TensorFlow", icon: PiGraphLight },
      ],
    },
    {
      title: "Enterprise Cybersecurity",
      description: "Protect systems, data, and access with security practices built for evolving risks.",
      icon: PiLockKeyLight,
      tools: [
        { name: "SIEM", icon: PiShieldCheckLight },
        { name: "IAM", icon: PiKeyLight },
        { name: "Vulnerability scanning", icon: PiScanLight },
      ],
    },
    {
      title: "Enterprise Application Development",
      description: "Design and build reliable applications for customers, teams, and operations.",
      icon: PiAppWindowLight,
      tools: [
        { name: "React", icon: PiAtomLight },
        { name: "Node.js", icon: PiHexagonLight },
        { name: ".NET", icon: PiFileCSharpLight },
      ],
    },
    {
      title: "Cloud & Infrastructure Modernization",
      description: "Modernize infrastructure for resilient, efficient, and flexible digital operations.",
      icon: PiCloudArrowUpLight,
      tools: [
        { name: "AWS", icon: PiAmazonLogoLight },
        { name: "Azure", icon: PiCloudLight },
        { name: "Kubernetes", icon: PiSteeringWheelLight },
      ],
    },
    {
      title: "Data Analytics & Business Intelligence",
      description: "Make complex data easier to understand, explore, and act on.",
      icon: PiChartLineUpLight,
      tools: [
        { name: "Power BI", icon: PiChartBarLight },
        { name: "Tableau", icon: PiChartPieSliceLight },
        { name: "SQL", icon: PiDatabaseLight },
      ],
    },
    {
      title: "Quality Engineering",
      description: "Build quality into delivery with practical, repeatable testing across every release.",
      icon: PiSealCheckLight,
      tools: [
        { name: "Selenium", icon: PiBrowserLight },
        { name: "Playwright", icon: PiMaskHappyLight },
        { name: "Appium", icon: PiDeviceMobileLight },
      ],
    },
  ] satisfies Service[],
};

/* 06 — Footer ------------------------------------------------------------- */

/**
 * Both legal labels are placeholders on the current homepage. Add an `href`
 * once the pages exist and they will render as links automatically.
 */
export const LEGAL: { label: string; href?: string }[] = [
  { label: "Privacy Policy" },
  { label: "Terms & Conditions" },
];
