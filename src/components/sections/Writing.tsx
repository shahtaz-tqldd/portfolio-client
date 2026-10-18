import { ArrowUpRight, BookOpen } from "lucide-react";
import { SectionBackground } from "@/components/backgrounds/SectionBackground";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/motion/SectionHeading";

const articles = [
  {
    number: "01",
    category: "AI · GOOGLE ADK",
    title: "Let's build an e-commerce chatbot agent with Google ADK",
    description: "Building an e-commerce chatbot agent with Google’s Agent Development Kit.",
    url: "https://medium.com/@shahtaz67/lets-build-an-e-commerce-chatbot-agent-with-google-adk-cfb51f64dbff",
    accent: "#a78bfa",
  },
  {
    number: "02",
    category: "SYSTEM DESIGN · SCALING",
    title: "ABC of system design: understanding scaling",
    description: "An introduction to scaling concepts and the choices behind growing systems.",
    url: "https://medium.com/@shahtaz67/abc-of-system-design-understanding-scaling-08230c5fdffb",
    accent: "#fbbf24",
  },
  {
    number: "03",
    category: "CSS · QUICK GUIDE",
    title: "Customizing scrollbars in just a few steps",
    description: "A practical walkthrough of styling scrollbars for a more considered interface.",
    url: "https://medium.com/@shahtaz67/customizing-scrollbars-just-a-few-steps-9707c2fc7dce",
    accent: "#38bdf8",
  },
];

export function Writing() {
  return (
    <section id="writing" className="relative py-20 sm:py-28">
      <SectionBackground from="left" tint="cyan" />

      <div className="container-x">
        <SectionHeading
          index="05"
          kicker="Writing"
          title="Notes from building things"
          lead="A few guides and ideas I’ve shared on Medium, from interface details to AI agents and system design."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {articles.map((article, i) => (
            <Reveal key={article.number} delay={i * 0.1} className="h-full">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${article.title} on Medium (opens in a new tab)`}
                className="group card relative flex h-full min-h-64 flex-col overflow-hidden p-5 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_-28px_var(--glow)] sm:p-6"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-8 -top-10 size-32 rounded-full opacity-[0.08] blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                  style={{ background: article.accent }}
                />

                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-muted">{article.number}</span>
                  <ArrowUpRight className="size-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                </div>

                <p className="relative mt-8 font-mono text-[10px] tracking-[0.18em] text-accent">{article.category}</p>
                <h3 className="relative mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-fg transition-colors duration-300 group-hover:text-accent sm:text-[22px]">
                  {article.title}
                </h3>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">{article.description}</p>

                <div className="relative mt-6 flex items-center gap-2 border-t border-line pt-4 font-mono text-[10px] tracking-[0.16em] text-muted">
                  <BookOpen className="size-3.5 text-accent" aria-hidden="true" />
                  READ ON MEDIUM
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
