import type { Project } from "@/lib/types";
import tourtoiseLogo from "@/assets/images/tourtoise-logo.png";

/**
 * Every project lives here. Order and tier drive the listings and the
 * "next case study" link. Rules:
 *  - Leave a field out when it's unknown; the UI hides it. Never put placeholder text here.
 *  - Only real facts: no invented numbers, tools or features.
 */

/* ───────────────────────────────── VegaBot ──────────────────────────────── */

const vegabot: Project = {
  slug: "vegabot",
  order: 1,
  tier: "featured",
  eyebrow: "Open-source AI chatbot engine",
  title: "VegaBot",
  summary:
    "An AI chatbot engine for businesses: text and real-time voice, grounded in each business's own files, URLs and text, able to recommend products and place orders.",
  role: "Backend & AI systems engineer",
  accent: "#7dd3fc",
  techChips: ["Python", "Django", "Google ADK", "Gemini", "PostgreSQL", "pgvector", "Celery", "Redis"],
  overview: {
    problem: [
      "Businesses want a chatbot that answers from their own content and can actually do things, like recommending a product, adding it to the cart or taking an order. A generic assistant can't do that.",
      "VegaBot is the open-source core of that kind of engine: upload your knowledge, connect it, and it answers by text or voice with grounded responses.",
    ],
    audience:
      "Businesses that want a chatbot grounded in their own content that can also act: recommend products or services, fill a cart and place orders.",
  },
  architecture: [
    {
      id: "high",
      label: "High-level",
      width: 1080,
      height: 560,
      note: "Chat and voice path, agent and model, ingestion and storage.",
      nodes: [
        { id: "client", label: "Web / Widget", sublabel: "text · voice", kind: "client", x: 40, y: 240, desc: "The chat client businesses embed. Sends text messages and streams voice." },
        { id: "api", label: "Django + DRF", sublabel: "REST · WebSocket chat", kind: "api", x: 300, y: 240, desc: "REST endpoints for configuration and knowledge uploads; WebSocket connection for chat and voice." },
        { id: "agent", label: "ADK Agent", sublabel: "tools · memory", kind: "agent", x: 560, y: 240, desc: "One Google ADK agent for both channels. Tools: knowledge search, recommendations, add to cart, place order. Remembers conversation context." },
        { id: "llm", label: "Gemini", sublabel: "Flash · Live", kind: "llm", x: 840, y: 240, desc: "Gemini Flash answers text chat; Gemini Live handles real-time voice." },
        { id: "workers", label: "Ingestion workers", sublabel: "Celery · Playwright", kind: "worker", x: 300, y: 440, desc: "Chunk and embed uploaded files, crawled URLs (Playwright) and raw text, off the request path." },
        { id: "pg", label: "PostgreSQL", sublabel: "FTS + pgvector", kind: "vector", x: 560, y: 440, desc: "Relational data, full-text search (GIN) and vector search (pgvector HNSW) in one database." },
        { id: "redis", label: "Redis", sublabel: "cache", kind: "cache", x: 560, y: 60, desc: "Caches repeated work to save time and cost." },
        { id: "analytics", label: "Analytics", sublabel: "per-message metrics", kind: "service", x: 300, y: 60, desc: "Records latency, tokens and cost for every message." },
      ],
      edges: [
        { from: "client", to: "api", kind: "sync", label: "REST · WS" },
        { from: "api", to: "agent", kind: "sync", label: "message" },
        { from: "agent", to: "llm", kind: "sync", label: "text · voice", both: true },
        { from: "api", to: "workers", kind: "async", label: "ingest" },
        { from: "workers", to: "pg", kind: "data", label: "chunks + embeddings" },
        { from: "agent", to: "pg", kind: "data", label: "hybrid search" },
        { from: "agent", to: "redis", kind: "data", label: "cache" },
        { from: "api", to: "analytics", kind: "data", label: "metrics" },
      ],
    },
  ],
  howItWorks: [
    {
      title: "Two channels, one agent.",
      body: "Text chat runs on Gemini Flash; real-time voice streams over WebSocket to Gemini Live. Both go through the same Google ADK agent, so tools and memory behave the same way whether the customer types or talks.",
    },
    {
      title: "Agent tools, not just answers.",
      body: "The agent can search the knowledge base, recommend products or services, add items to the cart and place orders. It also remembers context from the conversation, so customers don't have to repeat themselves.",
    },
    {
      title: "Ingestion off the request path.",
      body: "Uploaded files, URLs (crawled with Playwright) and raw text are chunked and embedded by Celery workers. Large uploads never block the API.",
    },
    {
      title: "Hybrid search inside PostgreSQL.",
      body: "Keyword search (full-text search with a GIN index) and semantic search (pgvector HNSW) run on the same database, and the two result lists are merged with Reciprocal Rank Fusion. Keeping vectors next to the relational data means one store and nothing to keep in sync.",
    },
    {
      title: "Measured per message.",
      body: "Every message records its latency, tokens and cost, so the cost of each conversation is visible. Redis caches repeated work to cut both cost and response time.",
    },
  ],
  techStack: [
    {
      layer: "API",
      tools: [
        { name: "Python", why: "Language for the whole backend." },
        { name: "Django", why: "Application core." },
        { name: "DRF", why: "REST endpoints for configuration and knowledge uploads." },
        { name: "WebSocket", why: "Streams text chat and real-time voice." },
      ],
    },
    {
      layer: "AI",
      tools: [
        { name: "Google ADK", why: "One agent with tools and memory, shared by text and voice." },
        { name: "Gemini", why: "Flash for text chat, Live for real-time voice." },
      ],
    },
    {
      layer: "Data",
      tools: [
        { name: "PostgreSQL", why: "Relational data plus full-text search with a GIN index." },
        { name: "pgvector", why: "Semantic search (HNSW) next to the relational data, merged with full-text results via RRF." },
        { name: "Redis", why: "Caches repeated work to cut cost and response time." },
      ],
    },
    {
      layer: "Ingestion",
      tools: [
        { name: "Celery", why: "Chunks and embeds uploads in the background." },
        { name: "Playwright", why: "Crawls URLs businesses add as knowledge." },
      ],
    },
    {
      layer: "Infra",
      tools: [{ name: "Docker", why: "Containerized services." }],
    },
  ],
  links: [
    { label: "Live demo", href: "https://vegabot.shahtaz.dev", kind: "live" },
    { label: "Backend source", href: "https://github.com/shahtaz-tqldd/vegabot-server", kind: "repo" },
  ],
  og: {
    title: "VegaBot: open-source AI chatbot engine",
    description:
      "Text and real-time voice agent on Google ADK and Gemini, grounded by hybrid search (full-text + pgvector, merged with RRF) inside PostgreSQL.",
  },
};

/* ──────────────────────────────── Tourtoise ─────────────────────────────── */

const tourtoise: Project = {
  slug: "tourtoise",
  order: 2,
  tier: "featured",
  eyebrow: "AI-powered travel planning platform",
  title: "Tourtoise",
  summary:
    "A multi-agent travel platform that turns preferences into budget-aware, day-by-day itineraries, with grounded destination Q&A and in-trip guidance.",
  role: "Backend & agent systems engineer",
  timeline: "2024",
  logo: tourtoiseLogo,
  accent: "#85fdbb",
  techChips: ["Python", "Django", "Google ADK", "Gemini", "PostgreSQL", "pgvector", "Celery", "React"],
  overview: {
    problem: [
      "Trip planning is a research problem wearing a shopping-cart UI. Travelers bounce between blogs, maps, review sites and spreadsheets, and generic LLM chat gives confident itineraries full of closed attractions and imaginary travel times because it plans from memory, not from data.",
      "Tourtoise approaches it as a systems problem: structured destination data in PostgreSQL, semantic retrieval over that data with pgvector, and a pipeline of specialized agents (preference collection, planning, budgeting and guidance), each with a narrow job. The output is a day-by-day itinerary that is grounded in the destination data and honest about the traveler's budget.",
    ],
    audience:
      "Travelers planning unfamiliar trips, especially with constraints like pace, interests and hard budget caps that no static template can respect.",
  },
  architecture: [
    {
      id: "high",
      label: "High-level",
      width: 1260,
      height: 540,
      note: "Request path, multi-agent core, retrieval layer and generation.",
      nodes: [
        { id: "web", label: "Traveler Web", sublabel: "React", kind: "client", x: 40, y: 220, desc: "Trip request UI: destination, dates, travelers and the preference conversation." },
        { id: "api", label: "Django API", sublabel: "trips · preferences", kind: "api", x: 300, y: 220, desc: "API for trips, preferences and itineraries. Starts planning as a background Celery job." },
        { id: "core", label: "ADK Multi-Agent Core", sublabel: "pref · planner · budget · guide", kind: "agent", x: 560, y: 220, desc: "Preference, planner, budget and guide agents run in order by an orchestrator, passing one typed trip state." },
        { id: "rag", label: "RAG Layer", sublabel: "PostgreSQL + pgvector", kind: "vector", x: 840, y: 100, desc: "Structured filters (country, interests, season) narrow the candidates, then pgvector ranks within that set." },
        { id: "llm", label: "Gemini", kind: "llm", x: 840, y: 340, desc: "Generates each agent's output from the retrieved destination data." },
        { id: "out", label: "Itinerary", sublabel: "days · items · budget", kind: "service", x: 1080, y: 220, desc: "Day-by-day plan with costs, checked against the traveler's budget before it's saved." },
      ],
      edges: [
        { from: "web", to: "api", kind: "sync", label: "REST" },
        { from: "api", to: "core", kind: "async", label: "plan trip" },
        { from: "core", to: "rag", kind: "data", label: "retrieve" },
        { from: "core", to: "llm", kind: "sync", label: "generate" },
        { from: "core", to: "out", kind: "data", label: "persist" },
      ],
    },
  ],
  howItWorks: [
    {
      title: "Narrow agents in a pipeline.",
      body: "Preference, planner, budget and guide agents each have one job, and an orchestrator runs them in order. A narrow agent is easier to test and to fix than one prompt trying to do everything.",
    },
    {
      title: "One shared trip state.",
      body: "Agents pass a typed trip state (preferences → draft → priced plan) instead of raw prompt text. Every day of the trip is planned against the same state, so days stay consistent with each other and nothing is planned twice.",
    },
    {
      title: "Retrieval: filter first, then rank.",
      body: "Structured filters (country, interests, season) narrow the candidates before pgvector similarity ranks inside that set. Similarity alone finds places that sound right; filtering first keeps factually wrong destinations out.",
    },
    {
      title: "Budget as a guardrail.",
      body: "The budget stage checks item costs against the traveler's cap before anything is saved. The budget is enforced in code, not just mentioned in a prompt.",
    },
    {
      title: "Planning runs in the background.",
      body: "Generating a trip is a Celery job with staged progress updates, because planning takes minutes, not milliseconds. The API stays responsive and the traveler can see which stage is running.",
    },
    {
      title: "Guidance during the trip.",
      body: "The assistant tracks where the traveler is in the day's plan and sends a morning and an end-of-day summary with a to-do list. Each interaction updates its memory, so the help keeps going after the plan is made.",
    },
  ],
  techStack: [
    {
      layer: "Frontend",
      tools: [{ name: "React", why: "Traveler-facing web app." }],
    },
    {
      layer: "API",
      tools: [
        { name: "Python", why: "Language for the backend and agents." },
        { name: "Django", why: "Trips, preferences and itinerary API." },
        { name: "WebSocket", why: "Real-time connection to the web app." },
      ],
    },
    {
      layer: "AI",
      tools: [
        { name: "Google ADK", why: "Defines the agents and the orchestrator that runs them in order." },
        { name: "Gemini", why: "Generation for each agent." },
        { name: "pgvector", why: "Similarity ranking inside the filtered destination set." },
      ],
    },
    {
      layer: "Data",
      tools: [{ name: "PostgreSQL", why: "Structured destination data, trips and itineraries in one store." }],
    },
    {
      layer: "Async",
      tools: [{ name: "Celery", why: "Runs trip planning as a background job with staged progress." }],
    },
    {
      layer: "Infra",
      tools: [
        { name: "Docker", why: "Reproducible environment for the whole system." },
        { name: "CI/CD", why: "Automated build and deploy pipeline." },
      ],
    },
  ],
  links: [
    { label: "Live app", href: "https://tourtoise.tech", kind: "live" },
    { label: "Backend source", href: "https://github.com/shahtaz-tqldd/tourtoise-backend", kind: "repo" },
  ],
  og: {
    title: "Tourtoise: multi-agent travel planning",
    description:
      "Preference, planner, budget and guide agents over a pgvector-grounded destination corpus produce budget-aware, day-by-day itineraries.",
  },
};

/* ──────────────────────────────── Restro FX ─────────────────────────────── */

const restroFx: Project = {
  slug: "restro-fx",
  order: 3,
  tier: "featured",
  eyebrow: "Forex broker management & analytics platform",
  title: "Restro FX",
  summary:
    "A broker management platform for forex traders: connect a TradeLocker account and get trading data pulled in automatically, with analytics on top.",
  role: "Full-stack engineer",
  accent: "#fbbf24",
  techChips: [],
  overview: {
    problem: [
      "Traders and brokers had their trading data locked inside the trading platform, with little analysis on top of it.",
      "Restro FX connects to TradeLocker accounts, brings that data into its own store and turns it into analytics.",
    ],
    audience: "Forex traders and brokers who trade on TradeLocker.",
  },
  architecture: [
    {
      id: "high",
      label: "High-level",
      width: 1040,
      height: 340,
      note: "Account connection, background sync, storage and analytics.",
      nodes: [
        { id: "dash", label: "Web dashboard", kind: "client", x: 40, y: 220, desc: "Where traders connect accounts and view their analytics." },
        { id: "api", label: "Backend API", kind: "api", x: 300, y: 220, desc: "Handles account connection and serves analytics to the dashboard." },
        { id: "workers", label: "Sync workers", kind: "worker", x: 560, y: 40, desc: "Pull trading data from connected TradeLocker accounts in the background." },
        { id: "tl", label: "TradeLocker", sublabel: "account connection", kind: "external", x: 820, y: 40, desc: "The trading platform the accounts live on." },
        { id: "analytics", label: "Analytics layer", kind: "service", x: 560, y: 220, desc: "Computes analytics from the stored trading data." },
        { id: "db", label: "Database", sublabel: "accounts · trades · positions", kind: "db", x: 820, y: 220, desc: "Restro FX's own store of accounts, trades and positions." },
      ],
      edges: [
        { from: "dash", to: "api", kind: "sync", label: "REST" },
        { from: "api", to: "workers", kind: "async", label: "sync account" },
        { from: "workers", to: "tl", kind: "sync", label: "pull data" },
        { from: "workers", to: "db", kind: "data", label: "store" },
        { from: "api", to: "analytics", kind: "sync", label: "query" },
        { from: "analytics", to: "db", kind: "data", label: "read" },
      ],
    },
  ],
  howItWorks: [
    {
      title: "Account connection.",
      body: "A trader links their TradeLocker account to Restro FX. From then on the platform pulls that account's data itself, so nothing has to be exported or copied by hand.",
    },
    {
      title: "Background sync.",
      body: "Sync workers fetch trading data from TradeLocker outside the web request. The dashboard stays responsive while data is being pulled in.",
    },
    {
      title: "One internal model for trades.",
      body: "Accounts, trades and positions are stored in Restro FX's own database in one consistent shape. Analytics run on that data, so they don't depend on the format of the outside API.",
    },
    {
      title: "Analytics on top.",
      body: "The analytics layer reads the stored trading data and powers the dashboard, giving traders analysis the trading platform itself didn't offer.",
    },
  ],
  techStack: [],
  links: [],
  og: {
    title: "Restro FX: forex broker management & analytics",
    description: "Connect a TradeLocker account, sync trading data automatically and get analytics on top.",
  },
};

/* ─────────────────────────────── E-commerce ─────────────────────────────── */

const ecommerce: Project = {
  slug: "ecommerce",
  order: 4,
  tier: "featured",
  eyebrow: "Full e-commerce platform",
  title: "E-commerce Platform",
  summary:
    "A complete e-commerce system covering products, variants, inventory and the full order workflow, from cart to delivery.",
  role: "Full-stack engineer",
  accent: "#f0abfc",
  techChips: [],
  overview: {
    problem: [
      "Built to run a store end to end: catalogue management, accurate stock across variants, and an order process the admin can actually operate.",
    ],
    audience: "Store owners and admins who manage the catalogue, stock and orders.",
  },
  architecture: [
    {
      id: "high",
      label: "High-level",
      width: 1040,
      height: 480,
      note: "Storefront and admin on one API, with catalogue, inventory and orders.",
      nodes: [
        { id: "store", label: "Storefront", kind: "client", x: 40, y: 120, desc: "Where customers browse, add to cart and order." },
        { id: "admin", label: "Admin panel", kind: "client", x: 40, y: 320, desc: "Where admins manage the catalogue, stock and orders." },
        { id: "api", label: "API", kind: "api", x: 300, y: 220, desc: "One API behind the storefront and the admin panel." },
        { id: "catalogue", label: "Catalogue", sublabel: "products · variants", kind: "service", x: 560, y: 40, desc: "Products and their variants; each variant has its own SKU, price and stock." },
        { id: "inventory", label: "Inventory", sublabel: "stock per variant", kind: "service", x: 560, y: 220, desc: "Stock tracked per variant." },
        { id: "orders", label: "Orders", sublabel: "cart → delivery", kind: "service", x: 560, y: 400, desc: "The order workflow, from cart to delivery." },
        { id: "db", label: "Database", kind: "db", x: 820, y: 220, desc: "Catalogue, inventory and orders." },
      ],
      edges: [
        { from: "store", to: "api", kind: "sync", label: "REST" },
        { from: "admin", to: "api", kind: "sync", label: "REST" },
        { from: "api", to: "catalogue", kind: "sync" },
        { from: "api", to: "inventory", kind: "sync" },
        { from: "api", to: "orders", kind: "sync" },
        { from: "catalogue", to: "db", kind: "data" },
        { from: "inventory", to: "db", kind: "data" },
        { from: "orders", to: "db", kind: "data" },
      ],
    },
  ],
  howItWorks: [
    {
      title: "Products and variants.",
      body: "Each option combination (size, colour and so on) is its own variant with its own SKU, price and stock. A product is the shared listing; the variant is what actually gets sold.",
    },
    {
      title: "Inventory per variant.",
      body: "Stock is tracked for each variant, not for the product as a whole, so availability is accurate down to each size and colour.",
    },
    {
      title: "Order workflow.",
      body: "Orders move through a defined workflow from cart to delivery, so every order has a clear status the admin can act on.",
    },
    {
      title: "Admin operations.",
      body: "Admins manage the catalogue, stock levels and orders from one admin panel, on the same API the storefront uses.",
    },
  ],
  techStack: [],
  links: [],
  og: {
    title: "E-commerce Platform",
    description: "Products, variants, per-variant inventory and the full order workflow, from cart to delivery.",
  },
};

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
    audience: "Developers debugging REST, WebSocket and SSE traffic in web apps.",
  },
  architecture: [
    {
      id: "high",
      label: "High-level",
      width: 1040,
      height: 320,
      note: "Capture in the page, UI in an isolated content script, state in the service worker.",
      nodes: [
        { id: "page", label: "Page scripts", sublabel: "fetch · XHR · WS · SSE", kind: "client", x: 40, y: 200, desc: "The site's own network calls." },
        { id: "interceptor", label: "Interceptor", sublabel: "MAIN world · document_start", kind: "service", x: 300, y: 200, desc: "Wraps fetch, XMLHttpRequest, WebSocket and EventSource before any page script runs." },
        { id: "panel", label: "Panel UI", sublabel: "content script · Shadow DOM", kind: "widget", x: 560, y: 200, desc: "Request list, details, filters and HAR export, rendered inside a Shadow DOM." },
        { id: "sw", label: "Service worker", sublabel: "toggle · badge", kind: "service", x: 560, y: 40, desc: "Toggles the panel, injects it into already-open tabs and shows the request-count badge." },
        { id: "storage", label: "chrome.storage.session", sublabel: "per-tab state", kind: "storage", x: 820, y: 40, desc: "Panel visibility and the preserved log, removed when the tab closes." },
      ],
      edges: [
        { from: "page", to: "interceptor", kind: "sync", label: "wrapped APIs" },
        { from: "interceptor", to: "panel", kind: "async", label: "private CustomEvent" },
        { from: "panel", to: "sw", kind: "sync", label: "messages", both: true },
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
        { name: "Manifest V3", why: "Service-worker background, content scripts and a toolbar action with a keyboard shortcut." },
        { name: "chrome.storage.session", why: "Per-tab state and the preserved log, cleared when the tab closes." },
      ],
    },
    {
      layer: "UI",
      tools: [
        { name: "JavaScript", why: "Plain JavaScript, no framework." },
        { name: "Shadow DOM", why: "Keeps the panel's styles and the site's styles apart." },
      ],
    },
  ],
  links: [
    { label: "Source", href: "https://github.com/shahtaz-tqldd/network-monitor-chrome-extension", kind: "repo" },
    { label: "Download .zip", href: "/network-monitor.zip", kind: "download" },
  ],
  og: {
    title: "Network Monitor: API & WebSocket inspector",
    description: "A Manifest V3 Chrome extension that captures fetch, XHR, WebSocket and SSE traffic in an in-page panel.",
  },
};

/* ──────────────────────────────── exports ───────────────────────────────── */

export const projects: Project[] = [vegabot, tourtoise, restroFx, ecommerce, networkMonitor].sort(
  (a, b) => a.order - b.order,
);

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const compactProjects = projects.filter((p) => p.tier === "compact");

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Next project by `order`, wrapping from last to first. */
export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
