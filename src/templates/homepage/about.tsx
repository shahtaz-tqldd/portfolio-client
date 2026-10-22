"use client";

import { ArrowUpRight, GraduationCap, Network, Rocket, Server, Briefcase, Layers, type LucideIcon, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

interface Focus {
  icon: LucideIcon;
  title: string;
  line: string;
  seenIn: string;
  accent: string;
}

/** Four things I'm hired for. Outcomes, not tools. */
const focus: Focus[] = [
  {
    icon: Network,
    title: "System architecture",
    line: "Multi-tenant SaaS and data models designed to grow without rewrites.",
    seenIn: "Argon Chatbot",
    accent: "#38bdf8",
  },
  {
    icon: Server,
    title: "Backend & integrations",
    line: "Billing, webhooks and messaging channels that deliver reliably.",
    seenIn: "Echologyx",
    accent: "#a78bfa",
  },
  {
    icon: Sparkles,
    title: "AI agents & automation",
    line: "Agents that retrieve, decide and act: grounded answers, lead scoring, bookings, human handoff.",
    seenIn: "Echologyx · Tourtoise",
    accent: "#8bf6d2",
  },
  {
    icon: Rocket,
    title: "Full products, solo",
    line: "Idea to live product, interface included. One owner, no handoffs.",
    seenIn: "Argon · Tourtoise",
    accent: "#fbbf24",
  },
];

const stats = [
  { value: "3+ years", label: "Professional Experiences" },
  { value: "20+", label: "Products Shipped on Live" },
];

const facts = [
  {
    icon: Briefcase,
    label: "Now",
    body: "Software Engineer (L2) at Echologyx Ltd.",
  },
  {
    icon: Layers,
    label: "Shipped",
    body: "Argon Chatbot · Tourtoise",
  },
  {
    icon: GraduationCap,
    label: "Education",
    body: "B.Sc. Materials & Metallurgical Eng., BUET",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      {/* <SectionBackground from="right" tint="cyan" /> */}

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* ───────── left: pitch + proof ───────── */}
          <div>
            <SectionHeading
              index="01"
              kicker="About"
              title="I build the whole product behind AI."
              lead="Architecture, backend, agents and interface, all by one engineer. Three years of shipping multi-tenant SaaS and agentic systems that run billing, messaging and AI conversations in production."
            />

            <Reveal delay={0.1}>
              <dl className="mt-8 flex flex-wrap gap-x-16 gap-y-4 border-y border-line py-5">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-3xl font-semibold tracking-tight text-fg">{s.value}</dt>
                    <dd className="mt-0.5 font-mono text-[11px] text-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="mt-5 space-y-3">
                {facts.map((f) => (
                  <li key={f.label} className="flex items-center gap-3.5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-surface text-accent">
                      <f.icon className="size-4" aria-hidden />
                    </span>
                    <span className="w-[4.5rem] shrink-0 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                      {f.label}
                    </span>
                    <span className="text-sm text-fg">{f.body}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-accent uppercase"
                >
                  See the projects
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#experience"
                  className="group inline-flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-muted uppercase transition-colors hover:text-fg"
                >
                  Full experience
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* ───────── right: 2x2 focus cards ───────── */}
          <RevealGroup className="grid gap-3 sm:grid-cols-2 sm:gap-4" stagger={0.08}>
            {focus.map((f, i) => (
              <RevealItem key={f.title}>
                <div className="card group relative flex h-full min-h-[210px] flex-col overflow-hidden p-5 transition-all duration-500 hover:-translate-y-0.5 sm:p-6">
                  {/* ambient accent glow */}
                  <div
                    className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `${f.accent}26` }}
                    aria-hidden
                  />

                  <div className="relative flex items-start justify-between">
                    <span
                      className="grid size-11 place-items-center rounded-xl border bg-[var(--code-bg)]"
                      style={{ borderColor: `${f.accent}66`, boxShadow: `0 0 20px -6px ${f.accent}` }}
                    >
                      <f.icon className="size-5" style={{ color: f.accent }} aria-hidden />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted">0{i + 1}</span>
                  </div>

                  <h3 className="relative mt-5 font-display text-2xl leading-tight font-semibold text-fg">
                    {f.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-snug text-muted">{f.line}</p>

                  <p className="relative mt-auto pt-5 font-mono text-[10px] tracking-[0.15em] text-muted uppercase">
                    <span style={{ color: f.accent }}>●</span>
                    <span className="ml-2">{f.seenIn}</span>
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}