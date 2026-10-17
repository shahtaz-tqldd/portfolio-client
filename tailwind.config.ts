import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bg2: "var(--bg-2)",
        surface: "var(--surface)",
        surface2: "var(--surface-2)",
        line: "var(--line)",
        linestrong: "var(--line-strong)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        accent2: "var(--accent-2)",
        warm: "var(--warm)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderColor: {
        DEFAULT: "var(--line)",
      },
      transitionTimingFunction: {
        outexpo: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        "dash-flow": {
          to: { strokeDashoffset: "-24" },
        },
        "slow-drift": {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.06)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.15" },
        },
      },
      animation: {
        "dash-flow": "dash-flow 1.1s linear infinite",
        "slow-drift": "slow-drift 26s ease-in-out infinite",
        blink: "blink 1.6s steps(2, start) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
