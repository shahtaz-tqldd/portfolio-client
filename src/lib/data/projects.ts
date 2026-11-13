import type { Project } from "@/lib/types";

import vegabot from "./projects/vegabot";
import tourtoise from "./projects/tourtoise";
import restroFx from "./projects/restro-fx";
import ecommerce from "./projects/ecommerce";
import networkMonitor from "./projects/network-monitor";

/**
 * Every project lives in its own file under ./projects/ — edit a project there.
 * Order and tier drive the listings and the "next case study" link. Rules:
 *  - Leave a field out when it's unknown; the UI hides it. Never put placeholder text here.
 *  - Only real facts: no invented numbers, tools or features.
 */

export const projects: Project[] = [
  vegabot,
  tourtoise,
  restroFx,
  ecommerce,
  networkMonitor,
].sort((a, b) => a.order - b.order);

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const compactProjects = projects.filter((p) => p.tier === "compact");

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Next project by `order`, wrapping from last to first. */
export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
