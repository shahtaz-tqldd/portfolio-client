"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import type { Project } from "@/lib/types";
import { SectionBackground } from "@/components/backgrounds/SectionBackground";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { MetricCounter } from "@/components/motion/MetricCounter";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { DiagramViewer } from "@/components/diagrams/DiagramViewer";
import { MediaGallery } from "./MediaGallery";
import { ChapterNav, type Chapter } from "./ChapterNav";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { StackRegistry } from "@/components/ui/StackRegistry";
import { StatCard } from "@/components/ui/StatCard";
import { BarChart } from "@/components/ui/BarChart";
import { EASE, cn } from "@/lib/utils";

const chapters: Chapter[] = [
  { id: "overview", label: "Overview" },
  { id: "media", label: "Gallery" },
  { id: "constraints", label: "Constraints" },
  { id: "architecture", label: "Architecture" },
  { id: "data-model", label: "Data model" },
  { id: "tech-stack", label: "Tech stack" },
  { id: "decisions", label: "Decisions" },
  { id: "challenges", label: "Challenges" },
  { id: "results", label: "Results" },
];

export function CaseStudy({
  project: p,
  next,
}: {
  project: Project;
  next: Project;
}) {
  return (
    <article>
      <HeroBanner p={p} />

      <div className="container-x grid gap-12 pb-24 lg:grid-cols-[220px_1fr] xl:grid-cols-[240px_1fr]">
        <ChapterNav chapters={chapters} accent={p.accent} />
        <div className="min-w-0 space-y-28">
          <OverviewChapter p={p} />
          <MediaChapter p={p} />
          <ConstraintsChapter p={p} />
          <ArchitectureChapter p={p} />
          <DataModelChapter p={p} />
          <TechStackChapter p={p} />
          <DecisionsChapter p={p} />
          <ChallengesChapter p={p} />
          <ResultsChapter p={p} />
        </div>
      </div>

      <NextProject next={next} />
    </article>
  );
}

/* ------------------------------- 1. hero banner ---------------------------- */

function HeroBanner({ p }: { p: Project }) {
  return (
    <header className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
      <SectionBackground from="left" tint="teal" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full blur-[130px] opacity-30"
        style={{ background: p.accent }}
      />

      <div className="container-x">
        <Reveal y={10} duration={0.5}>
          <p className="kicker flex flex-wrap items-center gap-3">
            <Link
              href="/#projects"
              className="text-muted transition-colors hover:text-accent"
            >
              ← Case studies
            </Link>
            <span className="h-px w-8 bg-accent/60" aria-hidden />
            <span className="text-muted/70 uppercase tracking-[0.22em]">
              {p.tagline}
            </span>
          </p>
        </Reveal>

        <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          <SplitText text={p.title} mode="chars" stagger={0.02} amount={0.1} />
        </h1>

        <Reveal
          delay={0.25}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
        >
          {p.summary}
        </Reveal>

        <RevealGroup
          className="mt-10 flex flex-wrap gap-x-10 gap-y-4"
          stagger={0.08}
        >
          <Meta label="Role" value={p.role} />
          <Meta label="Timeline" value={p.timeline} />
        </RevealGroup>

        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-3">
            {p.links.map((l) => (
              <MagneticButton
                key={l.label}
                href={l.href}
                variant="ghost"
                external
                className="!px-5 !py-2.5"
              >
                {l.label} <ArrowUpRight className="size-3.5" />
              </MagneticButton>
            ))}
          </div>
        </Reveal>
      </div>
    </header>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <RevealItem>
      <div>
        <p className="font-mono text-[10px] tracking-[0.24em] text-muted uppercase">
          {label}
        </p>
        <p className="mt-1.5 font-mono text-[13px] text-fg">{value}</p>
      </div>
    </RevealItem>
  );
}

/* ------------------------------- 2. overview ------------------------------- */

function OverviewChapter({ p }: { p: Project }) {
  return (
    <section
      id="overview"
      aria-labelledby="h-overview"
      className="scroll-mt-28"
    >
      <SectionHeading
        index="01"
        kicker="Overview & problem"
        title="Why this existed"
        headingId="h-overview"
      />
      <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-muted sm:text-lg">
        {p.problem.paragraphs.map((para, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p>{para}</p>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15} className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <p className="font-mono text-[10px] tracking-[0.22em] text-warm uppercase">
            Who it affected
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">
            {p.problem.affected}
          </p>
        </div>
        <div className="card border-accent/30 bg-accent/[0.05] p-5">
          <p className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
            Why it mattered
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">
            {p.problem.why}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------ 3. constraints ----------------------------- */

function ConstraintsChapter({ p }: { p: Project }) {
  return (
    <section
      id="constraints"
      aria-labelledby="h-constraints"
      className="scroll-mt-28"
    >
      <SectionHeading
        index="02"
        kicker="Constraints & goals"
        title="What it had to satisfy"
        headingId="h-constraints"
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {p.constraints.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.06}>
            <StatCard
              label={c.label}
              value={c.value}
              note={c.note}
              className="h-full"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ 4. architecture ---------------------------- */

function ArchitectureChapter({ p }: { p: Project }) {
  return (
    <section
      id="architecture"
      aria-labelledby="h-architecture"
      className="scroll-mt-28"
    >
      <SectionHeading
        index="03"
        kicker="System architecture"
        title="How the system fits together"
        headingId="h-architecture"
      />
      <Reveal className="mt-8">
        <DiagramViewer
          def={{ views: p.architecture.views }}
          caption={`${p.title} architecture`}
        />
      </Reveal>
      <ul className="mt-6 max-w-3xl space-y-2.5">
        {p.architecture.notes.map((n, i) => (
          <Reveal key={i} delay={i * 0.05} as="li">
            <p className="flex gap-3 text-sm leading-relaxed text-muted">
              <span
                aria-hidden
                className="mt-[7px] size-1 shrink-0 rounded-full bg-accent/70"
              />
              {n}
            </p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------- 5. data model ----------------------------- */

function DataModelChapter({ p }: { p: Project }) {
  return (
    <section
      id="data-model"
      aria-labelledby="h-data-model"
      className="scroll-mt-28"
    >
      <SectionHeading
        index="04"
        kicker="Data model & database design"
        title="Schema is the architecture"
        headingId="h-data-model"
      />
      <Reveal className="mt-8">
        <DiagramViewer
          def={{ views: p.erDiagram.views }}
          caption={`${p.title} data model`}
        />
      </Reveal>
      <Reveal delay={0.1} className="mt-6 max-w-3xl">
        <div className="rounded-2xl border border-accent/30 bg-accent/[0.05] p-5">
          <p className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
            Why this schema
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-[15px]">
            {p.erDiagram.why}
          </p>
        </div>
      </Reveal>
      <ul className="mt-6 max-w-3xl space-y-2.5">
        {p.erDiagram.notes.map((n, i) => (
          <Reveal key={i} delay={i * 0.05} as="li">
            <p className="flex gap-3 font-mono text-[12px] leading-relaxed text-muted">
              <span
                aria-hidden
                className="mt-[7px] size-1 shrink-0 rounded-full bg-warm/80"
              />
              {n}
            </p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------- 6. decisions ------------------------------ */

function DecisionsChapter({ p }: { p: Project }) {
  return (
    <section
      id="decisions"
      aria-labelledby="h-decisions"
      className="scroll-mt-28"
    >
      <SectionHeading
        index="05"
        kicker="Engineering decisions"
        title="Decision → alternatives → why"
        headingId="h-decisions"
      />
      <div className="mt-8 space-y-4">
        {p.decisions.map((d, i) => (
          <DecisionCard key={d.title} d={d} index={i} />
        ))}
      </div>
    </section>
  );
}

function DecisionCard({
  d,
  index,
}: {
  d: Project["decisions"][number];
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);
  const panelId = `decision-panel-${index}`;

  return (
    <Reveal delay={index * 0.05}>
      <div
        className={cn(
          "card overflow-hidden transition-colors duration-500",
          open && "border-accent/40",
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 p-5 text-left"
        >
          <span className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-muted/60">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-base font-semibold text-fg sm:text-lg">
              {d.title}
            </span>
          </span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted transition-transform duration-500",
              open && "rotate-180 text-accent",
            )}
          />
        </button>

        <motion.div
          id={panelId}
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="overflow-hidden"
        >
          <div className="border-t border-line p-5">
            <p className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
              Decision
            </p>
            <p className="mt-2 text-sm leading-relaxed text-fg sm:text-[15px]">
              {d.decision}
            </p>

            <p className="mt-5 font-mono text-[10px] tracking-[0.22em] text-warm uppercase">
              Alternatives considered
            </p>
            <ul className="mt-2 space-y-2">
              {d.alternatives.map((a) => (
                <li
                  key={a.name}
                  className="rounded-lg border border-dashed border-line px-4 py-2.5"
                >
                  <p className="font-mono text-xs text-fg">{a.name}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">
                    {a.note}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-5 font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
              Why this one
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">
              {d.why}
            </p>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

/* ------------------------------ 8. challenges ------------------------------ */

function ChallengesChapter({ p }: { p: Project }) {
  return (
    <section
      id="challenges"
      aria-labelledby="h-challenges"
      className="scroll-mt-28"
    >
      <SectionHeading
        index="07"
        kicker="Challenges & solutions"
        title="Where it got hard"
        headingId="h-challenges"
      />
      <div className="space-y-8">
        {p.challenges.map((c, i) => (
          <ChallengeCard key={c.title} c={c} index={i} />
        ))}
      </div>
    </section>
  );
}

function ChallengeCard({
  c,
  index,
}: {
  c: Project["challenges"][number];
  index: number;
}) {
  const hasCode = Boolean(c.before && c.after);
  const [tab, setTab] = useState<"before" | "after">("after");

  return (
    <Reveal delay={index * 0.04}>
      <div className="card p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-warm/40 bg-warm/10 font-mono text-xs text-warm">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-fg">
              {c.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {c.problem}
            </p>
            <p className="mt-3 border-l-2 border-accent/60 pl-4 text-sm leading-relaxed text-fg/90">
              {c.solution}
            </p>
          </div>
        </div>

        {hasCode ? (
          <div className="mt-6">
            <div
              className="mb-3 inline-flex rounded-full border border-line p-1"
              role="tablist"
              aria-label="Before or after code"
            >
              {(["before", "after"] as const).map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "rounded-full px-4 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors duration-300",
                    tab === t
                      ? t === "after"
                        ? "bg-accent/15 text-accent"
                        : "bg-surface2 text-fg"
                      : "text-muted hover:text-fg",
                  )}
                >
                  {t === "after" ? "✓ after" : "✗ before"}
                </button>
              ))}
            </div>
            <CodeBlock sample={tab === "after" ? c.after! : c.before!} />
          </div>
        ) : null}

        <p className="mt-5 flex items-start gap-2.5 font-mono text-[12px] leading-relaxed text-muted">
          <ArrowRight
            className="mt-0.5 size-3.5 shrink-0 text-accent"
            aria-hidden
          />
          {c.outcome}
        </p>
      </div>
    </Reveal>
  );
}

/* -------------------------------- 9. results ------------------------------- */

function ResultsChapter({ p }: { p: Project }) {
  return (
    <section id="results" aria-labelledby="h-results" className="scroll-mt-28">
      <SectionHeading
        index="08"
        kicker="Results & impact"
        title="What changed"
        headingId="h-results"
      />
      <RevealGroup
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.09}
      >
        {p.results.metrics.map((m, i) => (
          <RevealItem key={i}>
            <div className="card flex h-full flex-col gap-3 p-5">
              <MetricCounter metric={m} size="md" />
              <p className="font-mono text-[10px] leading-snug tracking-wider text-muted uppercase">
                {m.label}
              </p>
              {m.sub ? (
                <p className="text-[12px] text-muted/80">{m.sub}</p>
              ) : null}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      {p.results.chart ? (
        <Reveal delay={0.15} className="mt-6">
          <BarChart data={p.results.chart} />
        </Reveal>
      ) : null}

      {p.results.notes ? (
        <div className="mt-6 space-y-2">
          {p.results.notes.map((n, i) => (
            <Reveal key={i} as="li">
              <p className="font-mono text-[11px] text-muted/70">// {n}</p>
            </Reveal>
          ))}
        </div>
      ) : null}
    </section>
  );
}

/* ------------------------------- 10. tech stack ---------------------------- */

/* layer tints echo the diagram palette */
const LAYER_ACCENTS = [
  "#5eead4",
  "#38bdf8",
  "#fbbf24",
  "#f0abfc",
  "#a3e635",
  "#94a3b8",
  "#fb923c",
];
/* relationships already stated in each tool's "why" — linked when both exist in a project */
const KNOWN_LINKS: [string, string][] = [
  ["Django", "PostgreSQL"],
  ["Django", "Redis"],
  ["Django", "Celery"],
  ["Django", "Stripe"],
  ["Django", "Docker"],
  ["Django Channels", "Redis"],
  ["Celery", "Redis"],
  ["FastAPI", "Google ADK"],
  ["FastAPI", "Docker"],
  ["Google ADK", "Gemini"],
  ["Google ADK", "pgvector"],
  ["pgvector", "PostgreSQL"],
];

function TechStackChapter({ p }: { p: Project }) {
  const totalTools = p.techStack.reduce((n, l) => n + l.tools.length, 0);
  const toolNames = new Set(
    p.techStack.flatMap((l) => l.tools.map((t) => t.name)),
  );

  const layers = p.techStack.map((layer, i) => ({
    key: layer.layer
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, ""),
    label: layer.layer,
    accent: LAYER_ACCENTS[i % LAYER_ACCENTS.length],
    tools: layer.tools.map((t) => ({
      name: t.name,
      why: t.why,
      links: KNOWN_LINKS.filter(
        ([a, b]) =>
          (a === t.name && toolNames.has(b)) ||
          (b === t.name && toolNames.has(a)),
      )
        .map(([a, b]) => (a === t.name ? b : a))
        .filter((n) => n !== t.name),
    })),
  }));

  return (
    <section id="tech-stack" aria-labelledby="h-tech" className="scroll-mt-28">
      <SectionHeading
        index="09"
        kicker="Tech stack"
        title="The stack, at a glance"
        lead="Layers as swimlanes, tools as nodes. Hover or tap a tool to pin it — its connections trace across layers, with the why in the side panel."
        headingId="h-tech"
      />
      <div className="mt-8">
        <StackRegistry
          filename="stack.yaml"
          meta={`${p.techStack.length} layers · ${totalTools} tools`}
          layers={layers}
        />
      </div>
    </section>
  );
}

/* -------------------------------- 11. media -------------------------------- */

function MediaChapter({ p }: { p: Project }) {
  return (
    <section id="media" aria-labelledby="h-media" className="scroll-mt-28">
      <SectionHeading
        index="10"
        kicker="Media gallery"
        title="The product in frames"
        headingId="h-media"
      />
      <div className="mt-8">
        <MediaGallery media={p.media} accent={p.accent} />
      </div>
    </section>
  );
}

/* ----------------------------- 13. next project ---------------------------- */

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
        style={{
          background: `radial-gradient(ellipse 60% 80% at 70% 50%, ${next.accent}14, transparent 70%)`,
        }}
      />
      <div className="container-x flex flex-col gap-6 py-20 sm:flex-row sm:items-center sm:justify-between sm:py-24">
        <div>
          <p className="kicker">Next case study</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight transition-colors duration-500 group-hover:text-accent sm:text-6xl">
            <SplitText
              text={next.title}
              mode="words"
              once={false}
              amount={0.1}
            />
          </h2>
          <p className="mt-3 font-mono text-xs tracking-wider text-muted">
            {next.tagline}
          </p>
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
