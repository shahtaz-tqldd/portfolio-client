import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { site } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      {/* node-motif divider */}
      <div aria-hidden className="container-x flex h-px items-center justify-between pt-0">
        <svg viewBox="0 0 1200 20" preserveAspectRatio="none" className="h-5 w-full text-linestrong" fill="none">
          <path d="M0 10 H1200" stroke="currentColor" strokeWidth="1" />
          {[100, 300, 520, 740, 960, 1150].map((x, i) => (
            <circle key={x} cx={x} cy={i % 2 === 0 ? 10 : 10} r={i === 2 || i === 3 ? 3.5 : 2.5} className={i === 2 || i === 3 ? "fill-accent" : "fill-current"} />
          ))}
          <path d="M100 10 300 10M520 10 740 10M960 10 1150 10" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="container-x flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-xl font-semibold">{site.name}</p>
          <p className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-muted">
            <MapPin className="size-3" /> {site.location}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="grid size-10 place-items-center rounded-full border border-line bg-surface text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <Mail className="size-4" />
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid size-10 place-items-center rounded-full border border-line bg-surface text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <Github className="size-4" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid size-10 place-items-center rounded-full border border-line bg-surface text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <Linkedin className="size-4" />
          </a>
        </div>
      </div>

      <div className="container-x flex flex-col gap-2 border-t border-line py-6 font-mono text-[11px] tracking-wide text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}. Modeled data first.</p>
        <p>
          Built with Next.js · GSAP · Framer Motion — <span className="text-accent">dark-first, motion-safe</span>
        </p>
      </div>
    </footer>
  );
}
