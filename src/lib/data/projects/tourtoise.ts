import type { Project } from "@/lib/types";
import tourtoiseLogo from "@/assets/images/tourtoise-logo.png";

/* ──────────────────────────────── Tourtoise ─────────────────────────────── */

const tourtoise: Project = {
  slug: "tourtoise",
  order: 2,
  tier: "featured",
  eyebrow: "AI-powered travel planning platform",
  title: "Tourtoise",
  summary:
    "A multi-agent travel platform that turns a traveler's preferences into grounded, budget-checked, day-by-day itineraries, then guides them through each day of the trip based on where they are.",
  role: "Backend & agent systems engineer",
  timeline: "2024",
  logo: tourtoiseLogo,

  accent: "#85fdbb",
  techChips: [
    "Python",
    "Django",
    "Google ADK",
    "Gemini",
    "PostgreSQL",
    "pgvector",
    "Celery",
    "WebSocket",
    "React",
  ],
  overview: {
    problem: [
      "Planning a trip is mostly research. Travelers move between blogs, maps, review sites and spreadsheets to work out what is open, how far apart places are and what everything will cost. Generic LLM chat looks like a shortcut, but it plans from memory: its itineraries include closed attractions and made-up travel times, it doesn't enforce the budget, and it stops helping once the plan is written.",
      "Tourtoise treats this as a systems problem rather than a prompting problem. Destination facts live in PostgreSQL. Retrieval applies hard SQL filters first and then ranks the remaining places with pgvector. Planning is split across narrow agents (preference, planner, budget and guide) that pass one typed trip state between them. Rules like the budget cap are enforced in code. The result is a day-by-day itinerary based on real destination data that stays within the traveler's budget, followed by guidance during the trip.",
    ],
    audience:
      "Travelers planning trips to places they don't know well, especially those with constraints a static template can't handle: a preferred pace, specific interests and a hard budget cap.",
  },
  features: [
    {
      title: "Preference interview",
      body: "A short conversation instead of a long form. The preference agent turns it into a typed state (pace, interests and constraints) that every later stage uses.",
    },
    {
      title: "Day-by-day itineraries",
      body: "Each day is built from structured destination data such as opening times, seasons and locations, not from the model's memory, so the plan holds up on the ground.",
    },
    {
      title: "Budget guardrail",
      body: "Every item is priced and the total is checked against the traveler's cap in code before anything is saved. The budget is enforced, not just mentioned in a prompt.",
    },
    {
      title: "Grounded destination Q&A",
      body: "Questions about a destination are answered by filtering the structured data first and then ranking within that set with pgvector, so answers match the real place.",
    },
    {
      title: "Planning with live progress",
      body: "Trip generation runs as a background Celery job and streams staged progress over WebSocket, so the app stays responsive while the plan is built.",
    },
    {
      title: "Location-aware in-trip guidance",
      body: "During the trip, the guide agent tracks the traveler's current location and progress through the day's plan. It sends a morning briefing and an end-of-day summary with a to-do list, and updates its memory after each interaction.",
    },
  ],
  architecture: [
    {
      id: "high",
      label: "High-level",
      width: 1260,
      height: 540,
      note: "The request path from client to API, the multi-agent core, the retrieval layer and generation.",
      nodes: [
        {
          id: "web",
          label: "Traveler Web",
          sublabel: "React",
          kind: "client",
          x: 40,
          y: 220,
          desc: "Trip request UI (destination, dates, travelers), the preference conversation, live planning progress and the itinerary view.",
        },
        {
          id: "api",
          label: "Django API",
          sublabel: "trips · preferences",
          kind: "api",
          x: 300,
          y: 220,
          desc: "REST API for trips, preferences and itineraries. Starts planning as a background Celery job and pushes progress back to the client over WebSocket.",
        },
        {
          id: "core",
          label: "ADK Multi-Agent Core",
          sublabel: "pref · planner · budget · guide",
          kind: "agent",
          x: 560,
          y: 220,
          desc: "An orchestrator runs the preference, planner, budget and guide agents in order. They all read and write one typed trip state.",
        },
        {
          id: "rag",
          label: "RAG Layer",
          sublabel: "PostgreSQL + pgvector",
          kind: "vector",
          x: 840,
          y: 100,
          desc: "Structured filters (country, interests, season) narrow the candidates, then pgvector ranks within that set, all in one database query.",
        },
        {
          id: "llm",
          label: "Gemini",
          kind: "llm",
          x: 840,
          y: 340,
          desc: "Writes each agent's output from the retrieved destination data, never from memory alone.",
        },
        {
          id: "out",
          label: "Itinerary",
          sublabel: "days · items · budget",
          kind: "service",
          x: 1080,
          y: 220,
          desc: "Day-by-day plan with a cost for every item. It is saved only after it passes the budget check.",
        },
      ],
      edges: [
        { from: "web", to: "api", kind: "sync", label: "REST" },
        { from: "api", to: "core", kind: "async", label: "plan trip" },
        { from: "core", to: "rag", kind: "data", label: "retrieve" },
        { from: "core", to: "llm", kind: "sync", label: "generate" },
        { from: "core", to: "out", kind: "data", label: "persist" },
      ],
    },
    {
      id: "pipeline",
      label: "Agent pipeline",
      width: 1360,
      height: 440,
      note: "Narrow agents run in order and hand one typed trip state from stage to stage.",
      groups: [
        { id: "adk", label: "Google ADK", x: 20, y: 20, w: 1320, h: 220 },
      ],
      nodes: [
        {
          id: "orch",
          label: "Orchestrator",
          sublabel: "stages · retries",
          kind: "agent",
          x: 60,
          y: 140,
          desc: "Runs the agents in order and reports which stage is running. If a stage fails, it retries only that stage from the saved trip state instead of rebuilding the whole trip.",
        },
        {
          id: "pref",
          label: "Preference agent",
          sublabel: "interview",
          kind: "agent",
          x: 340,
          y: 60,
          desc: "Turns the preference conversation into a typed preference state: pace, interests and constraints.",
        },
        {
          id: "planner",
          label: "Planner agent",
          sublabel: "day-by-day",
          kind: "agent",
          x: 620,
          y: 60,
          desc: "Builds the draft itinerary day by day, using only destination candidates from the retrieval layer.",
        },
        {
          id: "budget",
          label: "Budget agent",
          sublabel: "guardrail",
          kind: "agent",
          x: 900,
          y: 60,
          desc: "Prices every item and checks the total against the traveler's cap in code. Nothing is saved until the check passes.",
        },
        {
          id: "guide",
          label: "Guide agent",
          sublabel: "in-trip",
          kind: "agent",
          x: 1140,
          y: 140,
          desc: "Active during the trip. Tracks the traveler's current location and progress through the plan, and sends morning and end-of-day summaries with a to-do list.",
        },
        {
          id: "gemini",
          label: "Gemini",
          kind: "llm",
          x: 340,
          y: 320,
          desc: "Language generation for the agent stages. The budget check is deterministic code, not a model call.",
        },
        {
          id: "state",
          label: "Trip state",
          sublabel: "preferences → draft → priced",
          kind: "db",
          x: 640,
          y: 320,
          desc: "One typed state passed between agents. Every day is planned against the same data, so days stay consistent, nothing is planned twice, and each stage's output can be inspected on its own.",
        },
      ],
      edges: [
        { from: "orch", to: "pref", kind: "sync", label: "stage 1" },
        { from: "pref", to: "planner", kind: "sync", label: "stage 2" },
        { from: "planner", to: "budget", kind: "sync", label: "stage 3" },
        { from: "budget", to: "guide", kind: "sync", label: "stage 4" },
        { from: "pref", to: "gemini", kind: "sync", both: true },
        { from: "planner", to: "gemini", kind: "sync", both: true },
        { from: "pref", to: "state", kind: "data" },
        { from: "planner", to: "state", kind: "data" },
        { from: "budget", to: "state", kind: "data" },
        { from: "guide", to: "state", kind: "data" },
      ],
    },
    {
      id: "retrieval",
      label: "Retrieval",
      width: 1260,
      height: 340,
      note: "Filter first, then rank: structured filters remove impossible destinations before similarity ranks what's left.",
      nodes: [
        {
          id: "req",
          label: "Trip preferences",
          sublabel: "country · season · interests",
          kind: "client",
          x: 40,
          y: 140,
          desc: "What the traveler asked for, already captured as structured fields by the preference agent.",
        },
        {
          id: "filt",
          label: "Structured filters",
          sublabel: "SQL WHERE",
          kind: "service",
          x: 320,
          y: 140,
          desc: "Hard facts first: country, open season and interest tags remove anything the traveler couldn't actually visit.",
        },
        {
          id: "pg",
          label: "Filtered set",
          sublabel: "PostgreSQL",
          kind: "db",
          x: 600,
          y: 140,
          desc: "The rows that passed the filters: a small set of places the traveler could actually visit.",
        },
        {
          id: "vec",
          label: "Similarity rank",
          sublabel: "pgvector",
          kind: "vector",
          x: 860,
          y: 140,
          desc: "pgvector orders the filtered set by similarity to the preference embedding. Searching a small set keeps the query cheap.",
        },
        {
          id: "ctx",
          label: "Agent context",
          sublabel: "top-k destinations",
          kind: "agent",
          x: 1060,
          y: 140,
          desc: "Only grounded candidates reach the planner: places that are both relevant and possible.",
        },
      ],
      edges: [
        { from: "req", to: "filt", kind: "sync", label: "filter" },
        { from: "filt", to: "pg", kind: "data", label: "WHERE" },
        { from: "pg", to: "vec", kind: "data", label: "candidates" },
        { from: "vec", to: "ctx", kind: "sync", label: "top-k" },
      ],
    },
  ],
  howItWorks: [
    {
      title: "Narrow agents in a pipeline.",
      body: "Preference, planner, budget and guide agents each have one job, and an orchestrator runs them in order. A narrow agent is easier to test, debug and improve than one large prompt, and a failure stays inside one stage instead of breaking the whole trip.",
    },
    {
      title: "One shared trip state.",
      body: "Agents pass a typed trip state (preferences → draft → priced plan) instead of raw prompt text. Every day is planned against the same state, so days stay consistent with each other, nothing is planned twice, and a failed stage can be retried from where it stopped.",
    },
    {
      title: "Retrieval: filter first, then rank.",
      body: "Structured filters (country, interests, season) narrow the candidates before pgvector ranks within that set. Similarity alone finds places that sound right; filtering first keeps impossible ones out. Because the embeddings live in PostgreSQL, filtering and ranking run in one query with no separate vector store to sync.",
    },
    {
      title: "Budget as a guardrail.",
      body: "The budget stage prices every item and checks the total against the traveler's cap before anything is saved. The model never decides whether the plan fits the budget; the code does.",
    },
    {
      title: "Planning runs in the background.",
      body: "Generating a trip takes minutes, so it runs as a Celery job instead of inside an HTTP request. The API stays responsive, staged progress reaches the client over WebSocket, and the traveler can see which stage is running.",
    },
    {
      title: "Guidance during the trip.",
      body: "Once the trip starts, the guide agent follows the traveler's current location and progress through the day's plan. It sends a morning briefing and an end-of-day summary with a to-do list, and updates its memory after each interaction, so help continues after the plan is made.",
    },
  ],
  techStack: [
    {
      layer: "Frontend",
      tools: [
        {
          name: "React",
          why: "Traveler-facing web app: trip requests, preference chat, live progress and itineraries.",
        },
      ],
    },
    {
      layer: "API",
      tools: [
        { name: "Python", why: "Language for the backend and the agents." },
        {
          name: "Django",
          why: "REST API for trips, preferences and itineraries.",
        },
        {
          name: "WebSocket",
          why: "Pushes planning progress and in-trip updates to the client without polling.",
        },
      ],
    },
    {
      layer: "AI",
      tools: [
        {
          name: "Google ADK",
          why: "Defines the agents and the orchestrator that runs them in order.",
        },
        { name: "Gemini", why: "Language generation for the agent stages." },
        {
          name: "pgvector",
          why: "Similarity ranking inside the filtered destination set, in the same database as the facts.",
        },
      ],
    },
    {
      layer: "Data",
      tools: [
        {
          name: "PostgreSQL",
          why: "One store for destination data, embeddings, trips and itineraries.",
        },
      ],
    },
    {
      layer: "Async",
      tools: [
        {
          name: "Celery",
          why: "Runs trip planning as a background job with staged progress and stage-level retries.",
        },
      ],
    },
    {
      layer: "Infra",
      tools: [
        {
          name: "Docker",
          why: "Reproducible environment for the API, workers and database.",
        },
        { name: "CI/CD", why: "Automated build and deploy pipeline." },
      ],
    },
  ],
  links: [
    { label: "Live app", href: "https://tourtoise.tech", kind: "live" },
    {
      label: "Backend source",
      href: "https://github.com/shahtaz-tqldd/tourtoise-backend",
      kind: "repo",
    },
  ],
  og: {
    title: "Tourtoise: multi-agent AI travel planning",
    description:
      "Preference, planner, budget and guide agents on a pgvector-grounded destination corpus produce budget-checked, day-by-day itineraries and location-aware guidance during the trip.",
  },
};
export default tourtoise;
