import { ImageResponse } from "next/og";
import { getProject, projects } from "@/lib/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project case study";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return new ImageResponse(<div />, size);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#05070c",
        padding: 64,
        fontFamily: "monospace",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            background: project.accent,
          }}
        />
        <div
          style={{ color: "#98a2b3", fontSize: 22, letterSpacing: 6 }}
        >{`CASE STUDY — ${project.tagline.toUpperCase()}`}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            color: "#e7ecf4",
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: -2,
            display: "flex",
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            color: "#98a2b3",
            fontSize: 26,
            marginTop: 16,
            maxWidth: 900,
            display: "flex",
          }}
        >
          {project.og.description}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{ display: "flex", gap: 12, flexWrap: "wrap", maxWidth: 800 }}
        >
          {project.techChips.slice(0, 6).map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid rgba(148,163,184,0.3)",
                borderRadius: 999,
                padding: "8px 18px",
                color: "#98a2b3",
                fontSize: 20,
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <div style={{ color: project.accent, fontSize: 24 }}>shahtaz.dev</div>
      </div>
    </div>,
    size,
  );
}
