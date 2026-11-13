"use client";

import { Fragment } from "react";
import {
  ArrowUpRight,
  Layers,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const stats = [
  { value: "3+ years", label: "Software Engineering Experience" },
  { value: "20+", label: "Projects Delivered" },
];

/** What I'm hired for: reads as a role summary to recruiters, a service menu to clients. */

const services: { icon: LucideIcon; title: string; line: string }[] = [
  {
    icon: Sparkles,
    title: "AI agents & RAG",
    line: "AI-powered applications built around business data, with custom ingestion pipelines, hybrid retrieval, agentic workflows, tool integrations and real-time voice capabilities.",
  },
  {
    icon: Server,
    title: "Backends & Integrations",
    line: "Scalable Python backends, REST APIs and asynchronous processing systems that connect applications with third-party services, messaging platforms and business tools.",
  },
  {
    icon: Layers,
    title: "Full-stack Development",
    line: "End-to-end product development spanning database design, backend architecture, React interfaces and cloud deployment, with a focus on maintainability and performance.",
  },
];

/** Plain rows instead of cards. The first tool in each row is the one I reach for first. */
const stack: { label: string; tools: string[] }[] = [
  {
    label: "Languages",
    tools: ["Python", "TypeScript", "JavaScript", "C", "C++"],
  },
  {
    label: "Backend",
    tools: ["Django", "FastAPI", "Node.js", "Celery", "GraphQL", "WebSockets"],
  },
  {
    label: "AI",
    tools: ["Google ADK", "RAG", "pgvector", "Pinecone", "Vertex AI"],
  },
  {
    label: "Data",
    tools: ["PostgreSQL", "Redis", "MongoDB", "Firestore", "Kafka"],
  },
  { label: "Cloud", tools: ["AWS", "GCP", "Docker", "nginx", "CI/CD"] },
  {
    label: "Frontend",
    tools: ["React", "Next.js", "Redux Toolkit", "Tailwind CSS"],
  },
];

const subhead = "font-mono text-[11px] tracking-[0.22em] text-muted uppercase";

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-0">
          {/* ───────── left: who I am + stack ───────── */}
          <div className="lg:pr-8 xl:pr-10">
            <SectionHeading
              index="01"
              kicker="About Me"
              title="Building backend systems and AI powered applications"
              lead="I bring 3+ years of software engineering experience, with a focus on backend systems and AI-powered applications. Over the last two years, I've worked on RAG architectures, hybrid retrieval, multi-agent systems, and real-time voice agents. I enjoy owning the engineering lifecycle — making architectural decisions, building the application, optimizing its performance, and getting it into production."
            />

            <h3 className={`mt-12 ${subhead}`}>Stack</h3>
            <Reveal delay={0.1} y={16}>
              <dl className="mt-4 grid grid-cols-[5.5rem_1fr] gap-x-4 border-t border-line text-sm sm:grid-cols-[6.5rem_1fr]">
                {stack.map((row) => (
                  <Fragment key={row.label}>
                    <dt className="border-b border-line py-3.5 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                      {row.label}
                    </dt>
                    <dd className="border-b border-line py-3 leading-relaxed">
                      {row.tools.map((t, i) => (
                        <Fragment key={t}>
                          {i > 0 && (
                            <span aria-hidden className="mx-2 text-muted/40">
                              /
                            </span>
                          )}
                          <span
                            className={
                              i === 0 ? "font-medium text-fg" : "text-muted"
                            }
                          >
                            {t}
                          </span>
                        </Fragment>
                      ))}
                    </dd>
                  </Fragment>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* ───────── right: what I do + proof ───────── */}
          <div className="flex flex-col lg:pt-2 lg:pl-8 xl:pl-10">
            <h3 className={subhead}>What I do</h3>
            <RevealGroup
              className="mt-4 divide-y divide-line border-t border-line"
              stagger={0.08}
            >
              {services.map((s) => (
                <RevealItem key={s.title}>
                  <div className="flex gap-4 py-6">
                    <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                      <s.icon className="size-[18px]" aria-hidden />
                    </span>
                    <div>
                      <p className="font-display text-lg font-semibold text-fg">
                        {s.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {s.line}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.15}>
              <dl className="mt-8 grid grid-cols-2 border-y border-line">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="py-5 pr-4 first:pl-0 [&:not(:first-child)]:pl-6"
                  >
                    <dt className="font-display text-3xl font-semibold tracking-tight text-fg">
                      {s.value}
                    </dt>
                    <dd className="mt-1 text-xs leading-snug text-muted">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="#experience"
                  className="group inline-flex items-center gap-1.5 font-mono text-sm tracking-wide text-accent uppercase"
                >
                  See experience
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
