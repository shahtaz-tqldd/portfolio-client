import type { Project } from "@/lib/types";
import restroLogo from "@/assets/images/restro-logo.png";

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
  accent: "#bd0000",
  logo: restroLogo,
  techChips: [],
  overview: {
    problem: [
      "Traders and brokers had their trading data locked inside the trading platform, with little analysis on top of it.",
      "Restro FX connects to TradeLocker accounts, brings that data into its own store and turns it into analytics.",
    ],
    audience: "Forex traders and brokers who trade on TradeLocker.",
  },
  features: [
    {
      title: "One-time account connection",
      body: "A trader links their TradeLocker account once; after that the platform pulls that account's data itself.",
    },
    {
      title: "Automatic background sync",
      body: "Sync workers fetch trades and positions outside the web request, so nothing is exported or copied by hand and the dashboard stays responsive.",
    },
    {
      title: "One internal trade model",
      body: "Accounts, trades and positions are stored in one consistent shape, so analytics don't depend on the outside API's format.",
    },
    {
      title: "Analytics on top",
      body: "The analytics layer reads the stored data and gives traders analysis the trading platform itself didn't offer.",
    },
  ],
  architecture: [
    {
      id: "high",
      label: "High-level",
      width: 1040,
      height: 340,
      note: "Account connection, background sync, storage and analytics.",
      nodes: [
        {
          id: "dash",
          label: "Web dashboard",
          kind: "client",
          x: 40,
          y: 220,
          desc: "Where traders connect accounts and view their analytics.",
        },
        {
          id: "api",
          label: "Backend API",
          kind: "api",
          x: 300,
          y: 220,
          desc: "Handles account connection and serves analytics to the dashboard.",
        },
        {
          id: "workers",
          label: "Sync workers",
          kind: "worker",
          x: 560,
          y: 40,
          desc: "Pull trading data from connected TradeLocker accounts in the background.",
        },
        {
          id: "tl",
          label: "TradeLocker",
          sublabel: "account connection",
          kind: "external",
          x: 820,
          y: 40,
          desc: "The trading platform the accounts live on.",
        },
        {
          id: "analytics",
          label: "Analytics layer",
          kind: "service",
          x: 560,
          y: 220,
          desc: "Computes analytics from the stored trading data.",
        },
        {
          id: "db",
          label: "Database",
          sublabel: "accounts · trades · positions",
          kind: "db",
          x: 820,
          y: 220,
          desc: "Restro FX's own store of accounts, trades and positions.",
        },
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
    description:
      "Connect a TradeLocker account, sync trading data automatically and get analytics on top.",
  },
};

export default restroFx;
