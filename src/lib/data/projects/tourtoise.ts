import type { Project } from "@/lib/types";

/**
 * Tourtoise — AI-powered travel planning platform.
 * Diagrams and any unspecified numbers are illustrative (see content/ASSUMPTIONS.md).
 */
export const tourtoise: Project = {
  slug: "tourtoise",
  title: "Tourtoise",
  logo: "/tourtoise-logo.png",
  tagline: "AI-powered travel planning platform",
  summary:
    "A multi-agent travel platform for destination discovery, itinerary generation and personalized trip planning: RAG-based destination Q&A over structured travel data, with agent workflows for preference collection, day-by-day planning, budgeting and contextual guidance.",
  role: "Backend & agent systems engineer",
  timeline: "2024",
  teamSize: "Solo project",
  accent: "#85fdbb",
  techChips: ["Python", "Django", "Google ADK", "Gemini", "PostgreSQL", "pgvector", "Docker"],
  headlineMetric: { label: "specialized agents in the planning pipeline", value: 4, suffix: "" },
  problem: {
    paragraphs: [
      "Trip planning is a research problem wearing a shopping-cart UI. Travelers bounce between blogs, maps, review sites and spreadsheets, and generic LLM chat gives confident itineraries full of closed attractions and imaginary travel times because it plans from memory, not from data.",
      "Tourtoise approaches it as a systems problem: structured destination data in PostgreSQL, semantic retrieval over that data with pgvector, and a pipeline of specialized agents — preference collection, planning, budgeting and guidance — each with a narrow job and an explicit contract. The output is a day-by-day itinerary that is grounded in the destination corpus and honest about the traveler's budget.",
    ],
    affected:
      "Travelers planning unfamiliar trips — especially with constraints like pace, interests and hard budget caps that no static template can respect.",
    why: "An itinerary is a promise about the real world. Grounding every suggestion in retrieved destination data — and validating it against a budget agent — is what separates a planning tool from a fiction generator.",
  },
  constraints: [
    { label: "Grounding", value: "Retrieval-first answers", note: "No destination facts from model memory" },
    { label: "Structure", value: "Typed itinerary output", note: "Days, items, costs — not free text" },
    { label: "Budget", value: "Hard caps respected", note: "Budget agent validates before persist" },
    { label: "Pipeline", value: "Async generation", note: "Multi-minute planning runs off the request path" },
    { label: "Corpus", value: "Structured + semantic", note: "Tags/filters + vector similarity (hybrid)" },
    { label: "Team", value: "Solo", note: "Maximize leverage per moving part" },
  ],
  architecture: {
    views: [
      {
        id: "high",
        label: "High-level",
        width: 1260,
        height: 540,
        note: "Request path, multi-agent core, retrieval layer and generation.",
        nodes: [
          { id: "web", label: "Traveler Web", kind: "client", x: 40, y: 220, desc: "Trip request UI: destination, dates, travelers, and an interactive preference interview." },
          { id: "api", label: "Django API", sublabel: "auth · trips", kind: "api", x: 300, y: 220, desc: "REST API for trips, preferences and itinerary retrieval; kicks off the planning pipeline." },
          { id: "core", label: "ADK Multi-Agent Core", sublabel: "pref · planner · budget · guide", kind: "agent", x: 560, y: 220, desc: "Orchestrated agent pipeline with typed handoffs between specialists." },
          { id: "rag", label: "RAG Layer", sublabel: "PostgreSQL + pgvector", kind: "vector", x: 840, y: 100, desc: "Hybrid retrieval over structured destinations + embedded destination chunks." },
          { id: "llm", label: "Gemini", kind: "llm", x: 840, y: 340, desc: "Generation model, constrained by retrieved evidence and typed output schemas." },
          { id: "out", label: "Itinerary", sublabel: "days · items · budget", kind: "service", x: 1080, y: 220, desc: "Persisted, structured trip plan the traveler can review and refine." },
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
        id: "agents",
        label: "Agent detail",
        width: 1420,
        height: 900,
        note: "The orchestration: preference → planner → budget → guide, with typed handoffs and shared trip state.",
        groups: [
          { id: "g-core", label: "ADK Agent Runtime", x: 580, y: 40, w: 800, h: 820 },
        ],
        nodes: [
          { id: "web", label: "Traveler Web", kind: "client", x: 40, y: 300, desc: "Trip request UI and the preference interview chat." },
          { id: "api", label: "Django API", kind: "api", x: 300, y: 300, desc: "Auth, trip CRUD, and pipeline kickoff." },
          { id: "redis", label: "Redis", sublabel: "broker", kind: "cache", x: 300, y: 80, desc: "Celery broker for planning jobs; progress state for the UI." },
          { id: "worker", label: "Celery Worker", sublabel: "planning job", kind: "worker", x: 300, y: 540, desc: "Executes the multi-agent planning run and reports stage progress." },
          { id: "orch", label: "Orchestrator", kind: "agent", x: 620, y: 300, desc: "Sequences the specialists, threads shared TripState between them, retries failed stages." },
          { id: "pref", label: "Preference Agent", kind: "agent", x: 920, y: 60, desc: "Interviews the traveler: pace, interests, constraints. Emits a typed preference object." },
          { id: "planner", label: "Planner Agent", kind: "agent", x: 920, y: 300, desc: "Retrieves candidate destinations/POIs via hybrid search, drafts the day-by-day plan." },
          { id: "budget", label: "Budget Agent", kind: "agent", x: 920, y: 540, desc: "Prices the draft, checks caps, proposes swaps when the plan overshoots." },
          { id: "guide", label: "Guide Agent", kind: "agent", x: 920, y: 770, desc: "Enriches items with logistics, timings and contextual tips from the corpus." },
          { id: "pg", label: "PostgreSQL", sublabel: "trips · destinations", kind: "db", x: 620, y: 80, desc: "Relational core: users, trips, preferences, destinations, itinerary outputs." },
          { id: "vec", label: "pgvector", sublabel: "destination embeddings", kind: "vector", x: 620, y: 770, desc: "Embedded destination chunks for semantic retrieval, always filtered to the destination scope." },
          { id: "llm", label: "Gemini", kind: "llm", x: 1180, y: 415, desc: "One model, many constrained roles — each agent prompt scoped to its specialty." },
        ],
        edges: [
          { from: "web", to: "api", kind: "sync", label: "REST" },
          { from: "api", to: "redis", kind: "async", label: "enqueue" },
          { from: "redis", to: "worker", kind: "async", label: "consume" },
          { from: "api", to: "pg", kind: "data", label: "CRUD" },
          { from: "worker", to: "orch", kind: "sync", label: "start" },
          { from: "orch", to: "pref", kind: "sync", label: "interview" },
          { from: "pref", to: "planner", kind: "sync", label: "handoff", dashed: true, animate: false },
          { from: "planner", to: "budget", kind: "sync", label: "handoff", dashed: true, animate: false },
          { from: "budget", to: "guide", kind: "sync", label: "handoff", dashed: true, animate: false },
          { from: "planner", to: "vec", kind: "data", label: "retrieve" },
          { from: "guide", to: "vec", kind: "data", label: "retrieve" },
          { from: "orch", to: "pg", kind: "data", label: "persist" },
          { from: "pref", to: "llm", kind: "sync", label: "prompt" },
          { from: "planner", to: "llm", kind: "sync", label: "prompt" },
          { from: "budget", to: "llm", kind: "sync", label: "prompt" },
          { from: "guide", to: "llm", kind: "sync", label: "prompt" },
        ],
      },
    ],
    notes: [
      "The orchestrator is a state machine, not a loop: each stage validates its input contract before running, so a bad preference object fails fast at the boundary.",
      "Agents share a typed TripState object (preferences → draft → priced draft → enriched plan) instead of passing raw prompt strings.",
      "Retrieval is hybrid: structured filters (country, tags, season) narrow the candidate set before vector similarity ranks within it.",
      "Diagram is illustrative — it reflects the design, not an exact deployment map.",
    ],
  },
  erDiagram: {
    views: [
      {
        id: "main",
        label: "Schema",
        width: 1340,
        height: 1000,
        note: "Trips, preferences, the destination corpus and the generated itinerary.",
        nodes: [
          {
            id: "users", label: "users", kind: "table", x: 40, y: 40, w: 300, desc: "Traveler accounts.",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "email", type: "citext", key: "idx" },
              { name: "name", type: "text" },
              { name: "created_at", type: "timestamptz" },
            ],
          },
          {
            id: "trips", label: "trips", kind: "table", x: 40, y: 300, w: 300, desc: "One planned journey; the aggregate root of the pipeline's output.",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "user_id", type: "uuid", key: "fk" },
              { name: "title", type: "text" },
              { name: "destination_query", type: "text" },
              { name: "start_date", type: "date" },
              { name: "status", type: "enum", key: "idx" },
            ],
          },
          {
            id: "trip_prefs", label: "trip_preferences", kind: "table", x: 40, y: 640, w: 300, desc: "Structured output of the preference agent (1:1 with trip).",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "trip_id", type: "uuid", key: "fk" },
              { name: "pace", type: "enum" },
              { name: "interests", type: "text[]" },
              { name: "budget_total", type: "numeric" },
              { name: "travelers", type: "int" },
            ],
          },
          {
            id: "destinations", label: "destinations", kind: "table", x: 460, y: 40, w: 300, desc: "Structured destination facts — the grounding corpus.",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "name", type: "text", key: "idx" },
              { name: "country", type: "text", key: "idx" },
              { name: "tags", type: "text[]" },
              { name: "summary", type: "text" },
            ],
          },
          {
            id: "dest_chunks", label: "destination_chunks", kind: "table", x: 460, y: 340, w: 300, desc: "Embedded destination text for semantic retrieval.",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "destination_id", type: "uuid", key: "fk" },
              { name: "content", type: "text" },
              { name: "embedding", type: "vector(768)", key: "vec" },
              { name: "source", type: "text", key: "idx" },
            ],
          },
          {
            id: "budgets", label: "budgets", kind: "table", x: 460, y: 660, w: 300, desc: "Budget agent's priced view of the plan (1:1 with trip).",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "trip_id", type: "uuid", key: "fk" },
              { name: "planned_total", type: "numeric" },
              { name: "actual_total", type: "numeric" },
              { name: "currency", type: "char(3)" },
            ],
          },
          {
            id: "days", label: "itinerary_days", kind: "table", x: 880, y: 40, w: 320, desc: "Ordered days of the generated itinerary.",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "trip_id", type: "uuid", key: "fk" },
              { name: "day_number", type: "int", key: "idx" },
              { name: "date", type: "date" },
              { name: "summary", type: "text" },
            ],
          },
          {
            id: "items", label: "itinerary_items", kind: "table", x: 880, y: 340, w: 320, desc: "Scheduled items; cost_est feeds budget validation. destination_id nullable for transit/rest days.",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "day_id", type: "uuid", key: "fk" },
              { name: "destination_id", type: "uuid", key: "fk" },
              { name: "time_slot", type: "enum" },
              { name: "title", type: "text" },
              { name: "cost_est", type: "numeric" },
            ],
          },
        ],
        edges: [
          { from: "users", to: "trips", kind: "data", label: "1 : N", animate: false },
          { from: "trips", to: "trip_prefs", kind: "data", label: "1 : 1", animate: false },
          { from: "trips", to: "days", kind: "data", label: "1 : N", animate: false },
          { from: "days", to: "items", kind: "data", label: "1 : N", animate: false },
          { from: "destinations", to: "dest_chunks", kind: "data", label: "1 : N", animate: false },
          { from: "destinations", to: "items", kind: "data", label: "1 : N", animate: false },
          { from: "trips", to: "budgets", kind: "data", label: "1 : 1", animate: false },
        ],
      },
    ],
    why: "The schema separates the corpus (destinations, chunks) from the artifact (trips → days → items). The planner writes a typed itinerary — not a text blob — so days and items can be edited, re-priced and re-generated individually. Preferences and budgets are 1:1 side tables because they're pipeline stage outputs: each agent's contract is literally a table.",
    notes: [
      "itinerary_items.destination_id is nullable — transit days and rest days are first-class plan items.",
      "GiST indexes on tags/text[] support the structured half of hybrid retrieval before vector ranking.",
      "cost_est lives on items so the budget agent validates line-by-line, and re-planning a single day doesn't re-price the trip.",
    ],
  },
  decisions: [
    {
      title: "Multi-agent pipeline vs one big prompt",
      decision: "Four narrow agents with typed handoffs, sequenced by an orchestrator state machine.",
      alternatives: [
        { name: "Single mega-prompt", note: "Cheap to build; degrades unpredictably — preferences, planning and pricing all fight for the same context window." },
        { name: "Free agent swarm", note: "Flexible but non-deterministic routing makes trips hard to reproduce and debug." },
      ],
      why: "Narrow prompts are testable prompts. Each stage has one job, a typed input contract and a schema-validated output — failures localize to a stage instead of a vibe.",
    },
    {
      title: "Retrieval: hybrid vs pure vector similarity",
      decision: "Structured filters first (country, tags, season), vector similarity second, rerank after.",
      alternatives: [
        { name: "Pure vector search", note: "Great for prose; weak for facts — 'beach in Cox's Bazar under 5000 BDT/day' is half filter, half semantics." },
        { name: "Keyword-only (tsvector)", note: "Precise but brittle to phrasing; misses 'romantic getaway' ≈ 'honeymoon'." },
      ],
      why: "Destination data is already structured — using filters before similarity keeps ranking honest and cheap, and vector search only has to do the part it's actually good at.",
    },
    {
      title: "Sync preview vs async planning job",
      decision: "Async Celery job with staged progress updates (preference → planning → budgeting → guiding).",
      alternatives: [
        { name: "Synchronous request", note: "Simple UX-wise; a multi-minute agent run would hold HTTP workers and time out proxies." },
        { name: "Websocket streaming pipeline", note: "Best perceived latency; significant transport + resume complexity for a solo project." },
      ],
      why: "Planning takes minutes, not milliseconds. Async keeps it robust, retryable and horizontally scalable — and staged progress keeps the UX honest without full streaming infra.",
    },
  ],
  challenges: [
    {
      title: "Retrieval accuracy on structured travel facts",
      problem: "Pure vector similarity returned atmospherically-similar but factually-wrong destinations (wrong country, wrong season) — the model then confidently planned around them.",
      solution: "Hybrid retrieval: hard structured filters before similarity, plus a rerank pass over the candidate set.",
      before: {
        lang: "sql",
        filename: "retrieval.sql — before",
        code: `-- ❌ similarity alone: right vibes, wrong country
SELECT d.name, c.content <=> :query_vec AS dist
FROM destination_chunks c
JOIN destinations d ON d.id = c.destination_id
ORDER BY dist
LIMIT 20;`,
      },
      after: {
        lang: "sql",
        filename: "retrieval.sql — after",
        code: `-- ✅ filters first, similarity within candidates, rerank after
WITH candidates AS (
  SELECT d.id, d.name
  FROM destinations d
  WHERE d.country = :country
    AND d.tags && :interests      -- structured half
    AND d.season_ok(@:travel_month)
)
SELECT c.content, c.embedding <=> :query_vec AS dist  -- semantic half
FROM destination_chunks c
JOIN candidates cd ON cd.id = c.destination_id
ORDER BY dist
LIMIT 24;   -- → rerank(candidates, keep=8) in Python`,
      },
      outcome: "Factually impossible plans stopped appearing; similarity only ranks inside a candidate set the schema already blessed.",
    },
    {
      title: "Day-to-day coherence across agents",
      problem: "Agents drafting days independently produced overlapping visits, impossible transit hops and repeated restaurants — each day was locally fine and globally incoherent.",
      solution: "A shared typed TripState threaded through every agent, with schema validation at stage boundaries.",
      before: {
        lang: "python",
        filename: "pipeline.py — before",
        code: `# ❌ each day drafted from its own prompt, nothing shared
async def plan_trip(trip):
    days = [await draft_day(trip, i) for i in range(trip.length)]
    return "\n".join(days)  # overlapping POIs, phantom transit`,
      },
      after: {
        lang: "python",
        filename: "pipeline.py — after",
        code: `class TripState(BaseModel):
    prefs: Preferences
    visited: set[str] = set()
    budget_left: Decimal

    def lock(self, poi_id: str, cost: Decimal) -> bool:
        if poi_id in self.visited or cost > self.budget_left:
            return False
        self.visited.add(poi_id)
        self.budget_left -= cost
        return True

# ✅ one state object, validated at every handoff
async def plan_trip(trip):
    state = TripState(prefs=await pref_agent.interview(trip))
    for day in range(trip.length):
        await planner_agent.draft_day(trip, day, state)  # shares state
    TripState.model_validate(state)  # contract check`,
      },
      outcome: "Duplication and budget drift became structurally impossible instead of prompt-suggested-against. [METRIC: itinerary acceptance rate — add real number]",
    },
    {
      title: "Budget drift between stages",
      problem: "The planner added 'just one more' stop per day; by day five the cumulative cost quietly exceeded the cap the traveler set.",
      solution: "A dedicated budget stage that validates every item's cost before persist, with swap suggestions instead of silent trimming.",
      before: {
        lang: "python",
        filename: "budget.py — before",
        code: `# ❌ budget mentioned in a prompt, never enforced
prompt = f"Plan a trip under {budget} BDT."
items = await llm.generate(prompt)  # 'under' is a suggestion
save(items)`,
      },
      after: {
        lang: "python",
        filename: "budget.py — after",
        code: `# ✅ budget is a guardrail, checked before persist
async def validate_budget(trip, items) -> Budget:
    total = sum(i.cost_est for i in items)
    if total > trip.prefs.budget_total * OVERSHOOT:
        swaps = await propose_swaps(items, deficit=total - trip.prefs.budget_total)
        raise BudgetExceeded(swaps=swaps)
    return Budget(planned_total=total, currency=trip.currency)`,
      },
      outcome: "Over-budget plans are rejected at the boundary and come back with actionable swaps — trust survives contact with arithmetic.",
    },
  ],
  results: {
    metrics: [
      { label: "specialist agents in the pipeline", value: 4, suffix: "" },
      { label: "planning stages with typed contracts", value: 4, suffix: "" },
      { label: "median trip generation time", placeholder: "[METRIC: generation time]" },
      { label: "retrieval precision on facts", placeholder: "[METRIC: precision %]" },
    ],
    chart: {
      title: "Itineraries passing budget validation — before / after guardrail",
      unit: "% of drafts (illustrative)",
      illustrative: true,
      series: [
        { label: "Before — prompt-only budget", value: 55 },
        { label: "After — validated guardrail", value: 100 },
      ],
      note: "With the guardrail, drafts that overshoot are rejected and re-proposed instead of persisted. Replace with measured numbers.",
    },
    notes: ["Numbers marked [METRIC] are placeholders — swap in measured values before publishing."],
  },
  techStack: [
    {
      layer: "API",
      icon: "server",
      tools: [{ name: "Django", why: "ORM + admin got the trip model and CRUD surface running fast, solo." }],
    },
    {
      layer: "AI",
      icon: "bot",
      tools: [
        { name: "Google ADK", why: "Orchestration, agent definitions and tool wiring without a custom framework." },
        { name: "Gemini", why: "Generation per stage, each with a constrained output schema." },
        { name: "pgvector", why: "Semantic retrieval colocated with the structured destination corpus for hybrid search." },
      ],
    },
    {
      layer: "Data",
      icon: "database",
      tools: [{ name: "PostgreSQL", why: "Corpus and itinerary artifact in one transactional store." }],
    },
    {
      layer: "Infra",
      icon: "cloud",
      tools: [
        { name: "Docker", why: "One-command reproducible environment for the whole pipeline." },
        { name: "[ADD: CI/CD tool]", why: "Placeholder — document your actual pipeline." },
      ],
    },
    {
      layer: "Observability",
      icon: "activity",
      tools: [{ name: "[ADD: monitoring]", why: "Placeholder — document your actual stack." }],
    },
  ],
  media: [
    { type: "image", caption: "Home — destination discovery", placeholderLabel: "Home — screenshot placeholder", span: "big" },
    { type: "image", caption: "Day-by-day itinerary view with budget panel", placeholderLabel: "Itinerary — screenshot placeholder", span: "wide" },
    { type: "image", caption: "Preference interview conversation", placeholderLabel: "Preferences — screenshot placeholder" },
    { type: "video", caption: "Trip request → itinerary generation walkthrough", placeholderLabel: "Walkthrough video — placeholder" },
  ],
  links: [
    { label: "Live app", href: "[TOURTOISE_LIVE_URL]", kind: "live" },
    { label: "Backend source", href: "[TOURTOISE_REPO_URL]", kind: "repo" },
  ],
  og: {
    title: "Tourtoise — multi-agent travel planning",
    description: "Preference, planner, budget and guide agents over a pgvector-grounded destination corpus produce honest day-by-day itineraries.",
  },
};
