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

export interface Metric {
  label: string;
  value?: number;
  prefix?: string;
  suffix?: string;
  /** clearly-marked placeholder text used when no real number exists yet */
  placeholder?: string;
  sub?: string;
}

export interface ChartSeries {
  label: string;
  value: number;
  hint?: string;
}

export interface ChartData {
  title: string;
  unit?: string;
  series: ChartSeries[];
  /** marks the values as illustrative (not measured) */
  illustrative?: boolean;
  note?: string;
}

export interface CodeSample {
  lang: "python" | "sql" | "tsx" | "bash";
  filename?: string;
  code: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: "live" | "repo" | "app";
}

export interface MediaItem {
  type: "image" | "video";
  /** real src — leave undefined to render a labelled placeholder */
  src?: string;
  poster?: string;
  caption: string;
  /** placeholder label shown when src is missing */
  placeholderLabel?: string;
  span?: "wide" | "tall" | "big";
}

export interface TechLayer {
  layer: string;
  icon: string;
  tools: { name: string; why: string }[];
}

export interface Project {
  slug: string;
  title: string;
  logo: StaticImageData;
  tagline: string;
  summary: string;
  role: string;
  timeline: string;
  teamSize: string;
  accent: string; // hue used for this project's gradients
  techChips: string[]; // overview card chips
  headlineMetric: Metric;
  problem: {
    paragraphs: string[];
    affected: string;
    why: string;
  };
  constraints: { label: string; value: string; note?: string }[];
  architecture: {
    views: DiagramView[];
    notes: string[];
  };
  erDiagram: {
    views: DiagramView[];
    why: string;
    notes: string[];
  };
  decisions: {
    title: string;
    decision: string;
    alternatives: { name: string; note: string }[];
    why: string;
  }[];
  challenges: {
    title: string;
    problem: string;
    solution: string;
    before?: CodeSample;
    after?: CodeSample;
    outcome: string;
  }[];
  results: {
    metrics: Metric[];
    chart?: ChartData;
    notes?: string[];
  };
  techStack: TechLayer[];
  media: MediaItem[];
  links: ProjectLink[];
  og: { title: string; description: string };
}

export interface IconEntry {
  icon: LucideIcon;
}
