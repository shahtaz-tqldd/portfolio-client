import { projects } from "@/lib/data/projects";
import { Hero } from "@/templates/homepage/hero";
import { About } from "@/templates/homepage/about";
import { Skills } from "@/templates/homepage/skills";
import { ProjectsOverview } from "@/templates/homepage/project-overview";
import { Experience } from "@/templates/homepage/experiences";
import { Writing } from "@/templates/homepage/writing";
import { Contact } from "@/templates/homepage/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <ProjectsOverview projects={projects} />
      <Experience />
      <Writing />
      <Contact />
    </>
  );
}
