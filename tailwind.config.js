/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        darkTheme: {
          primary: "#3ABFF8",
          secondary: "#2B3A55",
          accent: "#393E46",
          neutral: "#1d283a",
          "base-100": "#0f1729",
          "base-content": "#D6E4E5",
        },
      },
      {
        lightTheme: {
          primary: "#00ABB3",
          secondary: "#39A2DB",
          accent: "#DBE6FD",
          neutral: "#fff",
          "base-100": "#F3EFE0",
          "base-content": "#2C3333",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
