"use client";

import { useState, type FormEvent, type SVGProps } from "react";
import { ArrowUpRight, Check, Copy, Mail, Phone, Send, Sparkles } from "lucide-react";
import { site } from "@/lib/data/site";
import { SectionBackground } from "@/components/backgrounds/SectionBackground";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

/* ───────── brand icons (inline SVG, no dependency) ───────── */
type IconProps = SVGProps<SVGSVGElement>;

const GitHubIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedInIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

/* ───────── contact data ───────── */
// TODO: move these into @/lib/data/site once you're happy with them.
const X_URL = "https://x.com/YOUR_HANDLE"; // ← replace
const PHONE_DISPLAY = "+880 1521 305382";
const PHONE_HREF = "tel:+8801521305382";

const socials = [
  { icon: GitHubIcon, label: "GitHub", hint: "Code & repos", href: site.github },
  { icon: LinkedInIcon, label: "LinkedIn", hint: "Experience", href: site.linkedin },
  { icon: XIcon, label: "X", hint: "Thoughts & builds", href: X_URL },
];

/**
 * Opens the Argon assistant. Wire this to whatever your widget exposes:
 * it fires a window event AND calls window.ArgonChat.open() if present.
 * Listen for "argon:open" in your chatbot component, or change the call below.
 */
const openAssistant = () => {
  window.dispatchEvent(new CustomEvent("argon:open"));
  (window as unknown as { ArgonChat?: { open?: () => void } }).ArgonChat?.open?.();
};

const inputClass =
  "mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-fg placeholder:text-muted/50 transition-colors focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact — ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <SectionBackground from="right" tint="teal" />

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* ───────── left: pitch + channels ───────── */}
          <div>
            <SectionHeading
              index="05"
              kicker="Contact"
              title="Let's build something reliable."
              lead="Need a backend, an AI feature, or a whole product shipped? Tell me what you're working on, or ask my assistant right now."
            />

            {/* assistant CTA */}
            <Reveal delay={0.1}>
              <button
                type="button"
                onClick={openAssistant}
                className="group card mt-8 flex w-full cursor-pointer items-center gap-4 p-4 text-left transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/50 sm:p-5"
              >
                <span className="relative grid size-11 shrink-0 place-items-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
                  <Sparkles className="size-5" aria-hidden />
                  <span className="absolute -top-1 -right-1 flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-base font-semibold text-fg">
                    Talk to my assistant
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] text-muted">
                    AI that knows my work · answers instantly
                  </span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </button>
            </Reveal>

            {/* socials */}
            <RevealGroup className="mt-4 grid gap-3 sm:grid-cols-3" stagger={0.08}>
              {socials.map((s) => (
                <RevealItem key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="group card flex h-full flex-col gap-3 p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/40"
                  >
                    <s.icon className="size-5 text-muted transition-colors duration-300 group-hover:text-accent" />
                    <span>
                      <span className="block font-display text-[15px] font-semibold text-fg">{s.label}</span>
                      <span className="mt-0.5 block font-mono text-[10.5px] text-muted">{s.hint}</span>
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* direct lines */}
            <Reveal delay={0.2}>
              <ul className="mt-8 grid grid-cols-2">
                <li>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="group flex cursor-pointer items-center gap-2.5"
                  >
                    <Mail className="size-3 shrink-0 text-accent" aria-hidden />
                    <span className="min-w-0 flex-1 truncate font-mono text-xs">{site.email}</span>
                  </button>
                </li>
                <li>
                  <a
                    href={PHONE_HREF}
                    className="group flex items-center gap-2.5"
                  >
                    <Phone className="size-3 shrink-0 text-accent" aria-hidden />
                    <span className="min-w-0 flex-1 truncate font-mono text-xs">{PHONE_DISPLAY}</span>
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* ───────── right: form ───────── */}
          <Reveal delay={0.1}>
            <form onSubmit={submit} className="card p-6 sm:p-8" aria-label="Contact form">
              <h3 className="font-display text-xl font-semibold text-fg">Send me a message</h3>
              <p className="mt-1.5 font-mono text-[11px] text-muted">
                Usually replies within 24h · opens your email app, nothing is stored
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">Name</span>
                  <input
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    placeholder="Ada Lovelace"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">Email</span>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                    placeholder="ada@analytical.engine"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">Message</span>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="We need a backend that doesn't fall over when…"
                />
              </label>

              <div className="mt-6">
                <MagneticButton variant="primary" type="submit">
                  <Send className="size-3.5" /> Send message
                </MagneticButton>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}