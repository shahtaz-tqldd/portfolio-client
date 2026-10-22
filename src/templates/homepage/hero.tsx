"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Download, Layers2 } from "lucide-react";
import { site } from "@/lib/data/site";
import { SectionBackground } from "@/components/backgrounds/SectionBackground";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { mulberry32 } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NAME = "Shahtaz Rahman";
const WORDS = NAME.split(" ");
/* one flying node per letter (spaces excluded) */
const LETTERS = WORDS.join("").length;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
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

  /* ---------------------------------------------------------------------
   * Intro: the network assembles the name.
   * 1. glowing nodes spawn scattered across the hero
   * 2. each flies to its letter's position and materializes as the glyph
   * 3. an edge traces through the settled letters, glows, then dissolves
   * ------------------------------------------------------------------- */
  useLayoutEffect(() => {
    if (reduced || !sectionRef.current || !nameRef.current) return;
    const sectionEl = sectionRef.current;
    let cancelled = false;
    let ctx: gsap.Context | undefined;

    // hide animated targets pre-paint so there's no flash while fonts load
    ctx = gsap.context(() => {
      gsap.set(
        [
          ".hero-char",
          ".hero-dot",
          "[data-hero-role]",
          "[data-hero-tagline]",
          "[data-hero-cta]",
          "[data-hero-meta]",
        ],
        { opacity: 0 },
      );
    }, sectionEl);

    const build = () => {
      if (cancelled) return;
      ctx?.revert();
      ctx = gsap.context(() => {
        const chars = gsap.utils.toArray<HTMLElement>(".hero-char");
        const dots = gsap.utils.toArray<HTMLElement>(".hero-dot");
        const nameEl = nameRef.current!;
        if (chars.length === 0 || dots.length < chars.length) return;

        const box = nameEl.getBoundingClientRect();

        // letter centers relative to the name block
        const rand = mulberry32(0x5aa17);
        const centers = chars.map((ch) => {
          const r = ch.getBoundingClientRect();
          return {
            x: r.left - box.left + r.width / 2,
            y: r.top - box.top + r.height / 2,
          };
        });
        dots.forEach((d, i) => {
          d.style.left = `${centers[i].x}px`;
          d.style.top = `${centers[i].y}px`;
        });

        const tl = gsap.timeline({
          defaults: { ease: "power4.out" },
          delay: 0.2,
        });
        tl.fromTo(
          "[data-hero-kicker]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          0,
        );

        const spread = Math.min(460, window.innerWidth * 0.42);
        chars.forEach((ch, i) => {
          const t = 0.32 + i * 0.042;
          const dot = dots[i];
          const dx = (rand() - 0.5) * spread;
          const dy = (rand() - 0.5) * 280;

          // node spawns scattered and flies home
          tl.fromTo(
            dot,
            { x: dx, y: dy, scale: 1.8, opacity: 0 },
            {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "power3.inOut",
            },
            t,
          );
          tl.to(
            dot,
            { opacity: 0, scale: 0.3, duration: 0.22, ease: "power2.in" },
            t + 0.46,
          );

          // glyph materializes from the arriving node
          tl.fromTo(
            ch,
            { opacity: 0, scale: 1.45, y: 6, filter: "blur(7px)" },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.5,
              ease: "back.out(1.8)",
            },
            t + 0.44,
          );
        });

        // supporting cast follows the assembly
        const settle = 0.32 + chars.length * 0.042 + 0.4;
        tl.fromTo(
          "[data-hero-role]",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.8 },
          settle + 0.1,
        );
        tl.fromTo(
          "[data-hero-tagline]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65 },
          settle + 0.35,
        );
        tl.fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 22, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.09 },
          settle + 0.5,
        );
        tl.fromTo(
          "[data-hero-meta]",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 },
          settle + 0.65,
        );
      }, sectionEl);
    };

    // measure after fonts settle so node targets match final glyph positions
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(build).catch(build);
    } else {
      build();
    }

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced]);

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
      gsap.to("[data-hero-ghost]", {
        xPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  let letterIndex = -1;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-svh flex-col overflow-hidden pt-16"
    >
      <SectionBackground from="left" tint="teal" />

      {/* cursor-reactive glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-[4] size-[34rem] rounded-full bg-accent/[0.07] blur-[90px]"
        style={{ x: sgx, y: sgy, translateX: "-50%", translateY: "-50%" }}
      />

      {/* ghost outline text */}
      <div
        data-hero-ghost
        aria-hidden
        className="outline-text pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2 select-none font-display text-[9rem] font-bold leading-none tracking-tighter lg:block"
      >
        Systems
        <br />
        &amp; Agents
      </div>

      <div className="container-x flex flex-1 items-center">
        <div ref={contentRef} className="max-w-3xl py-24">
          <p data-hero-kicker className="kicker flex items-center gap-3">
            <span
              className="inline-block size-1.5 rounded-full bg-accent animate-blink"
              aria-hidden
            />
            Software Engineer — {site.location}
          </p>

          <h1
            className="mt-7 font-display text-[clamp(2.4rem,7.5vw,5.4rem)] font-semibold leading-[1.06] tracking-tight"
            aria-label={NAME}
          >
            <span ref={nameRef} className="relative inline-block">
              {WORDS.map((word, wi) => (
                <span
                  key={wi}
                  className="inline-block whitespace-nowrap"
                  aria-hidden
                >
                  {Array.from(word).map((ch) => {
                    letterIndex += 1;
                    return (
                      <span
                        key={letterIndex}
                        className="hero-char inline-block will-change-transform"
                      >
                        {ch}
                      </span>
                    );
                  })}
                  {wi < WORDS.length - 1 ? (
                    <span className="inline-block w-[0.26em]" />
                  ) : null}
                </span>
              ))}

              {/* flying nodes — one per letter */}
              {Array.from({ length: LETTERS }).map((_, i) => (
                <span key={`dot-${i}`} className="hero-dot" aria-hidden />
              ))}
            </span>
          </h1>

          <p
            data-hero-role
            className="mt-6 font-mono text-sm tracking-wide text-accent sm:text-base"
          >
            System Architecture · Backend · AI Systems · User Interface
          </p>

          <p
            data-hero-tagline
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            Full-stack Engineer building multi-tenant SaaS, agentic AI systems,
            and RAG pipelines. From the requirements analysis to the product design.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span data-hero-cta>
              <MagneticButton href="/projects" variant="primary">
                View Projects <ArrowDown className="size-3.5" />
              </MagneticButton>
            </span>
            <span data-hero-cta>
              <MagneticButton href={site.resumePage} variant="ghost">
                <Layers2 className="size-3.5" /> Resume
              </MagneticButton>
            </span>
          </div>

          <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.12em] text-muted">
            {[
              "PYTHON · DJANGO · FASTAPI · NODE.JS",
              "GCP · AWS · DOCKER",
              "MULTI-TENANT SAAS · RAG · AGENTS",
              "3+ YEARS OF EXPERIENCES",
            ].map((m) => (
              <li data-hero-meta key={m} className="flex items-center gap-2.5">
                <span aria-hidden className="text-accent">
                  ▸
                </span>{" "}
                {m}
              </li>
            ))}
          </ul>
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
