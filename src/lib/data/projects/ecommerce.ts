import type { Project } from "@/lib/types";

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
    audience:
      "Store owners and admins who manage the catalogue, stock and orders.",
  },
  features: [
    {
      title: "Catalogue with variants",
      body: "Each option combination (size, colour and so on) is its own variant with its own SKU, price and stock.",
    },
    {
      title: "Inventory per variant",
      body: "Stock is tracked for each variant, not the product as a whole, so availability is accurate down to every size and colour.",
    },
    {
      title: "Order workflow",
      body: "Orders move through a defined workflow from cart to delivery, so every order has a clear status the admin can act on.",
    },
    {
      title: "Operable admin panel",
      body: "Admins manage the catalogue, stock levels and orders from one panel, on the same API the storefront uses.",
    },
  ],
  architecture: [
    {
      id: "high",
      label: "High-level",
      width: 1040,
      height: 480,
      note: "Storefront and admin on one API, with catalogue, inventory and orders.",
      nodes: [
        {
          id: "store",
          label: "Storefront",
          kind: "client",
          x: 40,
          y: 120,
          desc: "Where customers browse, add to cart and order.",
        },
        {
          id: "admin",
          label: "Admin panel",
          kind: "client",
          x: 40,
          y: 320,
          desc: "Where admins manage the catalogue, stock and orders.",
        },
        {
          id: "api",
          label: "API",
          kind: "api",
          x: 300,
          y: 220,
          desc: "One API behind the storefront and the admin panel.",
        },
        {
          id: "catalogue",
          label: "Catalogue",
          sublabel: "products · variants",
          kind: "service",
          x: 560,
          y: 40,
          desc: "Products and their variants; each variant has its own SKU, price and stock.",
        },
        {
          id: "inventory",
          label: "Inventory",
          sublabel: "stock per variant",
          kind: "service",
          x: 560,
          y: 220,
          desc: "Stock tracked per variant.",
        },
        {
          id: "orders",
          label: "Orders",
          sublabel: "cart → delivery",
          kind: "service",
          x: 560,
          y: 400,
          desc: "The order workflow, from cart to delivery.",
        },
        {
          id: "db",
          label: "Database",
          kind: "db",
          x: 820,
          y: 220,
          desc: "Catalogue, inventory and orders.",
        },
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
    description:
      "Products, variants, per-variant inventory and the full order workflow, from cart to delivery.",
  },
};

export default ecommerce;
