import type { Project } from "@/lib/types";
import choturvuzLogo from "@/assets/images/choturvuz-logo.svg";

/* ─────────────────────────────── Choturvuz ──────────────────────────────── */

const ecommerce: Project = {
  slug: "ecommerce",
  order: 4,
  tier: "featured",
  eyebrow: "Custom apparel e-commerce & inventory platform",
  title: "Choturvuz",
  summary:
    "A clothing brand's complete platform: storefront for jerseys, t-shirts and hoodies, custom bulk orders with customer logos and designs, and an inventory dashboard with sales analytics.",
  role: "Solo full-stack engineer",
  timeline: "Built with AI in 3 days · live in 10",
  accent: "#f97316",
  logo: choturvuzLogo,
  techChips: [],
  overview: {
    problem: [
      "Choturvuz is a clothing brand that sells jerseys, t-shirts and hoodies. It needed more than a storefront: the team had to run stock, orders, customers and payments day to day, see what the store was actually earning, and take custom bulk orders — apparel printed with a customer's own logo and design.",
      "The platform covers both sides. Customers get a storefront with the catalogue and a custom-order flow where they upload their logo, design files and specialized requirements. The team gets a separate inventory management dashboard: order cycle management, inventory overview, product and collection listings, promoted products, exports and imports, customer and payment management, and revenue, profit and sales analytics.",
      "I built the entire platform from scratch with AI assistance — a working system in 3 days — then tested it, fixed the issues that surfaced and delivered the client's extra change requests. It went live 10 days after the first line of code.",
    ],
    audience:
      "The Choturvuz team, who run the store from the dashboard, and their customers, who buy apparel off the rack or order custom pieces in bulk.",
  },
  features: [
    {
      title: "Storefront for the catalogue",
      body: "Jerseys, t-shirts and hoodies, browsable and orderable like any storefront. Products are organised into collections, so the catalogue reads the way the brand thinks about its lines.",
    },
    {
      title: "Separate inventory dashboard",
      body: "The team runs the store from its own dashboard: orders, inventory overview, product and collection listings, customers and payments — all in one place, on the same data the storefront sells from.",
    },
    {
      title: "Order cycle management",
      body: "Every order moves through a managed cycle the team operates from the dashboard, so each order has a clear state and a next action instead of a pile of unstructured rows.",
    },
    {
      title: "Promote products",
      body: "Products can be promoted from the dashboard and surfaced to storefront customers, without editing the catalogue itself.",
    },
    {
      title: "Export and import",
      body: "Records can be exported out of the dashboard and imported back in, so bulk changes and external processing don't have to happen row by row in the UI.",
    },
    {
      title: "Customer and payment management",
      body: "Customers and their payments are managed alongside orders, so the money side of each order is visible from the same dashboard.",
    },
    {
      title: "Revenue, profit and sales analytics",
      body: "The dashboard shows sales, revenue and profit in one view, so the brand sees what's selling and what it's earning — not just what was ordered.",
    },
    {
      title: "Custom bulk orders",
      body: "Customers can order custom products in bulk: they upload their logo and design files, add their specialized requirements, and the order is handled as a custom job with its own quantity rather than a stock item.",
    },
  ],
  architecture: [
    {
      id: "high",
      label: "High-level",
      width: 1120,
      height: 640,
      note: "Storefront, custom-order flow and inventory dashboard on one API, with catalogue, inventory, orders and analytics on one database.",
      nodes: [
        {
          id: "store",
          label: "Storefront",
          sublabel: "jerseys · tees · hoodies",
          kind: "client",
          x: 40,
          y: 80,
          desc: "Where customers browse the catalogue and order stock products.",
        },
        {
          id: "custom",
          label: "Custom order flow",
          sublabel: "logo · design · requirements",
          kind: "client",
          x: 40,
          y: 300,
          desc: "Where customers configure custom bulk orders, uploading their logo, design and specialized requirements.",
        },
        {
          id: "admin",
          label: "Inventory dashboard",
          sublabel: "orders · stock · analytics",
          kind: "client",
          x: 40,
          y: 520,
          desc: "Where the team manages the order cycle, inventory, customers, payments, promotions, exports and analytics.",
        },
        {
          id: "api",
          label: "API",
          kind: "api",
          x: 320,
          y: 300,
          desc: "One API behind the storefront, the custom-order flow and the dashboard.",
        },
        {
          id: "catalogue",
          label: "Catalogue",
          sublabel: "products · collections",
          kind: "service",
          x: 600,
          y: 40,
          desc: "Products and their collections; promoted products are surfaced to the storefront.",
        },
        {
          id: "inventory",
          label: "Inventory",
          sublabel: "stock overview",
          kind: "service",
          x: 600,
          y: 210,
          desc: "Stock across products and variants, kept in step with what the storefront sells.",
        },
        {
          id: "orders",
          label: "Orders",
          sublabel: "cycle management",
          kind: "service",
          x: 600,
          y: 380,
          desc: "Stock and custom orders moving through a managed cycle the team operates.",
        },
        {
          id: "analytics",
          label: "Analytics",
          sublabel: "revenue · profit · sales",
          kind: "service",
          x: 600,
          y: 550,
          desc: "Revenue, profit and sales analytics computed from the order data.",
        },
        {
          id: "db",
          label: "Database",
          sublabel: "catalogue · orders · customers",
          kind: "db",
          x: 880,
          y: 300,
          desc: "The single store behind storefront and dashboard, so both sides read the same records.",
        },
      ],
      edges: [
        { from: "store", to: "api", kind: "sync", label: "REST" },
        { from: "custom", to: "api", kind: "sync", label: "upload brief" },
        { from: "admin", to: "api", kind: "sync", label: "REST" },
        { from: "api", to: "catalogue", kind: "sync" },
        { from: "api", to: "inventory", kind: "sync" },
        { from: "api", to: "orders", kind: "sync" },
        { from: "api", to: "analytics", kind: "sync" },
        { from: "catalogue", to: "db", kind: "data" },
        { from: "inventory", to: "db", kind: "data" },
        { from: "orders", to: "db", kind: "data" },
        { from: "analytics", to: "db", kind: "data" },
      ],
    },
    {
      id: "custom-orders",
      label: "Custom orders",
      width: 1120,
      height: 380,
      note: "A customer's logo, design and requirements become a real order, managed through the same cycle as stock orders.",
      nodes: [
        {
          id: "customer",
          label: "Customer",
          sublabel: "bulk custom order",
          kind: "client",
          x: 40,
          y: 160,
          desc: "A customer ordering custom apparel in bulk — team jerseys with their own logo, for example.",
        },
        {
          id: "brief",
          label: "Design brief",
          sublabel: "logo · design · requirements",
          kind: "widget",
          x: 300,
          y: 160,
          desc: "Logo and design files uploaded with the order, along with the specialized requirements.",
        },
        {
          id: "order",
          label: "Custom order",
          sublabel: "bulk quantity",
          kind: "service",
          x: 560,
          y: 160,
          desc: "The brief becomes a real order in the system with its own quantity, not an email the team has to retype.",
        },
        {
          id: "dashboard",
          label: "Inventory dashboard",
          sublabel: "order cycle",
          kind: "client",
          x: 820,
          y: 40,
          desc: "Custom orders are managed through the same order cycle as stock orders.",
        },
        {
          id: "db",
          label: "Database",
          sublabel: "orders · customers",
          kind: "db",
          x: 820,
          y: 280,
          desc: "Custom orders stored with the rest of the order and customer data.",
        },
      ],
      edges: [
        { from: "customer", to: "brief", kind: "sync", label: "upload" },
        { from: "brief", to: "order", kind: "sync", label: "create" },
        { from: "order", to: "dashboard", kind: "sync", label: "manage" },
        { from: "order", to: "db", kind: "data", label: "store" },
      ],
    },
  ],
  howItWorks: [
    {
      title: "One platform, two faces.",
      body: "Customers see a storefront with the full catalogue and the custom-order flow. The team sees a separate inventory management dashboard. Both run on the same data, so stock and orders can't drift out of sync between the two.",
    },
    {
      title: "Orders move through a managed cycle.",
      body: "An order isn't a static record. It moves through a defined cycle the team operates from the dashboard — each stage has a clear state and a next action, for stock orders and custom jobs alike.",
    },
    {
      title: "Inventory matches the catalogue.",
      body: "The inventory overview shows stock across products and variants, and the product and collection listings are the same records the storefront sells from. A change on one side is a change on both.",
    },
    {
      title: "Sales, revenue and profit in one view.",
      body: "Analytics read the order data the system already records — what sold, what it earned and what profit remains — so the brand sees performance without exporting to a spreadsheet.",
    },
    {
      title: "Custom orders are first-class.",
      body: "A customer can order custom products in bulk, uploading their logo, design and specialized requirements with the order. The request becomes a real order in the system and is managed through the same order cycle as everything else.",
    },
    {
      title: "Built with AI, shipped in ten days.",
      body: "The whole platform was built from scratch with AI assistance in 3 days. The rest of the ten days went to testing it, fixing the issues that surfaced and delivering the client's extra change requests before going live.",
    },
  ],
  techStack: [],
  links: [
    {
      label: "Live site",
      href: "https://choturvuz.vercel.app",
      kind: "live",
    },
  ],
  og: {
    title: "Choturvuz: e-commerce & inventory platform for a clothing brand",
    description:
      "Storefront for jerseys, t-shirts and hoodies, custom bulk orders with customer logos and designs, and an inventory dashboard covering order cycle management, stock, customers, payments, profit, revenue and sales analytics. Built from scratch with AI in 3 days; live in 10.",
  },
};

export default ecommerce;
