"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, Phone, Send, Sparkles, XIcon } from "lucide-react";
import { site } from "@/lib/data/site";
import { SectionBackground } from "@/components/backgrounds/SectionBackground";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { GitHubIcon, LinkedInIcon } from "@/assets/icons/globals";

/* ───────── contact data ───────── */
// TODO: move these into @/lib/data/site once you're happy with them.
const X_URL = "https://x.com/shahtaz67/";
const PHONE_DISPLAY = "+880 1521 305382";
const PHONE_HREF = "tel:+8801521305382";

const socials = [
  {
    icon: GitHubIcon,
    label: "GitHub",
    hint: "Code & repos",
    href: site.github,
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    hint: "Experience",
    href: site.linkedin,
  },
  { icon: XIcon, label: "X", hint: "Thoughts & builds", href: X_URL },
];

/**
 * Opens the Argon assistant. Wire this to whatever your widget exposes:
 * it fires a window event AND calls window.ArgonChat.open() if present.
 * Listen for "argon:open" in your chatbot component, or change the call below.
 */
const openAssistant = () => {
  window.dispatchEvent(new CustomEvent("argon:open"));
  (
    window as unknown as { ArgonChat?: { open?: () => void } }
  ).ArgonChat?.open?.();
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
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`,
    );
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
              index="06"
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
            <RevealGroup
              className="mt-4 grid gap-3 sm:grid-cols-3"
              stagger={0.08}
            >
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
                      <span className="block font-display text-[15px] font-semibold text-fg">
                        {s.label}
                      </span>
                      <span className="mt-0.5 block font-mono text-[10.5px] text-muted">
                        {s.hint}
                      </span>
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
                    <span className="min-w-0 flex-1 truncate font-mono text-xs">
                      {site.email}
                    </span>
                  </button>
                </li>
                <li>
                  <a
                    href={PHONE_HREF}
                    className="group flex items-center gap-2.5"
                  >
                    <Phone
                      className="size-3 shrink-0 text-accent"
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1 truncate font-mono text-xs">
                      {PHONE_DISPLAY}
                    </span>
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* ───────── right: form ───────── */}
          <Reveal delay={0.1}>
            <form
              onSubmit={submit}
              className="card p-6 sm:p-8"
              aria-label="Contact form"
            >
              <h3 className="font-display text-xl font-semibold text-fg">
                Send me a message
              </h3>
              <p className="mt-1.5 font-mono text-[11px] text-muted">
                Usually replies within 24h, keep eyes on your email
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                    Name
                  </span>
                  <input
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    placeholder="Your Name"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className={inputClass}
                    placeholder="abc@email.com"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  Message
                </span>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className={`${inputClass} resize-none`}
                  placeholder="Write your concerns, project requirements or any queries directly to my mailbox"
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
