import type { Metadata } from "next";
import { projects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/sections/ProjectsOverview";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies in backend systems, database design and agentic AI.",
};

export default function ProjectsIndexPage() {
  return (
    <div className="container-x pb-24 pt-32 sm:pt-40">
      <p className="kicker">Case studies</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">Projects</h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        Deep dives into systems I designed — architecture, schema, trade-offs, failures and fixes.
      </p>
      <div className="mt-12 grid gap-7 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
