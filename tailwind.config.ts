import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "426px",
      },
      colors: {
        foreground: "var(--foreground)",
        background: "var(--background)",
        accent: "var(--accent)",
        "accent-dark": "var(--accent-dark)",
        "accent-muted": "var(--accent-muted)",
        error: "var(--error)",
        "error-muted": "var(--error-muted)",
      },
      boxShadow: {
        "1px": "0 0 0 1px rgba(118, 27, 228)",
      },
      borderWidth: {
        "1": "1px",
      },
    },
  },
  plugins: [],
};
export default config;
