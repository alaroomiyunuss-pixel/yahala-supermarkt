import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0B0B0E",
          ink: "#16161A",
          slate: "#1E1E22",
          gold: "#F5C518",
          goldDark: "#D9AB10",
          goldLight: "#FFE26B",
          cream: "#FFF7DA",
          gray: "#F4F4F6",
          line: "#E7E7EA",
        },
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          elev: "rgb(var(--surface-elev) / <alpha-value>)",
          mute: "rgb(var(--surface-mute) / <alpha-value>)",
        },
        fg: {
          DEFAULT: "rgb(var(--fg) / <alpha-value>)",
          muted: "rgb(var(--fg-muted) / <alpha-value>)",
          subtle: "rgb(var(--fg-subtle) / <alpha-value>)",
        },
        line: "rgb(var(--line) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "Tahoma", "sans-serif"],
      },
      boxShadow: {
        card: "0 6px 20px rgba(0,0,0,0.06)",
        cardHover: "0 12px 28px rgba(0,0,0,0.12)",
        cardDark: "0 6px 22px rgba(0,0,0,0.45)",
        glow: "0 8px 30px rgba(245,197,24,0.25)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
