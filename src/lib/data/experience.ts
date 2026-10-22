export interface Job {
  slug: string;
  role: string;
  company: string;
  /** One or two lines: what the company does. Edit to match reality. */
  about: string;
  start: Date;
  end: Date | null; // null = present
  periodLabel: string;
  accent: string;
  /** Shown on the card: bold lead + a very short line. */
  highlights: { lead: string; text: string }[];
  /** Shown only in the details view. */
  details: {
    overview: string;
    contributions: { title: string; body: string }[];
    tech: string[];
  };
}

export const experience: Job[] = [
  {
    slug: "echologyx",
    role: "Software Engineer (L2)",
    company: "Echologyx Ltd.",
    about:
      "Software company building AI-powered chatbot solutions that help businesses automate customer conversations across digital channels.",
    start: new Date(2024, 2),
    end: null,
    periodLabel: "Mar 2024 – Present",
    accent: "#FA4B00",
    highlights: [
      {
        lead: "SaaS architecture",
        text: "Built multi-tenant backend services with subscription and Stripe billing.",
      },
      {
        lead: "AI agent engineering",
        text: "Developed RAG-powered conversational systems using Google ADK and FastAPI.",
      },
      {
        lead: "Retrieval optimization",
        text: "Implemented vector search for knowledge retrieval and product recommendations.",
      },
      {
        lead: "Omnichannel messaging",
        text: "Integrated Messenger, WhatsApp, Instagram and transactional email.",
      },
      {
        lead: "Real-time infrastructure",
        text: "Worked on WebSockets, Redis and asynchronous workflows for live operations.",
      },
    ],
    details: {
      overview:
        "I engineer backend services and AI capabilities for a multi-tenant chatbot platform used by businesses to automate customer interactions. My work spans SaaS architecture, conversational AI, retrieval systems, messaging integrations and real-time infrastructure, connecting customer-facing experiences with reliable backend services.",
      contributions: [
        {
          title: "Multi-tenant SaaS architecture",
          body: "Developed Django backend services for a multi-tenant platform, with a focus on separating business and chatbot data, managing workspace-level functionality, enforcing subscription limits and integrating Stripe billing.",
        },
        {
          title: "Conversational AI and agent architecture",
          body: "Redesigned the conversational AI layer using FastAPI and Google ADK, organizing agent responsibilities and integrating knowledge retrieval and business-specific tools. Worked on context management and retrieval behavior to improve answer relevance and control token consumption.",
        },
        {
          title: "Knowledge retrieval and product recommendations",
          body: "Implemented vector-based retrieval with Pinecone and explored PostgreSQL with pgvector for semantic search. Developed retrieval workflows for knowledge sources and product catalogs, including matching relevant products and variants to customer queries.",
        },
        {
          title: "Messaging and third-party integrations",
          body: "Integrated messaging channels including Messenger, WhatsApp and Instagram, alongside Amazon SES for email delivery. Built webhook-driven workflows and asynchronous processing to support message handling, external service communication and failure recovery.",
        },
        {
          title: "Real-time communication and background processing",
          body: "Worked with WebSockets, Redis and Celery to support real-time dashboard communication, background tasks and operational workflows. Contributed to session handling, presence-related functionality and the infrastructure connecting chatbot activity with the administration dashboard.",
        },
      ],
      tech: [
        "Python",
        "Django",
        "FastAPI",
        "PostgreSQL",
        "Redis",
        "Celery",
        "WebSockets",
        "Google ADK",
        "Pinecone",
        "pgvector",
        "Stripe",
        "Amazon SES",
        "Docker",
        "AWS",
      ],
    },
  },
  {
    slug: "aaykori",
    role: "MERN Stack Developer",
    company: "Aaykori Digital",
    about:
      "A fintech startup developing affiliate marketplace and custom softwares for niche industries.",
    start: new Date(2023, 6),
    end: new Date(2023, 11),
    periodLabel: "Jul 2023 – Dec 2023",
    accent: "#35e696",
    highlights: [
      {
        lead: "Affiliate marketplace",
        text: "Developed CMS features for product listings, campaign tracking and analytics.",
      },
      {
        lead: "HR management",
        text: "Built employee management modules and real-time performance dashboards.",
      },
      {
        lead: "Full-stack development",
        text: "Created REST APIs and reusable React components across products.",
      },
    ],
    details: {
      overview:
        "Worked as a MERN Stack Developer across an affiliate marketplace CMS and an HR management system. Contributed to backend APIs, data-driven application features and reusable frontend components, gaining hands-on experience delivering full-stack web applications in a professional team.",
      contributions: [
        {
          title: "Affiliate marketplace CMS",
          body: "Developed and maintained features for product listing management, affiliate campaign tracking and administrative analytics, helping administrators manage marketplace content and monitor campaign activity.",
        },
        {
          title: "HR management and dashboards",
          body: "Built HRM modules for employee data management and contributed to real-time performance dashboards, making operational information easier to access and monitor.",
        },
        {
          title: "REST APIs and reusable frontend components",
          body: "Implemented REST API functionality and reusable React components, connecting frontend interfaces to backend services while improving consistency and maintainability across application features.",
        },
      ],
      tech: [
        "JavaScript",
        "Node.js",
        "Express.js",
        "React",
        "MongoDB",
        "REST APIs",
      ],
    },
  },
];
