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
  /** Shown on the card: bold lead + a very short line. Max 4. */
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
    about: "Software company building an AI-powered chatbot platform for businesses.",
    start: new Date(2024, 2),
    end: null,
    periodLabel: "Mar 2024 – Present",
    accent: "#FA4B00",
    highlights: [
      { lead: "Multi-tenant backend", text: "Django services with subscriptions and Stripe." },
      { lead: "AI redesign", text: "FastAPI, Google ADK and Pinecone for sharper answers." },
      { lead: "Messaging channels", text: "Messenger, WhatsApp, Instagram and SES." },
      { lead: "Vector search", text: "Product and variant retrieval for recommendations." },
    ],
    details: {
      overview:
        "I work on the backend and AI layers of a chatbot platform that businesses use to talk to their customers across messaging channels. My work covers the core platform services, the conversational AI system, and the integrations that connect the two to the outside world.",
      contributions: [
        {
          title: "Multi-tenant platform backend",
          body: "Built scalable backend services in Django, including the multi-tenant architecture that keeps each business's data and bots separate, plus subscription management and Stripe integration for billing.",
        },
        {
          title: "Conversational AI redesign",
          body: "Redesigned the conversational AI system using FastAPI, Google ADK and Pinecone. I optimized how context is handled, which improved response accuracy and reduced token usage.",
        },
        {
          title: "Channel integrations",
          body: "Integrated Messenger, WhatsApp, Instagram and Amazon SES. This involved webhook processing, asynchronous workflows and reliable message delivery, so messages are handled correctly even when retries or failures happen.",
        },
        {
          title: "Vector search for recommendations",
          body: "Developed an optimized vector-search solution that parses and retrieves relevant products and variants, powering the chatbot's product recommendations.",
        },
      ],
      tech: ["Python", "Django", "FastAPI", "Google ADK", "Pinecone", "Stripe", "Amazon SES", "Celery", "Redis", "PostgreSQL"],
    },
  },
  {
    slug: "aaykori",
    role: "MERN Stack Developer",
    company: "Aaykori Digital",
    about: "Digital company building affiliate marketplace and HR management software.",
    start: new Date(2023, 6),
    end: new Date(2023, 11),
    periodLabel: "Jul 2023 – Dec 2023",
    accent: "#35e696",
    highlights: [
      { lead: "Marketplace CMS", text: "Product listings, campaign tracking, analytics." },
      { lead: "HRM modules", text: "Employee data and live performance dashboards." },
      { lead: "APIs & components", text: "Secure REST APIs, reusable React UI." },
    ],
    details: {
      overview:
        "My first professional role, working across the stack on two internal and client-facing products: an affiliate marketplace CMS and an HR management system.",
      contributions: [
        {
          title: "Affiliate marketplace CMS",
          body: "Contributed to a CMS that supports dynamic product listings, campaign tracking and admin analytics.",
        },
        {
          title: "HRM modules",
          body: "Developed modules for employee data management and real-time performance dashboards.",
        },
        {
          title: "APIs and reusable components",
          body: "Implemented secure REST APIs and reusable React components, which improved development speed and maintainability across the team.",
        },
      ],
      tech: ["MongoDB", "Express", "React", "Node.js", "REST APIs"],
    },
  },
];