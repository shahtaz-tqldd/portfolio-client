"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { GitHubIcon } from "@/assets/icons/globals";
import type { Project, ProjectLink } from "@/lib/types";
import { SectionBackground } from "@/components/backgrounds/SectionBackground";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { DiagramViewer } from "@/components/diagrams/DiagramViewer";
import { StackRegistry } from "@/components/ui/StackRegistry";
import { EASE } from "@/lib/utils";

import { MediaGallery } from "./media-gallery";
import { ChapterNav, type Chapter } from "./chapter-nav";

/**
 * Chapters are built from the data that actually exists, so a section with no
 * data is never rendered and the numbering (01, 02, …) always matches the nav.
 */
function buildChapters(p: Project): (Chapter & { render: (index: string) => React.ReactNode })[] {
  const media = (p.media ?? []).filter((m) => m.src);
  const hasDiagram = Boolean(p.architecture?.length);
  const layers = p.techStack.filter((l) => l.tools.length > 0);

  const list: (Chapter & { render: (index: string) => React.ReactNode; show: boolean })[] = [
    {
      id: "overview",
      label: "Overview",
      show: Boolean(p.overview?.problem.length),
      render: (i) => <OverviewChapter p={p} index={i} />,
    },
    {
      id: "gallery",
      label: "Gallery",
      show: media.length > 0,
      render: (i) => (
        <section id="gallery" aria-labelledby="h-gallery" className="scroll-mt-28">
          <SectionHeading index={i} kicker="Gallery" title="The product in frames" headingId="h-gallery" />
          <div className="mt-8">
            <MediaGallery media={media} />
          </div>
        </section>
      ),
    },
    {
      id: "architecture",
      label: hasDiagram ? "Architecture" : "How it works",
      show: hasDiagram || p.howItWorks.length > 0,
      render: (i) => <ArchitectureChapter p={p} index={i} />,
    },
    {
      id: "tech-stack",
      label: "Tech stack",
      show: layers.length > 0,
      render: (i) => <TechStackChapter p={p} layers={layers} index={i} />,
    },
  ];

  return list.filter((c) => c.show);
}

export function CaseStudy({ project: p, next }: { project: Project; next: Project }) {
  const chapters = buildChapters(p);

  return (
    <article>
      <HeroBanner p={p} />

      <div className="container-x grid gap-12 pt-12 pb-24 lg:grid-cols-[220px_1fr] xl:grid-cols-[240px_1fr]">
        <ChapterNav chapters={chapters.map(({ id, label }) => ({ id, label }))} accent={p.accent} />
        <div className="min-w-0 space-y-28">
          {chapters.map((c, i) => (
            <div key={c.id}>{c.render(String(i + 1).padStart(2, "0"))}</div>
          ))}
        </div>
      </div>

      {next.slug !== p.slug ? <NextProject next={next} /> : null}
    </article>
  );
}

/* ---------------------------------- hero ----------------------------------- */

const linkIcon: Record<ProjectLink["kind"], React.ComponentType<{ className?: string }>> = {
  live: ArrowUpRight,
  repo: GitHubIcon,
  download: Download,
};

function HeroBanner({ p }: { p: Project }) {
  return (
    <header className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
      <SectionBackground from="left" tint="teal" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full opacity-30 blur-[130px]"
        style={{ background: p.accent }}
      />

      <div className="container-x">
        <Reveal y={10} duration={0.5}>
          <p className="kicker flex flex-wrap items-center gap-3">
            <span className="h-px w-6 bg-accent/60" aria-hidden />
            <span className="text-xs text-muted/70 uppercase">{p.eyebrow}</span>
          </p>
        </Reveal>

        <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          <SplitText text={p.title} mode="chars" stagger={0.02} amount={0.1} />
        </h1>

        <Reveal delay={0.25} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {p.summary}
        </Reveal>

        <RevealGroup className="mt-10 flex flex-wrap gap-x-10 gap-y-4" stagger={0.08}>
          <Meta label="Role" value={p.role} />
          {p.timeline ? <Meta label="Timeline" value={p.timeline} /> : null}
        </RevealGroup>

        {p.links.length > 0 ? (
          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
            {p.links.map((l, i) => {
              const Icon = linkIcon[l.kind];
              return (
                <MagneticButton
                  key={l.href}
                  href={l.href}
                  variant={i === 0 ? "primary" : "ghost"}
                  external={l.kind !== "download"}
                  download={l.kind === "download"}
                  className="!px-5 !py-2.5"
                >
                  {l.label} <Icon className="size-3.5" />
                </MagneticButton>
              );
            })}
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <RevealItem>
      <div>
        <p className="font-mono text-[10px] tracking-[0.24em] text-muted uppercase">{label}</p>
        <p className="mt-1.5 font-mono text-[13px] text-fg">{value}</p>
      </div>
    </RevealItem>
  );
}

/* -------------------------------- overview --------------------------------- */

function OverviewChapter({ p, index }: { p: Project; index: string }) {
  const o = p.overview!;
  return (
    <section id="overview" aria-labelledby="h-overview" className="scroll-mt-28">
      <SectionHeading index={index} kicker="Overview" title="Why this exists" headingId="h-overview" />
      <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-muted sm:text-lg">
        {o.problem.map((para, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p>{para}</p>
          </Reveal>
        ))}
      </div>
      {o.audience ? (
        <Reveal delay={0.15} className="mt-8 max-w-3xl">
          <div className="rounded-2xl border border-accent/30 bg-accent/[0.05] p-5">
            <p className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">Who it&apos;s for</p>
            <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-[15px]">{o.audience}</p>
          </div>
        </Reveal>
      ) : null}
    </section>
  );
}

/* ---------------------------- architecture + how --------------------------- */

function ArchitectureChapter({ p, index }: { p: Project; index: string }) {
  const hasDiagram = Boolean(p.architecture?.length);
  return (
    <section id="architecture" aria-labelledby="h-architecture" className="scroll-mt-28">
      <SectionHeading
        index={index}
        kicker={hasDiagram ? "Architecture" : "How it works"}
        title={hasDiagram ? "How the system fits together" : "How it works"}
        headingId="h-architecture"
      />

      {hasDiagram ? (
        <Reveal className="mt-8">
          <DiagramViewer def={{ views: p.architecture! }} caption={`${p.title} architecture`} />
        </Reveal>
      ) : null}

      {p.howItWorks.length > 0 ? (
        <div className={hasDiagram ? "mt-14" : "mt-8"}>
          {hasDiagram ? (
            <h3 className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">How it works</h3>
          ) : null}
          <ol className="mt-4 divide-y divide-line border-y border-line">
            {p.howItWorks.map((pt, i) => (
              <Reveal key={pt.title} as="li" delay={i * 0.04} y={14}>
                <div className="grid gap-2 py-6 sm:grid-cols-[3rem_1fr] sm:gap-4">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <p className="max-w-3xl text-[15px] leading-relaxed text-muted">
                    <span className="font-display font-semibold text-fg">{pt.title}</span> {pt.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  );
}

/* -------------------------------- tech stack -------------------------------- */

/* layer tints echo the diagram palette */
const LAYER_ACCENTS = ["#5eead4", "#38bdf8", "#fbbf24", "#f0abfc", "#a3e635", "#94a3b8", "#fb923c"];

/* relationships between tools, linked when both exist in a project */
const KNOWN_LINKS: [string, string][] = [
  ["Django", "PostgreSQL"],
  ["Django", "DRF"],
  ["Django", "Redis"],
  ["Django", "Celery"],
  ["Django", "WebSocket"],
  ["Django", "Docker"],
  ["Celery", "Redis"],
  ["Celery", "Playwright"],
  ["Google ADK", "Gemini"],
  ["Google ADK", "pgvector"],
  ["pgvector", "PostgreSQL"],
  ["Manifest V3", "chrome.storage.session"],
  ["JavaScript", "Shadow DOM"],
];

function TechStackChapter({ p, layers, index }: { p: Project; layers: Project["techStack"]; index: string }) {
  const totalTools = layers.reduce((n, l) => n + l.tools.length, 0);
  const toolNames = new Set(layers.flatMap((l) => l.tools.map((t) => t.name)));

  const stackLayers = layers.map((layer, i) => ({
    key: layer.layer.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
    label: layer.layer,
    accent: LAYER_ACCENTS[i % LAYER_ACCENTS.length],
    tools: layer.tools.map((t) => ({
      name: t.name,
      why: t.why,
      links: KNOWN_LINKS.filter(
        ([a, b]) => (a === t.name && toolNames.has(b)) || (b === t.name && toolNames.has(a)),
      ).map(([a, b]) => (a === t.name ? b : a)),
    })),
  }));

  return (
    <section id="tech-stack" aria-labelledby="h-tech" className="scroll-mt-28">
      <SectionHeading
        index={index}
        kicker="Tech stack"
        title="The stack, at a glance"
        lead="Layers as swimlanes, tools as nodes. Hover or tap a tool to see what it's for and what it connects to."
        headingId="h-tech"
      />
      <div className="mt-8">
        <StackRegistry
          filename="stack.yaml"
          meta={`${layers.length} layers · ${totalTools} tools`}
          layers={stackLayers}
        />
      </div>
    </section>
  );
}

/* -------------------------------- next project ------------------------------ */

function NextProject({ next }: { next: Project }) {
  return (
    <Link
      href={`/projects/${next.slug}`}
      className="group relative block overflow-hidden border-t border-line"
      aria-label={`Next case study: ${next.title}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse 60% 80% at 70% 50%, ${next.accent}14, transparent 70%)` }}
      />
      <div className="container-x flex flex-col gap-6 py-20 sm:flex-row sm:items-center sm:justify-between sm:py-24">
        <div>
          <p className="kicker">Next case study</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight transition-colors duration-500 group-hover:text-accent sm:text-6xl">
            <SplitText text={next.title} mode="words" once={false} amount={0.1} />
          </h2>
          <p className="mt-3 font-mono text-xs tracking-wider text-muted">{next.eyebrow}</p>
        </div>
        <motion.span
          className="grid size-16 shrink-0 place-items-center rounded-full border border-linestrong transition-colors duration-500 group-hover:border-accent group-hover:text-accent sm:size-20"
          whileHover={{ rotate: -45 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <ArrowRight className="size-6 sm:size-7" />
        </motion.span>
      </div>
    </Link>
  );
}
