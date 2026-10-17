"use client";

import { createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollApi {
  scrollTo: (target: string | number, offset?: number) => void;
}

const SmoothScrollContext = createContext<SmoothScrollApi>({
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    document.documentElement.classList.add("lenis-active");

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let api: SmoothScrollApi = {
      scrollTo: (target, offset = -88) => {
        if (typeof target === "number") lenis.scrollTo(target, { offset });
        else lenis.scrollTo(target, { offset });
      },
    };
    (window as unknown as { __smoothScroll?: SmoothScrollApi }).__smoothScroll = api;

    return () => {
      delete (window as unknown as { __smoothScroll?: SmoothScrollApi }).__smoothScroll;
      api = { scrollTo: () => {} };
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.documentElement.classList.remove("lenis-active");
    };
  }, []);

  // reset scroll between routes
  useEffect(() => {
    const w = window as unknown as { __smoothScroll?: SmoothScrollApi };
    if (w.__smoothScroll) w.__smoothScroll.scrollTo(0, 0);
    else window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <SmoothScrollContext.Provider
      value={{
        scrollTo: (target, offset) => {
          const w = window as unknown as { __smoothScroll?: SmoothScrollApi };
          if (w.__smoothScroll) {
            w.__smoothScroll.scrollTo(target, offset);
          } else if (typeof target === "string") {
            document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: target, behavior: "smooth" });
          }
        },
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}
