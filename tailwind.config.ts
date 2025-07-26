import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class", ".dark"], // Ensures Tailwind recognizes the .dark class
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--color-background-primary))",
        foreground: "hsl(var(--color-text-primary))",
        "color-text-brand": "hsl(var(--color-text-brand))",
        dark: "#1a1a1a",
        "dark-light": "#2a2a2a",
        primary: "#3b82f6",
        secondary: "#6b7280",
        warning: "#f59e0b",
        info: "#3b82f6",
        danger: "#ef4444",
        success: "#10b981",
      },
      fontFamily: {
        'inria-sans': ['Inria Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'happy-monkey': ['Happy Monkey', 'cursive'],
        'instrument-sans': ['Instrument Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    // @ts-ignore
    plugin(function ({ addVariant }) {
      addVariant("alt", ".alt &");
    }),
  ],
};

export default config;
