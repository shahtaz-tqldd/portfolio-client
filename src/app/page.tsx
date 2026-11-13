import { projects } from "@/lib/data/projects";
import { PageBackdrop } from "@/components/backgrounds/PageBackdrop";
import { Hero } from "@/templates/homepage/hero";
import { About } from "@/templates/homepage/about";
import { ProjectsOverview } from "@/templates/homepage/project-overview";
import { Experience } from "@/templates/homepage/experiences";
import { Writing } from "@/templates/homepage/writing";
import { Contact } from "@/templates/homepage/contact";

export default function HomePage() {
  return (
    <div className="relative isolate">
      <PageBackdrop />
      <Hero />
      <About />
      <ProjectsOverview projects={projects} />
      <Experience />
      <Writing />
      <Contact />
    </div>
  );
}
