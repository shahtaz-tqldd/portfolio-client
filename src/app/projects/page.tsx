import type { Metadata } from "next";
import { projects } from "@/lib/data/projects";
import { ProjectGrid } from "@/templates/homepage/project-overview";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies in AI agents, backend systems and developer tools.",
};

export default function ProjectsIndexPage() {
  return (
    <div className="container-x pt-32 pb-24 sm:pt-40">
      <p className="kicker">Case studies</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">Projects</h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        AI agents, data-heavy platforms and developer tools: each with its architecture and the reasoning behind it.
      </p>
      <ProjectGrid projects={projects} className="mt-12" />
    </div>
  );
}
