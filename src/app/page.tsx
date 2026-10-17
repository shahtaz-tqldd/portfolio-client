import { projects } from "@/lib/data/projects";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { ProjectsOverview } from "@/components/sections/ProjectsOverview";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <ProjectsOverview projects={projects} />
      <Experience />
      <Contact />
    </>
  );
}
