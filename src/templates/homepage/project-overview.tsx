"use client";

import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import type { Project } from "@/lib/types";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { GitHubIcon } from "@/assets/icons/globals";
import { cn } from "@/lib/utils";
import { ProjectPreview } from "@/templates/projects/project-preview";

export function ProjectsOverview({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          index="02"
          kicker="Projects"
          title="Things I have built"
          lead="AI agents, data-heavy platforms and developer tools: each with its architecture and the reasoning behind it."
        />
        <ProjectGrid projects={projects} className="mt-14" />
      </div>
    </section>
  );
}

/**
 * Shared by the home page and /projects so both always match:
 * featured projects as equal cards in 2 columns, then compact projects as "Other builds".
 */
export function ProjectGrid({
  projects,
  className,
}: {
  projects: Project[];
  className?: string;
}) {
  const featured = projects.filter((p) => p.tier === "featured");
  const compact = projects.filter((p) => p.tier === "compact");

  return (
    <div className={className}>
      {featured.length > 0 ? (
        <div className="grid gap-7 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.1} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      ) : null}

      {compact.length > 0 ? (
        <div className="mt-14">
          <h3 className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
            Other builds
          </h3>
          <div className="mt-4 divide-y divide-line border-y border-line">
            {compact.map((p) => (
              <Reveal key={p.slug} y={12}>
                <CompactProjectRow project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ProjectCard({
  project: p,
  wide = false,
}: {
  project: Project;
  wide?: boolean;
}) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group relative block h-full"
      aria-label={`${p.title} case study`}
    >
      <article
        className={cn(
          "card relative flex h-full flex-col overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-accent/40 group-hover:shadow-[0_24px_60px_-28px_var(--glow)]",
          wide && "lg:grid lg:grid-cols-[1.1fr_1fr]",
        )}
      >
        {/* preview */}
        <div
          className={cn(
            "relative overflow-hidden border-b border-line p-5",
            wide && "lg:border-r lg:border-b-0 lg:p-7",
          )}
        >
          <div className="transition-transform duration-700 ease-outexpo group-hover:scale-[1.03]">
            <ProjectPreview
              seed={p.slug}
              accent={p.accent}
              label={p.title}
              logo={p.logo}
            />
          </div>
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col p-6 sm:p-7",
            wide && "lg:justify-center lg:p-10",
          )}
        >
          <div className="flex items-center gap-3">
            <span
              className="size-1.5 shrink-0 rounded-full"
              style={{ background: p.accent }}
              aria-hidden
            />
            <p className="font-mono text-[11px] text-muted">{p.eyebrow}</p>
          </div>

          <h3
            className={cn(
              "mt-3 font-display font-semibold tracking-tight text-fg transition-colors duration-300 group-hover:text-accent",
              wide ? "text-3xl sm:text-4xl" : "text-2xl",
            )}
          >
            {p.title}
          </h3>

          <p
            className={cn(
              "mt-3 flex-1 leading-relaxed text-muted",
              wide ? "text-base lg:flex-none" : "text-sm",
            )}
          >
            {p.summary}
          </p>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4">
            <span className="font-mono text-xs text-muted">{p.role}</span>
            <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-accent">
              CASE STUDY
              <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/** Small row: title, one line, its own links. Not one big anchor, so links can sit inside. */
function CompactProjectRow({ project: p }: { project: Project }) {
  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <Link
            href={`/projects/${p.slug}`}
            className="group inline-flex items-center gap-1.5 font-display text-lg font-semibold text-fg transition-colors hover:text-accent"
          >
            {p.title}
            <ArrowUpRight className="size-3.5 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
          </Link>
          <span className="font-mono text-[11px] text-muted">{p.eyebrow}</span>
        </div>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
          {p.summary}
        </p>
      </div>

      {p.links.length > 0 ? (
        <div className="flex shrink-0 flex-wrap gap-2">
          {p.links.map((l) => {
            const download = l.kind === "download";
            return (
              <a
                key={l.href}
                href={l.href}
                {...(download
                  ? { download: true }
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className="chip hover:border-accent/50 hover:text-accent"
              >
                {l.kind === "repo" ? (
                  <GitHubIcon className="size-3.5" />
                ) : download ? (
                  <Download className="size-3.5" />
                ) : (
                  <ArrowUpRight className="size-3.5" />
                )}
                {l.label}
              </a>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
