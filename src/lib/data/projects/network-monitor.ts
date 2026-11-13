import type { Project } from "@/lib/types";

/* ───────────────────────────── Network Monitor ──────────────────────────── */

const networkMonitor: Project = {
  slug: "network-monitor",
  order: 5,
  tier: "compact",
  eyebrow: "Chrome extension · Developer tool",
  title: "Network Monitor",
  summary:
    "A Chrome extension that captures a page's REST, WebSocket and SSE traffic in an in-page panel for inspection and debugging.",
  role: "Solo developer",
  accent: "#5eead4",
  techChips: ["JavaScript", "Manifest V3", "Shadow DOM"],
  overview: {
    problem: [
      "Network Monitor puts a page's API traffic in a panel on the page itself: fetch, XHR, WebSocket and Server-Sent Events, with headers, payloads, responses and socket messages. The panel can float, dock to the side or bottom, or be resized.",
    ],
    audience:
      "Developers debugging REST, WebSocket and SSE traffic in web apps.",
  },
  features: [
    {
      title: "Full traffic capture",
      body: "fetch, XHR, WebSocket and Server-Sent Events — headers, payloads, responses and socket messages — captured before any page script runs.",
    },
    {
      title: "In-page panel",
      body: "A panel on the page itself: float it, dock it to the side or bottom, or resize it. Shadow DOM keeps its styles and the site's styles apart.",
    },
    {
      title: "Inspect, filter, copy",
      body: "Filter by type, errors or text, copy any request as cURL, and inspect WebSocket conversations message by message.",
    },
    {
      title: "HAR export",
      body: "Export a session as HAR — WebSocket messages included — to open in Chrome DevTools. Memory is capped per request and socket so long sessions stay light.",
    },
  ],
  architecture: [
    {
      id: "high",
      label: "High-level",
      width: 1040,
      height: 320,
      note: "Capture in the page, UI in an isolated content script, state in the service worker.",
      nodes: [
        {
          id: "page",
          label: "Page scripts",
          sublabel: "fetch · XHR · WS · SSE",
          kind: "client",
          x: 40,
          y: 200,
          desc: "The site's own network calls.",
        },
        {
          id: "interceptor",
          label: "Interceptor",
          sublabel: "MAIN world · document_start",
          kind: "service",
          x: 300,
          y: 200,
          desc: "Wraps fetch, XMLHttpRequest, WebSocket and EventSource before any page script runs.",
        },
        {
          id: "panel",
          label: "Panel UI",
          sublabel: "content script · Shadow DOM",
          kind: "widget",
          x: 560,
          y: 200,
          desc: "Request list, details, filters and HAR export, rendered inside a Shadow DOM.",
        },
        {
          id: "sw",
          label: "Service worker",
          sublabel: "toggle · badge",
          kind: "service",
          x: 560,
          y: 40,
          desc: "Toggles the panel, injects it into already-open tabs and shows the request-count badge.",
        },
        {
          id: "storage",
          label: "chrome.storage.session",
          sublabel: "per-tab state",
          kind: "storage",
          x: 820,
          y: 40,
          desc: "Panel visibility and the preserved log, removed when the tab closes.",
        },
      ],
      edges: [
        {
          from: "page",
          to: "interceptor",
          kind: "sync",
          label: "wrapped APIs",
        },
        {
          from: "interceptor",
          to: "panel",
          kind: "async",
          label: "private CustomEvent",
        },
        {
          from: "panel",
          to: "sw",
          kind: "sync",
          label: "messages",
          both: true,
        },
        { from: "sw", to: "storage", kind: "data", label: "state" },
      ],
    },
  ],
  howItWorks: [
    {
      title: "Capture before the page runs.",
      body: "A content script declared in the page's MAIN world at document_start wraps fetch, XMLHttpRequest, WebSocket and EventSource before any page script runs. Because it's a registered content script and not an inline script, the site's Content-Security-Policy can't block it.",
    },
    {
      title: "Isolated from the site.",
      body: "Captured events reach the extension's own content script through a private CustomEvent, never through the page's message listeners. The panel renders inside a Shadow DOM, so the site's CSS and the panel's CSS can't affect each other.",
    },
    {
      title: "Inspect, filter and export.",
      body: "Requests can be filtered by type, errors or text, copied as cURL, and exported as HAR (WebSocket messages included) to open in Chrome DevTools. Memory is capped per request, socket and body so long sessions stay light.",
    },
  ],
  techStack: [
    {
      layer: "Platform",
      tools: [
        {
          name: "Manifest V3",
          why: "Service-worker background, content scripts and a toolbar action with a keyboard shortcut.",
        },
        {
          name: "chrome.storage.session",
          why: "Per-tab state and the preserved log, cleared when the tab closes.",
        },
      ],
    },
    {
      layer: "UI",
      tools: [
        { name: "JavaScript", why: "Plain JavaScript, no framework." },
        {
          name: "Shadow DOM",
          why: "Keeps the panel's styles and the site's styles apart.",
        },
      ],
    },
  ],
  links: [
    {
      label: "Source",
      href: "https://github.com/shahtaz-tqldd/network-monitor-chrome-extension",
      kind: "repo",
    },
    { label: "Download .zip", href: "/network-monitor.zip", kind: "download" },
  ],
  og: {
    title: "Network Monitor: API & WebSocket inspector",
    description:
      "A Manifest V3 Chrome extension that captures fetch, XHR, WebSocket and SSE traffic in an in-page panel.",
  },
};

export default networkMonitor;
