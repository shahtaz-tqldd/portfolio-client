import type { SkillGroup } from "@/lib/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    blurb: "Daily drivers for services, tooling and interviews.",
    icon: "code",
    tools: [
      { name: "Python", note: "Primary language — backends, agents, data pipelines." },
      { name: "TypeScript", note: "Typed contracts across API and frontend." },
      { name: "JavaScript", note: "The connective tissue of the web." },
      { name: "C++", note: "Where the algorithmic instincts come from." },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "APIs, async workflows and everything between.",
    icon: "server",
    tools: [
      { name: "Django", note: "Batteries-included monoliths, admin, ORM, multi-tenant SaaS." },
      { name: "FastAPI", note: "High-performance async services and AI hot paths." },
      { name: "Node.js", note: "Event-driven services and realtime glue." },
      { name: "Celery", note: "Distributed task queues, retries, scheduling." },
      { name: "REST APIs", note: "Resource design, versioning, idempotency." },
      { name: "GraphQL", note: "Flexible query layers for product teams." },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Just enough UI to make backends shine.",
    icon: "layout",
    tools: [
      { name: "React", note: "Component systems and data-driven dashboards." },
      { name: "Next.js", note: "App Router, SSR, and this very site." },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    blurb: "Schema-first thinking, from rows to vectors.",
    icon: "database",
    tools: [
      { name: "PostgreSQL", note: "Default choice — relational rigor plus extensions." },
      { name: "MongoDB", note: "Flexible documents where schema is genuinely fluid." },
      { name: "pgvector", note: "Vector search colocated with relational data." },
    ],
  },
  {
    id: "ai",
    title: "AI & Systems",
    blurb: "Agents, retrieval and grounded generation.",
    icon: "bot",
    tools: [
      { name: "Google ADK", note: "Agent development kit — routing, tools, memory." },
      { name: "RAG", note: "Retrieval-augmented generation pipelines end to end." },
      { name: "Pinecone", note: "Managed vector search for cloud-first setups." },
      { name: "Vertex AI", note: "GCP model serving and vector infrastructure." },
      { name: "WebSockets", note: "Realtime conversational transport." },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Infra",
    blurb: "Shipping and running what I build.",
    icon: "cloud",
    tools: [
      { name: "AWS", note: "EC2, S3, CloudFront, Lambda." },
      { name: "Google Cloud", note: "Vertex AI workflows and hosting." },
      { name: "Firebase", note: "Fast product surfaces and auth." },
      { name: "Docker", note: "Reproducible environments everywhere." },
      { name: "Redis", note: "Caching, brokers, channel layers." },
    ],
  },
];
