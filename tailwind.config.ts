import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // GermanOil Project — premium industrial palette
        richBlack: "#0A0A0A", // Main Background
        charcoal: "#141414", // Cards / Surfaces
        graphite: "#2A2A2A", // Borders / Dividers
        sandGold: "#C9A85C", // Primary Accent
        lightGold: "#E0C27E", // Hover
        deepGold: "#9C7F3C",
        germanRed: "#B5130F", // Secondary Accent
        signalRed: "#E63227",
        warmGrey: "#A8A29A", // Muted Text
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;