"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { tokenize, type Lang } from "@/lib/highlight";
import type { CodeSample } from "@/lib/types";
import { cn } from "@/lib/utils";

const tokenClass = { comment: "tok-c", string: "tok-s", keyword: "tok-k", number: "tok-n", plain: "" } as const;

export function CodeBlock({ sample, className }: { sample: CodeSample; className?: string }) {
  const [copied, setCopied] = useState(false);
  const tokens = tokenize(sample.code, sample.lang as Lang);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(sample.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className={cn("overflow-hidden rounded-xl border border-line bg-[var(--code-bg)]", className)}>
      <div className="flex items-center justify-between border-b border-[rgba(148,163,184,0.12)] px-4 py-2.5">
        <span className="font-mono text-[10px] tracking-[0.18em] text-[#7c8798] uppercase">
          {sample.filename ?? sample.lang}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="grid size-7 place-items-center rounded-md text-[#7c8798] transition-colors duration-300 hover:text-[#5eead4]"
        >
          {copied ? <Check className="size-3.5 text-[#5eead4]" /> : <Copy className="size-3.5" />}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-relaxed">
        <code className="font-mono text-[#dbe4f0]">
          {tokens.map((t, i) => (
            <span key={i} className={tokenClass[t.c]}>
              {t.t}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
