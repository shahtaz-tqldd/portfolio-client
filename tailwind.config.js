/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: ["night", "winter"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
