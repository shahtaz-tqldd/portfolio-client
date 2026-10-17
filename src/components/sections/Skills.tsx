"use client";

import { SectionBackground } from "@/components/backgrounds/SectionBackground";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StackRegistry, type StackLayer } from "@/components/ui/StackRegistry";

/**
 * Skills data, sourced from the resume, ordered like a system diagram (top to bottom).
 * `links` lists related tools by name. Connections are bidirectional,
 * so you only need to declare each relationship once.
 */
const layers: StackLayer[] = [
  {
    key: "interface",
    label: "Interface",
    caption: "What users touch",
    accent: "#86efac",
    tools: [
      { name: "React", why: "Reusable components and real-time dashboards", links: ["JavaScript", "TypeScript", "REST APIs", "WebSockets", "Firebase"] },
      { name: "Next.js", why: "App Router sites with SSR and strong SEO", links: ["React", "TypeScript", "REST APIs", "GraphQL"] },
    ],
  },
  {
    key: "api",
    label: "API & Services",
    caption: "Business logic",
    accent: "#38bdf8",
    tools: [
      { name: "Django", why: "Multi-tenant SaaS, subscriptions and Stripe billing at Echologyx", links: ["Python", "PostgreSQL", "Celery", "REST APIs", "Stripe", "Redis", "WebSockets", "Docker", "Cloudflare R2"] },
      { name: "FastAPI", why: "Redesigned the conversational AI service for fast async I/O", links: ["Python", "Google ADK", "Pinecone", "REST APIs", "Docker"] },
      { name: "Node.js", why: "REST APIs for the affiliate marketplace CMS and HRM modules", links: ["JavaScript", "MongoDB", "REST APIs", "GraphQL"] },
      { name: "REST APIs", why: "Secure APIs consumed by web apps and chat channels" },
      { name: "GraphQL", why: "Flexible querying where clients shape their own payloads" },
      { name: "WebSockets", why: "Real-time chat streaming via Django Channels", links: ["Redis"] },
    ],
  },
  {
    key: "async",
    label: "Async & Integrations",
    caption: "Workflows and channels",
    accent: "#fbbf24",
    tools: [
      { name: "Celery", why: "Async workflows, webhook processing and reliable message delivery", links: ["Python", "Redis", "WhatsApp", "Messenger", "Instagram", "Amazon SES"] },
      { name: "Stripe", why: "Subscription management and billing for the chatbot platform" },
      { name: "WhatsApp", why: "Webhook-driven messaging channel for chatbots", links: ["FastAPI"] },
      { name: "Messenger", why: "Webhook-driven messaging channel for chatbots", links: ["FastAPI"] },
      { name: "Instagram", why: "Webhook-driven messaging channel for chatbots", links: ["FastAPI"] },
      { name: "Amazon SES", why: "Transactional email with reliable delivery", links: ["AWS"] },
    ],
  },
  {
    key: "ai",
    label: "AI & Retrieval",
    caption: "Agents and grounding",
    accent: "#f0abfc",
    tools: [
      { name: "Google ADK", why: "Agent orchestration for Argon Chatbot and Tourtoise", links: ["Python", "Gemini", "RAG"] },
      { name: "RAG", why: "Knowledge-grounded answers from ingested documents and structured data", links: ["pgvector", "Pinecone", "PostgreSQL"] },
      { name: "Pinecone", why: "Vector search that improved context handling and cut token usage" },
      { name: "Vertex AI", why: "Managed vector search and model tooling on Google Cloud", links: ["Google Cloud", "RAG", "Gemini"] },
      { name: "Gemini", why: "LLM behind Tourtoise's multi-agent travel planning" },
    ],
  },
  {
    key: "data",
    label: "Data",
    caption: "Source of truth",
    accent: "#a78bfa",
    tools: [
      { name: "PostgreSQL", why: "Primary store: tenant-scoped relational models and indexing", links: ["pgvector", "Docker"] },
      { name: "pgvector", why: "Embeddings and similarity search kept next to relational data" },
      { name: "MongoDB", why: "Document storage on MERN projects with flexible schemas" },
      { name: "Redis", why: "Caching, Celery broker and Channels layer" },
    ],
  },
  {
    key: "cloud",
    label: "Cloud & Infra",
    caption: "Where it runs",
    accent: "#fb7185",
    tools: [
      { name: "AWS", why: "EC2, S3, CloudFront and Lambda for hosting and asset delivery" },
      { name: "Google Cloud", why: "AI services and deployment alongside Vertex AI" },
      { name: "Docker", why: "Reproducible environments for every project" },
      { name: "Cloudflare R2", why: "S3-compatible object storage for document uploads" },
      { name: "Firebase", why: "Auth and realtime features for lightweight apps" },
    ],
  },
  {
    key: "foundation",
    label: "Foundation",
    caption: "Languages",
    accent: "#5eead4",
    tools: [
      { name: "Python", why: "Primary language for backends, AI agents and data pipelines" },
      { name: "TypeScript", why: "Typed full-stack work across Node.js, React and Next.js" },
      { name: "JavaScript", why: "Used daily on the MERN stack and in the browser" },
      { name: "C++", why: "Competitive programming and algorithmic problem solving" },
    ],
  },
];

/**
 * Skills — an interactive system map. Hover, focus or tap a tool to light up
 * everything it connects with.
 */
export function Skills() {
  const totalTools = layers.reduce((n, l) => n + l.tools.length, 0);

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <SectionBackground from="left" tint="teal" />

      <div className="container-x">
        <SectionHeading
          index="02"
          kicker="Skills / Tech"
          title="My stack, as a system"
          lead="Every tool sits in the layer where it does its job. Hover, tab or tap one to see what it connects with."
        />

        <div className="mx-auto mt-12">
          <Reveal y={16}>
            <StackRegistry
              filename="system.map"
              meta={`${layers?.length} layers · ${totalTools} tools`}
              layers={layers}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}