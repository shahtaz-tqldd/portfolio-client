import type { Project } from "@/lib/types";
import { argon } from "./argon";
import { tourtoise } from "./tourtoise";

/** Add a new case study by importing it here — nothing else changes. */
export const projects: Project[] = [argon, tourtoise];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
