"use client";

import Link from "next/link";
import { ArrowUpRight, Award, GraduationCap } from "lucide-react";
import { experience, type Job } from "@/lib/data/experience";
import { SectionBackground } from "@/components/backgrounds/SectionBackground";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const summary = [{ value: "3+ years", label: "Professional Experience" }];

const EDU_ACCENT = "#fbbf24";

/** Inclusive month count, formatted like "2 yrs 8 mos". */
function duration(start: Date, end: Date | null) {
  const to = end ?? new Date();
  const months = (to.getFullYear() - start.getFullYear()) * 12 + (to.getMonth() - start.getMonth()) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y ? `${y} yr${y > 1 ? "s" : ""}` : "", m ? `${m} mo${m > 1 ? "s" : ""}` : ""]
    .filter(Boolean)
    .join(" ");
}

function JobCard({ job, featured = false }: { job: Job; featured?: boolean }) {
  const current = job.end === null;

  return (
    <article
      className="card relative flex h-full flex-col overflow-hidden p-5 sm:p-7"
      style={{ borderColor: current ? `${job.accent}40` : undefined }}
    >
      <div
        className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full blur-3xl"
        style={{ background: `${job.accent}1a` }}
        aria-hidden
      />

      {/* who / where / when */}
      <header className="relative">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h3
            className={`font-display font-semibold text-fg ${featured ? "text-2xl sm:text-[1.75rem]" : "text-xl sm:text-2xl"}`}
          >
            {job.role}
          </h3>
          {current && (
            <span
              className="rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase"
              style={{ color: job.accent, borderColor: `${job.accent}66` }}
            >
              Current
            </span>
          )}
        </div>

        <p className="mt-1.5 font-mono text-sm" style={{ color: job.accent }}>
          {job.company}
        </p>

        <p className="mt-2 flex flex-wrap items-center gap-x-2 font-mono text-[11px] tracking-[0.15em] text-muted uppercase">
          <span>{job.periodLabel}</span>
          <span aria-hidden className="text-line">/</span>
          <span className="text-fg">{duration(job.start, job.end)}</span>
        </p>

        <p className="mt-3 text-sm leading-snug text-muted !leading-6">{job.about}</p>
      </header>

      <hr className="-mx-8 mt-6"/>

      {/* key points */}
      <ul
        className={`relative pt-5 ${featured ? "space-y-5" : "space-y-3.5"}`}
      >
        {job.highlights.map((h) => (
          <li key={h.lead} className="flex gap-3">
            <span
              aria-hidden
              className="mt-[9px] size-1.5 shrink-0 rounded-full"
              style={{ background: job.accent, boxShadow: `0 0 8px ${job.accent}` }}
            />
            <p className="text-sm leading-snug text-muted">
              <span className="font-semibold text-fg">{h.lead}</span>
              <span className="block mt-1 leading-6"> {h.text}</span>
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Experience() {
  const primary = experience.find((j) => j.end === null) ?? experience[0];
  const others = experience.filter((j) => j.slug !== primary.slug);

  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <SectionBackground from="left" tint="cyan" />

      <div className="container-x">
        {/* header + summary */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="04"
            kicker="Experience"
            title="My Journey in Software Engineering"
            lead="From Engineering thinking to solving actual problems"
          />

          <Reveal delay={0.1}>
            <dl className="flex gap-8 lg:justify-end">
              {summary.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl font-semibold tracking-tight text-fg">{s.value}</dt>
                  <dd className="mt-0.5 font-mono text-[11px] text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* grid: featured left, stack right */}
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {/* left: current role */}
          <Reveal y={14} className="h-full">
            <JobCard job={primary} featured />
          </Reveal>

          {/* right: earlier roles, education, achievements */}
          <div className="flex flex-col gap-4">
            {others.map((job, i) => (
              <Reveal key={job.slug} y={14} delay={0.08 + i * 0.06}>
                <JobCard job={job} />
              </Reveal>
            ))}

            {/* education: amber tint + dashed border so it reads as a different kind of card */}
            <Reveal y={14} delay={0.16}>
              <div
                className="relative overflow-hidden rounded-2xl border border-dashed p-5"
                style={{
                  borderColor: `${EDU_ACCENT}59`,
                  background: `linear-gradient(135deg, ${EDU_ACCENT}14, ${EDU_ACCENT}05 60%, transparent)`,
                }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-xl border bg-[var(--code-bg)]"
                    style={{ borderColor: `${EDU_ACCENT}66`, boxShadow: `0 0 18px -6px ${EDU_ACCENT}` }}
                  >
                    <GraduationCap className="size-5" style={{ color: EDU_ACCENT }} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p
                      className="font-mono text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: EDU_ACCENT }}
                    >
                      Education
                    </p>
                    <p className="mt-1.5 font-display text-base font-semibold text-fg">
                      B.Sc. Materials &amp; Metallurgical Engineering
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-muted">
                      Bangladesh University of Engineering and Technology (BUET) · 2021
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* achievements */}
            <Reveal y={14} delay={0.22}>
              <div className="rounded-2xl border border-line bg-surface p-5">
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="font-display text-2xl font-semibold tracking-tight text-fg">125+</dt>
                    <dd className="mt-0.5 font-mono text-[11px] text-muted">LeetCode problems solved</dd>
                  </div>
                  <div>
                    <dt className="font-display text-2xl font-semibold tracking-tight text-fg">1420+</dt>
                    <dd className="mt-0.5 font-mono text-[11px] text-muted">CodeChef rating (2★)</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}