import { cn } from "@/lib/utils";

/** Constraint/goal card with corner-bracket decoration. */
export function StatCard({
  label,
  value,
  note,
  className,
}: {
  label: string;
  value: string;
  note?: string;
  className?: string;
}) {
  return (
    <div className={cn("group card relative overflow-hidden p-5 transition-all duration-500 hover:border-accent/40", className)}>
      <span aria-hidden className="absolute left-0 top-0 h-4 w-4 border-l border-t border-accent/50 transition-all duration-500 group-hover:h-6 group-hover:w-6" />
      <span aria-hidden className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-accent/50 transition-all duration-500 group-hover:h-6 group-hover:w-6" />
      <p className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">{label}</p>
      <p className="mt-2.5 font-display text-base font-semibold leading-snug text-fg sm:text-lg">{value}</p>
      {note ? <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{note}</p> : null}
    </div>
  );
}
