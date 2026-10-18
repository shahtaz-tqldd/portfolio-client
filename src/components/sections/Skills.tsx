"use client";

import { Bot, Cloud, Code2, Database, Plug, Server } from "lucide-react";
import { SectionBackground } from "@/components/backgrounds/SectionBackground";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TechStack, type StackGroup } from "@/components/ui/TechStack";

/**
 * Six balanced groups (5-6 tools each), strongest areas first.
 * `core: true` marks tools used day to day, so edit those to match reality.
 */
const groups: StackGroup[] = [
  {
    key: "backend",
    label: "Backend & APIs",
    caption: "Services and real-time",
    icon: Server,
    accent: "#38bdf8",
    tools: [
      { name: "Django", core: true },
      { name: "FastAPI", core: true },
      { name: "Node.js" },
      { name: "REST APIs", core: true },
      { name: "GraphQL" },
      { name: "WebSockets" },
    ],
  },
  {
    key: "ai",
    label: "AI & Retrieval",
    caption: "Agents and grounding",
    icon: Bot,
    accent: "#f0abfc",
    tools: [
      { name: "Google ADK", core: true },
      { name: "RAG", core: true },
      { name: "Gemini" },
      { name: "Pinecone", core: true },
      { name: "Vertex AI" },
    ],
  },
  {
    key: "data",
    label: "Data & Queues",
    caption: "Storage and async work",
    icon: Database,
    accent: "#a78bfa",
    tools: [
      { name: "PostgreSQL", core: true },
      { name: "pgvector", core: true },
      { name: "Redis", core: true },
      { name: "Celery", core: true },
      { name: "MongoDB" },
    ],
  },
  {
    key: "languages",
    label: "Languages & Frontend",
    caption: "Code and interfaces",
    icon: Code2,
    accent: "#5eead4",
    tools: [
      { name: "Python", core: true },
      { name: "TypeScript", core: true },
      { name: "JavaScript" },
      { name: "C++" },
      { name: "React", core: true },
      { name: "Next.js", core: true },
    ],
  },
  {
    key: "integrations",
    label: "Integrations",
    caption: "Billing and channels",
    icon: Plug,
    accent: "#fbbf24",
    tools: [
      { name: "Stripe", core: true },
      { name: "WhatsApp" },
      { name: "Messenger" },
      { name: "Instagram" },
      { name: "Amazon SES" },
    ],
  },
  {
    key: "cloud",
    label: "Cloud & DevOps",
    caption: "Where it runs",
    icon: Cloud,
    accent: "#fb7185",
    tools: [
      { name: "Docker", core: true },
      { name: "AWS" },
      { name: "Google Cloud" },
      { name: "Cloudflare R2" },
      { name: "Firebase" },
    ],
  },
];

export function Skills() {
  const total = groups.reduce((n, g) => n + g.tools.length, 0);

  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <SectionBackground from="left" tint="teal" />

      <div className="container-x">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="02"
            kicker="Skills / Tech"
            title="The stack I ship with"
            lead="Grouped by what each tool does. Highlighted ones are what I use day to day."
          />
        </div>

        <Reveal y={16}>
          <TechStack groups={groups} className="mt-12" />
        </Reveal>
      </div>
    </section>
  );
}