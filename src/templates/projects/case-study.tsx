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
import { CursorTip } from "@/components/ui/CursorTip";
import { EASE } from "@/lib/utils";

import { MediaGallery } from "./media-gallery";

/**
 * Sections are built from the data that actually exists, so a section with no
 * data is never rendered and the numbering (01, 02, …) always matches.
 */
function buildSections(
  p: Project,
): { id: string; render: (index: string) => React.ReactNode }[] {
  const media = (p.media ?? []).filter((m) => m.src);
  const hasDiagram = Boolean(p.architecture?.length);
  const layers = p.techStack.filter((l) => l.tools.length > 0);

  const list: {
    id: string;
    render: (index: string) => React.ReactNode;
    show: boolean;
  }[] = [
    {
      id: "overview",
      show: Boolean(p.overview?.problem.length) || Boolean(p.features?.length),
      render: (i) => <OverviewSection p={p} index={i} />,
    },
    {
      id: "gallery",
      show: media.length > 0,
      render: (i) => (
        <section
          id="gallery"
          aria-labelledby="h-gallery"
          className="scroll-mt-28"
        >
          <SectionHeading
            index={i}
            kicker="Gallery"
            title="The product in frames"
            headingId="h-gallery"
          />
          <div className="mt-8">
            <MediaGallery media={media} />
          </div>
        </section>
      ),
    },
    {
      id: "architecture",
      show: hasDiagram || p.howItWorks.length > 0,
      render: (i) => <ArchitectureSection p={p} index={i} />,
    },
    {
      id: "tech-stack",
      show: layers.length > 0,
      render: (i) => <TechStackSection layers={layers} index={i} />,
    },
  ];

  return list.filter((s) => s.show);
}

export function CaseStudy({
  project: p,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const sections = buildSections(p);

  return (
    <article>
      <HeroBanner p={p} />
      <div className="container-x pb-24 space-y-28">
        {sections.map((s, i) => (
          <div key={s.id}>{s.render(String(i + 1).padStart(2, "0"))}</div>
        ))}
      </div>

      {next.slug !== p.slug ? <NextProject next={next} /> : null}
    </article>
  );
}

/* ---------------------------------- hero ----------------------------------- */

const linkIcon: Record<
  ProjectLink["kind"],
  React.ComponentType<{ className?: string }>
> = {
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
        <p className="font-mono text-[10px] tracking-[0.24em] text-muted uppercase">
          {label}
        </p>
        <p className="mt-1.5 font-mono text-[13px] text-fg">{value}</p>
      </div>
    </RevealItem>
  );
}

/* ------------------------- overview + features (2-up) ----------------------- */

function OverviewSection({ p, index }: { p: Project; index: string }) {
  const o = p.overview;
  const features = p.features ?? [];
  return (
    <section
      id="overview"
      aria-labelledby="h-overview"
      className="scroll-mt-28"
    >
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading
            index={index}
            kicker="Overview"
            title="The problem & what it does"
            headingId="h-overview"
          />
          {o?.problem.length ? (
            <div>
              <h3 className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
                The problem
              </h3>
              <div className="mt-4 space-y-5 text-base leading-relaxed text-muted">
                {o.problem.map((para, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <p>{para}</p>
                  </Reveal>
                ))}
              </div>
              {o.audience ? (
                <Reveal delay={0.15} className="mt-6">
                  <div className="rounded-2xl border border-accent/30 bg-accent/[0.05] p-5">
                    <p className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
                      Who it&apos;s for
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {o.audience}
                    </p>
                  </div>
                </Reveal>
              ) : null}
            </div>
          ) : null}
        </div>

        {features.length > 0 ? (
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
              Features
            </h3>
            <ul className="mt-1 divide-y divide-line">
              {features.map((f, i) => (
                <Reveal as="li" key={f.title} delay={i * 0.05} y={14}>
                  <div className="py-4">
                    <p className="font-display text-[15px] font-semibold text-fg">
                      {f.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {f.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ---------------------------- architecture + how --------------------------- */

function ArchitectureSection({ p, index }: { p: Project; index: string }) {
  const hasDiagram = Boolean(p.architecture?.length);
  const multiView = (p.architecture?.length ?? 0) > 1;
  return (
    <section
      id="architecture"
      aria-labelledby="h-architecture"
      className="scroll-mt-28"
    >
      <SectionHeading
        index={index}
        kicker={hasDiagram ? "Architecture" : "How it works"}
        title={
          hasDiagram
            ? multiView
              ? "Architecture, view by view"
              : "How the system fits together"
            : "How it works"
        }
        lead={
          hasDiagram && multiView
            ? "Switch tabs for a different cut of the same system. Hover a component for a summary, click it for details, expand for the full page."
            : undefined
        }
        headingId="h-architecture"
      />

      {hasDiagram ? (
        <Reveal className="mt-8">
          <DiagramViewer
            def={{ views: p.architecture! }}
            caption={`${p.title} architecture`}
          />
        </Reveal>
      ) : null}

      {p.howItWorks.length > 0 ? (
        <div className={hasDiagram ? "mt-14" : "mt-8"}>
          {hasDiagram ? (
            <h3 className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
              Key concepts
            </h3>
          ) : null}
          <ol className="mt-4 grid gap-x-12 border-t border-line sm:grid-cols-2">
            {p.howItWorks.map((pt, i) => (
              <Reveal
                key={pt.title}
                as="li"
                delay={i * 0.04}
                y={14}
                className="border-b border-line"
              >
                <div className="py-5">
                  <p className="flex items-baseline gap-3">
                    <span className="shrink-0 font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[15px] font-semibold text-fg">
                      {pt.title}
                    </span>
                  </p>
                  <p className="mt-1.5 pl-7 text-sm leading-relaxed text-muted">
                    {pt.body}
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

function TechStackSection({
  layers,
  index,
}: {
  layers: Project["techStack"];
  index: string;
}) {
  // flat, deduped tool list — hover a chip to see what it's used for
  const seen = new Set<string>();
  const tools = layers
    .flatMap((l) => l.tools)
    .filter((t) => {
      if (seen.has(t.name)) return false;
      seen.add(t.name);
      return true;
    });

  return (
    <section id="tech-stack" aria-labelledby="h-tech" className="scroll-mt-28">
      <Reveal>
        <div className="grid gap-5 py-7 sm:grid-cols-[16rem_1fr] sm:gap-10">
          <div>
            <h2 id="h-tech" className="flex items-baseline gap-3">
              <span className="font-display text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                Tech stack
              </span>
            </h2>
            <p className="text-muted text-xs mt-1">The Key componets that made it possible</p>
          </div>
          <ul className="flex flex-wrap content-start gap-2">
            {tools.map((t) => (
              <li key={t.name}>
                <CursorTip
                  content={
                    <>
                      <p className="flex items-center gap-2 font-display text-[13px] font-semibold text-fg">
                        <span
                          className="size-2 shrink-0 rounded-full bg-accent"
                          aria-hidden
                        />
                        {t.name}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">
                        {t.why}
                      </p>
                    </>
                  }
                >
                  <span className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-fg transition-colors duration-300 hover:border-accent/50 hover:text-accent">
                    {t.name}
                  </span>
                </CursorTip>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
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
            {next.eyebrow}
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
