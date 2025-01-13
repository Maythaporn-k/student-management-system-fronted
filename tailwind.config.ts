import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "dark-blue": "#0B60B0",
        "light-blue": "#40A2D8",
        "light-cream": "#F0EDCF",
        "gray-black": "#2A3335",
        success: "#5CB338",
        error: "#FB4141",
      },
    },
  },
  plugins: [],
} satisfies Config;
