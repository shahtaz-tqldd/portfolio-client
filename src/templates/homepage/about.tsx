"use client";

import { Fragment } from "react";
import { ArrowUpRight, Bot, Layers, Server, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const stats = [
  { value: "3+ yrs", label: "Professional backend experience" },
  { value: "~2 yrs", label: "Shipping AI chatbots in production" },
];

/** What I'm hired for: reads as a role summary to recruiters, a service menu to clients. */
const services: { icon: LucideIcon; title: string; line: string }[] = [
  {
    icon: Bot,
    title: "AI agents & RAG",
    line: "Chatbots and agents grounded in your own data: ingestion, hybrid retrieval, tool use, memory and real-time voice.",
  },
  {
    icon: Server,
    title: "Backends & integrations",
    line: "Python APIs, async workers and webhooks that connect WhatsApp, Messenger, email, Slack and CRMs reliably.",
  },
  {
    icon: Layers,
    title: "Full products, end to end",
    line: "From data model to React frontend to deployment on AWS or GCP. One engineer, no handoffs.",
  },
];

/** Plain rows instead of cards. The first tool in each row is the one I reach for first. */
const stack: { label: string; tools: string[] }[] = [
  { label: "Languages", tools: ["Python", "TypeScript", "JavaScript"] },
  { label: "Backend", tools: ["Django", "FastAPI", "Node.js", "Celery", "GraphQL", "WebSockets"] },
  { label: "AI", tools: ["Google ADK", "RAG", "pgvector", "Pinecone", "Vertex AI"] },
  { label: "Data", tools: ["PostgreSQL", "Redis", "MongoDB", "Firestore", "Kafka"] },
  { label: "Cloud", tools: ["AWS", "GCP", "Docker", "nginx", "CI/CD"] },
  { label: "Frontend", tools: ["React", "Next.js", "Redux Toolkit", "Tailwind CSS"] },
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
              kicker="About"
              title="Backend and AI systems that hold up in production."
              lead="I've spent 3+ years as a backend engineer, the last two building AI chatbots for ecommerce: RAG pipelines, hybrid retrieval, multi-agent workflows and a real-time voice agent. I work mainly in Python and PostgreSQL, and I can build the React frontend too."
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
                          <span className={i === 0 ? "font-medium text-fg" : "text-muted"}>{t}</span>
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
            <RevealGroup className="mt-4 divide-y divide-line border-t border-line" stagger={0.08}>
              {services.map((s) => (
                <RevealItem key={s.title}>
                  <div className="flex gap-4 py-6">
                    <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                      <s.icon className="size-[18px]" aria-hidden />
                    </span>
                    <div>
                      <p className="font-display text-lg font-semibold text-fg">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{s.line}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.15}>
              <dl className="mt-8 grid grid-cols-2 border-y border-line">
                {stats.map((s) => (
                  <div key={s.label} className="py-5 pr-4 first:pl-0 [&:not(:first-child)]:pl-6">
                    <dt className="font-display text-3xl font-semibold tracking-tight text-fg">{s.value}</dt>
                    <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-accent uppercase"
                >
                  Start a project
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#experience"
                  className="group inline-flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-muted uppercase transition-colors hover:text-fg"
                >
                  See experience
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
