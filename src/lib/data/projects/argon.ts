import type { Project } from "@/lib/types";

/**
 * Argon Chatbot — multi-tenant agentic AI chatbot SaaS.
 * Diagrams and any unspecified numbers are illustrative (see content/ASSUMPTIONS.md).
 */
export const argon: Project = {
  slug: "argon",
  title: "Argon Chatbot",
  logo: "/argon-logo.png",
  tagline: "Multi-tenant agentic AI chatbot SaaS",
  summary:
    "A multi-tenant agentic chatbot SaaS with workspace isolation and configurable chatbots: RAG over PostgreSQL + pgvector, business workflows like lead scoring, appointment booking and human handoff, wired into external communication channels.",
  role: "Backend & AI systems engineer",
  timeline: "2024 — Present",
  teamSize: "Small team (2–4 engineers)",
  accent: "#7fcafb",
  techChips: ["Python", "Django", "Google ADK", "PostgreSQL", "pgvector", "Celery", "Redis", "Channels", "Stripe", "R2"],
  headlineMetric: { label: "external channels unified into one agentic pipeline", value: 4, suffix: "" },
  problem: {
    paragraphs: [
      "Businesses wanted AI chatbots on the channels their customers already live in — Messenger, WhatsApp, Instagram, email — but each channel came with its own delivery semantics, retry behaviour and failure modes. Off-the-shelf chatbot tools answered from a static FAQ and fell apart the moment a conversation needed real product knowledge or a business action.",
      "Argon was designed as the alternative: every tenant gets an isolated workspace with its own chatbots, documents and automations. Ingested documents become searchable embeddings; an agent layer grounds every answer in retrieved facts and can take real actions — qualify a lead, book an appointment, or hand off to a human — instead of hallucinating confidently.",
    ],
    affected:
      "Tenant end-customers (chatting on social channels), tenant operators (watching conversations, configuring bots), and the platform team (running one multi-tenant deployment instead of N installs).",
    why: "Trust is the product. A chatbot that leaks one tenant's data or invents one wrong price destroys the entire value proposition — so tenant isolation and grounded answers were architectural constraints, not features.",
  },
  constraints: [
    { label: "Tenancy", value: "One deployment, many workspaces", note: "Strict data + retrieval isolation per tenant" },
    { label: "Delivery", value: "At-least-once webhooks", note: "Channels redeliver; handlers must be idempotent" },
    { label: "Latency budget", value: "Agent turn ≈ seconds", note: "Async pipeline keeps channels off the hot path" },
    { label: "Cost", value: "Token-aware context", note: "Retrieval + budgeted prompts, not prompt stuffing" },
    { label: "Channels", value: "4 external APIs", note: "Messenger, WhatsApp, Instagram, Amazon SES" },
    { label: "Team", value: "Small team", note: "Operational simplicity weighted heavily" },
  ],
  architecture: {
    views: [
      {
        id: "high",
        label: "High-level",
        width: 1280,
        height: 470,
        note: "The system at a glance: clients, app core, async runtime, agent layer, data and externals.",
        nodes: [
          { id: "clients", label: "Clients", sublabel: "widget · dashboard", kind: "client", x: 40, y: 190, desc: "Embeddable website widget and the operator dashboard. Widget talks REST + WebSocket; dashboard consumes REST and live events." },
          { id: "app", label: "Django App", sublabel: "REST · WS · billing", kind: "api", x: 300, y: 190, desc: "The monolith: authentication, tenant management, REST API, WebSocket gateway (Django Channels) and Stripe billing orchestration." },
          { id: "async", label: "Async Core", sublabel: "Redis · Celery", kind: "queue", x: 560, y: 190, desc: "Redis as broker and channel layer; Celery workers execute ingestion, agent turns and outbound delivery away from the request path." },
          { id: "agents", label: "ADK Agents", sublabel: "router · tools", kind: "agent", x: 820, y: 60, desc: "Google ADK agent runtime: intent routing, tool selection (RAG, booking, lead capture) and conversation memory." },
          { id: "data", label: "Data Layer", sublabel: "PG · pgvector · R2", kind: "db", x: 820, y: 320, desc: "PostgreSQL holds tenants and business data; pgvector holds embeddings; Cloudflare R2 stores raw documents and files." },
          { id: "llm", label: "Gemini", sublabel: "grounded LLM", kind: "llm", x: 1080, y: 60, desc: "Generation model used strictly with retrieved context and tool results." },
          { id: "ext", label: "External", sublabel: "Stripe · channels", kind: "external", x: 1080, y: 320, desc: "Stripe for subscriptions; Messenger / WhatsApp / Instagram inbound webhooks and Amazon SES for email delivery." },
        ],
        edges: [
          { from: "clients", to: "app", kind: "sync", label: "REST · WS" },
          { from: "app", to: "async", kind: "async", label: "enqueue" },
          { from: "async", to: "agents", kind: "sync", label: "invoke" },
          { from: "agents", to: "llm", kind: "sync", label: "prompt" },
          { from: "agents", to: "data", kind: "data", label: "top-k · tools" },
          { from: "app", to: "data", kind: "data", label: "CRUD" },
          { from: "app", to: "ext", kind: "async", label: "webhooks · billing", both: true },
          { from: "async", to: "ext", kind: "async", label: "deliver" },
        ],
      },
      {
        id: "detailed",
        label: "Detailed",
        width: 1280,
        height: 900,
        note: "Component view with the customer-channel ingress at the bottom and the agent/data path on the right.",
        groups: [
          { id: "g-client", label: "Client", x: 30, y: 60, w: 250, h: 360 },
          { id: "g-app", label: "Application", x: 320, y: 60, w: 250, h: 560 },
          { id: "g-async", label: "Async Runtime", x: 610, y: 60, w: 250, h: 360 },
          { id: "g-channels", label: "Customer Channels", x: 30, y: 560, w: 440, h: 320 },
        ],
        nodes: [
          { id: "widget", label: "Website Widget", kind: "widget", x: 50, y: 120, desc: "Embeddable JS chat widget. Sends messages over REST, receives streaming replies over a WebSocket." },
          { id: "dashboard", label: "Operator Dashboard", kind: "client", x: 50, y: 300, desc: "Tenant admin: configure chatbots, watch live conversations, take over from the agent for human handoff." },
          { id: "api", label: "Django REST API", sublabel: "auth · CRUD · billing", kind: "api", x: 340, y: 120, desc: "Public REST surface: JWT auth per workspace, chatbot/document CRUD, conversation endpoints, Stripe checkout orchestration." },
          { id: "ws", label: "Django Channels", sublabel: "WebSocket gateway", kind: "ws", x: 340, y: 300, desc: "ASGI/WebSocket layer backed by Redis channel layer. Pushes live conversation events to widget and dashboard." },
          { id: "redis", label: "Redis", sublabel: "broker · channel layer", kind: "cache", x: 630, y: 120, desc: "Celery broker + result backend, Channels layer backend, and hot cache for tenant config lookups." },
          { id: "worker", label: "Celery Workers", sublabel: "ingest · agents · delivery", kind: "worker", x: 630, y: 300, desc: "Task fleets: document parsing/embedding, agent turns, and outbound channel delivery with retries + DLQ." },
          { id: "adk", label: "Google ADK", sublabel: "router · tools · memory", kind: "agent", x: 930, y: 120, desc: "Agent runtime: intent router picks tools per turn; tools cover vector search, lead capture, appointment booking and human handoff." },
          { id: "llm", label: "Gemini", sublabel: "grounded generation", kind: "llm", x: 930, y: 300, desc: "LLM invoked with retrieved chunks + tool results only. Answers cite context; refusals when evidence is missing." },
          { id: "pg", label: "PostgreSQL", sublabel: "tenants · CRM · billing", kind: "db", x: 930, y: 480, desc: "Relational core: workspaces, chatbots, conversations, messages, leads, appointments, subscriptions." },
          { id: "vec", label: "pgvector", sublabel: "chunks · embeddings", kind: "vector", x: 930, y: 660, desc: "Vector store colocated with business data. ANN index over document chunks, always workspace-scoped." },
          { id: "r2", label: "Cloudflare R2", sublabel: "document storage", kind: "storage", x: 630, y: 480, desc: "Object storage for uploaded tenant documents; workers stream-parse and queue chunks for embedding." },
          { id: "stripe", label: "Stripe", sublabel: "plans · webhooks", kind: "external", x: 340, y: 480, desc: "Subscription plans and billing webhooks. Webhook state machine keeps workspace entitlements in sync." },
          { id: "messenger", label: "Messenger", kind: "external", x: 60, y: 640, desc: "Inbound webhook + send API. Signature verification, dedupe, and delivery receipts." },
          { id: "whatsapp", label: "WhatsApp", kind: "external", x: 240, y: 640, desc: "Cloud API with template constraints; messages flow through the same idempotent delivery pipeline." },
          { id: "instagram", label: "Instagram", kind: "external", x: 60, y: 760, desc: "Direct-message webhooks normalized into the internal envelope format." },
          { id: "ses", label: "Amazon SES", kind: "external", x: 240, y: 760, desc: "Outbound email channel via worker-driven sends with bounce/complaint handling." },
        ],
        edges: [
          { from: "widget", to: "api", kind: "sync", label: "REST" },
          { from: "widget", to: "ws", kind: "sync", label: "socket", both: true },
          { from: "dashboard", to: "api", kind: "sync" },
          { from: "dashboard", to: "ws", kind: "sync", label: "live", both: true },
          { from: "api", to: "redis", kind: "async", label: "enqueue" },
          { from: "ws", to: "redis", kind: "async", label: "pub/sub" },
          { from: "redis", to: "worker", kind: "async", label: "consume" },
          { from: "worker", to: "adk", kind: "sync", label: "run turn" },
          { from: "adk", to: "llm", kind: "sync", label: "generate" },
          { from: "adk", to: "vec", kind: "data", label: "top-k" },
          { from: "adk", to: "pg", kind: "data", label: "tools" },
          { from: "api", to: "pg", kind: "data", label: "CRUD" },
          { from: "worker", to: "pg", kind: "data", label: "persist" },
          { from: "worker", to: "r2", kind: "data", label: "read docs" },
          { from: "api", to: "stripe", kind: "sync", label: "checkout" },
          { from: "stripe", to: "api", kind: "async", label: "webhook" },
          { from: "messenger", to: "api", kind: "async", label: "in" },
          { from: "whatsapp", to: "api", kind: "async", label: "in" },
          { from: "instagram", to: "api", kind: "async", label: "in" },
          { from: "worker", to: "messenger", kind: "async", label: "deliver" },
          { from: "worker", to: "whatsapp", kind: "async", label: "deliver" },
          { from: "worker", to: "ses", kind: "async", label: "send" },
        ],
      },
    ],
    notes: [
      "Channel webhooks terminate on the Django API but all side effects happen in Celery — the request path only verifies, dedupes and enqueues.",
      "Redis wears three hats deliberately (broker, channel layer, cache) to keep the ops surface small for a small team.",
      "The agent runtime runs inside workers, so LLM latency never blocks a webhook response and agent capacity scales independently of the API.",
      "Diagram is illustrative — component granularity reflects the design, not an exact deployment map.",
    ],
  },
  erDiagram: {
    views: [
      {
        id: "main",
        label: "Schema",
        width: 1340,
        height: 1000,
        note: "Core relational model. Every tenant-owned table carries workspace_id for isolation.",
        nodes: [
          {
            id: "workspaces", label: "workspaces", kind: "table", x: 40, y: 40, w: 300, desc: "Tenant root. Everything tenant-owned hangs off workspace_id.",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "name", type: "text" },
              { name: "slug", type: "text", key: "idx" },
              { name: "plan", type: "enum" },
              { name: "owner_email", type: "citext" },
              { name: "created_at", type: "timestamptz" },
            ],
          },
          {
            id: "subscriptions", label: "subscriptions", kind: "table", x: 40, y: 360, w: 300, desc: "Stripe subscription mirror; webhook state machine updates status.",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "workspace_id", type: "uuid", key: "fk" },
              { name: "stripe_customer_id", type: "text", key: "idx" },
              { name: "stripe_sub_id", type: "text" },
              { name: "status", type: "enum", key: "idx" },
              { name: "current_period_end", type: "timestamptz" },
            ],
          },
          {
            id: "chatbots", label: "chatbots", kind: "table", x: 40, y: 680, w: 300, desc: "Per-workspace bot configuration: persona, model settings, activation.",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "workspace_id", type: "uuid", key: "fk" },
              { name: "name", type: "text" },
              { name: "persona", type: "jsonb" },
              { name: "model_config", type: "jsonb" },
              { name: "is_active", type: "boolean", key: "idx" },
            ],
          },
          {
            id: "documents", label: "documents", kind: "table", x: 460, y: 40, w: 300, desc: "Ingested knowledge: R2 key, parse state machine (pending → parsed/failed).",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "workspace_id", type: "uuid", key: "fk" },
              { name: "chatbot_id", type: "uuid", key: "fk" },
              { name: "r2_key", type: "text" },
              { name: "mime", type: "text" },
              { name: "status", type: "enum", key: "idx" },
            ],
          },
          {
            id: "chunks", label: "chunks", kind: "table", x: 460, y: 400, w: 300, desc: "Chunked document text with pgvector embeddings; workspace_id denormalized to keep retrieval isolated.",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "document_id", type: "uuid", key: "fk" },
              { name: "workspace_id", type: "uuid", key: "fk" },
              { name: "chunk_index", type: "int" },
              { name: "content", type: "text" },
              { name: "embedding", type: "vector(1536)", key: "vec" },
              { name: "tsv", type: "tsvector", key: "idx" },
            ],
          },
          {
            id: "conversations", label: "conversations", kind: "table", x: 460, y: 740, w: 300, desc: "Session per external user per channel; tracks handoff state.",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "chatbot_id", type: "uuid", key: "fk" },
              { name: "workspace_id", type: "uuid", key: "fk" },
              { name: "channel", type: "enum", key: "idx" },
              { name: "external_user_id", type: "text" },
              { name: "handed_off", type: "boolean" },
            ],
          },
          {
            id: "messages", label: "messages", kind: "table", x: 880, y: 40, w: 300, desc: "Turn-by-turn log with token counts and full ADK traces for auditability.",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "conversation_id", type: "uuid", key: "fk" },
              { name: "role", type: "enum", key: "idx" },
              { name: "content", type: "text" },
              { name: "token_count", type: "int" },
              { name: "adk_trace", type: "jsonb" },
            ],
          },
          {
            id: "leads", label: "leads", kind: "table", x: 880, y: 400, w: 300, desc: "Business outcome of conversations: captured contact + score from agent qualification.",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "conversation_id", type: "uuid", key: "fk" },
              { name: "workspace_id", type: "uuid", key: "fk" },
              { name: "email", type: "citext", key: "idx" },
              { name: "score", type: "int" },
              { name: "status", type: "enum", key: "idx" },
            ],
          },
          {
            id: "appointments", label: "appointments", kind: "table", x: 880, y: 720, w: 300, desc: "Booking workflow output; timezone-safe scheduling per conversation.",
            rows: [
              { name: "id", type: "uuid", key: "pk" },
              { name: "conversation_id", type: "uuid", key: "fk" },
              { name: "lead_id", type: "uuid", key: "fk" },
              { name: "schedule_at", type: "timestamptz", key: "idx" },
              { name: "timezone", type: "text" },
              { name: "status", type: "enum" },
            ],
          },
        ],
        edges: [
          { from: "workspaces", to: "chatbots", kind: "data", label: "1 : N", animate: false },
          { from: "workspaces", to: "subscriptions", kind: "data", label: "1 : N", animate: false },
          { from: "chatbots", to: "documents", kind: "data", label: "1 : N", animate: false },
          { from: "documents", to: "chunks", kind: "data", label: "1 : N", animate: false },
          { from: "chatbots", to: "conversations", kind: "data", label: "1 : N", animate: false },
          { from: "conversations", to: "messages", kind: "data", label: "1 : N", animate: false },
          { from: "conversations", to: "leads", kind: "data", label: "1 : N", animate: false },
          { from: "conversations", to: "appointments", kind: "data", label: "1 : N", animate: false },
          { from: "leads", to: "appointments", kind: "data", label: "0..1 : N", animate: false },
        ],
      },
    ],
    why: "Every tenant-owned table carries workspace_id, including chunks. That single decision makes isolation a WHERE clause away, lets every hot index lead with workspace_id, and keeps vector search, relational joins and business actions in one transactional system instead of stitching a vector DB and a relational DB into one consistency story.",
    notes: [
      "Composite indexes lead with workspace_id (e.g. chunks(workspace_id, document_id), conversations(workspace_id, chatbot_id)).",
      "Isolation today is enforced at the ORM manager layer with a Postgres RLS policy as the planned hardening step — the schema is already shaped for it.",
      "chunks is designed partition-ready (by workspace hash) if per-tenant growth becomes skewed; pgvector ANN indexes (HNSW/IVFFlat) are per-partition friendly.",
      "tsv alongside embedding enables hybrid retrieval experiments without a migration.",
    ],
  },
  decisions: [
    {
      title: "Tenant isolation: scoped rows vs schema-per-tenant vs DB-per-tenant",
      decision: "Shared tables with mandatory workspace_id scoping, composite indexes leading with workspace_id, and an RLS-ready schema.",
      alternatives: [
        { name: "Schema per tenant", note: "Clean isolation but migrations × tenants becomes an operational tax; connection pooling gets awkward." },
        { name: "Database per tenant", note: "Strongest isolation; far too much operational overhead at this stage and price point." },
      ],
      why: "At current scale, row-level scoping gives 95% of the isolation value for 5% of the operational cost, and the schema shape means flipping on Postgres RLS later is a hardening step, not a rewrite.",
    },
    {
      title: "Where the agent runtime lives",
      decision: "Run the Google ADK agent layer inside Celery workers, invoked as async tasks — never in the web request path.",
      alternatives: [
        { name: "In-process Django views", note: "Simplest to write; couples LLM latency to HTTP workers and one slow generation stalls requests." },
        { name: "Separate FastAPI microservice", note: "Great isolation for the agent hot path (this is the direction taken at work), but more moving parts than needed initially." },
      ],
      why: "Webhook responses stay fast, agent capacity scales independently by adding workers, and retries/DLQ semantics for agent turns come free with Celery.",
    },
    {
      title: "Vector store: pgvector vs managed vector DB",
      decision: "PostgreSQL + pgvector with workspace-scoped ANN indexes.",
      alternatives: [
        { name: "Pinecone", note: "Excellent managed ANN; used in production at Echologyx for a different system. Adds a second system to keep consistent with relational truth." },
        { name: "Vertex AI Vector Search", note: "Strong at GCP scale; overkill for tenant document collections and another permission boundary to mirror." },
      ],
      why: "Colocating vectors with relational data means retrieval filters (workspace, chatbot, status) are plain SQL predicates, and business actions + retrieval share one transaction boundary. One backup, one disaster story.",
    },
    {
      title: "Channel delivery reliability",
      decision: "At-least-once processing: idempotency keys on inbound webhooks, Celery retry with exponential backoff, and a dead-letter queue.",
      alternatives: [
        { name: "Fire-and-forget handlers", note: "Loses messages on any crash; channels redeliver on timeout so duplicates, not losses, are the reality to design for." },
        { name: "External queue (SQS)", note: "Solid option; redundant when Redis + Celery already provide retry and DLQ semantics." },
      ],
      why: "Every channel API redelivers when you don't ACK fast enough — so the system assumes duplicates and makes processing idempotent instead of pretending delivery is exactly-once.",
    },
  ],
  challenges: [
    {
      title: "Cross-tenant leakage in retrieval",
      problem: "Early query helpers fetched by primary key without tenant scoping — a chatbot could theoretically retrieve another workspace's chunks. Classic multi-tenant bug class.",
      solution: "A workspace-scoped default manager plus composite indexes leading with workspace_id, with an RLS policy as the defense-in-depth next step.",
      before: {
        lang: "python",
        filename: "models.py — before",
        code: `class Chunk(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE)

# ❌ retrieval by global similarity only
def search(query_vec, chatbot_id, k=5):
    return (Chunk.objects
        .filter(document__chatbot_id=chatbot_id)
        .order_by("-embedding_cosine")  # not tenant-scoped
        .all()[:k])`,
      },
      after: {
        lang: "python",
        filename: "models.py — after",
        code: `class WorkspaceQuerySet(models.QuerySet):
    def for_workspace(self, ws):
        return self.filter(workspace_id=ws.id)

class Chunk(models.Model):
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    objects = WorkspaceQuerySet.as_manager()

# ✅ isolation is a query predicate, enforced by the default manager
def search(ws, query_vec, chatbot_id, k=5):
    return (Chunk.objects
        .for_workspace(ws)
        .filter(document__chatbot_id=chatbot_id)
        .order_by("embedding_cosine", ("embedding", query_vec))
        .only("id", "content")[:k])`,
      },
      outcome: "Tenant scoping became the default path; forgetting it requires deliberately bypassing the manager.",
    },
    {
      title: "Context bloat burning tokens",
      problem: "Stuffing whole documents and full history into prompts made responses slow and expensive, and accuracy dropped as noise grew.",
      solution: "Top-k retrieval with reranking, rolling summaries for history, and an explicit token budget the router must respect.",
      before: {
        lang: "python",
        filename: "context.py — before",
        code: `def build_prompt(conversation, docs):
    # ❌ everything, always
    history = "\\n".join(m.content for m in conversation.messages.all())
    knowledge = "\\n\\n".join(d.full_text for d in docs)
    return f"{history}\\n{knowledge}\\nAnswer:"`,
      },
      after: {
        lang: "python",
        filename: "context.py — after",
        code: `def build_prompt(ws, conversation, query, budget=TOKEN_BUDGET):
    # ✅ top-k retrieval, reranked, budgeted
    hits = rerank(vector_search(ws, embed(query), k=24), keep=6)
    history = summarize(conversation.recent(window=10))
    ctx = fit([h.content for h in hits], budget - count(history))
    return Prompt(history=history, context=ctx, query=query)`,
      },
      outcome: "Prompts carry only what the turn needs; the router treats the token budget like a resource, not an afterthought. [METRIC: measured token reduction — add real number]",
    },
    {
      title: "Duplicate deliveries from channel APIs",
      problem: "Messenger and WhatsApp redeliver webhooks aggressively. Naive handlers created duplicate messages and double-replied to customers — visibly broken.",
      solution: "Idempotency keys with INSERT ... ON CONFLICT DO NOTHING, plus Celery retry/backoff for outbound sends.",
      before: {
        lang: "python",
        filename: "webhooks.py — before",
        code: `@csrf_exempt
def messenger_webhook(request):
    event = verify_and_parse(request)
    msg = Message.objects.create(   # ❌ replays create duplicates
        conversation=get_conv(event),
        content=event.text,
    )
    run_agent_turn.delay(msg.id)   # ❌ duplicate replies
    return HttpResponse(status=200)`,
      },
      after: {
        lang: "sql",
        filename: "idempotency — after",
        code: `-- inbound: one row per external event id
INSERT INTO webhook_events (id, channel, event_id, payload)
VALUES (:id, 'messenger', :event_id, :payload)
ON CONFLICT (channel, event_id) DO NOTHING;
-- rows affected = 0  →  replay detected, ACK and stop

-- outbound: delivery tasks keyed by (message_id, attempt_scope)
-- retried with exponential backoff, parked in a DLQ after N tries`,
      },
      outcome: "Replays become no-ops; customers get exactly one reply per message. [METRIC: duplicate rate — add real number]",
    },
  ],
  results: {
    metrics: [
      { label: "external channels integrated", value: 4, suffix: "" },
      { label: "agent-driven business workflows", value: 3, suffix: "" },
      { label: "p95 agent turn latency", placeholder: "[METRIC: p95 latency]" },
      { label: "token usage after context redesign", placeholder: "[METRIC: token reduction %]" },
    ],
    chart: {
      title: "Prompt tokens per turn — before / after context redesign",
      unit: "tokens (illustrative)",
      illustrative: true,
      series: [
        { label: "Before — full stuffing", value: 100 },
        { label: "After — top-k + summary", value: 32 },
      ],
      note: "Shape reflects the design change (retrieval + budgeted context). Replace with measured production numbers.",
    },
    notes: ["Numbers marked [METRIC] are placeholders — swap in measured values before publishing."],
  },
  techStack: [
    {
      layer: "API",
      icon: "server",
      tools: [
        { name: "Django", why: "Domain maturity: ORM, admin, auth and migrations carried the multi-tenant model fast." },
        { name: "Django Channels", why: "WebSocket layer for live widget + dashboard events over the same ASGI app." },
      ],
    },
    {
      layer: "Async",
      icon: "zap",
      tools: [
        { name: "Celery", why: "Retries, scheduling and DLQ semantics for ingestion, agent turns and delivery." },
        { name: "Redis", why: "One dependency covering broker, channel layer and hot cache." },
      ],
    },
    {
      layer: "AI",
      icon: "bot",
      tools: [
        { name: "Google ADK", why: "Agent runtime with routing, tools and memory without building an agent framework." },
        { name: "pgvector", why: "Vectors beside relational data — retrieval filters are SQL predicates." },
      ],
    },
    {
      layer: "Data",
      icon: "database",
      tools: [
        { name: "PostgreSQL", why: "Transactional truth for tenants, conversations and CRM outcomes." },
        { name: "Cloudflare R2", why: "Cheap, fast object storage for tenant documents." },
      ],
    },
    {
      layer: "Billing",
      icon: "credit",
      tools: [{ name: "Stripe", why: "Subscriptions + webhooks entitlements; state machine mirrors into subscriptions table." }],
    },
    {
      layer: "Infra",
      icon: "cloud",
      tools: [
        { name: "Docker", why: "Identical images from laptop to servers." },
        { name: "[ADD: CI/CD tool]", why: "Placeholder — document your actual pipeline." },
      ],
    },
    {
      layer: "Observability",
      icon: "activity",
      tools: [
        { name: "[ADD: logging]", why: "Placeholder — document your actual logging stack." },
        { name: "ADK traces", why: "Per-message agent traces in messages.adk_trace make retrieval quality debuggable." },
      ],
    },
  ],
  media: [
    { type: "image", caption: "Operator dashboard — live conversations and human handoff", placeholderLabel: "Dashboard — screenshot placeholder", span: "big" },
    { type: "image", caption: "Website widget embedded on a tenant site", placeholderLabel: "Widget — screenshot placeholder", span: "tall" },
    { type: "image", caption: "Chatbot configuration: persona, documents, channels", placeholderLabel: "Bot config — screenshot placeholder" },
    { type: "video", caption: "End-to-end message flow demo (looping)", placeholderLabel: "Demo video — placeholder", span: "wide" },
  ],
  links: [
    { label: "Live app", href: "[ARGON_LIVE_URL]", kind: "live" },
    { label: "Backend source", href: "[ARGON_REPO_URL]", kind: "repo" },
  ],
  og: {
    title: "Argon Chatbot — multi-tenant agentic AI SaaS",
    description: "Workspace-isolated chatbots, RAG over PostgreSQL + pgvector, business workflows and four external channels on one async pipeline.",
  },
};
