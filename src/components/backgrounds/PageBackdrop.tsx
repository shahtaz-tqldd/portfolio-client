/**
 * One continuous ambient layer behind the whole homepage.
 *
 * Large elliptical radial-gradient "aurora" washes are placed along the page's
 * full height (by %), alternating sides and overlapping, so color flows from
 * section to section with no seams. Colors come from --aurora-* tokens, tuned
 * separately for dark and light themes in globals.css.
 * Must sit inside a `relative isolate` wrapper.
 */
type Wash = {
  top: string;
  left: string;
  w: string;
  h: string;
  color: string;
  drift?: boolean;
};

const washes: Wash[] = [
  // hero: emerald crown + indigo counterweight
  { top: "-8%", left: "-15%", w: "70rem", h: "48rem", color: "emerald", drift: true },
  { top: "2%", left: "55%", w: "60rem", h: "44rem", color: "indigo", drift: true },
  // about
  { top: "16%", left: "60%", w: "56rem", h: "40rem", color: "cyan" },
  { top: "24%", left: "-20%", w: "52rem", h: "38rem", color: "indigo" },
  // projects
  { top: "38%", left: "-10%", w: "60rem", h: "42rem", color: "emerald" },
  { top: "46%", left: "62%", w: "50rem", h: "38rem", color: "amber" },
  // experience
  { top: "60%", left: "55%", w: "58rem", h: "42rem", color: "indigo" },
  { top: "68%", left: "-18%", w: "54rem", h: "40rem", color: "cyan" },
  // writing + contact
  { top: "82%", left: "-8%", w: "62rem", h: "44rem", color: "emerald" },
  { top: "88%", left: "58%", w: "56rem", h: "40rem", color: "indigo" },
];

const GRID_MASK = "radial-gradient(ellipse 75% 70% at 50% 30%, black 20%, transparent 75%)";

export function PageBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {washes.map((w, i) => (
        <div
          key={i}
          className={w.drift ? "absolute animate-slow-drift" : "absolute"}
          style={{
            top: w.top,
            left: w.left,
            width: w.w,
            height: w.h,
            background: `radial-gradient(closest-side, var(--aurora-${w.color}), transparent)`,
            animationDelay: `${-i * 9}s`,
          }}
        />
      ))}

      {/* blueprint grid: hero only, dissolves before the first section */}
      <div
        className="absolute inset-x-0 top-0 h-[115svh] opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: GRID_MASK,
          WebkitMaskImage: GRID_MASK,
        }}
      />

      {/* faint top light-beam for depth under the nav */}
      <div
        className="absolute left-1/2 top-0 h-[36rem] w-[90rem] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 0%, var(--aurora-emerald), transparent 70%)",
        }}
      />
    </div>
  );
}
