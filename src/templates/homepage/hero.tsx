"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Layers2, Sparkle } from "lucide-react";
import { site } from "@/lib/data/site";
// import { AgentGraph } from "@/components/backgrounds/AgentGraph";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NAME = "Shahtaz Rahman";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // cursor-reactive gradient
  const gx = useMotionValue(600);
  const gy = useMotionValue(260);
  const sgx = useSpring(gx, { stiffness: 42, damping: 18 });
  const sgy = useSpring(gy, { stiffness: 42, damping: 18 });

  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      gx.set(e.clientX - r.left);
      gy.set(e.clientY - r.top);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
  }, [gx, gy, reduced]);

  // scroll parallax
  useEffect(() => {
    if (reduced || !contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: -12,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      // gsap.to("[data-hero-ghost]", {
      //   xPercent: 12,
      //   ease: "none",
      //   scrollTrigger: {
      //     trigger: sectionRef.current,
      //     start: "top top",
      //     end: "bottom top",
      //     scrub: 0.6,
      //   },
      // });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-svh flex-col overflow-x-clip pt-16"
    >
      {/* cursor-reactive glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-[4] size-[34rem] rounded-full bg-accent/[0.07] blur-[90px]"
        style={{ x: sgx, y: sgy, translateX: "-50%", translateY: "-50%" }}
      />

      {/* agent system graph — disabled for now
      <div
        data-hero-ghost
        aria-hidden
        className="pointer-events-none absolute -right-4 top-1/2 hidden w-[23rem] -translate-y-1/2 select-none opacity-80 lg:block xl:w-[27rem]"
      >
        <AgentGraph className="size-full" />
      </div>
      */}

      <div className="container-x flex flex-1 items-center">
        <div ref={contentRef} className="max-w-3xl py-24">
          <Reveal y={14} duration={0.6}>
            <p className="kicker flex items-center gap-3">
              <span
                className="inline-block size-1.5 rounded-full bg-accent animate-blink"
                aria-hidden
              />
              {site.location} · {site.availability}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-7 font-display text-[clamp(2.4rem,7.5vw,4.8rem)] font-semibold leading-[1.06]">
              {NAME}
            </h1>
          </Reveal>

          <Reveal delay={0.18} y={18}>
            <p className="mt-6 font-mono text-sm tracking-wide text-accent sm:text-base">
              {site.roleDetail}
            </p>
          </Reveal>

          <Reveal delay={0.26} y={18}>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted text-lg sm:text-xl">
              {site.pitch}
            </p>
          </Reveal>

          <Reveal delay={0.34} y={22}>
            <div className="mt-16 flex flex-wrap items-center gap-4">
              <MagneticButton href="/projects" variant="primary">
                View Projects <ArrowRight className="size-3.5" />
              </MagneticButton>
              <MagneticButton href={site.resumePage} variant="ghost">
                View Resume
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.42} y={12}>
            <ul className="mt-14 max-w-xl flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.12em] text-muted">
              {[
                "3+ YEARS PROFESSIONAL EXPERIENCE",
                "PYTHON · DJANGO · FASTAPI",
                "AI AGENTS · RAG · LLMs",
                "AWS · GCP",
              ].map((m) => (
                <li key={m} className="flex items-center gap-2.5">
                  <span aria-hidden className="text-accent">
                    ▸
                  </span>{" "}
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div aria-hidden className="container-x pb-8">
        <div className="ml-auto flex w-fit items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-muted/70">
          SCROLL
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute left-0 top-0 h-4 w-px bg-accent"
              animate={reduced ? undefined : { y: [-16, 40] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
