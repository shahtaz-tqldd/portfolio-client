import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-svh flex-col items-center justify-center gap-6 pt-16 text-center">
      <p className="kicker">404 — route not found</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
        This node isn&apos;t in the graph
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted">
        The page you asked for doesn&apos;t exist — maybe it was renamed, or never deployed.
      </p>
      <Link href="/" className="btn bg-accent text-bg hover:bg-accent2">
        Back home
      </Link>
    </div>
  );
}
