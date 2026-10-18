"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { SectionBackground } from "@/components/backgrounds/SectionBackground";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectPreview } from "@/components/projects/ProjectPreview";

export function ProjectsOverview({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <SectionBackground from="right" tint="amber" />

      <div className="container-x">
        <SectionHeading
          index="03"
          kicker="Projects"
          title="Case studies, not screenshots"
          lead="Two deep dives into systems I designed — architecture, schema, trade-offs and the parts that went wrong before they went right. Each opens as a full presentation."
        />

        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.12}>
              <ProjectCard project={p} wide={false} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectCard({
  project: p,
  wide,
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
      <article className="card relative flex h-full flex-col overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-accent/40 group-hover:shadow-[0_24px_60px_-28px_var(--glow)]">
        {/* preview */}
        <div className="relative overflow-hidden border-b border-line p-5">
          <div className="transition-transform duration-700 ease-outexpo group-hover:scale-[1.03]">
            <ProjectPreview seed={p.slug} accent={p.accent} label={p.title} logo={p.logo} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span
              className="size-1.5 rounded-full"
              style={{ background: p.accent }}
              aria-hidden
            />
            <p className="font-mono text-[11px] text-muted">{p.tagline}</p>
          </div>

          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-fg transition-colors duration-300 group-hover:text-accent">
            {p.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
            {p.summary.split(":")[0]}.
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
            <span className="font-mono text-xs text-muted">{p.role}</span>
            <span className="flex items-center gap-1.5 font-mono text-xs text-accent">
              CASE STUDY
              <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
