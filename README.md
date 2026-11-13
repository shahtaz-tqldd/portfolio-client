# Shahtaz Rahman Shanto — Portfolio

A dark-first, motion-rich developer portfolio for a backend / system architecture / database design / AI-systems engineer. Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, and Lenis smooth scrolling.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Folder structure

```
src/
  app/                        # routes
    page.tsx                  # home (Hero, About, Skills, Projects, Experience, Achievements, Contact)
    projects/page.tsx         # projects index
    projects/[slug]/          # case study route (+ per-project OG image, SEO metadata)
    layout.tsx                # fonts, providers, nav/footer, grain, custom cursor
    template.tsx              # page transition
  lib/
    types.ts                  # ALL content schemas (Project, diagrams, metrics, media…)
    data/
      site.ts                 # name, links, nav, bio
      skills.ts               # skill groups
      experience.ts           # timeline entries
      projects.ts             # ALL projects (order, tier, case-study content)
  components/
    motion/                   # Reveal, RevealGroup, SplitText, SectionHeading,
                              # MagneticButton, Tilt
    backgrounds/              # SectionBackground, NodeNetwork (canvas motif), GrainOverlay
    layout/                   # Nav, Footer, CustomCursor, ScrollProgress
    sections/                 # home page sections
    projects/                 # CaseStudy, ChapterNav, FlowPlayer, MediaGallery, ProjectPreview
    diagrams/                 # DiagramViewer (zoom/pan/fullscreen) + GraphDiagram renderer
    ui/                       # StackRegistry (tech-stack swimlanes)
    providers/                # ThemeProvider, SmoothScroll (Lenis + GSAP bridge)
content/ASSUMPTIONS.md        # what's illustrative vs. real
```

## Adding a new project

1. Add an object to `src/lib/data/projects.ts` following the `Project` schema in `src/lib/types.ts`, and put it in the `projects` array.
2. Set `order` (listing + "next case study" order) and `tier` (`featured` = card + full case study, `compact` = "Other builds" row + short page).
3. Leave out anything you don't know. Empty fields hide their UI: no button without a URL, no gallery without real media, no timeline row without a timeline, no section without data. Chapter numbers follow the sections actually shown.

### Diagrams

Architecture and ER diagrams are typed JSON: `nodes`, `edges`, `groups`, `views`. Nodes are positioned on an explicit canvas (`width`/`height` on the view).

- `kind` controls color + icon (see `components/diagrams/icons.ts`).
- Edge `kind`: `sync` (solid), `async` (amber, animated dashes), `data` (green, animated dashes).
- Add multiple `views` (e.g. High-level / Detailed) and the viewer renders a toggle.
- ER tables: nodes with `kind: "table"` and a `rows[]` array; mark keys with `key: "pk" | "fk" | "idx" | "vec"`.
- The viewer gives you zoom/pan, fullscreen, hover-highlight of connected paths and a side panel from each node's `desc`.

### Content rules

- Never put placeholder text (`[...]`, `TODO`) in project data. Leave the field out instead.
- Only real facts: no invented metrics, tools or features.

## Customizing

### Colors

All colors are CSS variables in `src/app/globals.css` under `:root` (dark, default) and `html.light`. Change `--accent`, `--accent-2`, `--warm` and the `--k-*` diagram node palette once and the whole site follows. Per-project accents come from `accent` in the project data.

### Fonts

`src/app/layout.tsx` — swap the `next/font/google` loaders (Space Grotesk / Inter / JetBrains Mono). The CSS variables `--font-display`, `--font-sans`, `--font-mono` feed Tailwind's `font-display`, `font-sans`, `font-mono`.

### Motion

- Shared easing: `EASE` in `src/lib/utils.ts` (`cubic-bezier(0.22, 1, 0.36, 1)`).
- Reveal timing: viewport-triggered, once, at ~20% visibility (see `components/motion/Reveal.tsx`).
- Hero intro + timeline draw: GSAP timelines in `sections/Hero.tsx` and `sections/Experience.tsx`.
- Everything degrades to simple fades when `prefers-reduced-motion` is set; smooth scrolling and the custom cursor disable themselves too.

## Accessibility & performance notes

- WCAG-minded contrast in both themes, visible focus rings, skip link, keyboard-navigable diagrams (arrow keys pan, tab focuses nodes) and lightbox (Esc/arrows).
- `next/image` + lazy loading for gallery media; canvas network pauses offscreen; fonts use `display: swap`.
