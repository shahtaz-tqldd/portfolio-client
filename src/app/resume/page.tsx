import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { site } from "@/lib/data/site";
import { ResumeViewer } from "@/components/resume/ResumeViewer";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name} — ${site.role}.`,
};

export default function ResumePage() {
  return (
    <section className="container-x flex min-h-dvh flex-col pb-8 pt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker">Resume</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-fg">
            {site.name} <span className="text-muted">—</span> {site.role}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="btn border border-linestrong bg-surface text-fg hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="size-3.5" /> Back
          </Link>
          <a
            href={site.resume}
            download={`${site.name} Resume.pdf`}
            className="btn bg-accent text-bg shadow-[0_0_0_0_var(--glow)] hover:bg-accent2 hover:shadow-[0_8px_32px_-6px_var(--glow)]"
          >
            <Download className="size-3.5" /> Download
          </a>
        </div>
      </div>

      <div className="mt-6 flex-1">
        <ResumeViewer src={site.resume} title={`${site.name} résumé`} />
      </div>
    </section>
  );
}
