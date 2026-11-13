import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";

/* ---------------------------------- site ---------------------------------- */

export interface NavLink {
  id: string;
  label: string;
}

/* --------------------------------- skills --------------------------------- */

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  icon: string; // lucide icon key resolved in the component
  tools: { name: string; note: string }[];
}

/* ------------------------------- experience ------------------------------- */

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  points: string[];
}

/* -------------------------------- diagrams -------------------------------- */

export type NodeKind =
  | "client"
  | "widget"
  | "api"
  | "ws"
  | "queue"
  | "worker"
  | "cache"
  | "db"
  | "vector"
  | "storage"
  | "agent"
  | "llm"
  | "external"
  | "service"
  | "table";

export type EdgeKind = "sync" | "async" | "data";

export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  kind: NodeKind;
  x: number;
  y: number;
  w?: number;
  h?: number;
  desc: string;
  /** For ER "table" nodes */
  rows?: ERRow[];
}

export interface ERRow {
  name: string;
  type: string;
  key?: "pk" | "fk" | "idx" | "vec";
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  kind: EdgeKind;
  dashed?: boolean;
  /** animate flowing dashes (defaults to true for async/data) */
  animate?: boolean;
  /** draw arrowheads on both ends (bidirectional) */
  both?: boolean;
}

export interface DiagramGroup {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DiagramView {
  id: string;
  label: string;
  width: number;
  height: number;
  note?: string;
  groups?: DiagramGroup[];
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export interface DiagramDef {
  views: DiagramView[];
}

/* -------------------------------- projects -------------------------------- */

export interface ProjectLink {
  label: string;
  href: string;
  kind: "live" | "repo" | "download";
}

/** Only real media. Items without a src are never rendered. */
export interface MediaItem {
  type: "image" | "video";
  src: string;
  poster?: string;
  caption: string;
  span?: "wide" | "tall" | "big";
}

export interface TechLayer {
  layer: string;
  tools: { name: string; why: string }[];
}

/** One core architecture point: a short bold title + 2–3 plain-language sentences. */
export interface HowItWorksPoint {
  title: string;
  body: string;
}

/** A user-facing capability worth calling out on the case study. */
export interface Feature {
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  /** Listing + "next case study" order (ascending). */
  order: number;
  /** featured = full card + full case study; compact = small card + short page. */
  tier: "featured" | "compact";
  eyebrow: string;
  title: string;
  summary: string;
  role: string;
  /** Omit when unknown; the row is hidden. */
  timeline?: string;
  logo?: StaticImageData;
  accent: string;
  /** Shown on the OG image. */
  techChips: string[];
  overview?: {
    problem: string[];
    audience?: string;
  };
  media?: MediaItem[];
  /** High-level view(s) for the interactive diagram. */
  architecture?: DiagramView[];
  /** Notable, user-facing capabilities with a short explanation each. */
  features?: Feature[];
  howItWorks: HowItWorksPoint[];
  techStack: TechLayer[];
  links: ProjectLink[];
  og: { title: string; description: string };
}

export interface IconEntry {
  icon: LucideIcon;
}
