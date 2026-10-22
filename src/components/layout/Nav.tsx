"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight, Download, Layers2, Menu, X } from "lucide-react";
import { site } from "@/lib/data/site";
import { ThemeToggle } from "@/components/providers/ThemeProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { EASE, cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();
  const reduced = useReducedMotion();
  const barRef = useRef<HTMLElement>(null);
  const onHome = pathname === "/";

  // GSAP intro
  useEffect(() => {
    if (reduced || !barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { y: -72, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power4.out", delay: 0.15 },
    );
  }, [reduced]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy (home only)
  useEffect(() => {
    if (!onHome) return;
    const sections = site.nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-38% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const go = (id: string) => (e: React.MouseEvent) => {
    if (!onHome) return; // normal navigation via Link
    e.preventDefault();
    scrollTo(`#${id}`);
  };

  return (
    <header
      ref={barRef}
      className={cn(
        "fixed inset-x-0 top-0 z-[70] transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-line bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        className="container-x flex h-16 items-center justify-between"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group flex items-center font-mono text-sm tracking-wider text-fg"
          aria-label="Home"
        >
          _shahtaz
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {site.nav.map((n) => {
            const isActive = onHome && active === n.id;
            return (
              <li key={n.id}>
                <Link
                  href={`/#${n.id}`}
                  onClick={go(n.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300",
                    isActive ? "text-accent" : "text-muted hover:text-fg",
                  )}
                >
                  {n.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-accent/30 bg-accent/10"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href={site.resumePage}
            className="btn hidden !px-4 !py-2 border border-linestrong bg-surface text-fg hover:border-accent hover:text-accent sm:inline-flex"
          >
            <Layers2 className="size-3.5" /> Resume
          </Link>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-line bg-surface text-muted lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden border-b border-line bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {site.nav.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: EASE }}
                >
                  <Link
                    href={`/#${n.id}`}
                    onClick={go(n.id)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 font-display text-lg text-fg hover:bg-surface"
                  >
                    {n.label}
                    <ArrowUpRight className="size-4 text-muted" />
                  </Link>
                </motion.li>
              ))}
              <li className="px-4 pt-2">
                <Link
                  href={site.resumePage}
                  className="btn border border-linestrong bg-surface text-fg"
                >
                  <Download className="size-3.5" /> Résumé
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
