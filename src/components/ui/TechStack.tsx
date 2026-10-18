"use client";

import type { LucideIcon } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export interface StackTool {
  name: string;
  /** Daily-driver tool: shown as a filled chip. */
  core?: boolean;
}

export interface StackGroup {
  key: string;
  label: string;
  caption: string;
  icon: LucideIcon;
  /** Hex color for the card tint, icon and core chips. */
  accent: string;
  tools: StackTool[];
}

interface TechStackProps {
  groups: StackGroup[];
  className?: string;
}

/**
 * Balanced grid of stack cards. Everything is visible at once:
 * filled chips = daily drivers, outlined chips = also used.
 */
export function TechStack({ groups, className }: TechStackProps) {
  return (
    <div className={className}>
      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {groups.map((g) => (
          <RevealItem key={g.key}>
            <article
              className="group relative h-full overflow-hidden rounded-2xl border p-5 transition-transform duration-500 hover:-translate-y-0.5 sm:p-6"
              style={{
                borderColor: `${g.accent}2e`,
                background: `linear-gradient(145deg, ${g.accent}12, ${g.accent}04 55%, transparent)`,
              }}
            >
              {/* top accent line */}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${g.accent}, transparent)` }}
                aria-hidden
              />
              {/* ambient glow */}
              <div
                className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `${g.accent}26` }}
                aria-hidden
              />

              {/* header */}
              <header className="relative flex items-center gap-3.5">
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-xl border bg-[var(--code-bg)]"
                  style={{ borderColor: `${g.accent}66`, boxShadow: `0 0 20px -6px ${g.accent}` }}
                >
                  <g.icon className="size-5" style={{ color: g.accent }} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[17px] leading-tight font-semibold text-fg">{g.label}</h3>
                  <p className="mt-0.5 font-mono text-[10.5px] text-muted">{g.caption}</p>
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
                  {String(g.tools.length).padStart(2, "0")}
                </span>
              </header>

              {/* tools */}
              <ul className="relative mt-5 flex flex-wrap gap-2">
                {g.tools.map((t) => (
                  <li
                    key={t.name}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-[12px]",
                      t.core ? "text-fg" : "border-line text-muted",
                    )}
                    style={
                      t.core
                        ? { borderColor: `${g.accent}80`, background: `${g.accent}1f` }
                        : undefined
                    }
                  >
                    {t.core && (
                      <span
                        className="size-1.5 rounded-full"
                        style={{ background: g.accent, boxShadow: `0 0 8px ${g.accent}` }}
                        aria-hidden
                      />
                    )}
                    {t.name}
                  </li>
                ))}
              </ul>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* legend */}
      <p className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent,#5eead4)]" aria-hidden />
          Daily driver
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded border border-line" aria-hidden />
          Also used
        </span>
      </p>
    </div>
  );
}